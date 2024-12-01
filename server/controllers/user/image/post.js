const prisma = require('../../../models/queries');
const Sperror = require('sperror');
const { uploadFile } = require('../../../helpers/supabase.js');
const crypto = require('node:crypto');

const postImage = async (req, res, next) => {
  if (req.user.id !== +req.params.userId) {
    return next(
      new Sperror('Forbidden', "You can't upload a file for someone else.", 403)
    );
  }
  const user = await prisma.findUserById(+req.params.userId);
  if (!user) {
    return next(new Sperror('Bad Request', "The user doesn't exist.", 400));
  }
  if (!req.body.file || !req.body.fileName) {
    return next(
      new Sperror('Bad Request', 'Please provide a file and a file name.', 400)
    );
  }
  const types = ['avatars', 'backgrounds', 'photos'];
  if (!types.includes(req.body.type)) {
    return next(
      new Sperror('Bad Request', 'Please provide a correct file type.', 400)
    );
  }

  const fileNameSplit = req.body.fileName.split('.');
  const contentType = fileNameSplit.pop();
  const fileName = fileNameSplit.join('-');

  const { link, error } = await uploadFile(
    req.body.file,
    contentType,
    `${req.body.type}/${fileName}-${user.username}-${crypto
      .randomBytes(10)
      .toString('hex')}`
  );
  if (error) {
    return next(
      new Sperror('Server Error', 'Error when uploading image.', 500)
    );
  }
  res.json({ url: link });
};

module.exports = postImage;
