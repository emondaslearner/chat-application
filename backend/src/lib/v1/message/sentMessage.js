const Message = require("@models/Message");
const Friend = require("@models/Friend");
const { error } = require("@utils");
const { Worker } = require("worker_threads");
const path = require("path");
const { deleteKeysWithPrefix } = require("@third-party/redis");

const worker_threads = new Worker(
  path.join(__dirname, "../../../", "worker", "index.js")
);

const chatIfMessageToDeletedUser = async (sentTo, userId) => {
  const filter = {
    $or: [
      { first_user: sentTo, second_user: userId },
      { first_user: userId, second_user: sentTo },
    ],
  };

  const user = await Friend.findOne(filter);

  if (user) {
    const data = user.chat_deleted_for;
    const index = data.indexOf(userId);

    if (index !== -1) {
      data.splice(index, 1);
    }

    user.chat_deleted_for = data;

    await user.save();
  }
};

const sentMessage = async ({ userId, sentTo, replied, message, files }) => {
  if (!userId || !sentTo) {
    throw error.badRequest(
      `${!userId && "userId:userId is missing"}|${
        !sentTo && "sentTo:sentTo is missing"
      }`
    );
  }

  if (!message && !files.length) {
    throw error.badRequest("message:message is missing");
  }

  if (files.length) {
    worker_threads.postMessage({
      status: "uploadFileOnMessage",
      data: JSON.stringify({ sentTo, message, userId, replied, files }),
    });
  } else {
    const messageData = await Message({
      sent_to: sentTo,
      message,
      sent_by: userId,
      replied: replied ? replied : null,
    });

    await messageData.save();
    deleteKeysWithPrefix("messages:");
    deleteKeysWithPrefix("chats:");

    chatIfMessageToDeletedUser(sentTo, userId);

    return messageData;
  }
};

// send update to user via socket
worker_threads.on("message", (message) => {
  if (message.userId && message.status === "addMessage") {
    global.io.to(message.userId).emit("addMessage", message);
  }
});

module.exports = sentMessage;
