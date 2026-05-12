const express = require("express");
const router = express.Router();
const chatRateLimit = require("../middlewares/chatRateLimit.middleware");
const { chat } = require("../controllers/chatbot.controller");
const { protect } = require('../middlewares/protect.middleware');
const multer = require("multer");
const upload = multer();

router.post("/", protect, upload.none(), chatRateLimit, chat);

module.exports = router;
