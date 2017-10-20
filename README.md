## This is the NodeJS/Express backend API for a Food/Meal tracking tool.

### Before you can dive in you will need a little setup for your environment

- npm install nodemon --save-dev
- npm install knex pg --save
- npm install knex -g
- setup your local postgres database with:
>* psql
>* CREATE DATABASE quantified_self;
>* CREATE DATABASE quantified_self_test;
- knex init
- knex migrate:latest
- knex seed:run


## Enjoy our API

To see some data:
run:
```
$   nodemon 
```
and visit localhost:3000


Available Endpoints:

## Food Endpoints:
All Foods
```
GET /api/v1/foods
```
One Food

```
GET /api/v1/foods/:id
```
Create a Food
```
POST /api/v1/foods
```

Update a Food

```
PATCH /api/v1/foods/:id 
```

Delete Food
```
DELETE /api/v1/foods/:id
```

## Meal Endpoints

All Meals
```
GET /api/v1/meals
```
One Meal

```
GET /api/v1/meals/:meal_id/foods/:food_id
```
Create a Meal
```
POST /api/v1/meals
```

Update a Meal

```
PATCH /api/v1/meals/:meal_id/foods/:food_id 
```

Delete Meal
```
DELETE /api/v1/meals/:meal_id/foods/:food_id
```
