import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'

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
  port: 3333,
}).then(() => {
  console.log('Server.ts esta rodando na porta 3333')
})
