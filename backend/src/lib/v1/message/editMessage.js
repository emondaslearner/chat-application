const Message = require("@models/Message");
const { error } = require("@utils");
const { deleteKeysWithPrefix } = require("@third-party/redis");

const editMessage = async ({ message, userId, id }) => {
  if (!message && !userId) {
    throw error.badRequest(
      `${!message && "message:message is missing"}|${
        !userId && "userId:userId is missing"
      }`
    );
  }

  const messageData = await Message.findOne({ _id: id, sent_by: userId });

  if (!messageData) {
    throw error.notFound();
  }

  messageData.message = message;

  await messageData.save();

  io.to(userId).emit("editMessage", {
    id: userId,
    message,
  });

  deleteKeysWithPrefix("messages:");
  return messageData;
};

const seenMessage = async ({ userId, id }) => {
  await Message.update(
    { sent_by: id, sent_to: userId, status: "delivered" },
    { status: "seen" }
  );
  deleteKeysWithPrefix("messages:");

  return "updated";
};

module.exports = { seenMessage, editMessage };
