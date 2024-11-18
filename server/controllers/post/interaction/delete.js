const prisma = require('../../../models/queries');
const Sperror = require('sperror');

const deleteInteraction = async (req, res, next) => {
  const interactionsType = ['LIKE', 'REPOST', 'BOOKMARK'];
  if (!interactionsType.includes(req.body.type)) {
    return next(
      new Sperror(
        'Bad Request',
        'Please provide an existing interaction type',
        400
      )
    );
  }
  const interactions = await prisma.findInteractions(
    req.user.id,
    req.body.type
  );
  if (
    interactions.some(
      (interaction) => interaction.postId === +req.params.postId
    )
  ) {
    const interaction = await prisma.deleteInteraction(
      +req.params.postId,
      req.user.id,
      req.body.type
    );
    return res.json({ interaction });
  } else {
    res.json({ interaction: null });
  }
};

module.exports = deleteInteraction;
