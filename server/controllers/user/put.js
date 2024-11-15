const Sperror = require('sperror');
const { validationResult } = require('express-validator');
const { validateUserUpdate } = require('../../helpers/validation');
const bcrypt = require('bcrypt');
const prisma = require('../../models/queries');

const putUser = [
  validateUserUpdate,
  async (req, res, next) => {
    if (req.user.id !== +req.params.userId) {
      return next(new Sperror('Forbidden', "You can't update this data.", 403));
    }
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const user = await prisma.findUserById(req.user.id);
    const password = req.body.password
      ? bcrypt.hashSync(req.body.password, 10)
      : user.password;
    const updatedUser = await prisma.updateUser(
      user.id,
      req.body.username || user.username,
      req.body.email || user.email,
      password
    );
    if (!updatedUser) {
      return next(new Sperror('Server Error', "Couldn't update user", 500));
    }
    res.json({ user: updatedUser });
  },
];

module.exports = putUser;
