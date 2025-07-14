import { knex as setupknex, Knex } from 'knex'
import 'dotenv/config'
import { env } from './env'

if (env.DATABASE_URL) {
  throw new Error('DATABASE_URL não esta definido')
}

export const config:Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/db/migrations',
  },
}

export const knex = setupknex(config)