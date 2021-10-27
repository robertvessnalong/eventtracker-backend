const jwt = require('jsonwebtoken');
const { createToken } = require('./token');
const { SECRET_KEY } = require('../config');

describe('createToken', () => {
  test('works: default', () => {
    const token = createToken({ uuid: 'c0ee2849-6640-43b0-8a68-7da0bdb5cc72' });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      user: 'c0ee2849-6640-43b0-8a68-7da0bdb5cc72',
    });
  });
});
