const { deleteChat: deleteChatLib } = require("@lib/v1/chats");

const deleteChat = async (req, res, next) => {
  try {
    await deleteChatLib({
      chatId: req.params.id,
      userId: req.user.id,
    });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = deleteChat;
