const mongoose = require("mongoose");
const { syncProductRating } = require("../helpers/syncProductRating");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
    helpful: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

reviewSchema.index({ user: 1, product: 1 }, { unique: true });

reviewSchema.post("save", function () {
  syncProductRating(this.product);
});
reviewSchema.post("findOneAndDelete", function (doc) {
  if (doc) syncProductRating(doc.product);
});

module.exports = mongoose.model("Review", reviewSchema);
