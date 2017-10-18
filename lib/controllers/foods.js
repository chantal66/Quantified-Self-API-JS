const Food = require('../models/food');


class FoodController {
  static all(response){
    Food.all()
      .then( data => {
        FoodController.jsonfy(data.rows, response)
      })
  }

  static jsonfy(data, response) {
    return response.json(data)
  }
}

module.exports = FoodController;
