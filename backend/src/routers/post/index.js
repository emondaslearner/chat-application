const {
  addPost,
  deletePost,
  updatePost,
  getPosts,
} = require("@controller/v1/post");
const { addOrCancelReaction } = require("@controller/v1/reaction");
const multer = require("multer");

// multer upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/");
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, originalName);
  },
});

const upload = multer({ storage: storage });

const uploadFields = upload.fields([
  { name: "photo", maxCount: 10 },
  { name: "video", maxCount: 5 },
]);

const postRoutes = async (router, authenticate) => {
  router
    .route("/user/posts")
    .post([authenticate, uploadFields], addPost)
    .get(authenticate, getPosts);

  router
    .route("/user/post/:id")
    .delete(authenticate, deletePost)
    .patch([authenticate, uploadFields], updatePost);

  router.post("/user/post/:id/reaction", authenticate, addOrCancelReaction);
};

module.exports = postRoutes;
