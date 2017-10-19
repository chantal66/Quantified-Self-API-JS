var bodyParser = require('body-parser')
var environment = process.env.NODE_ENV || 'development'
var configuration = require('../../knexfile')[environment]
var database = require('knex')(configuration)

class Meal {
  static mealFoods(mealId) {
    return database.raw(`
      SELECT id, name, calories FROM foods
      INNER JOIN meal_foods ON foods.id = meal_foods.food_id
      WHERE meal_foods.meal_id = ?
    `, mealId)
  }
}

module.exports = Meal;
