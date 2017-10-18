const Food = require('../models/food');


class FoodController {
  static all(response){
    Food.all()
      .then( data => {
        FoodController.jsonfy(data.rows, response)
      })
  }

  static oneFood(request, response){
    const { id } = request.params;
    Food.oneFood(id)
      .then(data => {
        if (data.rows.length < 1) {
          response.sendStatus(404)
        } else {
          FoodController.jsonfy(data.rows, response)
        }
      })
  }

  static jsonfy(data, response) {
    return response.json(data)
  }
}

module.exports = FoodController;
