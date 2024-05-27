const { getAllFriend: getAllFriendLib } = require("@lib/v1/friends");

const getAllFriend = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allFriend = await getAllFriendLib({ userId });

    const filterData = {};

    const response = {
      code: 200,
      message: "Fetched friend successfully",
      data: allFriend,
      self: req.url,
      links: {
        friend: "/user/friend",
      },
    };

    res.status(response.code).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = getAllFriend;
