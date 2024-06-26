const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    reactions: [
      {
        type: Schema.ObjectId,
        ref: "reaction",
      },
    ],
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    videos: [
      {
        type: Schema.ObjectId,
        ref: "video",
      },
    ],
    photos: [
      {
        type: Schema.ObjectId,
        ref: "photo",
      },
    ],
    reactionCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

postSchema.index({ title: 1, user: 1 });

const postModel = model("post", postSchema);

module.exports = postModel;
