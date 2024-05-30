const FriendRequest = require("@models/FriendRequest");
const Friend = require("@models/Friend");
const { error } = require("@utils");
const { deleteKeysWithPrefix } = require("@third-party/redis");

const acceptRequest = async ({ userId, friendId }) => {
  if (!userId || !friendId) {
    throw error.badRequest("id:id not provided");
  }

  if (userId === friendId) {
    throw error.badRequest("userId and friendId should not be same");
  }

  const data = await FriendRequest.findOne({
    sent_by: friendId,
    sent_to: userId,
  });

  if (!data) {
    throw error.notFound();
  }

  const friendData = new Friend({
    first_user: userId,
    second_user: friendId,
  });

  await friendData.save();

  await Friend.findOneAndDelete({
    send_by: friendId,
    send_to: userId,
  });

  deleteKeysWithPrefix('friend:');
  return friendData;
};

module.exports = acceptRequest;
