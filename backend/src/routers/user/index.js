const { updateUser, getUser } = require("@controller/v1/user");
const multer = require("multer");

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
};

module.exports = userRoutes;
