const prisma = require('../../models/queries');
const Sperror = require('sperror');

const getUser = async (req, res, next) => {
  if (isNaN(+req.params.userId)) {
    return next(new Sperror('Bad Request', 'Invalid user.', 400));
  }
  const user = await prisma.findUserById(+req.params.userId);
  if (!user) {
    return next(new Sperror('Not Found', "This user doesn't exist.", 404));
  }
  res.json({ user });
};

module.exports = getUser;
