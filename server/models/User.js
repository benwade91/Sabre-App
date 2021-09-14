const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  beltColor: String,
  administrator: Boolean,
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  privateMessages: [{ type: Schema.Types.ObjectId, ref: "MessageThread" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

// set up pre-save middleware to create password
userSchema.pre(
  "save",
  async function (next) {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
