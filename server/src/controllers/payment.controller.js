const SSLCommerzPayment = require("sslcommerz-lts");
const Order = require("../model/order.model");
const asyncHandler = require("../utils/asyncHandler");
const redis = require("../config/redis.config");
const {
  verifySSLCommerzPayment,
} = require("../helpers/verifySSLCommerzPayment");

const initPayment = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId).populate("user");

  if (!order) {
    return res.status(404).json({ status: false, message: "Order not found" });
  }

  const tran_id = `TRX-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const data = {
    total_amount: order.total,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `${process.env.BASE_URL}/api/v1/payment/success/${tran_id}`,
    fail_url: `${process.env.BASE_URL}/api/v1/payment/fail/${tran_id}`,
    cancel_url: `${process.env.BASE_URL}/api/v1/payment/cancel/${tran_id}`,
    ipn_url: `${process.env.BASE_URL}/api/v1/payment/ipn`,
    shipping_method: "Courier",
    product_name: order.items.map((item) => item.name).join(", "),
    product_category: "Ecommerce",
    product_profile: "general",
    cus_name: order.user.name,
    cus_email: order.user.email,
    cus_add1: order.shippingAddress.address,
    cus_city: order.shippingAddress.city,
    cus_state: order.shippingAddress.state,
    cus_postcode: order.shippingAddress.zip,
    cus_country: "Bangladesh",
    cus_phone: order.user.phone || "01700000000",
    ship_name: order.user.name,
    ship_add1: order.shippingAddress.address,
    ship_city: order.shippingAddress.city,
    ship_state: order.shippingAddress.state,
    ship_postcode: order.shippingAddress.zip,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    process.env.IS_LIVE === "true",
  );

  const apiResponse = await sslcz.init(data);

  if (apiResponse?.GatewayPageURL) {
    order.trx_id = tran_id;
    await order.save();

    res.status(200).json({
      status: true,
      url: apiResponse.GatewayPageURL,
    });
  } else {
    res.status(500).json({
      status: false,
      message: "SSLCommerz Initiation Failed",
    });
  }
});

const paymentSuccess = asyncHandler(async (req, res) => {
  const { tranId } = req.params;
  const clientUrl = process.env.CLIENT_URL.replace(/\/$/, "");

  console.log("tranId from params:", tranId);
  console.log("trx_id in body:", req.body?.tran_id);



  const isValid = verifySSLCommerzPayment(req.body, process.env.STORE_PASSWORD);

  if (!isValid) {
    console.warn("Invalid payment signature for tranId:", tranId);
    return res.redirect(`${clientUrl}/payment/fail?reason=invalid_signature`);
  }

  if (req.body.status !== "VALID" && req.body.status !== "VALIDATED") {
    return res.redirect(`${clientUrl}/payment/fail?reason=payment_not_valid`);
  }

  let order = await Order.findOne({ trx_id: tranId });

  if (!order) {
    return res.redirect(`${clientUrl}/payment/fail?reason=order_not_found`);
  }

  const paidAmount = parseFloat(req.body.amount);
  if (Math.abs(paidAmount - order.total) > 1) {
    console.warn(`Amount mismatch: expected ${order.total}, got ${paidAmount}`);
    return res.redirect(`${clientUrl}/payment/fail?reason=amount_mismatch`);
  }

  if (order.isPaid) {
    return res.redirect(`${clientUrl}/payment/success?orderId=${order._id}`);
  }

  order = await Order.findOneAndUpdate(
    { trx_id: tranId },
    {
      isPaid: true,
      paymentStatus: "Completed",
      status: "Confirmed",
      bank_tran_id: req.body.bank_tran_id,
    },
    { new: true },
  );

  if (!order) {
    return res.redirect(`${clientUrl}/payment/fail?reason=order_not_found`);
  }

  const cacheKeys = [
    `order:${order._id}`,
    `orders:user:${order.user}`,
    "admin:orders:all",
  ];

  await Promise.all(cacheKeys.map((key) => redis.del(key)));

  res.redirect(`${clientUrl}/payment/success?orderId=${order._id}`);
});

const paymentIPN = asyncHandler(async (req, res) => {
  const { tran_id, status, amount, bank_tran_id } = req.body;

  if (status === "VALID" || status === "VALIDATED") {
    const order = await Order.findOne({ trx_id: tran_id });

    if (order && !order.isPaid) {
      order.isPaid = true;
      order.paymentStatus = "Completed";
      order.status = "Confirmed";
      order.bank_tran_id = bank_tran_id;
      await order.save();

      await Promise.all([
        redis.del(`order:${order._id}`),
        redis.del(`orders:user:${order.user}`),
        redis.del("admin:orders:all"),
      ]);
    }
  }

  res.status(200).send("OK");
});

module.exports = { initPayment, paymentSuccess, paymentIPN };
