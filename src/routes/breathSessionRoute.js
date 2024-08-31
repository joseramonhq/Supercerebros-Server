const express = require("express");

const BreathSessionController = require("../controllers/breathSessionController");

const router = express.Router();

router.post(
  "/registerBreathSession",
  BreathSessionController.createBreathingSession
);

module.exports = router;
