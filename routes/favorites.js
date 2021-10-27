const express = require('express');
const jsonschema = require('jsonschema');
const {
  BadRequestError,
  ExpressError,
  NotFoundError,
} = require('../expressError');
const { Favorite, User } = require('../models');
const router = express.Router();
const favoriteSchema = require('../schemas/newFavorite.json');
const deleteFavoriteSchema = require('../schemas/deleteFavorite.json');
const { ensureLoggedIn } = require('../middleware/auth');

router.post('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, favoriteSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const { uuid } = req.body;
    const user = await User.findOne({ where: { uuid } });
    const favoriteSearch = await Favorite.findOne({
      where: req.body,
    });
    if (!favoriteSearch) {
      const favoriteAdd = await Favorite.create(req.body);
      return res.status(201).json({ favoriteAdd });
    }
    throw new BadRequestError();
  } catch (err) {
    const errMsg = err.message.includes('uuid')
      ? 'User Not Found'
      : 'Favorite Already Added';
    const errStatus = err.message.includes('uuid') ? 404 : 500;
    err.message = errMsg;
    err.status = errStatus;
    return next(err);
  }
});

router.delete('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, deleteFavoriteSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const favorite = await Favorite.destroy({ where: req.body });
    return res.status(200).json({ favorite });
  } catch (err) {
    return next(err);
  }
});

router.get('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const favorites = await Favorite.findAll({ include: ['user'] });
    return res.json(favorites);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
