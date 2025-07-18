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
      if (!profile._json.email) {
        const response = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
        if (response.status >= 400) return done(null, false);
        const data = await response.json();
        if (!data.length) return done(null, false);
        profile._json.email = data[0].email;
      }
      const user = await prisma.findOrCreateUser(
        username.toLowerCase(),
        profile._json.email.toLowerCase(),
        profile._json.avatar_url
      );
      return done(null, user);
    }
  )
);
