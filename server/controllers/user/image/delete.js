const prisma = require('../../../models/queries');
const Sperror = require('sperror');
const { deleteFile } = require('../../../helpers/supabase');

const deleteImage = async (req, res, next) => {
  const user = await prisma.findUserById(+req.params.userId);
  if (!user) {
    return next(new Sperror('Bad Request', "The user doesn't exist.", 400));
  }
  if (
    req.user.id !== +req.params.userId ||
    !req.body.url.includes(user.username)
  ) {
    return next(
      new Sperror('Forbidden', "You can't delete other user's file.", 403)
    );
  }
  const types = ['avatars', 'backgrounds', 'photos'];
  if (!types.includes(req.body.type)) {
    return next(
      new Sperror('Bad Request', 'Please provide a correct file type.', 400)
    );
  }
  const path = `${req.body.type}${req.body.url.split(req.body.type)[1]}`;
  const { success } = await deleteFile(path);
  return success ? res.sendStatus(200) : res.sendStatus(500);
};

module.exports = deleteImage;
