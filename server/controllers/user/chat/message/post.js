const { validateMessage } = require('../../../../helpers/validation');
const { validationResult } = require('express-validator');
const prisma = require('../../../../models/queries');
const Sperror = require('sperror');

const postMessage = [
  validateMessage,
  async (req, res, next) => {
    if (req.user.id !== +req.params.userId) {
      return next(
        new Sperror(
          'Forbidden',
          "You can't create a message for another user.",
          403
        )
      );
    }
    const userChats = await prisma.findChats(req.user.id);
    if (!userChats.some((chat) => chat.id === +req.params.chatId)) {
      return next(
        new Sperror('Bad Request', "Can't send a message in this chat.", 400)
      );
    }
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const message = await prisma.createMessage(
      req.user.id,
      +req.params.chatId,
      req.body.content ? req.body.content : null,
      req.body.file ? req.body.file : null
    );
    if (!message) {
      return next(
        new Sperror('Server Error', 'Error when creating message.', 500)
      );
    }
    res.json({ message });
  },
];

module.exports = postMessage;
