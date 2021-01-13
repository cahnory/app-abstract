exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('todo')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('todo').insert([
        { description: 'add new todo' },
        { description: 'complete a todo', isComplete: true },
      ]),
    );
};
