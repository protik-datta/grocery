const asyncHandler = require("../utils/asyncHandler");
const Product = require("../model/product.model");
const Order = require("../model/order.model");
const getCoordinates = require("../helpers/getCoordinates");
const DeliveryPartner = require("../model/deliveryPartner.model");
const redis = require("../config/redis.config");

// create order
const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod, discount, deliveryFee } =
    req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({
      status: false,
      message: "Order must contain at least one item",
    });
  }

  let calculatedSubtotal = 0;
  const orderItems = [];
  const bulkStockOps = [];

  for (const item of items) {
    const product = await Product.findById(item.product);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: `Product with id ${item.product} not found`,
      });
    }

    if (product.stock < item.quantity) {
      return res.status(400).json({
        status: false,
        message: `Only ${product.stock} units of ${product.name} available`,
      });
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.imageUrl,
      unit: product.unit,
      price: product.price,
      quantity: item.quantity,
    });

    bulkStockOps.push({
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -item.quantity } },
      },
    });

    calculatedSubtotal += product.price * item.quantity;
  }

  let coordinates;
  try {
    coordinates = await getCoordinates({
      address: shippingAddress.address,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zip: shippingAddress.zip,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Could not fetch coordinates for the provided address.",
    });
  }

  const newOrder = new Order({
    user: req.user._id,
    items: orderItems,
    shippingAddress: {
      label: shippingAddress.label || "Home",
      address: shippingAddress.address,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zip: shippingAddress.zip,
      lat: coordinates.lat,
      lng: coordinates.lng,
    },
    paymentMethod,
    subtotal: calculatedSubtotal,
    deliveryFee,
    discount,
  });

  await Product.bulkWrite(bulkStockOps);
  const saveOrder = await newOrder.save();

  res.status(201).json({
    status: "success",
    message: "Order placed successfully",
    data: saveOrder,
  });
});

// get my orders
const getMyOrders = asyncHandler(async (req, res) => {
  const cacheKey = `orders:user:${req.user._id}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return res.status(200).json({
      status: "success",
      source: "cache",
      data: JSON.parse(cached),
    });
  }

  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .select("orderNumber status total createdAt items");

  const response = {
    status: "success",
    count: orders.length,
    data: orders,
  };

  await redis.setex(cacheKey, 300, JSON.stringify(response));
  res.status(200).json(response);
});

// get order by id
const getOrderById = asyncHandler(async (req, res) => {
  const cacheKey = `order:${req.params.id}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return res.status(200).json({
      status: "success",
      source: "cache",
      data: JSON.parse(cached),
    });
  }

  const order = await Order.findById(req.params.id)
    .populate("user", "name email phone")
    .populate("deliveryPartner", "name phone email vehicleType");

  if (!order) {
    return res.status(404).json({
      status: false,
      message: "Order not found",
    });
  }

  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res
      .status(403)
      .json({ success: false, message: "Not authorized to view this order" });
  }

  const response = {
    status: "success",
    data: order,
  };

  await redis.setex(cacheKey, 300, JSON.stringify(response));
  res.status(200).json(response);
});

// get all order
const getAllOrders = asyncHandler(async (req, res) => {
  const cacheKey = "admin:orders:all";

  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.status(200).json({
      status: "success",
      source: "cache",
      data: JSON.parse(cached),
    });
  }

  const orders = await Order.find()
    .populate("user", "name email phone")
    .sort("-createdAt");

  const response = {
    status: "success",
    count: orders.length,
    data: orders,
  };

  await redis.setex(cacheKey, 300, JSON.stringify(response));
  res.status(200).json(response);
});

// update order /:id
const updateOrder = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      status: false,
      message: "Order not found",
    });
  }

  if (status) {
    order.status = status;
    order.statusHistory.push({ status });
  }

  await order.save();

  const cacheKey = `user:${order.user}:orders`;
  const adminCacheKey = "admin:orders:all";
  const orderCacheKey = `order:${order._id}`;

  await Promise.all([
    redis.del(cacheKey),
    redis.del(adminCacheKey),
    redis.del(orderCacheKey),
  ]);

  res.status(200).json({
    status: "success",
    message: "Order updated successfully",
    data: order,
  });
});

// delete order
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      status: false,
      message: "Order not found",
    });
  }

  const userId = order.user;
  await order.deleteOne();

  await Promise.all([
    redis.del(`orders:user:${userId}`),
    redis.del("admin:orders:all"),
    redis.del(`order:${req.params.id}`),
  ]);

  res.status(200).json({
    status: "success",
    message: "Order deleted successfully",
  });
});

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
