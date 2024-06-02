const { error } = require("@utils");
const path = require("path");
const { Worker } = require("worker_threads");
const Post = require("@models/Post");

const worker_threads = new Worker(
  path.join(__dirname, "../../../", "worker", "index.js")
);

const updatePost = async ({ userId, postId, updateData }) => {
  if (!userId || !postId) {
    throw error.badRequest(
      `${!userId && "userId:userId not provided"}|${
        !postId && "postId:postId not provided"
      }`
    );
  }

  const { title, color, photo, video } = updateData;
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

  const isExist = await Post.findOne({ _id: postId });

  if (!isExist) {
    throw error.notFound();
  }

  const data = {
    title,
    color,
    photo,
    video,
    userId,
    postId,
  };

  worker_threads.postMessage({
    status: "updatePost",
    data: JSON.stringify(data),
  });

  return true;
};

// send update to user via socket
worker_threads.on("message", (message) => {
  if (message.userId && message.status === "updatePost") {
    global.io.to(message.userId).emit("postUploaded", message);
  }
});

module.exports = updatePost;
