const { body } = require('express-validator');
const prisma = require('../models/queries');

const validateUser = [
  body('username')
    .trim()
    .escape()
    .blacklist('<>@')
    .toLowerCase()
    .isLength({ min: 4, max: 15 })
    .withMessage('Username must have between 4 and 15 characters.')
    .custom(async (username) => {
      const existingUser = await prisma.findUserByUsermail(username);
      if (existingUser) throw new Error('Username already taken.');
    }),
  body('email')
    .trim()
    .blacklist('<>')
    .isEmail()
    .withMessage("Email isn't a valid email.")
    .normalizeEmail()
    .custom(async (email) => {
      const existingUser = await prisma.findUserByUsermail(email);
      if (existingUser) throw new Error('Email already taken.');
    }),
];

module.exports = { validateUser };
