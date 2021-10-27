const request = require('supertest');
const SeatGeek = require('../ns_models/seatgeek');
const nock = require('nock');
const TestPerformers = require('../testing/TestPerformers');
const { API_KEY } = require('../config');
const SeatGeekAPI = nock('https://api.seatgeek.com/2');

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

/************************************** GET /performers */

describe('GET /performers', () => {
  test('Get All', async () => {
    SeatGeekAPI.get(
      `/performers?q=&per_page=10&page=1&client_id=${API_KEY}`
    ).reply(200, { performers: { data: TestPerformers } });

    const resp = await request(app)
      .get('/performers')
      .set('authorization', `Bearer ${testOne}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ data: TestPerformers });
  });

  test('Unauthorized', async () => {
    const resp = await request(app).get('/performers');
    expect(resp.statusCode).toEqual(401);
  });

  test('Unknown ID for Performer', async () => {
    SeatGeekAPI.get(`/performers/999?client_id=${API_KEY}`).reply(400, {
      error: { message: 'Sorry, no performer found with that ID', status: 400 },
    });

    const resp = await request(app)
      .get('/performers/999')
      .query({ performerId: '999' })
      .set('authorization', `Bearer ${testOne}`);

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({
      error: { message: 'Sorry, no performer found with that ID', status: 400 },
    });
  });
});
