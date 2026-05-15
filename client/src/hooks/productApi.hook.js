import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from '../service/product.api';

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProducts = (filters) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};
