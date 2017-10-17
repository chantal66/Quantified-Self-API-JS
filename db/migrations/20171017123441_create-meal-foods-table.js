
exports.up = function(knex, Promise) {
  let createQuery = `
    CREATE TABLE meal_foods_test(
    meal_id INTEGER NOT NULL,
    food_id INTEGER NOT NULL);
  `
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `
    DROP TABLE meal_foods_test;
  `;
  return knex.raw(dropQuery);
};
