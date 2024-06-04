const Reaction = require("@models/Reaction");
const Post = require("@models/Post");
const { error } = require("@utils");

const addReaction = async ({ userId, postId, reaction }) => {
  if (!userId || !postId || !reaction) {
    throw error.badRequest(
      `${!userId && "userId:userId is missing"}|${
        !postId && "postId:postId is missing"
      }|${!reaction && "reaction:reaction is missing"}`
    );
  }

  const reactionTypes = ["like", "love", "care", "haha", "angry", "sad", "wow"];

  if (!reactionTypes.includes(reaction)) {
    throw error.badRequest("reaction:reaction is not valid");
  }

  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw error.notFound("Post not found");
  }

  const reactionData = await Reaction({
    reaction,
    post: postId,
    given_by: userId,
  });

  await reactionData.save();

  post.reactions = [...post.reactions, reactionData._id];

  await post.save();

  return post;
};

module.exports = addReaction;
