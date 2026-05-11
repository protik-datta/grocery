const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    messages: [
      {
        role: { type: String, enum: ["user", "model"], required: true },
        parts: [
          {
            text: { type: String, required: true },
          },
        ],
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Chat", chatSchema);
