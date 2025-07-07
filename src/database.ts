import { knex as setupknex, Knex } from 'knex'

export const config:Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './src/db/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/db/migrations',
  },
}

export const knex = setupknex(config)