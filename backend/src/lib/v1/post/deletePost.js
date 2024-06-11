const Post = require("@models/Post");
const { error } = require("@utils");
const { deleteKeysWithPrefix } = require("@third-party/redis");

const deletePost = async ({ userId, postId }) => {
  if (!userId || !postId) {
    throw error.badRequest(
      `${!userId && "userId:userId not provided"}|${
        postId && "postId:postId not provided"
      }`
    );
  }

  const post = await Post.findOne({ _id: postId, user: userId });

  if (!post) {
    throw error.notFound();
  }

  await Post.findOneAndDelete({ _id: postId });
  deleteKeysWithPrefix("posts:");
  return true;
};

module.exports = deletePost;
