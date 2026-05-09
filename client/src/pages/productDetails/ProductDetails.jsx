import { useParams } from "react-router-dom";
import { dummyProducts } from "../../assets/assets";
import ProductBreadCrumb from "./ProductBreadcrumb";
import ProductInfoDetails from "./ProductInfoDetails";
import ProductReview from "./ProductReview";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
  const { category, slug } = useParams();
  const product = dummyProducts.find(
    (p) => p.slug === slug && p.category === category,
  );
  const relatedProducts = dummyProducts.filter(
    (p) => p.category === product.category && p._id !== product._id,
  );

  return (
    <div className="py-8">
      <ProductBreadCrumb product={product} />
      <ProductInfoDetails product={product} />
      <ProductReview product={product} />
      <RelatedProducts products={relatedProducts} category={category} />
    </div>
  );
};

export default ProductDetails;
