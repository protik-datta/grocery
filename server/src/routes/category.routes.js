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
const { isAdmin } = require('../middlewares/admin.middleware');
const { protect } = require('../middlewares/protect.middleware');

router.post("/", upload.single("image"), protect, isAdmin, createCategory);
router.get("/", getAllCategories);
router.get("/:slug", getCategoryBySlug);
router.patch("/:id", protect, isAdmin, upload.single("image"), updateCategory);
router.delete("/:id", protect, isAdmin, deleteCategory);

module.exports = router;
