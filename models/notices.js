const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    index: { expires: 10 * 24 * 60 * 60 } // 10 days in seconds
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  branch: String,
  year: String,
});
const Notice = mongoose.model("Notice", noticeSchema);
module.exports = Notice;
