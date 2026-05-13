const Review = require("../model/review.model");
const Product = require("../model/product.model");
const asyncHandler = require("../utils/asyncHandler");
const redis = require("../config/redis.config");
const { clearCacheByPattern } = require('../utils/cache');

const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;

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

  const keysToDelete = [
    `product:slug:${product.slug}`,
    `product:${productId}`,
  ];

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

module.exports = {
  createReview,
};
