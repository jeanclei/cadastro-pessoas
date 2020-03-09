
exports.up = function (knex) {
    return knex.schema.createTable('tipo_documento', table => {
        table.increments('id').primary()
        table.string('desc', 20).notNullable()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('tipo_documento')
};
