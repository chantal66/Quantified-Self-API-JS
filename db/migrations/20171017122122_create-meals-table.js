
exports.up = function(knex, Promise) {
  let createQuery = `
    CREATE TABLE meals_test(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT);
  `;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `
    DROP TABLE meals_test;
  `;
  return knex.raw(dropQuery);
};
