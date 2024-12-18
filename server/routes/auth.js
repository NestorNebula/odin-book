const router = require('express').Router();
const controller = require('../controllers/controller').auth;
const passport = require('passport');
const jwt = require('../helpers/jwt');
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
    failWithError: true,
    failureRedirect: `${process.env.ORIGIN}/signin?fail`,
  }),
  (req, res) => {
    const token = jwt.getToken({ id: req.user.id });
    res
      .cookie('temp', token, { httpOnly: true, sameSite: 'none', secure: true })
      .redirect(`${process.env.ORIGIN}/signin?success`);
  }
);
router.get(
  '/signin/github/success',
  passport.authenticate('jwt'),
  (req, res) => {
    if (!req.user) return res.status(400).json({ success: false });
    res.clearCookie('temp');
    res.json({ success: true, id: req.user.id });
  }
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
