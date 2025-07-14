import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),

})

export const _env = schema.safeParse(process.env)

if (_env.success === false) {
  console.log('Variaveis de ambiente invalidas')

  throw new Error('Variaveis de ambiente invalidas')    
}

export const env = _env.data