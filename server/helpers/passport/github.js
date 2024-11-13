const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();
const prisma = require('../../models/queries');
const crypto = require('node:crypto');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      let username =
        profile.username.length > 15
          ? profile.username.substring(0, 15).toLowerCase()
          : profile.username.toLowerCase();
      let existingUser = await prisma.findUserByUsername(username);
      let count = 0;
      while (existingUser && count < 100) {
        username = crypto.randomBytes(7).toString('hex');
        existingUser = await prisma.findUserByUsername(username);
        count++;
      }
      const user = await prisma.findOrCreateUser(
        username.toLowerCase(),
        profile.email
      );
      return done(null, user);
    }
  )
);
