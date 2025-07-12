const mongoose = require("mongoose");

const waterUsageSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    usageLitres: {
      type: Number,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["processing", "cooling", "cleaning", "other"],
      required: true,
    },
    remarks: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true, // ✅ Now required from frontend
    },
  },
  {
    timestamps: true, // Optional: Adds createdAt and updatedAt fields
  }
);

const WaterUsage = mongoose.model("WaterUsage", waterUsageSchema);

module.exports = WaterUsage;
