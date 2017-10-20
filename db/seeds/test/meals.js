exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
    .then(function() {
      return Promise.all([
        knex.raw('INSERT INTO meals (name) VALUES (?)', ["Breakfast"]),
        knex.raw('INSERT INTO meals (name) VALUES (?)', ["Lunch"]),
        knex.raw('INSERT INTO meals (name) VALUES (?)', ["Dinner"]),
        knex.raw('INSERT INTO meals (name) VALUES (?)', ["Snack"])
      ])
    })
};
