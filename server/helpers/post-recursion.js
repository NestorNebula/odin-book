const prisma = require('../models/queries');

const deletePostCommentsRecursively = async (post) => {
  for (let i = 0; i < post.comments.length; i++) {
    const comment = await prisma.findPost(post.comments[i].id);
    if (comment.comments.length) {
      await deletePostCommentsRecursively(comment);
    } else {
      await prisma.deletePost(comment);
    }
  }
  const deletedPost = await prisma.deletePost(post.id);
  return deletedPost;
};

module.exports = { deletePostCommentsRecursively };
