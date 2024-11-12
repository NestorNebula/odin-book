const router = require('express').Router();
const controller = require('../controllers/controller').auth;
const passport = require('passport');

router.post('/signup', controller.signUp);
router.post(
  '/login',
  passport.authenticate('local', { failWithError: true }),
  (req, res) => {
    res.json({ success: true });
  }
);
router.get(
  '/signin/github',
  passport.authenticate('github', {
    scope: ['user:email'],
    failWithError: true,
  })
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
