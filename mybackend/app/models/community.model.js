const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: "",
      maxLength: [250, "Must be at most 250 characters long"],
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    subscribedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    subscriberCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("community", CommunitySchema);
