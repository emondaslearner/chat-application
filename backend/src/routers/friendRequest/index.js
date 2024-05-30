const {
  acceptRequest,
  deleteRequest,
  findAllRequest
} = require("@controller/v1/friendRequest");

const friendRequestRoutes = (router, authenticate) => {
  router
    .route("/user/friend-request")
    .post(authenticate, acceptRequest)
    .delete(authenticate, deleteRequest)
    .get(authenticate, findAllRequest);
};

module.exports = friendRequestRoutes;
