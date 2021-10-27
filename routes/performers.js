const express = require('express');
const router = express.Router();
const SeatGeek = require('../ns_models/seatgeek');
const { ensureLoggedIn } = require('../middleware/auth');
const { BadRequestError } = require('../expressError');

// Get All Performers
router.get('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const performers = await SeatGeek.get('performers', req.query);
    return res.status(200).json(performers.data.performers);
  } catch (err) {
    return next(err);
  }
});

// Get One Performer
router.get('/:id', ensureLoggedIn, async (req, res, next) => {
  try {
    const performer = await SeatGeek.getPerformer(req.query);
    if (performer.response) {
      throw new BadRequestError('Sorry, no performer found with that ID');
    }
    return res.status(200).json(performer.data);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
