const Game = require("../../models/Game");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postScore = async (req, res) => {
  try {
    const userid = req.user.userId;
    const score = req.body.score;

    const game = await Game.create({
      user: userid,
      score: score,
    });
    res.status(201).json({
      userDetails: {
        user: userid,
        score: score,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Some Error" });
  }
};

module.exports = postScore;
