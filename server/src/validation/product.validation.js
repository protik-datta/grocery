const { z } = require("zod");

const createProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  category: z
    .string()
    .trim()
    .regex(/^[a-f\d]{24}$/i, "Invalid category ID"),
  unit: z.string().trim().min(1, "Unit is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  originalPrice: z.coerce.number().min(0).optional().default(0),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  isOrganic: z.coerce.boolean().optional().default(false),
  isNewArrival: z.coerce.boolean().optional().default(false),
  isTrending: z.coerce.boolean().optional().default(false),
  isPopular: z.coerce.boolean().optional().default(false),
});

const updateProductSchema = createProductSchema.partial();

const productQuerySchema = z.object({
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  sort: z
    .enum(["newest", "price_asc", "price_desc", "top_rated", "a_z"])
    .optional()
    .default("newest"),

  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
};
