const { Schema, model } = require("mongoose");

const videoSchema = new Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    post: {
      type: Schema.ObjectId,
      ref: "post",
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

const videoModel = model("video", videoSchema);

module.exports = videoModel;
