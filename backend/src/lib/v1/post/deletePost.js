const Post = require("@models/Post");
const { error } = require("@utils");

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

  return true;
};

module.exports = deletePost;
