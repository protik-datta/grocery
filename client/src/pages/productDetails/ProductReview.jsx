import Container from "../../shared/components/common/Container";
import ProductReviewTop from "./ProductReviewTop";
import Reviews from "./Reviews";

const ProductReview = ({ product }) => {
  return (
    <Container>
      {/* heading */}
      <div>
        <h2 className="text-2xl font-semibold py-5">Customer Reviews</h2>
      </div>

      <div className="bg-white/50 border border-gray-100 rounded-2xl">
        <ProductReviewTop product={product} />
        <Reviews product={product} />
      </div>
    </Container>
  );
};

export default ProductReview;
