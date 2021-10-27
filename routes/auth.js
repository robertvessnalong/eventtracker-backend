const express = require('express');
const router = express.Router();
const jsonschema = require('jsonschema');
const { createToken } = require('../helper/token');
const { User } = require('../models');
const userAuthSchema = require('../schemas/userAuth.json');
const { BadRequestError } = require('../expressError');

router.post('/token', async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    const token = createToken(user);
    return res.json({ user, token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
