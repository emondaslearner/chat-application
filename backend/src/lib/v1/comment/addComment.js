const Comment = require("@models/Comment");
const Post = require("@models/Post");
const { error } = require("@utils");
const { deleteKeysWithPrefix } = require("@third-party/redis");
const { sentMessageToTopic } = require("@third-party/firebase");

const addComment = async ({ body, userId, postId }) => {
  if (!body || !userId || !postId) {
    throw error.badRequest(
      `${!body && "body:body is missing"}|${
        !userId && "userId:userId not provided"
      }|${postId && "postId:postId is missing"}`
    );
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw error.notFound();
  }

  const comment = new Comment({
    body,
    post: postId,
    send_by: userId,
  });

  await comment.save();

  sentMessageToTopic({
    topic: post.user,
    title: `Got new comment on a post`,
    body: `A friend did a comment to your post. post title is ${post.title}`,
  });

  deleteKeysWithPrefix("comments:");
  return comment;
};

module.exports = addComment;
