const { validateProfileUpdate } = require('../../../helpers/validation');
const { validationResult } = require('express-validator');
const prisma = require('../../../models/queries');
const Sperror = require('sperror');

const putProfile = [
  validateProfileUpdate,
  async (req, res, next) => {
    if (req.user.id !== +req.params.userId) {
      return next(new Sperror('Forbidden', "You can't update this data.", 403));
    }
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const profile = await prisma.findProfile(req.user.id);
    if (!profile) {
      return next(
        new Sperror('Not Found', "Couldn't find the profile to update.", 404)
      );
    }
    const updatedProfile = await prisma.updateProfile(
      profile.userId,
      req.body.displayName,
      req.body.avatar,
      req.body.background,
      req.body.bio,
      req.body.website,
      req.body.location
    );
    if (!updatedProfile) {
      return next(
        new Sperror('Server Error', 'Error when updating profile', 500)
      );
    }
    res.json({ profile: updatedProfile });
  },
];

module.exports = putProfile;
