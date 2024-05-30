const { addPost } = require("@controller/v1/post");
const multer = require("multer");

// multer upload
const upload = multer({ dest: "./src/uploads/" });

const uploadFields = upload.fields([
  { name: "photo", maxCount: 10 },
  { name: "video", maxCount: 5 },
]);

const postRoutes = async (router, authenticate) => {
  router.route("/user/posts").post([authenticate, uploadFields], addPost);
};

module.exports = postRoutes;
