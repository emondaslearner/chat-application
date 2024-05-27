const { Schema, model } = require("mongoose");

const friendSchema = new Schema(
  {
    want_to_friend: {
      type: Schema.ObjectId,
      ref: "user",
      required: true,
    },
    sent_to: {
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

friendSchema.index({ want_to_friend: 1, sent_to: 1 });

const friendModel = model("friend-request", friendSchema);

module.exports = friendModel;
