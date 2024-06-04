const { addReaction: addReactionLib } = require("@lib/v1/reaction");

const addReaction = async (req, res, next) => {
  try {
    const post = await addReactionLib({
      postId: req.params.id,
      userId: req.user.id,
      reaction: req.body?.reaction,
    });

    const response = {
      code: 201,
      message: "added reaction successfully",
      data: post,
      self: req.url,
    };

    res.status(response.code).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = addReaction;
