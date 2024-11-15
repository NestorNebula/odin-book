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

const validateProfileUpdate = [
  body('displayName')
    .optional()
    .trim()
    .blacklist('<>')
    .notEmpty()
    .withMessage("Display Name can't be empty.")
    .isLength({ max: 50 })
    .withMessage('Display Name must not have more than 50 characters.'),
  body('avatar')
    .optional()
    .isURL({ protocols: ['https'], require_valid_protocol: true }),
  body('background')
    .optional()
    .isURL({ protocols: ['https'], require_valid_protocol: true }),
  body('bio')
    .optional()
    .trim()
    .blacklist('<>')
    .isLength({ max: 160 })
    .withMessage('Bio cannot exceed 160 characters.'),
  body('website')
    .optional()
    .isURL({ protocols: ['https'], require_valid_protocol: true })
    .isLength({ max: 100 })
    .withMessage("Website URL can't have more than 100 characters."),
  body('location')
    .optional()
    .isLength({ max: 30 })
    .withMessage("Location can't exceed 30 characters."),
];

module.exports = { validateUser, validateUserUpdate, validateProfileUpdate };
