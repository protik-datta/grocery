const mongoose = require("mongoose");
const { syncProductRating } = require("../helpers/syncProductRating");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
    helpful: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

reviewSchema.index({ user: 1, product: 1 }, { unique: true });
reviewSchema.index({ product: 1, createdAt: -1 });

reviewSchema.post("save", function () {
  syncProductRating(this.product);
});

reviewSchema.post("findOneAndUpdate", function (doc) {
  if (doc) {
    syncProductRating(doc.product);
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
