const {
  addFriend,
  deleteFriend,
  blockFriend,
  getSingleFriend,
  getAllFriend,
} = require("@controller/v1/friends");

const friendRoutes = (router, authenticate) => {
  router
    .route("/user/friend")
    .post(authenticate, addFriend)
    .delete(authenticate, deleteFriend)
    .patch(authenticate, blockFriend)
    .get(authenticate, getSingleFriend);

  router.get("/user/friends", authenticate, getAllFriend);
};

module.exports = friendRoutes;
