const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const gameSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  score: {
    type: String,
  },
  timestamps: true,
});

// https://masteringjs.io/tutorials/mongoose/timestamps

module.exports = model("Game", gameSchema);
