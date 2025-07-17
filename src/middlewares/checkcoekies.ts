import { FastifyReply, FastifyRequest } from 'fastify'


export async function checkCookie (request: FastifyRequest, reply: FastifyReply) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    reply.status(401).send({
      error: 'Não autorizado'
    })
  }
}