const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    photos: [
      {
        type: Schema.ObjectId,
        ref: "photo",
      },
    ],
    videos: [
      {
        type: Schema.ObjectId,
        ref: "video",
      },
    ],
  },
  {
    timestamps: true,
    id: true,
  }
);

postSchema.index({ title: 1 });

const postModel = model("post", postSchema);

module.exports = postModel;
