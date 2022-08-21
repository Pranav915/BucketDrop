const Game = require("../../models/Game");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const fetchuser = require("../middleware/fetchuser")

const getScore = async (req, res) => {
  try {
    Game.find()
      .limit(10)
      .sort({ createdAt: -1 })
      .exec(function (err, result) {
        res.status(201).json({
          userDetails: {
            result: result,
          },
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Some Error" });
  }
};
module.exports = getScore;
