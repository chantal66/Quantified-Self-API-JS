const Meal = require('../models/meal');

class MealController {
  static index(request, response) {
    Meal.allFoods()
      .then(data => {
        const breakfastObj = { foods: [] };
        const lunchObj = { foods: [] };
        const dinnerObj = { foods: [] };
        const snackObj = { foods: [] };
        const meals = [breakfastObj, lunchObj, dinnerObj, snackObj];

        data.rows.forEach((meal) => {
          if (meal.id === 1) {
            MealController.createObject(breakfastObj, meal)
          } else if (meal.id === 2) {
            MealController.createObject(lunchObj, meal)
          } else if (meal.id === 3) {
            MealController.createObject(dinnerObj, meal)
          } else if (meal.id === 4) {
            MealController.createObject(snackObj, meal)
          }
        });

        response.json(meals)
      })
  };

  static createObject(mealName, meal) {
    mealName["id"] = meal.id;
    mealName["name"] = meal.name;
    mealName["foods"].push({"id": meal.food_id, "name": meal.food_name, "calories": meal.calories})
  };


  static deleteFood(request, response) {
    const meal_id = request.params.meal_id;
    const food_id = request.params.food_id;

    Meal.deleteFood(food_id, meal_id)
      .then((data) => {
        if (data.rowCount < 1){
          response.sendStatus(404)
        } else {
          response.sendStatus(200)
        }
      })
  };

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

  static postMealFood(request, response) {
    const mealId = request.params.meal_id;
    const foodId = request.params.food_id;
    const mealFood = { meal_id: mealId, food_id: foodId }
    if (!!mealId && !!foodId) {
      Meal.createMealFood(mealId, foodId)
      .then(() => {
        response.send(mealFood)
      })
    } else {
      response.sendStatus(404)
    }
  }

  static jsonfy(data, response) {
    return response.json(data)
  }
}

module.exports = MealController
