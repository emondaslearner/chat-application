const { getUser: getUserLib } = require("@lib/v1/user");

const getUser = async (req, res, next) => {
  const id = req.user.id;

  const userData = await getUserLib(id);

  const responseData = {
    code: 200,
    message: "User data fetched successfully",
    data: userData,
    self: req.url,
  };

  res.status(200).json(responseData);
};

module.exports = getUser;
