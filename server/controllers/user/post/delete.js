const prisma = require('../../../models/queries');
const Sperror = require('sperror');
const {
  deletePostCommentsRecursively,
} = require('../../../helpers/post-recursion');
const { deleteFile } = require('../../../helpers/supabase');

const deletePost = async (req, res, next) => {
  if (req.user.id !== +req.params.userId) {
    return next(new Sperror('Forbidden', "You can't delete this data.", 403));
  }
  if (!req.params.postId || isNaN(+req.params.postId)) {
    return next(new Sperror('Bad Request', 'No post to delete.', 400));
  }
  const post = await prisma.findPost(+req.params.postId);
  if (!post || post.userId !== req.user.id) {
    return next(
      new Sperror(
        'Bad Request',
        "The post doesn't exist/can't be deleted.",
        400
      )
    );
  }
  if (post.file) {
    const path = `photos${post.file.split('photos')[1]}`;
    const { success } = await deleteFile(path);
    if (!success) {
      return next(
        new Sperror('Server Error', 'Error when deleting post file.', 500)
      );
    }
  }
  const deletedPost = await deletePostCommentsRecursively(post);
  res.json({ post: deletedPost });
};

module.exports = deletePost;
