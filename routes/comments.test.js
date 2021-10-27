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

/************************************** POST /comments */

describe('POST /comments', () => {
  const newComment = {
    eventId: 456,
    eventName: 'TestOne',
    userName: 'testOne',
    uuid: 'dbc80c17-9719-4a7b-b13e-75186ea08cf9',
    comment: 'test comment',
  };
  test('/comments', async () => {
    const resp = await request(app)
      .post('/comments')
      .send(newComment)
      .set('authorization', `Bearer ${testOne}`);
    expect(resp.body).toEqual({ comment: 'success' });
  });

  test('unauth for not logged in', async () => {
    const resp = await request(app).post('/comments').send(newComment);
    expect(resp.statusCode).toEqual(401);
  });

  test('bad request with missing data', async () => {
    const resp = await request(app)
      .post('/comments')
      .send({
        eventId: 456,
        eventName: 'TestOne',
        userName: 'testOne',
        uuid: 'dbc80c17-9719-4a7b-b13e-75186ea08cf9',
      })
      .set('authorization', `Bearer ${testOne}`);
    expect(resp.statusCode).toEqual(400);
  });

  test('bad request with invalid data', async function () {
    const resp = await request(app)
      .post('/comments')
      .send({
        ...newComment,
        test: 'this is test',
      })
      .set('authorization', `Bearer ${testOne}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /comments */

describe('GET /comments', () => {
  test('Get All', async () => {
    const resp = await request(app)
      .get('/comments')
      .set('authorization', `Bearer ${testOne}`);
    expect(resp.statusCode).toEqual(200);
  });

  test('Unauthorized', async () => {
    const resp = await request(app).get('/comments');
    expect(resp.statusCode).toEqual(401);
  });
});
