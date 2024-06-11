const { getAllChats, deleteChat } = require("@controller/v1/chats");

const chatsRoutes = (router, authenticate) => {
  router.get("/user/chats", authenticate, getAllChats);
  router.delete("/user/:id/chat", authenticate, deleteChat);
};

module.exports = chatsRoutes;
