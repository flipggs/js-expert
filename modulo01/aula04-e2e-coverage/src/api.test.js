const { describe, it, before, after } = require('mocha');
const supertest = require("supertest");
const assert = require("assert");

describe('API Suite test', () => {
  let app;
  before((done) => {
    app = require("./api");
    app.once('listening', done);
  });

  after(done => app.close(done));

  describe('/contact:get', () => {
    it('Should request the contact page and return HTTP status 200', async () => {
      const response = await supertest(app)
        .get('/contact')
        .expect(200);

        assert.strictEqual(response.text, 'contact us page');
    })
  })
  
  describe('/hi:404', () => {
    it('Should request and existing page and return HTTP Status 404', async () => {
      const response = await supertest(app)
        .get('/hi')
        .expect(404);

        assert.strictEqual(response.text, 'not found');
    })
  })
  
  describe('/login:post', () => {
    it('Should request the login page and return HTTP status 200', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'flipggs', password: '123' })
        .expect(200);

        assert.strictEqual(response.text, 'Log in succeded');
    })
    it('Should request the login page and return HTTP status 401', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'nome errado', password: '123' })
        .expect(401);

        assert.ok(response.unauthorized);
        assert.strictEqual(response.text, 'Log in failed');
    })
  })
})