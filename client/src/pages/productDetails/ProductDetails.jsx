import { useParams } from "react-router-dom";
import ProductBreadCrumb from "./ProductBreadcrumb";
import ProductInfoDetails from "./ProductInfoDetails";
import ProductReview from "./ProductReview";
import RelatedProducts from "./RelatedProducts";
import { useProductBySlug, useProducts } from "../../hooks/productApi.hook";
import Loader from '../../utils/Loader';

const ProductDetails = () => {
  const { category, slug } = useParams();

  const {
    data: product,
    isLoading: isProductLoading,
    isError,
  } = useProductBySlug(slug);
  const { data: relatedResponse, isLoading: isRelatedLoading } = useProducts({
    category: category,
    limit: 5,
  });

  const relatedProducts =
    relatedResponse?.data?.filter((p) => p._id !== product?._id) || [];

  if (isProductLoading) {
    return <Loader fullScreen size="lg" />;
  }

  if (isError || !product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Product not found!</h2>
      </div>
    );
  }

  return (
    <div className="py-8">
      <ProductBreadCrumb product={product} />
      <ProductInfoDetails product={product} />
      <ProductReview product={product} />
      {!isRelatedLoading && relatedProducts.length > 0 && (
        <RelatedProducts
          products={relatedProducts}
          category={product.category?.name || category}
        />
      )}
    </div>
  );
};

export default ProductDetails;
