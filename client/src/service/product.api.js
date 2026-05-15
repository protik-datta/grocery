import api from '../api/axios';

export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response;
  } catch (error) {
    throw new error();
  }
};

export const getProducts = async ({
  search = "",
  category = "",
  minPrice = "",
  maxPrice = "",
  sort = "newest",
  page = 1,
  limit = 20,
}) => {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (minPrice !== "" && minPrice !== null)
      params.append("minPrice", minPrice);
    if (maxPrice !== "" && maxPrice !== null)
      params.append("maxPrice", maxPrice);
    if (sort) params.append("sort", sort);

    params.append("page", page);
    params.append("limit", limit);

    const response = await api.get(`/products?${params.toString()}`);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};
