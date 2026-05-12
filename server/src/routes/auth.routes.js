const express = require("express");
const router = express.Router();
const multer = require("multer");
const { register, login, getMe, logout } = require('../controllers/auth.controller');
const protect = require('../middlewares/protect.middleware');
const upload = multer()

router.post('/register', upload.none(), register);
router.post('/login', upload.none(), login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;
