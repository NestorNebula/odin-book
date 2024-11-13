const prisma = require('../../models/queries');

const getAllUsers = async (req, res) => {
  let users = [];
  if (req.query.omit) {
    users = await prisma.findNonFollowedUsers(
      req.user.id,
      !isNaN(+req.query.limit) ? +req.query.limit : 100
    );
  } else if (req.query.search) {
    users = await prisma.findUsersBySearch(
      req.query.search,
      !isNaN(+req.query.limit) ? +req.query.limit : 100
    );
  } else {
    users = await prisma.findUsers(
      !isNaN(+req.query.limit) ? +req.query.limit : 100
    );
  }
  res.json({ users });
};

module.exports = getAllUsers;
