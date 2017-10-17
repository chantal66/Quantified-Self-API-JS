
exports.up = function(knex, Promise) {
  let createQuery = `
    CREATE TABLE foods_test(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT,
    calories INTEGER);
  `;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `
    DROP TABLE foods_test;
  `
  return knex.raw(dropQuery);
};
