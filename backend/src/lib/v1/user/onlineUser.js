const User = require("@models/User");
const { functions } = require("@utils");

const getAllOnlineUser = async ({ userId, filterData }) => {
  const filter = { status: "online", _id: { $ne: userId } };

  const sortStr = `${filterData.sortType === "dsc" ? "-" : ""}${
    filterData.sortBy
  }`;

  const users = await User.find(filter)
    .sort(sortStr)
    .skip(filterData.page * filterData.limit - filterData.limit)
    .limit(filterData.limit);

  const counts = await functions.countEntities(User, filter);

  return { users, counts };
};

module.exports = getAllOnlineUser;
