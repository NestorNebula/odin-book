const prisma = require('../../../models/queries');
const Sperror = require('sperror');

const getAllInteractions = async (req, res, next) => {
  if (req.user.id !== +req.params.userId) {
    return next(new Sperror('Forbidden', "Can't access this data.", 403));
  }
  if (req.query.type !== 'LIKE' && req.query.type !== 'BOOKMARK') {
    return next(
      new Sperror(
        'Invalid query argument("type")',
        'Type must be "LIKE" or "BOOKMARK"',
        400
      )
    );
  }
  const interactions = await prisma.findInteractions(
    req.user.id,
    req.query.type
  );
  res.json({ interactions });
};

module.exports = getAllInteractions;
