const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});
require('dotenv').config();
const Sperror = require('sperror');
const routes = require('./routes/routes');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cookieSession({
    secret: process.env.COOKIE_SECRET,
    secureProxy: true,
    sameSite: 'none',
    partitioned: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
    cookie: {
      secure: true,
      httpOnly: true,
      path: '/',
    },
  })
);
app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});
require('./helpers/passport/config');

app.use(passport.session());
app.use('/auth', routes.auth);

app.use((req, res, next) => {
  if (!req.user)
    return next(
      new Sperror(
        'Unauthorized',
        'Authentication is needed to access this data.',
        401
      )
    );
  io.on('connection', (socket) => {
    socket.join(req.user.id);
  });
  req.io = io;
  next();
});
app.use('/users', routes.user);
app.use('/posts', routes.post);

app.use((req, res, next) => {
  next(new Sperror('Not Found', "Couldn't found requested resource.", 404));
});

app.use((err, req, res, next) => {
  if (err.name === 'AuthenticationError') {
    return next(
      new Sperror(
        'Authentication Error',
        'Incorrect Username/Email or Password.',
        401
      )
    );
  }
  return next(err);
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

httpServer.listen(process.env.PORT, () =>
  console.log(`App listening on PORT ${process.env.PORT}`)
);
