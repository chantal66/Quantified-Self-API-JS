let pry = require('pryjs');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const allFoods = () => {
  return database.raw(`
  SELECT meals.id, meals.name, foods.id AS food_id, foods.name AS food_name, foods.calories
  FROM meals
  JOIN meal_foods
  ON meals.id = meal_foods.meal_id
  JOIN foods
  ON meal_foods.food_id = foods.id
  GROUP BY meals.id, meals.name, foods.id
  ORDER BY meals.id
  `)
};

module.exports = {
  allFoods
};

