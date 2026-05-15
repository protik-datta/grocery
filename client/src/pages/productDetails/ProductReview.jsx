import { useEffect, useState } from 'react';
import Container from '../../shared/components/common/Container';
import ProductReviewTop from './ProductReviewTop'
import Reviews from './Reviews';
import ReviewInput from './ReviewInput';

const ProductReview = ({ product }) => {
  const [reviews, setReviews] = useState(product.reviews ?? []);

  useEffect(() => {
    setReviews(product.reviews ?? []);
  }, [product._id, product.reviews]);

  const handleHelpfulUpdate = (updatedReview) => {
    setReviews((prev) =>
      prev.map((r) => (r._id === updatedReview._id ? updatedReview : r)),
    );
  };

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

  return (
    <Container>
      <h2 className="text-2xl font-semibold py-5">Customer Reviews</h2>
      <div className="bg-white/50 border border-gray-100 rounded-2xl">
        <ProductReviewTop product={enrichedProduct} />
        <Reviews
          product={enrichedProduct}
          onHelpfulUpdate={handleHelpfulUpdate}
        />
        <div className="w-full h-px bg-gray-200" />
        <ReviewInput
          product={enrichedProduct}
          onSubmit={(newR) => setReviews([newR, ...reviews])}
        />
      </div>
    </Container>
  );
};

export default ProductReview
