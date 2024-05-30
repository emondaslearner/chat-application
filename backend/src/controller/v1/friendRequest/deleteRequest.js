const { deleteRequest: deleteRequestLib } = require("@lib/v1/friendRequest");

const deleteRequest = async (req, res, next) => {
  try {
    await deleteRequestLib({
      userId: req.user.id,
      friendId: req.query?.friendId,
    });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = deleteRequest;
