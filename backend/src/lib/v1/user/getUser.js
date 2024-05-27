const User = require("@models/User");
const { error } = require("@utils");

const getUser = async (id) => {
  if (!id) {
    throw error.badRequest("Id is not provided");
  }

  const user = await User.findById(id).select("-password -verified");

  if (!user) {
    throw error.notFound();
  }

  return user._doc ? user._doc : user;
};

module.exports = getUser;
