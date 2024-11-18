const getUser = require('./get');
const getAllUsers = require('./getAll');
const putUser = require('./put');
const putProfile = require('./profile/put');
const postFollowing = require('./following/post');
const deleteFollowing = require('./following/delete');
const getAllFollowingPosts = require('./following/post/getAll');
const getAllNotifications = require('./notification/getAll');
const putAllNotifications = require('./notification/putAll');
const getAllChats = require('./chat/getAll');
const postChat = require('./chat/post');
const postMessage = require('./chat/message/post');
const getAllInteractions = require('./interaction/getAll');
const getAllPosts = require('./post/getAll');
const postPost = require('./post/post');
const deletePost = require('./post/delete');
const postImage = require('./image/post');
const deleteImage = require('./image/delete');

module.exports = {
  get: getUser,
  getAll: getAllUsers,
  put: putUser,
  profile: {
    put: putProfile,
  },
  following: {
    postFollowing,
    delete: deleteFollowing,
    post: {
      getAll: getAllFollowingPosts,
    },
  },
  notification: {
    getAll: getAllNotifications,
    putAll: putAllNotifications,
  },
  chat: {
    getAll: getAllChats,
    post: postChat,
    message: {
      post: postMessage,
    },
  },
  interaction: {
    getAll: getAllInteractions,
  },
  post: {
    getAll: getAllPosts,
    post: postPost,
    delete: deletePost,
  },
  image: {
    post: postImage,
    delete: deleteImage,
  },
};
