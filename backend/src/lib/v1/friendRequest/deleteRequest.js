const FriendRequest = require("@models/FriendRequest");
const { error } = require("@utils");

const deleteRequest = async ({ userId, friendId }) => {
  if (!userId || !friendId) {
    throw error.badRequest("id:id not provided");
  }

  if (userId === friendId) {
    throw error.badRequest("userId and friendId should not be same");
  }

  const gotData = await FriendRequest.findOne({
    sent_by: friendId,
    sent_to: userId,
  });

  if (!gotData) {
    throw error.notFound();
  }

  const data = await FriendRequest.findOneAndDelete({
    sent_by: friendId,
    sent_to: userId,
  });

  return data;
};

module.exports = deleteRequest;
