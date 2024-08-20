const Message = require("@models/Message");
const { deleteKeysWithPrefix } = require("@third-party/redis");

const seenMessage = async ({ userId, id }) => {
  await Message.updateMany(
    { sent_by: id, sent_to: userId, status: "delivered" },
    { status: "seen" }
  );
  deleteKeysWithPrefix("messages:");

  return "updated";
};

module.exports = seenMessage;
