const mongoose = require("mongoose");
const { ORDER_STATUSES, PAYMENT_METHODS } = require("../constants/index.const");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  unit: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const addressSnapshotSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: false,
      default: null,
    },
    lng: {
      type: Number,
      required: false,
      default: null,
    },
  },
  { _id: false },
);

const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ORDER_STATUSES,
    required: true,
  },
  note: {
    type: String,
    trim: true,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// order schema
const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      default: () => {
        const letters = String.fromCharCode(
          65 + Math.floor(Math.random() * 26),
          65 + Math.floor(Math.random() * 26),
        );

        const numbers = Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0");

        return `${letters}${numbers}`;
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
    },
    shippingAddress: {
      type: addressSnapshotSchema,
      required: true,
    },
    statusHistory: {
      type: [statusHistorySchema],
      default: [{ status: "Placed" }],
    },
    liveLocation: {
      lat: Number,
      lng: Number,
      updatedAt: Date,
    },
    paymentMethod: {
      type: String,
      enum: PAYMENT_METHODS,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: "Placed",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
    },
    deliveryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPartner",
      default: null,
    },
    trx_id: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

orderSchema.pre("save", function () {
  this.total = +(
    this.subtotal +
    this.deliveryFee +
    this.tax -
    this.discount
  ).toFixed(2);
});

orderSchema.methods.pushStatus = function (status, note = "") {
  this.status = status;
  this.statusHistory.push({ status, note, timestamp: new Date() });
  return this.save();
};

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ deliveryPartner: 1, status: 1 });

const model = mongoose.model("Order", orderSchema);

module.exports = model;
