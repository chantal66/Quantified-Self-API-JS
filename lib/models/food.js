let bodyParser = require('body-parser');
let environment = process.env.NODE_ENV || 'development';
let configuration = require('../../knexfile')[environment];
let database = require('knex')(configuration);

class Food {
  static all(){
    return database.raw(
      `SELECT id, name, calories
       FROM foods
       ORDER BY id;
      `
    )
  }

  static oneFood(id){
    return database.raw(
      `SELECT id, name, calories
       FROM foods WHERE id=?;
      `, [id]
    )
  }

  static create(food) {
    const attributes = [food.name, food.calories];
    return database.raw(
      `INSERT INTO foods (name, calories)
      VALUES (?, ?);`, attributes
    );
  }
}

module.exports = Food;
