import { knex as setupknex } from 'knex'

export const config = {
  client: 'sqlite3',
  connection: {
    filename: './tmp/app.db',
  },
  useNullAsDefault: true,
}

export const knex = setupknex(config)