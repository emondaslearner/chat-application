const User = require("@models/User");
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

  const getUsers = async () => {
    return await User.find(filter)
      .select("name profile_picture")
      .sort(sortStr)
      .skip(filterData.page * filterData.limit - filterData.limit)
      .limit(filterData.limit);
  };

  // check in redis
  const serializedFilterData = JSON.stringify(filterData);
  const keyPrefix = "users:";
  const key = `${keyPrefix}${serializedFilterData}${userId}`;

  const users = await getDataFromRedis(key, getUsers);

  const counts = await functions.countEntities(User, filter);

  return { users, counts };
};

module.exports = getAllUser;
