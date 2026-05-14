import { useState, useEffect } from "react";
import Container from "../../shared/components/common/Container";
import ProductReviewTop from "./ProductReviewTop";
import Reviews from "./Reviews";
import ReviewInput from "./ReviewInput";

const ProductReview = ({ product }) => {
  const [reviews, setReviews] = useState(product.reviews ?? []);

  useEffect(() => {
    setReviews(product.reviews ?? []);
  }, [product._id]);

  const enrichedProduct = {
    ...product,
    reviews,
    reviewCount: reviews.length,
    rating:
      reviews.length > 0
        ? +(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(
            1,
          )
        : product.rating,
  };

  const handleNewReview = (review) => {
    setReviews((prev) => [review, ...prev]);
  };

  return (
    <Container>
      <div>
        <h2 className="text-2xl font-semibold py-5">Customer Reviews</h2>
      </div>

      <div className="bg-white/50 border border-gray-100 rounded-2xl">
        <ProductReviewTop product={enrichedProduct} />
        <Reviews product={enrichedProduct} />

        <div className="w-full h-px bg-gray-200" />

        <ReviewInput product={enrichedProduct} onSubmit={handleNewReview} />
      </div>
    </Container>
  );
};

export default ProductReview;
