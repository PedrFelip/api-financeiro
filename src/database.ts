import { knex as setupknex } from 'knex'

export const knex = setupknex({
  client: 'sqlite3',
  connection: {
    filename: './tmp/app.db',
  }
})