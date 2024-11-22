const prisma = require('../../models/queries');
const { validateUser } = require('../../helpers/validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Sperror = require('sperror');

const signUp = [
  validateUser,
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const user = await prisma.createUser(
      req.body.username,
      req.body.email,
      bcrypt.hashSync(req.body.password, 10)
    );
    if (!user) {
      return next(
        new Sperror('Server error', 'Error when creating user.', 500)
      );
    }
    return res.status(201).json({ user });
  },
];

module.exports = signUp;
