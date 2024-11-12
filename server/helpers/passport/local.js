const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const prisma = require('../../models/queries');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.findUserByUsermail(username);
      if (!user) return done(null, false);
      const match = bcrypt.compareSync(password, user.password);
      if (!match) return done(null, false);
      return done(null, { id: user.id });
    } catch (err) {
      return done(err);
    }
  })
);
