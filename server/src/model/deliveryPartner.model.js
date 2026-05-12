const mongoose = require("mongoose");

const deliveryPartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["bike", "car", "bicycle", "van"],
      default: "bike",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    currentLocation: {
      lat: Number,
      lng: Number,
      updatedAt: Date,
    },
  },
  { timestamps: true },
);

deliveryPartnerSchema.set("toJSON", {
  transform(_, obj) {
    delete obj.password;
    return obj;
  },
});

deliveryPartnerSchema.index({ isActive: 1 });

const model = mongoose.model("DeliveryPartner", deliveryPartnerSchema);

module.exports = model;
