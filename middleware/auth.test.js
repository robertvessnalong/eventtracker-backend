const jwt = require('jsonwebtoken');
const { authenticateJWT, ensureLoggedIn } = require('./auth');
const { UnauthorizedError } = require('../expressError');
const { SECRET_KEY } = require('../config');
const testJwt = jwt.sign({ user: 'test' }, SECRET_KEY);
const badJwt = jwt.sign({ user: 'test' }, 'bad');

// authenticateJWT Test
describe('authenticateJWT', () => {
  test('works: header', () => {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${testJwt}` } };
    const res = { locals: {} };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        user: 'test',
      },
    });
  });

  test('works: no header', () => {
    expect.assertions(2);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });

  test('works: invalid token', () => {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${badJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});

// ensureLoggedIn Test
describe('ensureLoggedIn', () => {
  test('works', () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { user: 'test' } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureLoggedIn(req, res, next);
  });

  test('fail', () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureLoggedIn(req, res, next);
  });
});
