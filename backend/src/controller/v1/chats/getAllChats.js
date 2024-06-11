const { getAllChats: getAllChatsLib } = require("@lib/v1/chats");
const { functions } = require("@utils");

const getAllChats = async (req, res, next) => {
  try {
    const filterData = {
      filter: req.query?.filter ? req.query?.filter : "",
      search: req.query?.search ? req.query?.search : "",
      sortBy: req.query?.sortBy ? req.query?.sortBy : "updatedAt",
      sortType: req.query?.sortType ? req.query?.sortType : "dsc",
      page: req.query?.page ? parseInt(req.query?.page) : 1,
      limit: req.query?.limit ? parseInt(req.query?.limit) : 10,
    };

    const { chats, counts } = await getAllChatsLib({
      filterData,
      userId: req.user.id,
    });

    const pagination = await functions.paginationDetails({
      page: filterData.page,
      limit: filterData.limit,
      totalResources: counts,
    });

    // hateoas
    const hateoas = await functions.paginationLinks({
      path: req.path,
      page: filterData.page,
      query: {
        ...filterData,
        page: parseInt(filterData.page),
        limit: parseInt(filterData.limit),
      },
      hasPrev: !!pagination.prvPage,
      hasNext: !!pagination.nxtPage,
    });

    const response = {
      code: 200,
      message: "Successfully fetched chats",
      data: chats,
      pagination,
      self: req.url,
      links: hateoas,
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = getAllChats;
