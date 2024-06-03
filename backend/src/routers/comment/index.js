const { addComment, deleteComment } = require("@controller/v1/comment");

const commentRoutes = (router, authenticate) => {
  router.post("/user/comments", authenticate, addComment);
  router.delete("/user/comment/:id", authenticate, deleteComment);
};

module.exports = commentRoutes;
