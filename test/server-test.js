let pry = require('pryjs');
const assert = require('chai').assert;
const app = require('../server');
const request = require('request');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const Food = require('../lib/models/food');
const Meal = require('../lib/models/meal');

describe('Server', () => {
  before((done) => {
    this.port = 9876;
    this.server = app.listen(this.port, (err, result) => {
      if(err) { return done(err) }
      done()
    });
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    })
  });

  beforeEach(done => {
    database.seed.run()
      .then( () => done())
  });

  after(() => {
    this.server.close()
  });

  it('exists', () => {
    assert(app.locals)
  });

  describe('GET /api/v1/foods', () => {
    it('should return status code 200', done => {
      this.request.get('/api/v1/foods', (error, response) => {
        if (error) { return done(error)}
        assert.equal(response.statusCode, 200);
        done()
      })
    });

    it('should return a list foods with names and calories', done => {
      this.request.get('/api/v1/foods', (error, response) => {
        if (error) { return done(error) }
        const getsAllFoods = JSON.parse(response.body);
        assert.hasAllKeys( getsAllFoods[0], ['id', 'name', 'calories']);
        assert.equal(getsAllFoods.length, 8);
        done()
      })
    })
  });

  describe('GET /api/v1/foods/:id', () => {
    it('should return food according to the id', done => {
      this.request.get('/api/v1/foods/7', (error, response) => {
        if (error) { return done(error) }
        const getsOneFood = JSON.parse(response.body);
        assert.equal(getsOneFood[0].id, 7);
        assert.hasAllKeys( getsOneFood[0], ['id', 'name', 'calories']);
        assert.equal(getsOneFood.length, 1);
        done()
      })
    });

    it('should return status code 200', done => {
      this.request.get('/api/v1/foods/7', (error, response) => {
        if (error) { return done(error) }
        assert.equal(response.statusCode, 200);
        done()
      })
    });

    it('should return a status 404 if not found', done => {
      this.request.get('/api/v1/foods/100', (error, response) => {
        if (error) { return done(error) }
        assert.equal(response.statusCode, 404);
        done()
      })
    })
  });

  describe('GET /api/v1/meals/:meal_id/foods', () => {
    it('should return foods belonging to a certain meal', done => {
      this.request.get('/api/v1/meals/1/foods', (error, response) => {
        if (error) { return done(error) }
        const mealFoods = JSON.parse(response.body);
        assert.equal(response.statusCode, 200);
        assert.hasAllKeys( mealFoods[0], ['id', 'name', 'calories'] );
        done()
      })
    });


    it('should return a status 404 if not found', done => {
      this.request.get('/api/v1/meals/0/foods', (error, response) => {
        if (error) { return done(error) }
        assert.equal(response.statusCode, 404);
        done()
      })
    })
  });

  describe('DELETE /api/v1/foods/:id', () => {
    it('should return a 200 if successfully deletes a food', done => {
      this.request.delete('/api/v1/foods/7', (error, response) => {
        if (error) { return done(error) }
        assert.equal(response.statusCode, 200);
        done()
      })
    });

    it('returns a 404 if it food not found', done => {
      this.request.delete('/api/v1/foods/20', (error, response) => {
        if (error) { return done(error) }
        assert.equal(response.statusCode, 404);
        done()
      })
    })
  });

  describe('GET /api/v1/meals', () => {
    it('returns the meals associated with foods', done => {
      this.request.get('/api/v1/meals', (error, response) => {
        if (error) { return done(error) }
        const meals = JSON.parse(response.body);
        const oneMeal = meals[0];

        assert.equal(meals.length, 4);
        assert.hasAllKeys(oneMeal, ["id", "name", "foods"]);
        assert.hasAllKeys(oneMeal["foods"][0], ["id", "name", "calories"]);
        done()
      })
    })
  });

  describe('DELETE /api/v1/meals/:meal_id/foods/:food_id', () => {
    xit('should return a 200 if successfully deletes a food', done => {
      this.request.delete('/api/v1/meals/1/foods/2', (error, response) => {
        if (error) { return done(error) }
        assert.equal(response.statusCode, 200);
        done()
      })
    });

    xit('returns a 404 if it food not found', done => {
      this.request.delete('/api/v1/meals/5/foods/30', (error, response) => {
        if (error) { return done(error) }
        assert.equal(response.statusCode, 404);
        done()
      });
    });
  });

  describe('POST /api/v1/foods', () => {
    beforeEach( done => {
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(() => done())
    })

    afterEach( done => {
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(() => done())
    })

    it('should receive and store data representing a food resource', done => {
      const food = { food:
        { name: "Pumpkin Pie",
          calories: 100
        }
      };

      Food.all().then((foods) => {
        const initialCount = foods.rows.length;
        this.request.post('/api/v1/foods', { form: food }, function(error, response) {
          if (error) { done(error) }
          const parsedFood = JSON.parse(response.body)
          assert.equal(response.statusCode, 200)
          assert.equal("Pumpkin Pie", parsedFood.name)
          assert.equal(100, parsedFood.calories)

          Food.all().then((foods) => {
            const afterCount = foods.rows.length;
            assert.equal(1, afterCount - initialCount);
            done();
          })
        })
      })
    })

    it('should return a status 404 if the POST data is structured incorrectly', done => {
      const noNameFood = { food:
        {
          name: '',
          calories: 100
        }
      };

      this.request.post('/api/v1/foods', { form: noNameFood }, function(error, response) {
        if (error) { return done(error) }
        assert.equal(response.statusCode, 404);
      })

      const noCaloriesFood = { food:
        {
          name: 'Banana',
          calories: ''
        }
      };

      this.request.post('/api/v1/foods', { form: noCaloriesFood }, function(error, response) {
        if (error) { return done(error) }
        assert.equal(response.statusCode, 404);
      })
      done();
    });
  });

  describe('PATCH /api/v1/foods/:id', () => {
    beforeEach( done => {
      database.raw(`
        INSERT INTO foods (name, calories)
        VALUES (?, ?);
      `, ["Ham Sandwich", 200])
      .then(() => done())
    })

    afterEach( done => {
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(() => done())
    })

    it('should update a food and return the updated food resource', done => {
      const updatedFood = { food: { name: 'Turkey Sandwich', calories: 150 } };
      this.request.put('/api/v1/foods/1', { form: updatedFood }, function(error, response) {
        if (error) { return done(error)}
        const parsedFood = JSON.parse(response.body);
        assert.equal(response.statusCode, 200)
        assert.equal('Turkey Sandwich', parsedFood.name)
        assert.equal(150, parsedFood.calories)
      })
      done()
    })

    it('should return a status 400 if the PATCH is not successful', done => {
      const emptyUpdatedFood = { food: { name: '', calories: '' } };
      this.request.put('/api/v1/foods/1', { form: emptyUpdatedFood }, function(error, response) {
        if (error) { return done(error) }
        assert.equal(400, response.statusCode)
        done()
      })
    })
  });
});
