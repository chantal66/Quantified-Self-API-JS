const Meal = require('../models/meal');

const index = (request, response) => {
  Meal.allFoods()
    .then(data => {
      const breakfastObj = { foods: [] };
      const lunchObj = { foods: [] };
      const dinnerObj = { foods: [] };
      const snackObj = { foods: [] };
      const meals = [breakfastObj, lunchObj, dinnerObj, snackObj];

      data.rows.forEach((meal) => {
        if (meal.id === 1) {
          createObject(breakfastObj, meal)
        } else if (meal.id === 2) {

        } else if (meal.id === 3) {
          createObject(dinnerObj, meal)
        } else if (meal.id === 4) {
          createObject(snackObj, meal)
        }
      });

      response.json(meals)
    })
};

const createObject = (mealName, meal) => {
  mealName["id"] = meal.id;
  mealName["name"] = meal.name;
  mealName["foods"].push({"id": meal.food_id, "name": meal.food_name, "calories": meal.calories})
};


module.exports = {
  index
};