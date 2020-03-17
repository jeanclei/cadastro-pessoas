
exports.up = function(knex) {
  return knex.schema.createTable('pessoafisica', table => {
      table.increments('id').primary()
      table.string('nome', 80).notNullable()
      table.string('cpf', 11).notNullable()
      table.date('dtnasc')
      table.string('naturalidade', 80) //falta implementar
      table.string('profissao', 80) //falta implementar      
      table.boolean('ppe') //falta implementar
      table.string('ppe_cargo', 80) //falta implementar
      table.string('repr_nome', 80) //falta implementar
      table.string('repr_cpf', 11) //falta implementar
      table.string('indic_nome', 80) //falta implementar
      table.string('indic_cpf', 80) //falta implementar
      table.integer('id_parentesco').references('parentesco.id').notNullable().comment('Parentesco da pessoa que indicou') //falta implementar
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
