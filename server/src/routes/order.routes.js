const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrder, deleteOrder } = require("../controllers/order.controller");
const { protect } = require("../middlewares/protect.middleware");
const multer = require("multer");
const upload = multer();

router.post("/create-order", upload.none(), protect, createOrder);
router.get("/all-orders", protect, getAllOrders);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.patch("/:id", upload.none(), protect, updateOrder);
router.delete("/:id", protect, deleteOrder);

module.exports = router;
