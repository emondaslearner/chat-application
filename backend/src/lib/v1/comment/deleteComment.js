const Comment = require("@models/Comment");
const Post = require('@models/Post')
const { error } = require("@utils");
const { deleteKeysWithPrefix } = require("@third-party/redis");

const deleteComment = async ({ id, userId }) => {
  if (!id || !userId) {
    throw error.badRequest(
      `${!id && "id:id is missing"}|${!userId && "userId:userId is missing"}`
    );
  }

  const comment = await Comment.findOne({
    _id: id,
    send_by: userId,
  });

  if (!comment) {
    throw error.notFound();
  }

  deleteKeysWithPrefix('comments:');

  return true;
};

module.exports = deleteComment;
