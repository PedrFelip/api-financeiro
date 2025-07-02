import fastify from 'fastify'

const app = fastify()

app.get('/', async () => {
  return'health check'
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('Server.ts esta rodando na porta 3333')
})