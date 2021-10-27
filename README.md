# Event Tracker Backend

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/robertvessnalong/eventtracker-backend)

This is a backend API created using Node.js, Express.js, and Sequelize. It features authentication using JSON Web Tokens, and password hashing using Bcrypt. This API can easily be integrated into any project.

All data is being fetched from the SeakGeek API.

(https://platform.seatgeek.com/)

Routes for Events, Performers, and Venues are all being fetched from the SeatGeek API. These routes allow for querying, so a user can search for a specific Event, Performer, and Venue.

I also have routes for Social, Favorites, and Users. This will allow for additional data be created when hitting these routes.

## Table of Contents

- [Event Tracker Backend](#event-tracker-backend)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
  - [API](#api)
  - [Testing](#testing)

## Install

```
createdb eventracker
createdb eventracker_test
npx sequelize db:migrate --env 1.[development] 2.[test] 3.[production] <== select enviroment
npm install
npm run start
```

## Usage

To configure Sequelize to your preferences, you can use the [Sequelize Config](config/).

You can configure the development, test, and production env. You can change these based on your dialect, host, database name, etc.

```
{
  "development": {
    "username": null,
    "password": null,
    "database": "eventracker",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false
  },
  "test": {
    "username": null,
    "password": null,
    "database": "eventracker_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "username": null,
    "password": null,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}

```

You can change which enviroment Sequelize will use the base Config.

```
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 12;
const SECRET_KEY = process.env.SECRET_KEY || 'secretkey';
const PORT = +process.env.PORT || 3001;
const API_KEY = process.env.API_KEY || 'YOUR_API_KEY';
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

```

## API

To add your API Key for SeatGeek, create a .env file inside of the root directory. Then add:

```
API_KEY = 'YOUR_API_KEY'
```

## Testing

Current Test are performed with Nock when called to the SeatGeek API. To perform test run:

```
npm run start
```
