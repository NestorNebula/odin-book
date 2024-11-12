const express = require('express');
const app = express();
require('dotenv').config();
const Sperror = require('sperror');
const routes = require('./routes/routes');

app.use('/auth', routes.auth);
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
