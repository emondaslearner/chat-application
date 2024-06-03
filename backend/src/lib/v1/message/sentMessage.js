const Message = require("@models/Message");
const { error } = require("@utils");
const { Worker } = require("worker_threads");
const path = require("path");

const worker_threads = new Worker(
  path.join(__dirname, "../../../", "worker", "index.js")
);

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
