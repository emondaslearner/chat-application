const { Schema, model } = require("mongoose");

const photoSchema = new Schema(
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

const photoModel = model("photo", photoSchema);

module.exports = photoModel;
