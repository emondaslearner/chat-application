const { error } = require("@utils");
const path = require("path");
const { Worker } = require("worker_threads");
const { deleteKeysWithPrefix } = require("@third-party/redis");

const worker_threads = new Worker(
  path.join(__dirname, "../../../", "worker", "index.js")
);

const addPost = async ({ title, color, photo, video, userId }) => {
  if (color && !title) {
    throw error.badRequest(
      "title:When you provide color then you must have to pass title"
    );
  }

  if (color && title && photo.length) {
    throw error.badRequest(
      "photo:When you provide color then you can not pass photo"
    );
  }

  if (color && title && video.length) {
    throw error.badRequest(
      "photo:When you provide color then you can not pass video"
    );
  }

  const data = {
    title,
    color,
    photo,
    video,
    userId,
  };

  worker_threads.postMessage({
    status: "addPost",
    data: JSON.stringify(data),
  });

  deleteKeysWithPrefix("posts:");

  return true;
};

// send update to user via socket
worker_threads.on("message", (message) => {
  if (message.userId && message.status === "addPost") {
    global.io.to(message.userId).emit("postUploaded", message);
  }
});

module.exports = addPost;
