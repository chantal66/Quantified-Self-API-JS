exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(function() {
      return Promise.all([
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Banana", 150]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Cheese Bagel", 650]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Breakfast Burrito", 800]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Grapes", 180]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Macaroni and Cheese", 950]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Quest Bar", 200]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Cheese", 400]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Apple", 220]
        ),
      ])
    })
}
