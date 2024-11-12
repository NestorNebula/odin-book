const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();
const prisma = require('../../models/queries');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await prisma.findOrCreateUser(
        profile.username,
        profile.email
      );
      return done(null, user);
    }
  )
);
