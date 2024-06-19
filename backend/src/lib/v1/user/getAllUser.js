const User = require("@models/User");
const Friend = require("@models/Friend");
const { error, functions } = require("@utils");
const { getDataFromRedis } = require("@third-party/redis");

const getAllUser = async ({ filterData, userId }) => {
  if (!userId) {
    throw error.badRequest("userId:userId is missing");
  }

  const sortStr = `${filterData.sortType === "dsc" ? "-" : ""}${
    filterData.sortBy
  }`;

  const filter = { _id: { $ne: userId } };

  // Step 1: Retrieve users based on filter, sort, and pagination criteria
  const users = await User.find(filter)
    .select("name profile_picture")
    .sort(sortStr)
    .skip(filterData.page * filterData.limit - filterData.limit)
    .limit(filterData.limit)
    .lean(); // Use .lean() to get plain JavaScript objects instead of Mongoose documents

  // Step 2: Retrieve all friend relationships for the current user
  const friends = await Friend.find({
    $or: [{ first_user: userId }, { second_user: userId }],
  }).lean();

  // Step 3: Add the 'friend' property to each user
  const getUsers = (async = () => {
    const usersWithFriendStatus = users.map((user) => {
      const isFriend = friends.some(
        (friend) =>
          (friend.first_user.toString() === user._id.toString() ||
            friend.second_user.toString() === user._id.toString()) &&
          !friend.blocked
      );
      return {
        ...user,
        friend: isFriend,
      };
    });

    return usersWithFriendStatus;
  });

  // check in redis
  const serializedFilterData = JSON.stringify(filterData);
  const keyPrefix = "users:";
  const key = `${keyPrefix}${serializedFilterData}${userId}`;

  const usersData = await getDataFromRedis(key, getUsers);

  const counts = await functions.countEntities(User, filter);

  return { users: usersData, counts };
};

module.exports = getAllUser;
