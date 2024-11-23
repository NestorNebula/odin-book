const router = require('express').Router();
const controller = require('../controllers/controller').auth;
const passport = require('passport');
require('dotenv').config();

router.post('/signup', controller.signUp);
router.post(
  '/login',
  passport.authenticate('local', { failWithError: true }),
  (req, res) => {
    const id = req.user.id;
    res.json({ success: true, id });
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
    failWithError: true,
    failureRedirect: process.env.ORIGIN,
  })
);
router.get(
  '/signin/guest',
  passport.authenticate('guest', { failWithError: true }),
  (req, res) => {
    const id = req.user.id;
    res.json({ success: true, id });
  }
);
router.get('/logout', controller.logOut);

module.exports = router;
