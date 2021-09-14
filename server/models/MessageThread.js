const {
    Schema,
    model
  } = require("mongoose");
  
  const messageThreadSchema = new Schema({
    content: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  });
  
  const MessageThread = model("MessageThread", messageThreadSchema);
  
  module.exports = MessageThread;