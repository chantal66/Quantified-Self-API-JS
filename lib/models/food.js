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

  static deleteFood(id){
    return database.raw(
      `DELETE FROM foods WHERE id=?;
      `, [id]
    )
  }
}

module.exports = Food;