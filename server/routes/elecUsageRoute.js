const express = require("express");
const ElecUsage = require("../models/ElecUsage");

const router = express.Router();

// ➤ Add Electricity Usage Record
router.post("/", async (req, res) => {
  try {
    const { email, location, usageKWh, purpose, remarks, date } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!date) return res.status(400).json({ message: "Date is required" });

    const usageDate = new Date(date);
    const startOfMonth = new Date(
      usageDate.getFullYear(),
      usageDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      usageDate.getFullYear(),
      usageDate.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const existingUsage = await ElecUsage.findOne({
      email,
      location,
      purpose,
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    if (existingUsage) {
      existingUsage.usageKWh += usageKWh;
      await existingUsage.save();
      return res
        .status(200)
        .json({ message: "Electricity usage updated", usage: existingUsage });
    } else {
      const newUsage = new ElecUsage({
        email,
        location,
        usageKWh,
        purpose,
        remarks,
        date,
      });
      await newUsage.save();
      return res
        .status(201)
        .json({ message: "Electricity usage added", usage: newUsage });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ➤ Get All Electricity Usage Records for Logged-in User
router.get("/", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const usages = await ElecUsage.find({ email }).sort({ date: -1 });
    res.json(usages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ➤ Get Electricity Usage Grouped by Month
router.get("/summary/monthly", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const usages = await ElecUsage.find({ email }).sort({ date: -1 });

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
            machinery: 0,
            lighting: 0,
            HVAC: 0,
            other: 0,
          },
          usages: [],
        };
      }

      monthlySummary[yearMonth].totalUsage += usage.usageKWh;
      monthlySummary[yearMonth].breakdown[usage.purpose] += usage.usageKWh;
      monthlySummary[yearMonth].usages.push(usage);
    });

    res.json(monthlySummary);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ➤ Delete an Electricity Usage Record
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const deletedUsage = await ElecUsage.findOneAndDelete({ _id: id, email });

    if (!deletedUsage) {
      return res
        .status(404)
        .json({ message: "Usage record not found or not authorized" });
    }

    res.json({ message: "Electricity usage record deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
