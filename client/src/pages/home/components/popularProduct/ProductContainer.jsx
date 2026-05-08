import React from "react";
import ProductCard from "./ProductCard";
import { dummyProducts } from "../../../../assets/assets";

const ProductContainer = ({ limit }) => {
  const displayProducts = limit ? dummyProducts.slice(0, limit) : dummyProducts;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-6">
      {displayProducts.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </div>
  );
};

export default ProductContainer;
