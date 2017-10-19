const Meal = require('../models/meal')

class MealController {
  static getMealFoods(request, response) {
    const mealId = request.params.meal_id;
    Meal.mealFoods(mealId)
    .then(data => {
      if (data.rows.length < 1) {
        response.sendStatus(404)
      } else {
        MealController.jsonfy(data.rows, response)
      }
    });
  }

  static jsonfy(data, response) {
    return response.json(data)
  }
}
module.exports = MealController
