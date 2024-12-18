const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const prisma = require('../../models/queries');
require('dotenv').config();

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['temp'];
  }
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.TOKEN_SECRET,
};

passport.use(
  new JWTStrategy(options, async (jwt_payload, done) => {
    const user = await prisma.findUserById(jwt_payload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, { id: user.id });
  })
);
