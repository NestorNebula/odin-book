const { body } = require('express-validator');
const prisma = require('../models/queries');
const bcrypt = require('bcrypt');

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
      return true;
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
      return true;
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
    .custom(async (username, { req }) => {
      if (!username) return;
      const existingUser = await prisma.findUserByUsername(username);
      if (existingUser && existingUser.id !== req.user.id)
        throw new Error('Username already taken.');
      return true;
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
      if (existingUser && existingUser.id !== req.user.id)
        throw new Error('Email already taken.');
      return true;
    }),
  body('password')
    .optional()
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must have at least 8 characters.'),
  body('currentPassword')
    .optional()
    .trim()
    .custom(async (currentPassword, { req }) => {
      const user = await prisma.findLoggedUserById(req.user.id);
      if (!bcrypt.compareSync(currentPassword, user.password)) {
        throw new Error('Your current password is incorrect.');
      }
      return true;
    }),
];

const validateProfileUpdate = [
  body('displayName')
    .trim()
    .blacklist('<>')
    .notEmpty()
    .withMessage("Display Name can't be empty.")
    .isLength({ max: 50 })
    .withMessage('Display Name must not have more than 50 characters.'),
  body('avatar')
    .optional({ values: 'falsy' })
    .isURL({ protocols: ['https'], require_valid_protocol: true })
    .withMessage("Avatar URL isn't valid."),
  body('background')
    .optional({ values: 'falsy' })
    .isURL({
      protocols: ['https'],
      require_valid_protocol: true,
    })
    .withMessage("Background Image URL isn't valid."),
  body('bio')
    .optional({ values: 'falsy' })
    .trim()
    .blacklist('<>')
    .isLength({ max: 160 })
    .withMessage('Bio cannot exceed 160 characters.'),
  body('website')
    .optional({ values: 'falsy' })
    .isURL({ protocols: ['https'], require_valid_protocol: true })
    .withMessage("Website URL isn't valid.")
    .isLength({ max: 100 })
    .withMessage("Website URL can't have more than 100 characters."),
  body('location')
    .trim()
    .blacklist('<>')
    .optional({ values: 'falsy' })
    .isLength({ max: 30 })
    .withMessage("Location can't exceed 30 characters."),
];

const validateMessage = [
  body('content')
    .trim()
    .blacklist('<>')
    .custom((content, { req }) => {
      if (!content.length && !req.body.file) {
        throw new Error("Content can't be empty when no file is provided.");
      }
      return true;
    }),
  body('file')
    .optional({ values: 'falsy' })
    .trim()
    .blacklist('<>')
    .isURL({ protocols: ['https'], require_valid_protocol: true })
    .withMessage("File URL isn't valid")
    .custom((file, { req }) => {
      if (!file.length && !req.body.content) {
        throw new Error("File can't be empty when no content is provided.");
      }
      return true;
    }),
];

const validatePost = [
  body('content')
    .trim()
    .blacklist('<>')
    .isLength({ max: 280 })
    .withMessage('Post cannot exceed 280 characters.')
    .custom((content, { req }) => {
      if (!content.length && !req.body.file) {
        throw new Error("Content can't be empty when no file is provided.");
      }
      return true;
    }),
  body('file')
    .optional({ values: 'falsy' })
    .blacklist('<>')
    .isURL({ protocols: ['https'], require_valid_protocol: true })
    .withMessage("File URL isn't valid.")
    .custom((file, { req }) => {
      if (!file.length && !req.body.content) {
        throw new Error("File can't be empty when no content is provided.");
      }
      return true;
    }),
];

module.exports = {
  validateUser,
  validateUserUpdate,
  validateProfileUpdate,
  validateMessage,
  validatePost,
};
