const express = require("express");
const WaterUsage = require("../models/WaterUsage");

const router = express.Router();

// ➤ Add Water Usage Record
router.post("/", async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    const { email, location, usageLitres, purpose, remarks, date } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!date) return res.status(400).json({ message: "Date is required" });

    const waterUsageDate = new Date(date);
    const startOfMonth = new Date(
      waterUsageDate.getFullYear(),
      waterUsageDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      waterUsageDate.getFullYear(),
      waterUsageDate.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const existingUsage = await WaterUsage.findOne({
      email,
      location,
      purpose,
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    if (existingUsage) {
      existingUsage.usageLitres += usageLitres;
      await existingUsage.save();
      return res
        .status(200)
        .json({ message: "Water usage updated", usage: existingUsage });
    } else {
      const newUsage = new WaterUsage({
        email,
        location,
        usageLitres,
        purpose,
        remarks,
        date,
      });
      await newUsage.save();
      return res
        .status(201)
        .json({ message: "Water usage added", usage: newUsage });
    }
  } catch (error) {
    console.error("Error adding water usage:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ➤ Get All Water Usage Records for Logged-in User
router.get("/", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const usages = await WaterUsage.find({ email }).sort({ date: -1 });
    res.json(usages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ➤ Delete a Water Usage Record
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const deletedUsage = await WaterUsage.findOneAndDelete({ _id: id, email });

    if (!deletedUsage) {
      return res
        .status(404)
        .json({ message: "Usage record not found or not authorized" });
    }

    res.json({ message: "Water usage record deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ➤ Get Water Usage Grouped by Month for Logged-in User
router.get("/summary/monthly", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const usages = await WaterUsage.find({ email }).sort({ date: -1 });

    const monthlySummary = {};

    usages.forEach((usage) => {
      const date = new Date(usage.date);
      const yearMonth = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!monthlySummary[yearMonth]) {
        monthlySummary[yearMonth] = {
          totalUsage: 0,
          breakdown: {
            processing: 0,
            cooling: 0,
            cleaning: 0,
            other: 0,
          },
          usages: [],
        };
      }

      monthlySummary[yearMonth].totalUsage += usage.usageLitres;
      monthlySummary[yearMonth].breakdown[usage.purpose] += usage.usageLitres;
      monthlySummary[yearMonth].usages.push(usage);
    });

    res.json(monthlySummary);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
