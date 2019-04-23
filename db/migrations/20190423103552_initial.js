
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('species', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('specimens', (table) => {
      table.increments('id').primary();
      table.integer('id_species').unsigned();
      table.foreign('id_species').references('species.id');
      table.decimal('sepal_length');
      table.decimal('sepal_width');
      table.decimal('petal_length');
      table.decimal('petal_width');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('species'),
    knex.schema.dropTable('specimens')
  ])
};
