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
  })
});
