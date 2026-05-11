import { dummyProducts } from "../../assets/assets";
import Container from "../../shared/components/common/Container";
import ProductCard from "../../shared/ProductCard";

const DealsProductContainer = () => {
  const DealsProducts = dummyProducts.filter(
    (products) => products.discount > 0,
  );
  return (
    <Container>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-6 py-15">
        {DealsProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default DealsProductContainer;
