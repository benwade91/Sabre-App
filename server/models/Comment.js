const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  date: {
    type: String,
    required: false,
    trim: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
