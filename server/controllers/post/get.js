const prisma = require('../../models/queries');
const Sperror = require('sperror');

const getPost = async (req, res, next) => {
  const post = {
    main: await prisma.findPost(+req.params.postId),
    next: null,
  };
  if (!post.main) {
    return next(new Sperror('Not Found', "Couldn't found the post.", 404));
  }
  let actualPost = post;
  while (actualPost.main.commentedPostId) {
    const nextPost = {
      main: await prisma.findPost(actualPost.main.commentedPostId),
      next: null,
    };
    actualPost.next = nextPost;
    actualPost = nextPost;
  }
  res.json({ post });
};

module.exports = getPost;
