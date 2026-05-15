import { useProducts } from "../../hooks/productApi.hook";
import Container from "../../shared/components/common/Container";
import ProductCard from "../../shared/ProductCard";
import Loader from '../../utils/Loader';

const DealsProductContainer = () => {
  const { data: productResponse, isLoading: prodLoading } = useProducts({
    limit: 50,
  });

  const products = productResponse?.data || [];

  const dealsProducts = products.filter((product) => product.discount > 0);

  // 3. Loading State
  if (prodLoading) {
    return (
      <Container>
        <div className="py-20">
          <Loader size="lg" />
        </div>
      </Container>
    );
  }

  if (dealsProducts.length === 0) {
    return null;
  }

  return (
    <Container>
      <div className="py-10">
        <h2 className="text-2xl font-bold text-[#1B3022] mb-6">Hot Deals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-6">
          {dealsProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default DealsProductContainer;
