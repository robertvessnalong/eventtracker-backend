const db = require('../models/index');
const { sequelize } = require('../models');
const { createToken } = require('../helper/token');

async function commonBeforeAll() {
  await db.User.create({
    uuid: 'dbc80c17-9719-4a7b-b13e-75186ea08cf9',
    firstName: 'test',
    lastName: 'One',
    email: 'testOne@gmail.com',
    password: 'testpass',
  });
  await db.User.create({
    uuid: 'dbc80c17-3212-4a7b-b13e-75186ea08cf9',
    firstName: 'test',
    lastName: 'Two',
    email: 'testTwo@gmail.com',
    password: 'testpass',
  });
  await db.User.create({
    uuid: 'dbc80c17-5555-4a7b-b13e-75186ea08cf9',
    firstName: 'test',
    lastName: 'Three',
    email: 'testThree@gmail.com',
    password: 'testpass',
  });
  await db.Comment.create({
    eventId: 1234,
    eventName: 'TestOne',
    userName: 'testOne',
    uuid: 'dbc80c17-9719-4a7b-b13e-75186ea08cf9',
    comment: 'test comment',
  });
  await db.Comment.create({
    eventId: 4564,
    eventName: 'TestTwo',
    userName: 'testTwo',
    uuid: 'dbc80c17-3212-4a7b-b13e-75186ea08cf9',
    comment: 'test comment',
  });
  await db.Comment.create({
    eventId: 4531,
    eventName: 'TestThree',
    userName: 'testThree',
    uuid: 'dbc80c17-5555-4a7b-b13e-75186ea08cf9',
    comment: 'test comment',
  });
  await db.Favorite.create({
    type: 'performer',
    performerId: 1234,
    performerName: 'TestOne',
    performerImage: 'https://www.google.com',
    performerUrl: 'https://www.google.com',
    uuid: 'dbc80c17-9719-4a7b-b13e-75186ea08cf9',
  });
  await db.Favorite.create({
    type: 'performer',
    performerId: 1231,
    performerName: 'TestTwo',
    performerImage: 'https://www.google.com',
    performerUrl: 'https://www.google.com',
    uuid: 'dbc80c17-3212-4a7b-b13e-75186ea08cf9',
  });
  await db.Favorite.create({
    type: 'performer',
    performerId: 1231,
    performerName: 'TestThree',
    performerImage: 'https://www.google.com',
    performerUrl: 'https://www.google.com',
    uuid: 'dbc80c17-5555-4a7b-b13e-75186ea08cf9',
  });
}

async function commonBeforeEach() {
  await sequelize.query('BEGIN');
}

async function commonAfterEach() {
  await sequelize.query('ROLLBACK');
}

async function commonAfterAll() {
  await db.User.destroy({ truncate: true, cascade: true });
  await db.Comment.destroy({ truncate: true, cascade: true });
  await db.Favorite.destroy({ truncate: true, cascade: true });
  await sequelize.close();
}

const testOne = createToken({ uuid: 'dbc80c17-9719-4a7b-b13e-75186ea08cf9' });
const testTwo = createToken({ uuid: 'dbc80c17-3212-4a7b-b13e-75186ea08cf9' });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testOne,
  testTwo,
};
