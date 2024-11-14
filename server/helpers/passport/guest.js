const passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy;

passport.use(
  'guest',
  new CustomStrategy((req, done) => {
    return done(null, { id: 0, guest: true });
  })
);
