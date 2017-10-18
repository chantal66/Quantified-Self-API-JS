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
}

module.exports = Food;