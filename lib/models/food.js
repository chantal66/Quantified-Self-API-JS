var bodyParser = require('body-parser')
var environment = process.env.NODE_ENV || 'development'
var configuration = require('../../knexfile')[environment]
var database = require('knex')(configuration)

// const find = (message) => {
//
// }
//
// module.exports = {
//   find,
// }
