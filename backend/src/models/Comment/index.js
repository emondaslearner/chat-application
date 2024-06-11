const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    send_by: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    post: {
      type: Schema.ObjectId,
      ref: "post",
      required: true,
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

const commentModel = model("comment", commentSchema);

module.exports = commentModel;
