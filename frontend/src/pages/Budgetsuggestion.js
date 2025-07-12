import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import "./BudgetPlanning.css";

const BudgetSuggestion = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const email = localStorage.getItem("email");
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const messages = [
    "Analyzing resource patterns...",
    "Evaluating energy and water usage...",
    "Checking effluent quality benchmarks...",
    "Consulting Gemini for insights...",
    "Formulating smart recommendations...",
  ];

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/budget/suggestion?email=${email}&month=${month}&year=${year}`
        );
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching resource suggestions:", err);
        setLoading(false);
      }
    };

    if (email) fetchSuggestions();
  }, [email, month, year]);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % messages.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [loading, messages.length]);

  if (loading) {
    return (
      <div className="loading-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
        <motion.div
          className="spinner"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Loader2 className="spinner-icon text-blue-500 animate-spin" />
        </motion.div>

        <motion.h2
          className="loading-message text-xl font-semibold text-blue-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {messages[loadingMessageIndex]}
        </motion.h2>

        <motion.p
          className="loading-subtext text-sm text-gray-400 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Please wait while Gemini prepares your industrial insights...
        </motion.p>
      </div>
    );
  }

  if (!data)
    return (
      <div className="text-red-500 text-center mt-10">No data available</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-6 py-10">
      <motion.h2
        className="text-3xl font-bold mb-8 text-blue-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Resource Optimization Suggestions
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <motion.div
          className="bg-[#161B22] p-6 rounded-xl border border-gray-700 shadow-md"
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-xl font-semibold text-blue-300 mb-2">
            Water Usage
          </h3>
          <p>
            <strong>Total:</strong> {data.resourceSummary.totalWater} L
          </p>
          <p>
            <strong>Avg Daily:</strong> {data.resourceSummary.avgDailyWater} L
          </p>
        </motion.div>

        <motion.div
          className="bg-[#161B22] p-6 rounded-xl border border-gray-700 shadow-md"
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">
            Electricity Usage
          </h3>
          <p>
            <strong>Total:</strong> {data.resourceSummary.totalElectricity} kWh
          </p>
          <p>
            <strong>Avg Daily:</strong>{" "}
            {data.resourceSummary.avgDailyElectricity} kWh
          </p>
        </motion.div>

        <motion.div
          className="bg-[#161B22] p-6 rounded-xl border border-gray-700 shadow-md"
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-xl font-semibold text-green-300 mb-2">
            Effluent Quality
          </h3>
          <p>
            <strong>BOD:</strong> {data.resourceSummary.effluent.BOD}
          </p>
          <p>
            <strong>TSS:</strong> {data.resourceSummary.effluent.TSS}
          </p>
          <p>
            <strong>Coliform Count:</strong>{" "}
            {data.resourceSummary.effluent.coliformCount}
          </p>
        </motion.div>
      </div>

      <motion.h3
        className="text-2xl font-semibold text-white mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        AI-Based Resource Recommendations
      </motion.h3>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {data.resourceRecommendations.map((item, index) => (
          <motion.div
            key={index}
            className="bg-[#1f2937] p-5 rounded-lg border border-gray-700 shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-lg font-bold text-blue-400">
              {item.type}: {item.parameter}
            </h4>
            <p>
              <strong>Current:</strong> {item.currentValue}
            </p>
            <p>
              <strong>Recommended:</strong> {item.recommendedValue}
            </p>
            <p className="text-green-400">💡 {item.suggestion}</p>
            <p className="text-sm text-gray-400">
              Change: {item.adjustmentPercentage}%
            </p>
          </motion.div>
        ))}
      </div>

      <motion.h3
        className="text-2xl font-semibold text-white mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        Key Insights
      </motion.h3>
      <ul className="list-disc list-inside text-gray-300 mb-10 space-y-2">
        {data.keyInsights.map((insight, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            🔎 {insight}
          </motion.li>
        ))}
      </ul>

      <motion.h3
        className="text-2xl font-semibold text-white mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        Actionable Advice
      </motion.h3>
      <ul className="list-disc list-inside text-green-300 space-y-2">
        {data.actionableAdvice.map((tip, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            ✅ {tip}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetSuggestion;
