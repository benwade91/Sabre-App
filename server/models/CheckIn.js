const { Schema, model } = require("mongoose");

const checkInSchema = new Schema({
  gym: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    required: false,
    trim: true,
  },
});

const CheckIn = model("CheckIn", checkInSchema);

module.exports = CheckIn;
