const prisma = require('../../../models/queries');
const Sperror = require('sperror');

const deleteFollowing = async (req, res, next) => {
  if (req.user.id !== +req.params.userId) {
    return next(new Sperror('Forbidden', "You can't update this data.", 403));
  }
  if (isNaN(+req.body.userId)) {
    return next(new Sperror('Bad Request', 'No user provided.', 400));
  }
  const updatedUser = await prisma.disconnectUserFollowing(
    req.user.id,
    +req.body.userId
  );
  res.json({ user: updatedUser });
};

module.exports = deleteFollowing;
