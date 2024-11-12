const getAllPosts = require('./getAll');
const getPost = require('./get');
const postInteraction = require('./interaction/post');
const deleteInteraction = require('./interaction/delete');

module.exports = {
  getAll: getAllPosts,
  get: getPost,
  interaction: {
    post: postInteraction,
    delete: deleteInteraction,
  },
};
