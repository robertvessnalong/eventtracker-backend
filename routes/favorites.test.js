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

/************************************** POST /favorites */

describe('POST /favorites', () => {
  const newFavorite = {
    type: 'performer',
    performerId: 5643,
    performerName: 'TestOne',
    performerImage: 'https://www.google.com',
    performerUrl: 'https://www.google.com',
    uuid: 'dbc80c17-9719-4a7b-b13e-75186ea08cf9',
  };
  test('/favorites', async () => {
    const resp = await request(app)
      .post('/favorites')
      .send(newFavorite)
      .set('authorization', `Bearer ${testOne}`);
    expect(resp.body).toEqual(
      expect.objectContaining({
        favoriteAdd: expect.any(Object),
      })
    );
  });

  test('unauth for not logged in', async () => {
    const resp = await request(app).post('/favorites').send(newFavorite);
    expect(resp.statusCode).toEqual(401);
  });

  test('bad request with missing data', async () => {
    const resp = await request(app)
      .post('/favorites')
      .send({
        performerId: 5643,
        performerName: 'TestOne',
        performerImage: 'https://www.google.com',
        performerUrl: 'https://www.google.com',
        uuid: 'dbc80c17-9719-4a7b-b13e-75186ea08cf9',
      })
      .set('authorization', `Bearer ${testOne}`);
    expect(resp.statusCode).toEqual(500);
  });

  test('bad request with invalid data', async function () {
    const resp = await request(app)
      .post('/favorites')
      .send({
        ...newFavorite,
        test: 'this is test',
      })
      .set('authorization', `Bearer ${testOne}`);
    expect(resp.statusCode).toEqual(500);
  });
});

/************************************** GET /favorites */

describe('GET /favorites', () => {
  test('Get All', async () => {
    const resp = await request(app)
      .get('/favorites')
      .set('authorization', `Bearer ${testOne}`);
    expect(resp.statusCode).toEqual(200);
  });

  test('Unauthorized', async () => {
    const resp = await request(app).get('/favorites');
    expect(resp.statusCode).toEqual(401);
  });
});
