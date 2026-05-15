const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  deleteReview,
  toggleReview,
} = require("../controllers/review.controller");
const { protect } = require("../middlewares/protect.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");
const multer = require("multer");
const validate = require("../middlewares/validate.middleware");
const { reviewSchema } = require("../validation/review.validation");
const upload = multer();

router.post(
  "/post-review/:productId",
  protect,
  upload.none(),
  validate(reviewSchema),
  createReview,
);
router.patch("/:id/helpful", protect, toggleReview);
router.get("/", protect, isAdmin, getAllReviews);
router.delete("/:id", protect, isAdmin, deleteReview);

module.exports = router;
