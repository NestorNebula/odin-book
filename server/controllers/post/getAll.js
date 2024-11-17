const prisma = require('../../models/queries');

const getAllPosts = async (req, res) => {
  if (req.query.search) {
    const posts = await prisma.findPostsBySearch(
      req.query.search,
      !isNaN(+req.query.limit) ? +req.query.limit : 100
    );
    return res.json({ posts });
  } else {
    const posts = await prisma.findPosts(
      !isNaN(+req.query.limit) ? +req.query.limit : 100
    );
    return res.json({ posts });
  }
};

module.exports = getAllPosts;
