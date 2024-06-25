const {
  acceptRequest,
  deleteRequest,
  findAllRequest,
  getSingleRequest,
} = require("@controller/v1/friendRequest");

const friendRequestRoutes = (router, authenticate) => {
  router
    .route("/user/friend-requests")
    .post(authenticate, acceptRequest)
    .get(authenticate, findAllRequest);
  router.route("/user/friend-request/:id").delete(authenticate, deleteRequest);

  router.route("/user/friend-request").get(authenticate, getSingleRequest);
};

module.exports = friendRequestRoutes;
