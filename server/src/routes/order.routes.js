const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
  assginDeliveryPartner,
  createDeliveryPartner,
} = require("../controllers/order.controller");
const { protect } = require("../middlewares/protect.middleware");
const multer = require("multer");
const { isAdmin } = require("../middlewares/admin.middleware");
const upload = multer();

router.post("/create-order", upload.none(), protect, createOrder);
router.get("/all-orders", protect, isAdmin, getAllOrders);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.patch("/:id", upload.none(), protect, isAdmin, updateOrder);
router.post(
  "/create-delivery-partner",
  upload.none(),
  protect,
  isAdmin,
  createDeliveryPartner,
);
router.post(
  "/assign-delivery",
  upload.none(),
  protect,
  isAdmin,
  assginDeliveryPartner,
);
router.delete("/:id", protect, isAdmin, deleteOrder);

module.exports = router;
