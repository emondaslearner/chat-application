const Reaction = require("@models/Reaction");
const Post = require("@models/Post");
const { error } = require("@utils");
const { deleteKeysWithPrefix } = require("@third-party/redis");
const { sentMessageToTopic } = require("@third-party/firebase");

const addOrCancelReaction = async ({ userId, postId, reaction }) => {
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

  const reactionOb = await Reaction.findOne({
    post: postId,
    given_by: userId,
  });

  // reaction count
  let reactionCount = post.reactionCount;

  deleteKeysWithPrefix("posts:");

  if (reactionOb?.reaction === reaction && reactionOb) {
    const list = [...post.reactions];

    const index = list.indexOf(reactionOb._id);

    list.splice(index, 1);

    post.reactions = list;
    await post.save();

    await Reaction.deleteOne({
      post: postId,
      given_by: userId,
    });

    reactionCount--;

    return "deleted";
  } else if (reactionOb?.reaction !== reaction && reactionOb) {
    reactionOb.reaction = reaction;

    await reactionOb.save();
    return "updated";
  }

  sentMessageToTopic({
    topic: post.user,
    title: `A friend reacted to your post`,
    body: `A friend reacted to your post. post title is ${post.title}`,
  });

  reactionCount++;

  const reactionData = await Reaction({
    reaction,
    post: postId,
    given_by: userId,
  });

  await reactionData.save();

  post.reactions = [...post.reactions, reactionData._id];
  post.reactionCount = reactionCount;

  await post.save();

  return "added";
};

module.exports = addOrCancelReaction;
