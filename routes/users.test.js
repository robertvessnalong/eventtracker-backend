const request = require('supertest');

const app = require('../app');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testOne,
  testTwo,
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /users */

describe('POST /users', () => {
  const newUser = {
    firstName: 'test',
    lastName: 'Four',
    email: 'testFour@gmail.com',
    password: 'testpass',
  };
  test('/users', async () => {
    const resp = await request(app).post('/users').send(newUser);
    expect(resp.body).toEqual(
      expect.objectContaining({
        user: expect.any(Object),
        token: expect.any(String),
      })
    );
  });

  test('bad request with missing data', async () => {
    const resp = await request(app).post('/users').send({
      firstName: 'test',
      email: 'testFour@gmail.com',
      password: 'testpass',
    });
    expect(resp.statusCode).toEqual(400);
  });

  test('short password', async () => {
    const resp = await request(app).post('/users').send({
      firstName: 'test',
      lastName: 'Four',
      email: 'testFour@gmail.com',
      password: 'test',
    });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /users */

describe('GET /users', () => {
  test('Get All', async () => {
    const resp = await request(app)
      .get('/users')
      .set('authorization', `Bearer ${testOne}`);
    expect(resp.statusCode).toEqual(200);
  });

  test('Get One User', async () => {
    const resp = await request(app)
      .get('/users')
      .query({ uuid: 'dbc80c17-9719-4a7b-b13e-75186ea08cf9' });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(
      expect.objectContaining({
        users: expect.any(Array),
      })
    );
  });

  test('Update User', async () => {
    const updateUser = {
      firstName: 'test',
      lastName: 'Four',
      email: 'testfourupdate@gmail.com',
      password: 'testpass',
    };
    const resp = await request(app)
      .get('/users')
      .send(updateUser)
      .set('authorization', `Bearer ${testOne}`);
    expect(resp.statusCode).toEqual(200);
  });
});
