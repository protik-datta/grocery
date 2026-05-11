const asyncHandler = require("../utils/asyncHandler");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../validation/category.validation");
const Category = require("../model/category.model");
const redis = require("../config/redis.config");
const AppError = require("../utils/AppError");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/uploadToCloudinary");
const Product = require("../model/product.model");

const CACHE_KEY = "categories:all";
const CACHE_TTL = 60 * 60;

// post categories
const createCategory = asyncHandler(async (req, res) => {
  const parsed = createCategorySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: parsed.error.errors[0].message,
    });
  }

  if (!req.file) throw new AppError(400, "Category image is required");

  const exists = await Category.findOne({ name: parsed.data.name });
  if (exists) throw new AppError(400, "Category with this name already exists");

  let uploadResult;
  try {
    uploadResult = await uploadToCloudinary(req.file.buffer);

    const category = await Category.create({
      ...parsed.data,
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
    });

    await redis.del(CACHE_KEY);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    if (uploadResult?.public_id) {
      await deleteFromCloudinary(uploadResult.public_id);
    }
    throw error;
  }
});

// get all categories
const getAllCategories = asyncHandler(async (req, res) => {
  const cached = await redis.get(CACHE_KEY);
  if (cached) {
    const parsedCache = JSON.parse(cached)
    if(parsedCache.length > 0){
      return res.status(200).json({
        status: "success",
        source: "cache",
        data: parsedCache,
      });
    }
  }

  const categories = await Category.find({ isActive: true })
    .sort({ name: 1 })
    .lean();

  await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(categories));

  res.status(200).json({ status: "success", source: "db", data: categories });
});

// get category by slug
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const cacheKey = `category:${req.params.slug}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.status(200).json({
      status: "success",
      source: "cache",
      data: JSON.parse(cached),
    });
  }

  const category = await Category.findOne({ slug: req.params.slug }).lean();
  if (!category) throw new AppError(404, "Category not found");

  await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(category));

  res.status(200).json({ status: "success", source: "db", data: category });
});

// update category /:id
const updateCategory = asyncHandler(async (req, res) => {
  const parsed = updateCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(400, parsed.error.errors[0].message);
  }

  const category = await Category.findById(req.params.id);
  if (!category) throw new AppError(404, "Category not found");

  const oldSlug = category.slug;
  const oldImagePublicId = category.imagePublicId;

  if(req.file){
    const uploadResult = await uploadToCloudinary(req.file.buffer);
    parsed.data.imageUrl = uploadResult.secure_url;
    parsed.data.imagePublicId = uploadResult.public_id;
  }

  const updated = await Category.findByIdAndUpdate(
    req.params.id,
    { $set: parsed.data },
    { new: true, runValidators: true },
  ).lean();

  if(req.file && oldImagePublicId){
    await deleteFromCloudinary(oldImagePublicId);
  }

  await Promise.all([
    redis.del(CACHE_KEY),
    redis.del(`category:${oldSlug}`),
    redis.del(`category:${updated.slug}`),
  ]);

  res.status(200).json({ status: "success", data: updated });
});

// delete category /:id
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new AppError(404, "Category not found");

  const productCount = await Product.countDocuments({
    category: category._id,
  });
  if (productCount > 0) {
    throw new AppError(
      400,
      `Cannot delete — ${productCount} product(s) still belong to this category`,
    );
  }

  if (category.imagePublicId) {
    await deleteFromCloudinary(category.imagePublicId);
  }

  await category.deleteOne();

  await Promise.all([
    redis.del(CACHE_KEY),
    redis.del(`category:${category.slug}`),
  ]);

  res.status(200).json({
    status: "success",
    data: null,
    message: "Category deleted successfully",
  });
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
