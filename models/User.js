const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
});

module.exports = model("User", userSchema);
