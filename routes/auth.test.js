const request = require('supertest');

const app = require('../app');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('POST /auth/token', () => {
  test('works', async () => {
    const resp = await request(app)
      .post('/auth/token')
      .send({ email: 'testOne@gmail.com', password: 'testpass' });
    expect(resp.body).toEqual(
      expect.objectContaining({
        user: expect.any(Object),
        token: expect.any(String),
      })
    );
  });

  test('bad request with missing fields', async function () {
    const resp = await request(app).post('/auth/token').send({
      email: 'testOne@gmail.com',
    });
    expect(resp.statusCode).toEqual(400);
  });

  test('wrong password', async function () {
    const resp = await request(app).post('/auth/token').send({
      email: 'testOne@gmail.com',
      password: 'passtest',
    });
    expect(resp.statusCode).toEqual(401);
  });
});
