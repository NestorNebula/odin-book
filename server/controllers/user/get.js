const prisma = require('../../models/queries');
const Sperror = require('sperror');

const getUser = async (req, res, next) => {
  const user = await prisma.findUserById(+req.params.userId);
  if (!user) {
    return next(new Sperror('Not Found', "This user doesn't exist.", 404));
  }
  res.json({ user });
};

module.exports = getUser;
