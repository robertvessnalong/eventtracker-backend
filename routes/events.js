const express = require('express');
const router = express.Router();
const SeatGeek = require('../ns_models/seatgeek');
const { ensureLoggedIn } = require('../middleware/auth');

// Get All Events
// Add ensureLoggedIn
router.get('/', async (req, res, next) => {
  try {
    const events = await SeatGeek.get('events', req.query);
    return res.status(200).json(events.data.events);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
