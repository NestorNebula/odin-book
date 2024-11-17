const { validatePost } = require('../../../helpers/validation');
const { validationResult } = require('express-validator');
const prisma = require('../../../models/queries');
const Sperror = require('sperror');

const postPost = [
  validatePost,
  async (req, res, next) => {
    if (req.user.id !== +req.params.userId) {
      return next(new Sperror('Forbidden', "You can't create this data.", 403));
    }
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({ errors: result.array() });
    }
    if (!req.body.content && !req.body.file) {
      return next(new Sperror('Bad Request', 'No content/file provided.', 400));
    }
    if (req.body.postId) {
      if (isNaN(+req.body.postId)) {
        return next(
          new Sperror('Bad Request', 'postId must be an integer.', 400)
        );
      }
      const post = await prisma.findPost(+req.body.postId);
      if (!post) {
        return next(
          new Sperror('Bad Request', "Couldn't find the post to comment?", 400)
        );
      }
      const comment = await prisma.createPostComment(
        req.user.id,
        post.id,
        req.body.content.length ? req.body.content : null,
        req.body.file.length ? req.body.file : null
      );
      return res.json({ comment });
    } else {
      const post = await prisma.createPost(
        req.user.id,
        req.body.content.length ? req.body.content : null,
        req.body.file.length ? req.body.file : null
      );
      return res.json({ post });
    }
  },
];

module.exports = postPost;
