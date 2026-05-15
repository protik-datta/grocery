const { z } = require("zod");

const reviewSchema = z.object({
  body: z.object({
    rating: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "Rating must be 1-5").max(5, "Rating must be 1-5"),
    ),
    comment: z
      .string()
      .min(3, "Too short")
      .max(500, "Too long")
      .optional()
      .or(z.literal("")),
  }),

  params: z.object({
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),
  }),
});

module.exports = { reviewSchema };
