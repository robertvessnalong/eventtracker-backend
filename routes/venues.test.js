const request = require('supertest');
const SeatGeek = require('../ns_models/seatgeek');
const nock = require('nock');
const TestVenues = require('../testing/TestVenues');
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

/************************************** GET /venues */

describe('GET /venues', () => {
  test('Get All', async () => {
    SeatGeekAPI.get(
      `/venues?q=&per_page=10&page=1&geoip=true&client_id=${API_KEY}`
    ).reply(200, { venues: { data: TestVenues } });

    const resp = await request(app)
      .get('/venues')
      .set('authorization', `Bearer ${testOne}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ data: TestVenues });
  });
});
