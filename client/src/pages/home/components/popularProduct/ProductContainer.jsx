import { useProducts } from "../../../../hooks/productApi.hook";
import ProductCard from "../../../../shared/ProductCard";

const ProductContainer = ({ limit }) => {
  const { data: productResponse } = useProducts({ limit: 50 });
  const products = productResponse?.data;

  const popularProducts = products?.filter((i) => i.isPopular === true);
  const displayProducts = limit
    ? popularProducts?.slice(0, limit)
    : popularProducts;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-6">
      {displayProducts?.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </div>
  );
};

export default ProductContainer;
