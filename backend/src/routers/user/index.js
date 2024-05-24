const { updateUser } = require("@controller/v1/user");

const userRoutes = (router) => {
  router.patch("/user", updateUser);
};

module.exports = userRoutes;
