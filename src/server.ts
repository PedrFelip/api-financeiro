import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/', async () => {
  return'health check'
})

app.get('/test', async () => {
  const test = await knex('sqlite_schema').select('*')

  return test
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('Server.ts esta rodando na porta 3333')
})