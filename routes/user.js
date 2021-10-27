const express = require('express');
const jsonschema = require('jsonschema');
const {
  BadRequestError,
  ExpressError,
  NotFoundError,
} = require('../expressError');
const { User, Comment, Favorite } = require('../models');
const router = express.Router();
const userNewSchema = require('../schemas/newUser.json');
const { createToken } = require('../helper/token');
const userUpdateSchema = require('../schemas/userUpdate.json');

// Create New User
router.post('/', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const user = await User.create({ firstName, lastName, email, password });
    const result = await User.findOne({
      where: { email },
      include: [{ all: true, nested: true }],
    });
    if (user) {
      const token = createToken(user);
      return res.status(201).json({ user: result, token });
    }
  } catch (err) {
    return next(err);
  }
});

//Get All Users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (err) {
    return next(err);
  }
});

//Get One User
router.get('/:user', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { uuid: req.params.user },
      include: [{ all: true, nested: true }],
    });
    return res.json({ user });
  } catch (err) {
    err.message = 'User Not Found';
    err.status = 404;
    return next(err);
  }
});

//Update User
router.patch('/:user', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const validate = await User.validPassword(
      req.params.user,
      req.body.password
    );
    if (validate) {
      await User.update(req.body, {
        where: { uuid: req.params.user },
        individualHooks: true,
      });
      const user = await User.findOne({ where: { uuid: req.params.user } });
      return res.json({ user });
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
