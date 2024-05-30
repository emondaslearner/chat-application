const { getAllFriend: getAllFriendLib } = require("@lib/v1/friends");
const { functions } = require("@utils");

const getAllFriend = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const filterData = {
      search: req.query?.search ? req.query?.search : "",
      sortBy: req.query?.sortBy ? req.query?.sortBy : "updatedAt",
      sortType: req.query?.sortType ? req.query?.sortType : "dsc",
      page: req.query?.page ? parseInt(req.query?.page) : 1,
      limit: req.query?.limit ? parseInt(req.query?.limit) : 10,
    };

    const { allFriends, count } = await getAllFriendLib({ userId, filterData });

    const pagination = functions.paginationDetails({
      page: filterData.page,
      limit: filterData.limit,
      totalResources: count,
    });

    // hateoas
    const hateoas = await functions.paginationLinks({
      path: req.path,
      page: filterData.page,
      query: {
        ...req.query,
        page: parseInt(req.query.page),
        limit: parseInt(req.query.limit),
      },
      hasPrev: !!pagination.prvPage,
      hasNext: !!pagination.nxtPage,
    });

    const response = {
      code: 200,
      message: "Fetched friend successfully",
      data: allFriends,
      pagination,
      self: req.url,
      links: hateoas,
    };

    res.status(response.code).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = getAllFriend;
