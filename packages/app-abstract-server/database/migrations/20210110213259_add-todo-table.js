exports.up = (knex) => {
  knex.schema.createTable('todo', (table) => {
    table.increments('id');
    table.string('description');
    table.boolean('isComplete').default(false);
    table.boolean('isDeleted').default(false);

    return table;
  });

  return knex;
};

exports.down = (knex) => {
  knex.schema.dropTable('todo');

  return knex;
};
