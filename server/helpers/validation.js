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
      const existingUser = await prisma.findUserByUsername(username);
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
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must have at least 8 characters.'),
];

const validateUserUpdate = [
  body('username')
    .optional()
    .trim()
    .escape()
    .blacklist('<>@')
    .toLowerCase()
    .isLength({ min: 4, max: 15 })
    .withMessage('Username must have between 4 and 15 characters.')
    .custom(async (username) => {
      if (!username) return;
      const existingUser = await prisma.findUserByUsername(username);
      if (existingUser) throw new Error('Username already taken.');
    }),
  body('email')
    .optional()
    .trim()
    .blacklist('<>')
    .isEmail()
    .withMessage("Email isn't a valid email.")
    .normalizeEmail()
    .custom(async (email, { req }) => {
      const user = await prisma.findUserById(req.user.id);
      if (user.loginMethod === 'GITHUB') {
        throw new Error("Users logged with GitHub can't update their email.");
      }
      const existingUser = await prisma.findUserByUsermail(email);
      if (existingUser) throw new Error('Email already taken.');
    }),
  body('password')
    .optional()
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must have at least 8 characters.'),
];

module.exports = { validateUser, validateUserUpdate };
