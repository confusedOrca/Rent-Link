const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
  age: Number,
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
  },
  lat: Number,
  lon: Number,
});

module.exports = mongoose.model("User", userSchema);
