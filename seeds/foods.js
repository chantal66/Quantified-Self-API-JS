exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(function() {
      return Promise.all([
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Banana", 150]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Cheese Bagel", 650]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Breakfast Burrito", 800]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Grapes", 180]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Macaroni and Cheese", 950]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Quest Bar", 200]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Cheese", 400]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Apple", 220]
        ),
      ])
    })
}
