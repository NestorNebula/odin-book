const router = require('express').Router();
const controller = require('../controllers/controller').auth;
const passport = require('passport');

router.post('/signup', controller.signUp);
router.get(
  '/signin/github',
  passport.authenticate('github', { scope: ['user:email'], failWithError })
);
router.get(
  '/signin/github/callback',
  passport.authenticate('github', {
    successRedirect: process.env.ORIGIN,
    failWithError,
  })
);
router.get('/logout', controller.logOut);

module.exports = router;
