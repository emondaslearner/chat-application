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

  const isExist = await Friend.findOne({
    $or: [
      { first_user: userId, second_user: friendId },
      { first_user: friendId, second_user: userId },
    ],
  });

  if (isExist) {
    throw error.badRequest("Friend already exist");
  }

  const friendData = new Friend({
    first_user: userId,
    second_user: friendId,
  });

  await friendData.save();

  deleteKeysWithPrefix('friend:');

  return friendData;
};

module.exports = addFriend;
