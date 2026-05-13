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
  const reservedItems = [];

  for (const item of items) {
    const product = await Product.findOneAndUpdate(
      { _id: item.product, stock: { $gte: item.quantity } },
      { $inc: { stock: -item.quantity } },
      { new: false },
    );

    if (!product) {
      const exists = await Product.findById(item.product).select("name stock");

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

      if (!exists) {
        return res.status(404).json({
          status: false,
          message: `Product with id ${item.product} not found`,
        });
      }

      return res.status(400).json({
        status: false,
        message: `Only ${exists.stock} unit(s) of "${exists.name}" available`,
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

  let coordinates;
  try {
    coordinates = await getCoordinates({
      address: shippingAddress.address,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zip: shippingAddress.zip,
    });
  } catch (error) {
    await Product.bulkWrite(
      reservedItems.map(({ productId, quantity }) => ({
        updateOne: {
          filter: { _id: productId },
          update: { $inc: { stock: quantity } },
        },
      })),
    );
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

  await Promise.all([
    redis.del(`orders:user:${req.user._id}`),
    redis.del("admin:orders:all"),
  ]);

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

// assign delivery partner to order
const assginDeliveryPartner = asyncHandler(async (req, res) => {
  const {orderId, partnerId} = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({
      status: false,
      message: "Order not found",
    });
  }

  const partner = await DeliveryPartner.findById(partnerId);
  if (!partner) {
    return res.status(404).json({
      status: false,
      message: "Delivery partner not found",
    });
  }

  order.deliveryPartner = partner._id;
  await order.pushStatus("Out for Delivery");

  const cacheKey = `order:${order._id}`;
  const userOrdersCacheKey = `orders:user:${order.user}`;
  const adminOrdersCacheKey = "admin:orders:all";

  await Promise.all([
    redis.del(cacheKey),
    redis.del(userOrdersCacheKey),
    redis.del(adminOrdersCacheKey),
  ]);

  res.status(200).json({
    status: "success",
    message: "Delivery partner assigned and order status updated",
    data: order,
  });
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

  const cacheKey = `orders:user:${order.user}`;
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
  assginDeliveryPartner,
  deleteOrder,
  createDeliveryPartner
};
