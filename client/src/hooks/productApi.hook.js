import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getCategories,
  getProductBySlug,
  getProducts,
  postHelpful,
  postReview,
} from "../service/product.api";
import { showError, showSuccess } from "../utils/toast";

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

export const useProductBySlug = (slug) => {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });
};

export const usePostReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Review submitted successfully!");
    },
    onError: (error) => {
      const message = error?.message || "Failed to submit review";
      showError(message);
    },
    retry: 0,
  });
};

export const useHelpful = (productId, userId, queryKey) => {
  const queryClient = useQueryClient();

  const patchReview = (cached, updatedReview) => {
    const isWrapped = cached?.data !== undefined;
    const product = isWrapped ? cached.data : cached;
    if (!product?.reviews) return cached;

    const reviews = product.reviews.map((r) =>
      String(r._id) === String(updatedReview._id) ? updatedReview : r,
    );
    const updated = { ...product, reviews };
    return isWrapped ? { ...cached, data: updated } : updated;
  };

  const optimisticToggle = (cached, reviewId) => {
    const isWrapped = cached?.data !== undefined;
    const product = isWrapped ? cached.data : cached;
    if (!product?.reviews) return cached;

    const reviews = product.reviews.map((r) => {
      if (String(r._id) !== String(reviewId)) return r;
      const helpful = r.helpful ?? [];
      const alreadyLiked = helpful.map(String).includes(String(userId));
      return {
        ...r,
        helpful: alreadyLiked
          ? helpful.filter((id) => String(id) !== String(userId))
          : [...helpful, userId],
      };
    });

    const updated = { ...product, reviews };
    return isWrapped ? { ...cached, data: updated } : updated;
  };

  return useMutation({
    mutationFn: postHelpful,

    onMutate: async (reviewId) => {
      await queryClient.cancelQueries({ queryKey });
      const snapshot = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) =>
        optimisticToggle(old, reviewId),
      );

      return { snapshot };
    },

    onSuccess: (res) => {
      const updatedReview = res?.data;
      if (!updatedReview) return;

      queryClient.setQueryData(queryKey, (old) =>
        patchReview(old, updatedReview),
      );
    },

    onError: (_err, _reviewId, context) => {
      queryClient.setQueryData(queryKey, context?.snapshot);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
