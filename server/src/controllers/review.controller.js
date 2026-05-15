const Review = require("../model/review.model");
const Product = require("../model/product.model");
const asyncHandler = require("../utils/asyncHandler");
const redis = require("../config/redis.config");

const createReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ status: false, message: "Product not found" });
  }

  const existingReview = await Review.findOne({
    user: req.user._id,
    product: productId,
  });

  if (existingReview) {
    return res.status(400).json({
      status: false,
      message: "You have already reviewed this product",
    });
  }

  const review = await Review.create({
    user: req.user._id,
    product: productId,
    rating,
    comment,
  });

  const keysToDelete = [`product:slug:${product.slug}`, `product:${productId}`];

  const filterKeys = await redis.keys("products:*");

  await Promise.all([
    ...keysToDelete.map((key) => redis.del(key)),
    filterKeys.length > 0 ? redis.del(filterKeys) : Promise.resolve(),
  ]);

  res.status(201).json({
    status: true,
    data: review,
  });
});

const toggleReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const review = await Review.findById(id);
  if (!review) {
    return res.status(404).json({ status: false, message: "Review not found" });
  }

  if (!review.helpful) review.helpful = [];

  const isHelpful = review.helpful.some(
    (hId) => hId.toString() === userId.toString(),
  );

  if (isHelpful) {
    review.helpful.pull(userId);
  } else {
    review.helpful.push(userId);
  }

  await review.save();
  res.status(200).json({ status: true, data: review });
});

const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate("user", "name email")
    .populate("product", "name");

  res.status(200).json({
    status: true,
    count: reviews.length,
    data: reviews,
  });
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return res.status(404).json({ status: false, message: "Review not found" });
  }

  const product = await Product.findById(review.product);

  if (product) {
    const keysToDelete = [
      `product:slug:${product.slug}`,
      `product:${product._id}`,
    ];
    const filterKeys = await redis.keys("products:*");

    await Promise.all([
      ...keysToDelete.map((key) => redis.del(key)),
      filterKeys.length > 0 ? redis.del(filterKeys) : Promise.resolve(),
    ]);
  }

  res.status(200).json({
    status: true,
    message: "Review deleted successfully",
  });
});

module.exports = {
  createReview,
  toggleReview,
  getAllReviews,
  deleteReview,
};
