const {
  sentMessage,
  deleteMessage,
  editMessage,
} = require("@controller/v1/message");
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

const uploadFields = upload.fields([{ name: "files", maxCount: 10 }]);

const messageRoutes = (router, authenticate) => {
  router.post("/user/:id/message", [authenticate, uploadFields], sentMessage);

  router
    .route("/user/message/:id")
    .patch(authenticate, editMessage)
    .delete(authenticate, deleteMessage);
};

module.exports = messageRoutes;
