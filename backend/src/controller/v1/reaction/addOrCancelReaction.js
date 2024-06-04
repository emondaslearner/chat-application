const {
  addOrCancelReaction: addOrCancelReactionLib,
} = require("@lib/v1/reaction");

const addOrCancelReaction = async (req, res, next) => {
  try {

    const post = await addOrCancelReactionLib({
      postId: req.params.id,
      userId: req.user.id,
      reaction: req.body?.reaction,
    });

    const response = {
      code: post === 'added' ? 201 : 200,
      message: `${post} reaction successfully`,
      self: req.url,
    };

    res.status(response.code).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = addOrCancelReaction;
