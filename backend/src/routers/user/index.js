const { updateUser, getUser } = require("@controller/v1/user");
const multer = require("multer");
const { getAllUser } = require("@controller/v1/user");

// multer upload
const upload = multer({ dest: "./src/uploads/" });

const uploadFields = upload.fields([
  { name: "profile_picture", maxCount: 1 },
  { name: "cover_picture", maxCount: 1 },
]);

const userRoutes = (router, authenticate) => {
  router
    .route("/user")
    .patch([authenticate, uploadFields], updateUser)
    .get(authenticate, getUser);

  router.get("/users", authenticate, getAllUser);
};

module.exports = userRoutes;
