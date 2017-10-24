const Meal = require('../models/meal');
const Food = require('../models/food');

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
          if (meal.name === "Breakfast") {
            MealController.createObject(breakfastObj, meal)
          } else if (meal.name === "Lunch") {
            MealController.createObject(lunchObj, meal)
          } else if (meal.name === "Dinner") {
            MealController.createObject(dinnerObj, meal)
          } else if (meal.name === "Snack") {
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
    Promise.all([
      Meal.oneMeal(mealId),
      Food.oneFood(foodId)
    ])
    .then((mealFoodIds) => {
      const meal = mealFoodIds[0];
      const food = mealFoodIds[1];
      if (meal.rowCount < 1 || food.rowCount < 1) {
        response.sendStatus(404)
      } else {
        Meal.createMealFood(mealId, foodId)
        .then(() => {
          const mealFood = { meal_id: mealId, food_id: foodId }
          response.send(mealFood)
        })
      }
    })
  }

  static jsonfy(data, response) {
    return response.json(data)
  }
}

module.exports = MealController
