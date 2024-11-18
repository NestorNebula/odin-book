const router = require('express').Router();
const controller = require('../controllers/controller').user;

router.get('/', controller.getAll);
router.get('/:userId', controller.get);
router.put('/:userId', controller.put);
router.put('/:userId/profile', controller.profile.put);
router.post('/:userId/following', controller.following.postFollowing);
router.delete('/:userId/following', controller.following.delete);
router.get('/:userId/following/posts', controller.following.post.getAll);
router.get('/:userId/notifications', controller.notification.getAll);
router.put('/:userId/notifications', controller.notification.putAll);
router.get('/:userId/chats', controller.chat.getAll);
router.post('/:userId/chats', controller.chat.post);
router.post('/:userId/chats/:chatId/messages', controller.chat.message.post);
router.get('/:userId/interactions', controller.interaction.getAll);
router.get('/:userId/posts', controller.post.getAll);
router.post('/:userId/posts', controller.post.post);
router.delete('/:userId/posts/:postId', controller.post.delete);
router.post('/:userId/images', controller.image.post);
router.delete('/:userId/images/:imageId', controller.image.delete);

module.exports = router;
