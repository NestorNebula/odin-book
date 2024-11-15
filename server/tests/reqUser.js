const setReqUser = (app, data) => {
  app.use(async (req, res, next) => {
    const user = data.users[0];
    req.user = { id: user.id };
    next();
  });
};

module.exports = { setReqUser };
