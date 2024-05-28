const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("post", postSchema);
module.exports = userModel;
