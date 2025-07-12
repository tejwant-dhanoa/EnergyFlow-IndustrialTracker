const express = require("express");
const EffluentQuality = require("../models/EffluentQuality");

const router = express.Router();

// ➤ Add Effluent Quality Record
router.post("/", async (req, res) => {
  try {
    const {
      email,
      location,
      date,
      pH,
      BOD,
      COD,
      TSS,
      TDS,
      heavyMetals,
      turbidity,
      dissolvedOxygen,
      ammonia,
      nitrates,
      phosphates,
      temperature,
      oilAndGrease,
      coliformCount,
      remarks,
    } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!date) return res.status(400).json({ message: "Date is required" });

    const newRecord = new EffluentQuality({
      email,
      location,
      date,
      pH,
      BOD,
      COD,
      TSS,
      TDS,
      heavyMetals,
      turbidity,
      dissolvedOxygen,
      ammonia,
      nitrates,
      phosphates,
      temperature,
      oilAndGrease,
      coliformCount,
      remarks,
    });
    await newRecord.save();

    return res
      .status(201)
      .json({ message: "Effluent quality record added", record: newRecord });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ➤ Get All Effluent Quality Records for Logged-in User
router.get("/", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const records = await EffluentQuality.find({ email }).sort({ date: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ➤ Get Effluent Quality Records Grouped by Month
router.get("/summary/monthly", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const records = await EffluentQuality.find({ email }).sort({ date: -1 });

    const monthlySummary = {};

    records.forEach((record) => {
      const date = new Date(record.date);
      const yearMonth = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!monthlySummary[yearMonth]) {
        monthlySummary[yearMonth] = {
          records: [],
          averages: {
            pH: 0,
            BOD: 0,
            COD: 0,
            TSS: 0,
            TDS: 0,
            heavyMetals: 0,
            turbidity: 0,
            dissolvedOxygen: 0,
            ammonia: 0,
            nitrates: 0,
            phosphates: 0,
            temperature: 0,
            oilAndGrease: 0,
            coliformCount: 0,
          },
          count: 0,
        };
      }

      monthlySummary[yearMonth].records.push(record);
      Object.keys(monthlySummary[yearMonth].averages).forEach((key) => {
        if (record[key] !== undefined) {
          monthlySummary[yearMonth].averages[key] += record[key];
        }
      });

      monthlySummary[yearMonth].count += 1;
    });

    // Compute average values
    Object.keys(monthlySummary).forEach((month) => {
      Object.keys(monthlySummary[month].averages).forEach((key) => {
        monthlySummary[month].averages[key] /= monthlySummary[month].count;
      });
    });

    res.json(monthlySummary);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ➤ Delete an Effluent Quality Record
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const deletedRecord = await EffluentQuality.findOneAndDelete({
      _id: id,
      email,
    });

    if (!deletedRecord) {
      return res
        .status(404)
        .json({ message: "Record not found or not authorized" });
    }

    res.json({ message: "Effluent quality record deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
