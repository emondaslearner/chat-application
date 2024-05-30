const FriendRequest = require("@models/FriendRequest");
const Friend = require("@models/Friend");
const { error } = require("@utils");
const { deleteKeysWithPrefix } = require("@third-party/redis");

const addFriend = async ({ friendId, userId }) => {
  if (!friendId) {
    throw error.badRequest("friendId:friendId not provided");
  }

  if (friendId === userId) {
    throw error.badRequest("userId and friendId should not be same");
  }

  const isExist = await FriendRequest.findOne({
    sent_to: friendId,
    sent_by: userId,
  });

  if (isExist) {
    throw error.badRequest("Friend already exist");
  }

  const friendData = new FriendRequest({
    sent_to: friendId,
    sent_by: userId,
  });

  await friendData.save();

  return friendData;
};

module.exports = addFriend;
