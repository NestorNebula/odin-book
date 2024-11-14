const prisma = require('../models/queries');

const setReqUser = (app, data) => {
  app.use(async (req, res, next) => {
    const user = await getReqUser(data);
    req.user = { id: user.id };
    next();
  });
};

const getReqUser = async (data) => {
  const user = await prisma.__findFullUserByUsername(data.users[0].username);
  return user;
};

module.exports = { setReqUser, getReqUser };
