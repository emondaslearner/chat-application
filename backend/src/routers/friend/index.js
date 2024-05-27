const { addFriend, deleteFriend, blockFriend } = require("@controller/v1/friends");

const friendRoutes = (router, authenticate) => {
  router
    .route("/user/friend")
    .post(authenticate, addFriend)
    .delete(authenticate, deleteFriend)
    .patch(authenticate, blockFriend);
};

module.exports = friendRoutes;
