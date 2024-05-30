const { acceptRequest } = require("@controller/v1/friendRequest");

const friendRequestRoutes = (router, authenticate) => {
  router.route("/user/friend-request").post(authenticate, acceptRequest);
};

module.exports = friendRequestRoutes;
