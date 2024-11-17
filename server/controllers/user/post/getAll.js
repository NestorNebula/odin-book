const prisma = require('../../../models/queries');
const Sperror = require('sperror');

const getAllPosts = async (req, res, next) => {
  const user = await prisma.findUserById(+req.params.userId);
  if (!user) {
    return next(new Sperror('Not Found', "User doesn't exist", 404));
  }
  const posts = await prisma.findUserPosts(user.id);
  const reposts = await prisma.findUserReposts(user.id);
  if (!posts || !reposts) {
    return next(new Sperror('Server Error', 'Error when fetching posts.', 500));
  }
  res.json({ posts, reposts });
};

module.exports = getAllPosts;
