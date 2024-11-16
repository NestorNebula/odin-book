const prisma = require('../../../models/queries');
const Sperror = require('sperror');

const putAllNotifications = async (req, res, next) => {
  if (req.user.id !== +req.params.userId) {
    return next(new Sperror('Forbidden', "You can't update this data.", 403));
  }
  await prisma.updateNotifications(req.user.id);
  const updatedNotifications = await prisma.findNotifications(req.user.id);
  res.json({ notifications: updatedNotifications });
};

module.exports = putAllNotifications;
