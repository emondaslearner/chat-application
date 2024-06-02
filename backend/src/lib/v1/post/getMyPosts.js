const Post = require("@models/Post");
const Video = require("@models/Video");
const Photo = require("@models/Photo");
const { error } = require("@utils");
const { getDataFromRedis } = require("@third-party/redis");
const { functions } = require("@utils");

const getMyPosts = async ({ userId, filterData }) => {
  if (!userId) {
    throw error.badRequest("userId:userId not provided");
  }

  const sortStr = `${filterData.sortType === "dsc" ? "-" : ""}${
    filterData.sortBy
  }`;
  const filter = {
    title: { $regex: filterData.search, $options: "i" },
  };

  const getPosts = async () => {
    return await Post.find(filter)
      .populate({
        path: "photos",
        select: "photo",
      })
      .populate({
        path: "videos",
        select: "video",
      })
      .sort(sortStr)
      .skip(filterData.page * filterData.limit - filterData.limit)
      .limit(filterData.limit);
  };

  // check in redis
  const serializedFilterData = JSON.stringify(filterData);
  const keyPrefix = "posts:";
  const key = `${keyPrefix}${serializedFilterData}${userId}`;

  const posts = await getDataFromRedis(key, getPosts);

  const counts = await functions.countEntities(Post ,filter);

  return { posts, counts };
};

module.exports = getMyPosts;
