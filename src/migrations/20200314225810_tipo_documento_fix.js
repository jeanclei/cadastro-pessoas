
exports.up = function(knex) {
    return knex.schema.table('tipo_documento', function (table) {
        table.boolean('enable').notNullable().comment('Define se está habilitado');
      })
};

exports.down = function(knex) {
    return knex.schema.table('tipo_documento', function (table) {
        table.dropColumn('enable');
      })
};
