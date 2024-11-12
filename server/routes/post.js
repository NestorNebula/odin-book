const router = require('express').Router();
const controller = require('../controllers/controller').post;

router.get('/', controller.getAll);
router.get('/:postId', controller.get);
router.post('/:postId/interactions', controller.interaction.post);
router.delete('/:postId/interactions', controller.interaction.delete);

module.exports = router;
