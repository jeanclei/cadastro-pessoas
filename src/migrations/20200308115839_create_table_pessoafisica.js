
exports.up = function(knex) {
  return knex.schema.createTable('pessoafisica', table => {
      table.increments('id').primary()
      table.string('nome', 80).notNullable()
      table.string('cpf', 11).notNullable()
      table.date('dtnasc')
      table.string('sexo', 1).notNullable()
      table.string('nomepai', 80)
      table.string('nomemae', 80).notNullable()
      table.string('nomeconjuge', 80)
      table.string('naturalidade', 30)
      table.string('email', 80).notNullable()
      table.string('email2', 80)
      table.boolean('fundador')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pessoafisica')
};
