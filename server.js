var express = require('express')
var app = express()
var Food = require('./lib/models/food');
var Foods = require('./lib/controllers/foods');
var Meal = require('./lib/models/meal');
var Meals = require('./lib/controllers/meals');

// process a request to a path and pass in a controller method as a callback
// app.get(path, Foods.getFood)

// app.get(path, Meals.getMeal)

app.listen(3000);

module.exports = app
