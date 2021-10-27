const SeatGeek = require('./seatgeek');
const nock = require('nock');
const TestEvents = require('../testing/TestEvents');
const TestEvent = require('../testing/TestEvent');
const TestPerformers = require('../testing/TestPerformers');
const TestPerformer = require('../testing/TestPerfomer');
const { API_KEY } = require('../config');
const SeatGeekAPI = nock('https://api.seatgeek.com/2');

describe('Get', () => {
  test('Get All Events', async () => {
    SeatGeekAPI.get(
      `/events?q=&per_page=10&page=1&geoip=true&client_id=${API_KEY}`
    ).reply(200, TestEvents);

    const events = await SeatGeek.get('events', {});
    expect(events.status).toEqual(200);
    expect(events.data).toMatchObject(TestEvents);
  });

  test('Get Query Event', async () => {
    SeatGeekAPI.get(
      `/events?q=Robert&per_page=10&page=1&geoip=false&client_id=${API_KEY}`
    ).reply(200, TestEvent);
    const events = await SeatGeek.get('events', { search: 'Robert' });
    expect(events.status).toEqual(200);
    expect(events.data).toMatchObject(TestEvent);
  });

  test('Get All Performers', async () => {
    SeatGeekAPI.get(
      `/performers?q=&per_page=10&page=1&client_id=${API_KEY}`
    ).reply(200, TestPerformers);
    const performer = await SeatGeek.get('performers', {});
    expect(performer.status).toEqual(200);
    expect(performer.data).toMatchObject(TestPerformers);
  });

  test('Get Query Performer', async () => {
    SeatGeekAPI.get(
      `/performers?q=Super+Bowl&per_page=10&page=1&client_id=${API_KEY}`
    ).reply(200, TestPerformer);
    const performer = await SeatGeek.get('performers', {
      search: 'Super Bowl',
    });
    expect(performer.status).toEqual(200);
    expect(performer.data).toMatchObject(TestPerformer);
  });
});

describe('Get Performer', () => {
  test('Get Perfomer', async () => {
    SeatGeekAPI.get(`/performers/10000?client_id=${API_KEY}`).reply(
      200,
      TestPerformer
    );
    const performer = await SeatGeek.getPerformer({ performerId: 10000 });
    expect(performer.status).toEqual(200);
    expect(performer.data).toMatchObject(TestPerformer);
  });
});
