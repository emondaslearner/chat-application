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
    $and: [
      { $or: [{ first_user: userId }, { second_user: userId }] },
      { chat_deleted_for: { $nin: [userId] } },
    ],
  };


  if (filterData.filter === "unread") {
    filter.$and.push({ unread_message_count: { $ne: 0 } });
  }

  const getChants = async () => {
    const chats = await Friend.find(filter)
      .sort(sortStr)
      .skip(filterData.page * filterData.limit - filterData.limit)
      .limit(filterData.limit);

    // Conditionally populate the fields
    const populatedChats = await Promise.all(
      chats.map(async (chat) => {
        if (chat.first_user.toString() === userId.toString()) {
          await chat.populate(
            "second_user",
            "name profile_picture unread_message_count status"
          );
        } else {
          await chat.populate(
            "first_user",
            "name profile_picture unread_message_count status"
          );
        }
        return chat;
      })
    );

    return populatedChats;
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
