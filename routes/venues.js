const express = require('express');
const router = express.Router();
const SeatGeek = require('../ns_models/seatgeek');
const { ensureLoggedIn } = require('../middleware/auth');

// Get Venue Information
router.get('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const venues = await SeatGeek.get('venues', req.query);
    return res.status(200).json(venues.data.venues);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
