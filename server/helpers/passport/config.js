const passport = require('passport');
require('./github');
require('./local');
require('./guest');
const prisma = require('../../models/queries');

passport.serializeUser((user, done) => {
  return user.id
    ? done(null, { id: user.id })
    : done(null, { id: 0, guest: true });
});

passport.deserializeUser(async (user, done) => {
  try {
    if (user.guest) return done(null, user);
    const existingUser = await prisma.findUserById(user.id);
    if (!existingUser) return done(null, false);
    return done(null, { id: existingUser.id });
  } catch (err) {
    return done(err);
  }
});
