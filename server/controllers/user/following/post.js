const prisma = require('../../../models/queries');
const Sperror = require('sperror');

const postFollowing = async (req, res, next) => {
  if (req.user.id !== +req.params.userId) {
    return next(new Sperror('Forbidden', "You can't update this data.", 403));
  }
  const userToFollow = await prisma.findUserById(+req.body.userId);
  if (!userToFollow) {
    return next(
      new Sperror('Not Found', "Couldn't find the user to follow", 404)
    );
  }
  const updatedUser = await prisma.connectUserFollowing(
    req.user.id,
    userToFollow.id
  );
  await prisma.createNotification(req.user.id, userToFollow.id, 'FOLLOW');
  const io = req.io;
  if (io) {
    io.to(userToFollow.id).emit('notification');
  }
  res.json({ user: updatedUser });
};

module.exports = postFollowing;
