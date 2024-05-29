const Friend = require("@models/Friend");
const { error } = require("@utils");
const countDocument = require("./count");

const getAllFriend = async ({
  userId,
  filterData = {
    search: "",
    sortBy: "updatedAt",
    sortType: "dsc",
    page: 1,
    limit: 10,
  },
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;

  if (!userId) {
    throw error.badRequest("userId:userId not provided");
  }

  const query = {
    $and: [{ $or: [{ first_user: userId }, { second_user: userId }] }, filter],
  };

  const allFriends = await Friend.find(query)
    .populate({ path: "first_user", select: "name profile_picture" })
    .populate({ path: "second_user", select: "name profile_picture" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  const totalCount = await countDocument(query);

  return { count: totalCount, allFriends };
};

module.exports = getAllFriend;
