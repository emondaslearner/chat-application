const { deleteMessage: deleteMessageLib } = require("@lib/v1/message");

const deleteMessage = async (req, res, next) => {
  try {
    await deleteMessageLib({
      status: req.query?.status,
      id: req.params.id,
      userId: req.user.id,
    });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = deleteMessage;
