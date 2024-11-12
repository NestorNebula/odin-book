const router = require('express').Router();
const controller = require('../controllers/controller').auth;

router.post('/signup', controller.signUp);
router.get('/logout', controller.logOut);

module.exports = router;
