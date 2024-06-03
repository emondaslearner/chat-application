const { getAllChats } = require("@controller/v1/chats");

const chatsRoutes = (router, authenticate) => {
  router.get("/user/chats", authenticate, getAllChats);
};

module.exports = chatsRoutes;
