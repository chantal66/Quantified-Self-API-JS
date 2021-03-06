const express = require('express');
const app = express();
const request = require('request');
const cors = require('cors');
const bodyParser = require('body-parser');

const FoodController = require('./lib/controllers/foods-controller');
const Food = require('./lib/models/food');
const Meal = require('./lib/models/meal');
const MealController = require('./lib/controllers/meals-controller');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

app.locals.title = 'Quantified Self';

app.use("/styles", express.static(__dirname + '/styles'));

app.get('/', (request, response) => {
  response.sendFile('index.html', {root: './'})
});

app.get('/api/v1/foods', (request, response) => {
  FoodController.all(response);
});

app.get('/api/v1/foods/:id', (request, response) => {
  FoodController.oneFood(request, response);
});

app.get('/api/v1/meals/:meal_id/foods', (request, response) => {
  MealController.getMealFoods(request, response);
});

app.post('/api/v1/foods', (request, response) => {
  FoodController.postFood(request, response);
});

app.post('/api/v1/meals/:meal_id/foods/:food_id', (request, response) => {
  MealController.postMealFood(request, response);
});

app.put('/api/v1/foods/:id', (request, response) => {
  FoodController.patchFood(request, response);
});

app.delete('/api/v1/foods/:id', (request, response) => {
 FoodController.deleteFood(request, response);
});

app.get('/api/v1/meals', (request, response) => {
  MealController.index(request, response);
});

app.delete('/api/v1/meals/:meal_id/foods/:food_id', (request, response)=> {
  MealController.deleteFood(request, response);
});

app.listen(app.get('port'));

module.exports = app;
