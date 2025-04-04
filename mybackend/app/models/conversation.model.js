const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    recipients: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessageAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversation", ConversationSchema);
