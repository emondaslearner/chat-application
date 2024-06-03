const { editMessage: editMessageLib } = require("@lib/v1/message");

const editMessage = async (req, res, next) => {
  try {
    const message = await editMessageLib({
      id: req.params.id,
      userId: req.user.id,
      message: req.body?.message,
    });

    const response = {
      code: 200,
      message: "message updated successfully",
      data: message,
      self: req.url,
    };

    res.status(response.code).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = editMessage;
