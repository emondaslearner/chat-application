const Friend = require("@models/Friend");
const { error } = require("@utils");

const getAllFriend = async ({ userId }) => {
  if (!userId) {
    throw error.badRequest("userId:userId not provided");
  }

  const allFriends = await Friend.find({
    $or: [{ first_user: userId }, { second_user: userId }],
  });

  return allFriends;
};

module.exports = getAllFriend;
