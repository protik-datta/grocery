import { useProducts } from "../../hooks/productApi.hook";
import Container from "../../shared/components/common/Container";
import ProductCard from "../../shared/ProductCard";
import Loader from "../../utils/Loader";
import { ServerCrash } from "lucide-react";

const ErrorState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-22 h-22 rounded-full bg-red-50 flex items-center justify-center mb-6">
      <ServerCrash size={40} className="text-red-400" strokeWidth={1.6} />
    </div>
    <h2 className="text-[18px] font-medium text-[#1B3022] mb-2">
      Something went wrong
    </h2>
    <p className="text-[13px] text-[#6B7280] max-w-60 leading-relaxed">
      Failed to load deals. Please try again later.
    </p>
  </div>
);

const DealsProductContainer = () => {
  const {
    data: productResponse,
    isPending,
    isError,
  } = useProducts({ limit: 50 });
  const products = productResponse?.data ?? [];
  const dealsProducts = products.filter((product) => product.discount > 0);

  if (isPending) {
    return (
      <Container>
        <div className="py-20">
          <Loader size="lg" />
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <ErrorState />
      </Container>
    );
  }

  if (dealsProducts.length === 0) return null;

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
