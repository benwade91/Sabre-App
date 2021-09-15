const {
    Schema,
    model
  } = require("mongoose");
  
  const messageSchema = new Schema({
    content: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seen: false,
  });
  
  const Message = model("Message", messageSchema);
  
  module.exports = Message;