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

  // beforeEach(done => {
  //   database.seed.run()
  //     .then( () => done())
  // });

  after(() => {
    this.server.close()
  });

  // it('exists', () => {
  //   assert(app.locals)
  // });

  describe('GET /api/v1/foods', () => {
    it('should return status code 200', done => {
      this.request.get('/api/v1/foods', (error, response) => {
        if (error) { return done(error)}
        assert.equal(response.statusCode, 200);
        done()
      })
    })
  })
});
