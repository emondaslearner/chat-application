const { Schema, model } = require("mongoose");

const friendSchema = new Schema(
  {
    first_user: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    blocked_by: {
      type: Schema.ObjectId,
      ref: "user",
    },
    second_user: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

friendSchema.index({ second_user: 1, first_user: 1 });

const friendModel = model("friend", friendSchema);

module.exports = friendModel;
