const prisma = require('../../../models/queries');
const Sperror = require('sperror');

const postInteraction = async (req, res, next) => {
  const post = await prisma.findPost(+req.params.postId);
  if (!post) {
    return next(
      new Sperror(
        'Bad Request',
        "The post you're trying to interact with doesn't exist.",
        400
      )
    );
  }
  const interactions = ['LIKE', 'REPOST', 'BOOKMARK'];
  if (!interactions.includes(req.body.type)) {
    return next(
      new Sperror(
        'Bad Request',
        'Please provide an existing interaction type',
        400
      )
    );
  }
  const interaction = await prisma.createInteraction(
    req.user.id,
    post.id,
    req.body.type
  );
  if (req.body.type !== 'BOOKMARK') {
    if (req.user.id !== post.userId) {
      await prisma.deleteNotification(
        req.body.type,
        req.user.id,
        post.userId,
        post.id
      );
      await prisma.createNotification(
        req.user.id,
        post.userId,
        req.body.type,
        post.id
      );
      const io = req.io;
      if (io) {
        io.to(post.userId).emit('notification');
      }
    }
  }
  res.json({ interaction });
};

module.exports = postInteraction;
