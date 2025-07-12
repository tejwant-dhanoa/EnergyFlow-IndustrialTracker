const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const WaterUsage = require("../models/WaterUsage");
const ElecUsage = require("../models/ElecUsage");
const EffluentQuality = require("../models/EffluentQuality");
require("dotenv").config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get("/suggestion", async (req, res) => {
  try {
    const { email, month, year } = req.query;
    if (!email || !month || !year)
      return res.status(400).json({ error: "Missing query parameters" });

    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    const startDate = new Date(yearNum, monthNum - 1, 1);
    const endDate = new Date(yearNum, monthNum, 0, 23, 59, 59, 999);

    // Fetch usage data
    const [waterUsage, elecUsage, effluentData] = await Promise.all([
      WaterUsage.find({ email, date: { $gte: startDate, $lte: endDate } }),
      ElecUsage.find({ email, date: { $gte: startDate, $lte: endDate } }),
      EffluentQuality.find({ email, date: { $gte: startDate, $lte: endDate } }),
    ]);

    // Compute totals and averages
    const totalWater = waterUsage.reduce(
      (acc, w) => acc + (w.usageLitres || 0),
      0
    );
    const avgWater = waterUsage.length ? totalWater / waterUsage.length : 0;
    const totalElec = elecUsage.reduce((acc, e) => acc + (e.usageKWh || 0), 0);
    const avgElec = elecUsage.length ? totalElec / elecUsage.length : 0;

    const avgEffluent = {
      BOD:
        effluentData.reduce((a, e) => a + (e.BOD || 0), 0) /
        (effluentData.length || 1),
      TSS:
        effluentData.reduce((a, e) => a + (e.TSS || 0), 0) /
        (effluentData.length || 1),
      coliformCount:
        effluentData.reduce((a, e) => a + (e.coliformCount || 0), 0) /
        (effluentData.length || 1),
    };

    const prompt = `
You are an expert industrial environmental and resource efficiency consultant. Analyze the following monthly resource data from a manufacturing plant and generate practical suggestions for reducing usage and improving compliance.

Strictly avoid domestic or household advice.

Month: ${monthNum}/${yearNum}
Total Water Usage: ${totalWater.toFixed(2)} Litres
Average Daily Water Usage: ${avgWater.toFixed(2)} Litres
Total Electricity Usage: ${totalElec.toFixed(2)} kWh
Average Daily Electricity Usage: ${avgElec.toFixed(2)} kWh

Effluent Quality (average levels):
- BOD: ${avgEffluent.BOD.toFixed(2)}
- TSS: ${avgEffluent.TSS.toFixed(2)}
- Coliform Count: ${avgEffluent.coliformCount.toFixed(2)}

Instructions:
- Give detailed suggestions specific to industrial operations.
- Include safety, process, cost, or regulation-related insights.
- Include at least 3 key insights and 3 pieces of advice.

Response format:
{
  "resourceSummary": {
    "month": ${monthNum},
    "year": ${yearNum},
    "totalWater": ${totalWater.toFixed(2)},
    "avgDailyWater": ${avgWater.toFixed(2)},
    "totalElectricity": ${totalElec.toFixed(2)},
    "avgDailyElectricity": ${avgElec.toFixed(2)},
    "effluent": {
      "BOD": ${avgEffluent.BOD.toFixed(2)},
      "TSS": ${avgEffluent.TSS.toFixed(2)},
      "coliformCount": ${avgEffluent.coliformCount.toFixed(2)}
    }
  },
  "resourceRecommendations": [
    {
      "type": "Water | Electricity | Effluent",
      "parameter": "e.g. BOD or Water Usage",
      "currentValue": 1500,
      "recommendedValue": 1200,
      "suggestion": "Your AI-generated suggestion",
      "adjustmentPercentage": -20
    }
  ],
  "keyInsights": ["..."],
  "actionableAdvice": ["..."]
}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();

    try {
      const json = JSON.parse(raw.replace(/```json|```/g, ""));
      return res.status(200).json(json);
    } catch (err) {
      console.error("❌ AI JSON parsing failed:", err);
      return res.status(200).json({
        resourceSummary: {
          month: monthNum,
          year: yearNum,
          totalWater: totalWater.toFixed(2),
          avgDailyWater: avgWater.toFixed(2),
          totalElectricity: totalElec.toFixed(2),
          avgDailyElectricity: avgElec.toFixed(2),
          effluent: avgEffluent,
        },
        resourceRecommendations: [],
        keyInsights: ["Could not parse AI response. Showing basic summary."],
        actionableAdvice: [],
      });
    }
  } catch (error) {
    console.error("💥 Internal error:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate resource suggestion" });
  }
});

module.exports = router;
