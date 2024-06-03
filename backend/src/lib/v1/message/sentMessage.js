const Message = require("@models/Message");
const { error } = require("@utils");
const { Worker } = require("worker_threads");

const worker_threads = new Worker(
  path.join(__dirname, "../../../", "worker", "index.js")
);

function separateFiles(files) {
  const videoExtensions = [".mp4", ".mkv", ".avi", ".mov"];
  const pictureExtensions = [".jpg", ".jpeg", ".png", ".gif"];

  const videos = [];
  const pictures = [];

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if (videoExtensions.includes(ext)) {
      videos.push(file);
    } else if (pictureExtensions.includes(ext)) {
      pictures.push(file);
    }
  });

  return { videos, pictures };
}

const sentMessage = async ({ userId, sentTo, replied, message, file }) => {
  if (!userId || !sentTo) {
    throw error.badRequest(
      `${!userId && "userId:userId is missing"}|${
        !sentTo && "sentTo:sentTo is missing"
      }`
    );
  }

  if (!message && !file.length) {
    throw error.badRequest("message:message is missing");
  }

  if (file.length) {

  } else {
    const message = await Message({
      sent_to: sentTo,
      message,
      sent_by: userId,
      replied: replied ? replied : null,
    });

    await message.save();

    return message;
  }
};

module.exports = sentMessage;
