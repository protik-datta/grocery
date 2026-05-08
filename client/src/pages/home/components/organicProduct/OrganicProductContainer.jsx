import { dummyProducts } from "../../../../assets/assets";
import ProductCard from '../../../../shared/ProductCard';

const OrganicProductContainer = ({ limit }) => {
  const organicProducts = dummyProducts.filter((i) => i.isOrganic === true);
  const displayProducts = limit
    ? organicProducts.slice(0, limit)
    : organicProducts;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-6">
      {displayProducts.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </div>
  );
};

export default OrganicProductContainer;
