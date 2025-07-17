import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { checkCookie } from '../middlewares/checkcoekies'

export async function transactionsRoutes(app: FastifyInstance) {

  app.get('/', {
   preHandler: [checkCookie]
  }, async(request) => {

    const { sessionId } = request.cookies
    const transactions = await knex('transactions').where('session_id', sessionId).select()

    return { transactions }
  })

  app.get('/summary', {
    preHandler: [checkCookie]
  }, async(request) => {

    const { sessionId } = request.cookies

    const summary = await knex('transactions').where('session_id', sessionId).sum('amount', { as: 'amount' }).first()

    return { summary }
  })

  app.get('/:id', {
   preHandler: [checkCookie]
  }, async(request) => {

    const schemaGetTransaction = z.object({
      id: z.string(),
    })
    const { sessionId } = request.cookies

    const { id } = schemaGetTransaction.parse(request.params)

    const getTransaction = await knex('transactions').where('id', id).andWhere('session_id', sessionId).first().select()

    return { getTransaction }
  })

  app.post('/', async (request, reply) => {
    
    const schemaCreateTransaction = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = schemaCreateTransaction.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 dias
      })
    }

    const transaction = await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    }).returning('*')

    return reply.status(201).send(transaction)
  })

}
