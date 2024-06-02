const { addComment } = require("@controller/v1/comment");

const commentRoutes = (router, authenticate) => {
  router.post("/user/comments", authenticate, addComment);
};

module.exports = commentRoutes;
