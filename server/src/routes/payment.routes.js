const express = require("express");
const router = express.Router();
const {
  initPayment,
  paymentSuccess,
  paymentIPN,
} = require("../controllers/payment.controller");
const { protect } = require("../middlewares/protect.middleware");
const multer = require("multer");
const upload = multer();

router.post("/init", upload.none(), protect, initPayment);
router.post("/success/:tranId", paymentSuccess);
router.post("/fail/:tranId", (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/payment/fail`);
});
router.post("/cancel/:tranId", (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/payment/cancel`);
});
router.post("/ipn", upload.none(), paymentIPN);

module.exports = router;
