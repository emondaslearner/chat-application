const Friend = require("@models/Friend");
const { error } = require("@utils");

const blockFriend = async ({ friendId, userId, block }) => {
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

  if (!isExist) {
    throw error.notFound("friend not exist");
  }

  if (block) {
    isExist.blocked = true;
    isExist.blockedBy = userId;
  } else {
    isExist.blocked = false;
    isExist.blockedBy = "";
  }

  await isExist.save();
};

module.exports = blockFriend;
