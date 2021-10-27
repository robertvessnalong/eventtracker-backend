const express = require('express');
const jsonschema = require('jsonschema');
const {
  BadRequestError,
  ExpressError,
  NotFoundError,
} = require('../expressError');
const { Comment } = require('../models');
const router = express.Router();
const commentNewSchema = require('../schemas/newComment.json');
const { ensureLoggedIn } = require('../middleware/auth');

router.post('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, commentNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const comment = await Comment.create(req.body);
    return res.status(201).json({ comment: 'success' });
  } catch (err) {
    return next(err);
  }
});

router.get('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const comments = await Comment.findAll({ include: ['user'] });
    return res.json(comments);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
