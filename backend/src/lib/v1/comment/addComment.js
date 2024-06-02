const Comment = require("@models/Comment");
const { error } = require("@utils");

const addComment = async ({ body, userId, postId }) => {
  if (!body || !userId || !postId) {
    throw error.badRequest(
      `${!body && "body:body is missing"}|${
        !userId && "userId:userId not provided"
      }|${postId && "postId:postId is missing"}`
    );
  }

  const comment = new Comment({
    body,
    post: postId,
    send_by: userId,
  });

  await comment.save();

  return comment;
};

module.exports = addComment;
