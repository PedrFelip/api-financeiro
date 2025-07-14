import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'
import { env } from './env'

const app = fastify()

app.get('/', async () => {
  return 'health check'
})

app.get('/transactions', async () => {
  const transactions = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Teste',
    amount: 100.00,
  }).returning('*')

  return transactions
})

app.listen({
  port: env.PORT,
}).then(() => {
  console.log('Server.ts esta rodando na porta 3333')
})
