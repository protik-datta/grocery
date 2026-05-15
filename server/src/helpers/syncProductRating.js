const mongoose = require("mongoose");

async function syncProductRating(productId) {
  const Review = mongoose.model("Review");
  const Product = mongoose.model("Product");

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
