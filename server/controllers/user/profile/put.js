const { validateProfileUpdate } = require('../../../helpers/validation');
const { validationResult } = require('express-validator');
const prisma = require('../../../models/queries');
const Sperror = require('sperror');
const { deleteFile } = require('../../../helpers/supabase');

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
    if (profile.avatar && profile.avatar !== req.body.avatar) {
      const path = `avatars${profile.avatar.split('avatars')[1]}`;
      const { success } = await deleteFile(path);
      if (!success) {
        return next(
          new Sperror('Server Error', 'Error when deleting old avatar.', 500)
        );
      }
    }
    if (profile.background && profile.background !== req.body.background) {
      if (profile.background.includes('supabase')) {
        const path = `backgrounds${profile.background.split('backgrounds')[1]}`;
        const { success } = await deleteFile(path);
        if (!success) {
          return next(
            new Sperror(
              'Server Error',
              'Error when deleting old background.',
              500
            )
          );
        }
      }
    }
    const updatedProfile = await prisma.updateProfile(
      profile.userId,
      req.body.displayName,
      req.body.avatar,
      req.body.background,
      req.body.bio ?? null,
      req.body.website ?? null,
      req.body.location ?? null
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
