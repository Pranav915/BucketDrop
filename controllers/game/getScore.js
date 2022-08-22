const Game = require("../../models/Game");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getScore = async (req, res) => {
  try {
    const games = await Game.find()
      .limit(10)
      .sort({ createdAt: -1 })
      .populate("user", "username");

    res.json(games);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Some Error" });
  }
};
module.exports = getScore;
