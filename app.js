const express = require('express');
const path = require('path');
const cors = require('cors');

// Routes
const usersRoutes = require('./routes/user');
const eventRoutes = require('./routes/events');
const performerRoutes = require('./routes/performers');
const venueRoutes = require('./routes/venues');
const authRoutes = require('./routes/auth');
const favRoutes = require('./routes/favorites');
const commentRoutes = require('./routes/comments');
const { authenticateJWT } = require('./middleware/auth');
const { NotFoundError } = require('./expressError');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);
app.use('/users', usersRoutes);
app.use('/events', eventRoutes);
app.use('/performers', performerRoutes);
app.use('/venues', venueRoutes);
app.use('/auth', authRoutes);
app.use('/favorites', favRoutes);
app.use('/comments', commentRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
