import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.get('/', async () => {
  return 'health check'
})

app.register(transactionsRoutes, {
  prefix: 'transactions'
})

app.listen({
  port: env.PORT,
}).then(() => {
  console.log('Server.ts esta rodando na porta 3333')
})
