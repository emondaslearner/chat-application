const { sentMessage } = require("@controller/v1/message");
const multer = require("multer");
const { editMessage } = require("@controller/v1/message");

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
  router.patch("/user/message/:id", authenticate, editMessage);
};

module.exports = messageRoutes;
