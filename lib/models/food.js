var bodyParser = require('body-parser');
var environment = process.env.NODE_ENV || 'development';
var configuration = require('../../knexfile')[environment];
var database = require('knex')(configuration);

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