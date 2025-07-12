const mongoose = require("mongoose");

const elecUsageSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    usageKWh: {
      type: Number,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["machinery", "lighting", "HVAC", "other"],
      required: true,
    },
    remarks: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ElecUsage = mongoose.model("ElecUsage", elecUsageSchema);

module.exports = ElecUsage;
