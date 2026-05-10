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

router.post("/", upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);
router.patch("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
