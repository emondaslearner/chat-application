const { addFriend } = require("@controller/v1/friends");

const friendRoutes = (router, authenticate) => {
  router.post("/user/add-friend", authenticate, addFriend);
};

module.exports = friendRoutes;
