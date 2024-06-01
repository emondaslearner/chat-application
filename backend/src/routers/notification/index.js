const { saveToken } = require("@controller/v1/notification");

const notificationRoutes = async (router, authenticate) => {
  router.post("/user/notification", authenticate, saveToken);
};

module.exports = notificationRoutes;
