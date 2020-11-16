const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  lastname: { type: String },
  username: { type: String },
  avatar: { data: Buffer, contentType: String },
  date: { type: Date, default: Date.now() },
  textOfThePost: { type: String, required: true },
  likes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: String },
      username: { type: String },
      avatar: { type: String },
      date: { type: Date, default: Date.now() },
      textOfTheComment: { type: String },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
