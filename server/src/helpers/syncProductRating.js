const Review = require("../model/review.model");
const Product = require("../model/product.model");
const mongoose = require("mongoose");

async function syncProductRating(productId) {
  const [result] = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: null,
        avgRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);
  await Product.findByIdAndUpdate(productId, {
    rating: result ? +result.avgRating.toFixed(1) : 0,
    reviewCount: result?.reviewCount ?? 0,
  });
}

module.exports = { syncProductRating };
