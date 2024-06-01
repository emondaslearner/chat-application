const { addPost, deletePost } = require("@controller/v1/post");
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
  router.route("/user/posts").post([authenticate, uploadFields], addPost);

  router.route("/user/post/:id").delete(authenticate, deletePost);
};

module.exports = postRoutes;
