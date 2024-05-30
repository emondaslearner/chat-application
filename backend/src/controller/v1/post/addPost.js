const { addPost: addPostLib } = require("@lib/v1/post");

const addPost = async (req, res, next) => {
  try {
    const photo = req.files?.photo;
    const video = req.files?.video;

    const payloadData = {
      title: req.body?.title,
      color: req.body?.color,
      photo,
      video: video ? video : [],
      userId: req.user.id,
    };

    const data = await addPostLib(payloadData);

    const response = {
      code: 201,
      message: "Post added successfully",
      data,
      self: req.url,
    };

    res.status(response.code).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = addPost;
