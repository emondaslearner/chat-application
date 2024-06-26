const { error } = require("@utils");
const Posts = require("@models/Posts");
const Friend = require("@models/Friend");
const { getDataFromRedis } = require("@third-party/redis");

const getPosts = async ({ userId, filterData }) => {
  if (!userId) {
    throw error.badRequest("userId:userId is missing");
  }

  const friendFilter = {
    $and: [
      { $or: [{ first_user: userId }, { second_user: userId }] },
      { blocked: false },
    ],
  };

  const friends = await Friend.find(friendFilter);

  const friendsIds = friends.map((friend) =>
    friend.first_user._id === userId
      ? friend.second_user._id
      : friend.first_user._id
  );

  const allFriendsStringify = await getDataFromRedis(
    `userFriends:${userId}`,
    () => friendsIds,
    86400
  );

  const sortStr = `${filterData.sortType === "dsc" ? "-" : ""}${
    filterData.sortBy
  }`;

  const allFriends = JSON.parse(allFriendsStringify);

  const posts = Posts.find({ user: { $in: allFriends } })
    .sort(sortStr)
    .skip(filterData.page * filterData.limit - filterData.limit)
    .limit(filterData.limit);

  return posts;
};

module.exports = getPosts;
