const mongoose = require("mongoose");

const effluentQualitySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    pH: {
      type: Number,
      required: true,
    },

    BOD: {
      // Biochemical Oxygen Demand
      type: Number,
      required: true,
    },
    COD: {
      // Chemical Oxygen Demand
      type: Number,
      required: true,
    },

    TSS: {
      // Total Suspended Solids
      type: Number,
      required: true,
    },

    TDS: {
      // Total Dissolved Solids
      type: Number,
      required: true,
    },

    heavyMetals: {
      type: Number,
      required: true,
    },

    turbidity: {
      type: Number,
      required: true,
    },

    dissolvedOxygen: {
      type: Number,
      required: true,
    },

    ammonia: {
      type: Number,
      required: true,
    },

    nitrates: {
      type: Number,
      required: true,
    },

    phosphates: {
      type: Number,
      required: true,
    },

    temperature: Number,
    oilAndGrease: Number,
    coliformCount: Number,
    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const EffluentQuality = mongoose.model(
  "EffluentQuality",
  effluentQualitySchema
);

module.exports = EffluentQuality;
