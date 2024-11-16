const prisma = require('../../../models/queries');
const Sperror = require('sperror');

const getAllNotifications = async (req, res, next) => {
  if (req.user.id !== +req.params.userId) {
    return next(new Sperror('Forbidden', "You can't access this data.", 403));
  }
  const notifications = await prisma.findNotifications(req.user.id);
  res.json({ notifications });
};

module.exports = getAllNotifications;
