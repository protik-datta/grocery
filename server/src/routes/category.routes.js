const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.post("/", upload.single("image"), createCategory);
router.get("/", getAllCategories);
router.get("/:slug", getCategoryBySlug);
router.patch("/:id", upload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
