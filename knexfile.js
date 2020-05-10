// Update with your config settings.
require('dotenv/config')
//require('dotenv').config({path: '../.env'});
module.exports = {

  client: 'postgresql',
  connection: {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSOWRD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};
