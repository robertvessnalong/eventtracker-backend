require('dotenv').config({ path: `${__dirname}/.env` });

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 12;
const SECRET_KEY = process.env.SECRET_KEY || 'secretkey';
const PORT = +process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL || 'https://api.seatgeek.com/2';
// Change ENV for Sequelize - config/config.json
const ENV = 'test';

module.exports = {
  API_KEY,
  BASE_URL,
  PORT,
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
  ENV,
};
