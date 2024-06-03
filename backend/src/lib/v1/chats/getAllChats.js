const Friend = require("@models/Friend");
const { error, functions } = require("@utils");
const { getDataFromRedis } = require("@third-party/redis");

const getAllChats = async ({ filterData, userId }) => {
  if (!userId) {
    throw error.badRequest("userId:userId is missing");
  }

  const sortStr = `${filterData.sortType === "dsc" ? "-" : ""}${
    filterData.sortBy
  }`;
  const filter = {
    $or: [{ first_user: userId }, { second_user: userId }],
  };

  const getChants = async () => {
    return await Friend.find(filter)
      .populate(
        "first_user",
        "name profile_picture unread_message_count chat_status status"
      )
      .sort(sortStr)
      .skip(filterData.page * filterData.limit - filterData.limit)
      .limit(filterData.limit);
  };

  // check in redis
  const serializedFilterData = JSON.stringify(filterData);
  const keyPrefix = "chats:";
  const key = `${keyPrefix}${serializedFilterData}${userId}`;

  const chats = await getDataFromRedis(key, getChants);

  const counts = await functions.countEntities(Friend, filter);

  return { chats, counts };
};

module.exports = getAllChats;
