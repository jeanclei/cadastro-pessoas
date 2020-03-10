
exports.up = function (knex) {
    return knex.schema.createTable('documentos', table => {
        table.increments('id').primary()
        table.integer('id_pessoafisica').references('pessoafisica.id').notNullable()
        table.integer('id_tipo_documento').references('tipo_documento.id').notNullable()
        table.string('numero')
        table.date('dtemiss')
        table.string('orgaoemiss', 10)
        table.string('id_base64')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('documentos')
};
