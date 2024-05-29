const { getAllFriend: getAllFriendLib } = require("@lib/v1/friends");

const getAllFriend = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const filterData = {
      search: req.query?.search,
      sortBy: req.query?.sortBy,
      sortType: req.query?.sortType,
      page: parseInt(req.query?.page),
      limit: parseInt(req.query?.limit),
    };

    const { allFriend, count } = await getAllFriendLib({ userId, filterData });

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
