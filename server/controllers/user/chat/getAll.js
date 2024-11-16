const prisma = require('../../../models/queries');
const Sperror = require('sperror');

const getAllChats = async (req, res, next) => {
  if (req.user.id !== +req.params.userId) {
    return next(new Sperror('Forbidden', "You can't access this data.", 403));
  }
  const chats = await prisma.findChats(req.user.id);
  res.json({ chats });
};

module.exports = getAllChats;
