const {
  acceptRequest,
  deleteRequest,
  findAllRequest
} = require("@controller/v1/friendRequest");

const friendRequestRoutes = (router, authenticate) => {
  router
    .route("/user/friend-request")
    .post(authenticate, acceptRequest)
    .get(authenticate, findAllRequest);
  router.delete("/user/friend-request/:id", authenticate, deleteRequest);
};

module.exports = friendRequestRoutes;
