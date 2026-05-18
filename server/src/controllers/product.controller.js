const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/uploadToCloudinary");
const {
  createProductSchema,
  productQuerySchema,
  updateProductSchema,
} = require("../validation/product.validation");
const Product = require("../model/product.model");
const { invalidateCache, clearCacheByPattern } = require("../utils/cache");
const redis = require("../config/redis.config");
const Category = require("../model/category.model");

const SORT_MAP = {
  newest: { createdAt: -1 },
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  top_rated: { rating: -1 },
  a_z: { name: 1 },
};

// create product
const createProduct = asyncHandler(async (req, res) => {
  const parsed = createProductSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new AppError(400, parsed.error.errors[0].message);
  }

  if (!req.file) {
    throw new AppError(400, "Product image is required");
  }

  const result = await uploadToCloudinary(req.file.buffer);

  const product = await Product.create({
    ...parsed.data,
    imageUrl: result.secure_url,
    imagePublicId: result.public_id,
  });

  await invalidateCache(parsed.data.category);

  res.status(201).json({
    status: "success",
    data: product,
  });
});

// all product
const getAllProducts = asyncHandler(async (req, res) => {
  const parsed = productQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    throw new AppError(400, parsed.error.errors[0].message);
  }

  const { search, category, minPrice, maxPrice, sort, page, limit } =
    parsed.data;

  const cacheKey = `products:${JSON.stringify(
    Object.fromEntries(Object.entries(parsed.data).sort()),
  )}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.status(200).json({
      status: "success",
      source: "cache",
      ...JSON.parse(cached),
    });
  }

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    const categoryDoc = await Category.findOne({ slug: category }).select(
      "_id",
    );
    if (categoryDoc) {
      filter.category = categoryDoc._id;
    }
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
  }

  const skip = (page - 1) * limit;
  const sortStage = SORT_MAP[sort] || { createdAt: -1 };

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("category", "name slug imageUrl")
      .select("-reviews")
      .sort(sortStage)
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);

  const payload = {
    data: products,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };

  await redis.setex(cacheKey, 300, JSON.stringify(payload));

  res.status(200).json({
    status: "success",
    source: "db",
    ...payload,
  });
});

// get product by slug
const getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const cacheKey = `product:slug:${slug}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.status(200).json({
      status: "success",
      source: "cache",
      data: JSON.parse(cached),
    });
  }

  const product = await Product.findOne({ slug })
    .populate("category", "name slug imageUrl")
    .populate({
      path: "reviews",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "user",
        select: "name avatar",
      },
    })
    .lean();
  if (!product) throw new AppError(404, "Product not found");

  await redis.setex(cacheKey, 300, JSON.stringify(product));

  res.status(200).json({ status: "success", source: "db", data: product });
});

// update product /:id
const updateProduct = asyncHandler(async (req, res) => {
  const parsed = updateProductSchema.safeParse(req.body);
  if (!parsed.success) throw new AppError(400, parsed.error.errors[0].message);

  const product = await Product.findById(req.params.id);
  if (!product) throw new AppError(404, "Product not found");

  const oldSlug = product.slug;
  const oldCategory = product.category;

  if (req.file) {
    if (product.imagePublicId) await deleteFromCloudinary(product.imagePublicId);
    const result = await uploadToCloudinary(req.file.buffer);
    parsed.data.imageUrl = result.secure_url;
    parsed.data.imagePublicId = result.public_id;
  }

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: parsed.data },
    { new: true, runValidators: true }
  ).lean();

  const keysToDelete = [
    `product:slug:${oldSlug}`,
    `product:slug:${updated.slug}`,
    `product:${req.params.id}`
  ];

  await Promise.all([
    invalidateCache(oldCategory),
    parsed.data.category && parsed.data.category !== oldCategory ? invalidateCache(parsed.data.category) : null,
    ...keysToDelete.map(key => redis.del(key)),
    clearCacheByPattern("products:*")
  ]);

  res.status(200).json({ status: "success", data: updated });
});

// delete product /:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new AppError(404, "Product Not Found");

  if (product.imagePublicId) {
    await deleteFromCloudinary(product.imagePublicId);
  }

  await product.deleteOne();

  await Promise.all([
    invalidateCache(product.category),
    redis.del(`product:${req.params.id}`),
    redis.del(`product:slug:${product.slug}`),
  ]);

  res.status(200).json({
    status: "success",
    data: null,
    message: "Product Deleted Successfully",
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
};
