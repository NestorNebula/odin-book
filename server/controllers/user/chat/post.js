const prisma = require('../../../models/queries');
const Sperror = require('sperror');

const postChat = async (req, res, next) => {
  if (req.user.id !== +req.params.userId) {
    return next(
      new Sperror('Forbidden', "Can't create chat for another user.", 403)
    );
  }
  const userToAdd = +req.body.userId
    ? await prisma.findUserById(+req.body.userId)
    : null;
  if (!userToAdd) {
    return next(
      new Sperror('Bad Request', "The requested user doesn't exist", 400)
    );
  }
  const chat = await prisma.createChat(req.user.id, userToAdd.id);
  if (!chat) {
    return next(new Sperror('Server Error', "Couldn't create chat", 500));
  }
  res.json({ chat });
};

module.exports = postChat;
