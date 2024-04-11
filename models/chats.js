const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    msg:{
        type: String,
        required : true,
      },
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required : true,
    },
    to:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required : true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
  });

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;