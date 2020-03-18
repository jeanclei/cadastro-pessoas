
exports.up = function(knex) {
  return knex.schema.createTable('pessoafisica', table => {
      table.increments('id').primary()
      table.string('nome', 80).notNullable()
      table.string('cpf', 11).notNullable()
      table.date('dtnasc').notNullable()
      table.string('profissao', 80) //falta implementar      
      table.boolean('ppe').defaultTo(false).comment('Pessoa Politicamente Exposta, padrao false') //falta implementar
      table.string('ppe_cargo', 80).comment('Caso ppe, qual o cargo') //falta implementar
      table.string('repr_nome', 80).comment('Caso menor de idade, nome do representante legal') //falta implementar
      table.string('repr_cpf', 11).comment('Caso menor de idade, cpf do representante legal') //falta implementar
      table.string('indic_nome', 80).comment('nome da pessoa vinculada que indicou') //falta implementar
      table.string('indic_cpf', 80).comment('cpf da pessoa vinculada que indicou') //falta implementar
      table.integer('id_parentesco').references('parentesco.id').comment('Parentesco da pessoa que indicou') //falta implementar
      table.string('sexo', 1).notNullable()
      table.string('nomepai', 80)
      table.string('nomemae', 80).notNullable()
      table.string('nomeconjuge', 80)
      table.string('naturalidade', 80)
      table.string('email', 80).notNullable()
      table.string('email2', 80)
      table.boolean('fundador').defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pessoafisica')
};
