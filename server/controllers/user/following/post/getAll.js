const prisma = require('../../../../models/queries');
const Sperror = require('sperror');

const getAllFollowingPosts = async (req, res, next) => {
  if (req.user.id !== +req.params.userId) {
    return next(new Sperror('Forbidden', "You can't access this data.", 403));
  }
  const posts = await prisma.findUserFollowingPosts(req.user.id);
  const reposts = await prisma.findUserFollowingReposts(req.user.id);
  res.json({ posts, reposts });
};

module.exports = getAllFollowingPosts;
