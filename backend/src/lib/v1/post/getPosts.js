const { error, functions } = require("@utils");
const Posts = require("@models/Post");
const Friend = require("@models/Friend");
const lodash = require("lodash");

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

  let friendsIds = friends.map((friend) =>
    friend.first_user._id === userId
      ? friend.second_user._id
      : friend.first_user._id
  );

  friendsIds = [...friendsIds, userId];

  // const allFriendsStringify = await getDataFromRedis(
  //   `userFriends:${userId}`,
  //   () => friendsIds,
  //   86400
  // );

  // const allFriends = allFriendsStringify

  const sortStr = `${filterData.sortType === "dsc" ? "-" : ""}${
    filterData.sortBy
  }`;

  const posts = await Posts.find({ user: { $in: friendsIds } })
    .populate("photos", "photo")
    .populate("videos", "video")
    .sort(sortStr)
    .skip(filterData.page * filterData.limit - filterData.limit)
    .limit(filterData.limit)
    .exec();

  const shufflePosts = lodash.shuffle(posts);

  const counts = await functions.countEntities(Posts, {
    user: { $in: friendsIds },
  });

  return { posts: shufflePosts, counts };
};

module.exports = getPosts;
