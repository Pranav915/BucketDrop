const express = require("express");
const router = express.Router();
const gameControllers = require("../controllers/game/gameControllers");
const auth = require("../middleware/auth");

router.post("/add", auth, gameControllers.controllers.postScore);
router.get("/getgames", gameControllers.controllers.getScore);

module.exports = router;
