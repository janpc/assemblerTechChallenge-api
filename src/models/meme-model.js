const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const MemeSchema = Schema(
  {
    url: {
      type: String,
      required: [true, "Url is required"],
      trim: true,
    },
    userEmail: {
      type: String,
      required: [true, "User Email is required"],
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    type: {
      type: String,
      enum: ["meme", "gif"],
      default: "meme",
    },
  },
  {
    timestamps: true,
  }
);

const Meme = mongoose.model("meme", MemeSchema);

module.exports = Meme;
