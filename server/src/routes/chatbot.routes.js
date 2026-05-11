const express = require("express");
const router = express.Router();
const chatRateLimit = require("../middlewares/chatRateLimit.middleware");
const { chat } = require("../controllers/chatbot.controller");

router.post("/", chatRateLimit, chat);

module.exports = router;
