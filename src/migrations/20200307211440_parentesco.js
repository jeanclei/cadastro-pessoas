
exports.up = function(knex) {
    return knex.schema.createTable('parentesco', table => {
        table.increments('id').primary()
        table.string('desc', 50).notNullable()
        table.boolean('enable').defaultTo(true).notNullable().comment('Define se está habilitado')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('parentesco')
};
