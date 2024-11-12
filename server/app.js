const express = require('express');
const app = express();
require('dotenv').config();
const Sperror = require('sperror');
const routes = require('./routes/routes');
const cookieSession = require('cookie-session');
const passport = require('passport');

app.use(
  cookieSession({
    secret: process.env.COOKIE_SECRET,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    partitioned: true,
    sameSite: 'none',
    secure: true,
    httpOnly: true,
  })
);
require('./helpers/passport/config');

app.use('/auth', routes.auth);
app.use(passport.session());
app.use((req, res, next) => {
  if (!req.user)
    return next(
      new Sperror(
        'Unauthorized',
        'Authentication is needed to access this data.',
        401
      )
    );
  next();
});
app.use('/users', routes.user);
app.use('/posts', routes.post);

app.use((req, res, next) => {
  next(new Sperror('Not Found', "Couldn't found requested resource.", 404));
});

app.use((err, req, res, next) => {
  err instanceof Sperror
    ? res.status(err.statusCode).json({ error: err })
    : res.status(500).json({
        error: new Sperror(
          'Server error',
          'The server encountered an unexpected error.',
          500
        ),
      });
});

app.listen(process.env.PORT, () =>
  console.log(`App listening on PORT ${process.env.PORT}`)
);
