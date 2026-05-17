const asyncHandler = require("../utils/asyncHandler");
const Product = require("../model/product.model");
const Order = require("../model/order.model");
const getCoordinates = require("../helpers/getCoordinates");
const DeliveryPartner = require("../model/deliveryPartner.model");
const redis = require("../config/redis.config");
const { clearOrderCaches } = require("../helpers/clearOrderCache");

const TAX_RATE = 0.05;

// create order
const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({
      status: false,
      message: "Order must contain at least one item",
    });
  }

  const DELIVERY_FEE = 70;
  const APPLIED_DISCOUNT = 0;

  let calculatedSubtotal = 0;
  const orderItems = [];
  const reservedItems = [];

  for (const item of items) {
    const product = await Product.findOneAndUpdate(
      { _id: item.product, stock: { $gte: item.quantity } },
      { $inc: { stock: -item.quantity } },
      { new: false },
    );

    if (!product) {
      if (reservedItems.length > 0) {
        await Product.bulkWrite(
          reservedItems.map(({ productId, quantity }) => ({
            updateOne: {
              filter: { _id: productId },
              update: { $inc: { stock: quantity } },
            },
          })),
        );
      }

      const exists = await Product.findById(item.product).select("name stock");
      return res.status(400).json({
        status: false,
        message: exists
          ? `Only ${exists.stock} unit(s) of "${exists.name}" available`
          : `Product not found`,
      });
    }

    reservedItems.push({ productId: product._id, quantity: item.quantity });

    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.imageUrl,
      unit: product.unit,
      price: product.price,
      quantity: item.quantity,
    });

    calculatedSubtotal += product.price * item.quantity;
  }

  const calculatedTax = Math.round(calculatedSubtotal * TAX_RATE);

  const lat = shippingAddress.lat || null;
  const lng = shippingAddress.lng || null;

  const newOrder = new Order({
    user: req.user._id,
    items: orderItems,
    shippingAddress: {
      label: shippingAddress.label || "Home",
      address: shippingAddress.address,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zip: shippingAddress.zip,
      lat,
      lng
    },
    paymentMethod,
    tax: calculatedTax,
    subtotal: calculatedSubtotal,
    deliveryFee: DELIVERY_FEE,
    discount: APPLIED_DISCOUNT,
  });

  let saveOrder;
  try {
    saveOrder = await newOrder.save();
  } catch (err) {
    await Product.bulkWrite(
      reservedItems.map(({ productId, quantity }) => ({
        updateOne: {
          filter: { _id: productId },
          update: { $inc: { stock: quantity } },
        },
      })),
    );
    throw err;
  }

  const [productKeys, slugKeys] = await Promise.all([
    redis.keys("products:*"),
    redis.keys("product:*"),
  ]);

  const keysToDelete = [...productKeys, ...slugKeys].filter(Boolean);
  if (keysToDelete.length > 0) {
    await redis.del(keysToDelete);
  }

  await clearOrderCaches(null, req.user._id);

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
    const cachedData = JSON.parse(cached);
    return res.status(200).json({
      status: "success",
      source: "cache",
      data: cachedData.data || cachedData,
    });
  }

  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .select("orderNumber status total createdAt items isPaid paymentMethod");

  const responseData = {
    count: orders.length,
    data: orders,
  };

  await redis.setex(cacheKey, 300, JSON.stringify(responseData));
  res.status(200).json({
    status: "success",
    source: "db",
    ...responseData,
  });
});

// get order by id
const getOrderById = asyncHandler(async (req, res) => {
  const cacheKey = `order:${req.params.id}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    const cachedData = JSON.parse(cached);
    return res.status(200).json({
      status: "success",
      source: "cache",
      data: cachedData.data || cachedData,
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

  await redis.setex(cacheKey, 300, JSON.stringify(order));
  res.status(200).json({
    status: "success",
    source: "db",
    data: order,
  });
});

// get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  const cacheKey = "admin:orders:all";

  const cached = await redis.get(cacheKey);
  if (cached) {
    const cachedData = JSON.parse(cached);
    return res.status(200).json({
      status: "success",
      source: "cache",
      data: cachedData.data || cachedData,
      count:
        cachedData.count ||
        (cachedData.data ? cachedData.data.length : cachedData.length),
    });
  }

  const orders = await Order.find()
    .populate("user", "name email phone")
    .sort("-createdAt");

  const responseData = {
    count: orders.length,
    data: orders,
  };

  await redis.setex(cacheKey, 300, JSON.stringify(responseData));
  res.status(200).json({
    status: "success",
    source: "db",
    ...responseData,
  });
});

// create delivery partner
const createDeliveryPartner = asyncHandler(async (req, res) => {
  const { name, email, phone, vehicleType } = req.body;

  const exist = await DeliveryPartner.findOne({ $or: [{ email }, { phone }] });
  if (exist) {
    return res.status(400).json({
      status: false,
      message: "Delivery partner with this email or phone already exists",
    });
  }

  const partner = await DeliveryPartner.create({
    name,
    email,
    phone,
    vehicleType,
  });

  res.status(201).json({
    status: "success",
    message: "Delivery partner added successfully",
    data: partner,
  });
});

// assign delivery partner
const assginDeliveryPartner = asyncHandler(async (req, res) => {
  const { orderId, partnerId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ status: false, message: "Order not found" });
  }

  const partner = await DeliveryPartner.findById(partnerId);
  if (!partner) {
    return res
      .status(404)
      .json({ status: false, message: "Delivery partner not found" });
  }

  order.deliveryPartner = partner._id;
  await order.pushStatus("Out for Delivery");

  await clearOrderCaches(order._id, order.user);

  res.status(200).json({
    status: "success",
    message: "Delivery partner assigned and order status updated",
    data: order,
  });
});

// update order
const updateOrder = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ status: false, message: "Order not found" });
  }

  if (status) {
    order.status = status;
    order.statusHistory.push({ status });
  }

  await order.save();

  await clearOrderCaches(order._id, order.user);

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
    return res.status(404).json({ status: false, message: "Order not found" });
  }

  const userId = order.user;
  const orderId = order._id;

  await order.deleteOne();

  await clearOrderCaches(orderId, userId);

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
  assginDeliveryPartner,
  deleteOrder,
  createDeliveryPartner,
};
