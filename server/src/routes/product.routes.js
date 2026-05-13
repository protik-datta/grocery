const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { isAdmin } = require('../middlewares/admin.middleware');
const { protect } = require('../middlewares/protect.middleware');
const { createReview } = require('../controllers/review.controller');

router.post("/", upload.single("image"), protect, isAdmin, createProduct);
router.post("/post-review/:id", protect, createReview);
router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);
router.patch("/:id", protect, isAdmin, upload.single("image"), updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

module.exports = router;
