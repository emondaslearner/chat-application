const sentMessage = require("./sentMessage");
const { editMessage, seenMessage } = require("./editMessage");
const deleteMessage = require("./deleteMessage");
const getChatMessages = require("./getChatMessages");
const getAllMessage = require("./getAllUserMessages");

module.exports = {
  sentMessage,
  editMessage,
  deleteMessage,
  getChatMessages,
  getAllMessage,
  seenMessage,
};
