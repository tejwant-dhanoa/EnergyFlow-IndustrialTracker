import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LucidePlusCircle, LucideDroplet, LucideMapPin } from "lucide-react";

const WaterUsage = () => {
  const [location, setLocation] = useState("");
  const [usageLitres, setUsageLitres] = useState("");
  const [purpose, setPurpose] = useState("processing");
  const [remarks, setRemarks] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddUsage = async () => {
    const email = localStorage.getItem("email");

    if (!email) {
      toast.error("User not logged in.");
      return;
    }

    if (!location || !usageLitres || !date) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}/api/water-usage/`, {
        email,
        location,
        usageLitres: parseFloat(usageLitres),
        purpose,
        remarks,
        date,
      });

      toast.success("Water usage recorded successfully!");

      setLocation("");
      setUsageLitres("");
      setPurpose("processing");
      setRemarks("");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Error adding water usage:", error);
      toast.error("Failed to add water usage.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 relative overflow-hidden">
      {/* Background Animation Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 animate-gradient-bg"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0%,transparent_70%)] opacity-50 animate-pulse-slow"></div>
      </div>

      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-6 bg-gray-800 border-b border-gray-700 relative z-10"
      >
        <h1 className="text-3xl font-bold text-blue-400">Record Water Usage</h1>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="p-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-blue-400 mb-6">
            Add New Water Usage
          </h2>

          {/* Location Input */}
          <div className="relative mb-4">
            <LucideMapPin
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Usage Litres Input */}
          <div className="relative mb-4">
            <LucideDroplet
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            />
            <input
              type="number"
              placeholder="Usage in Litres"
              value={usageLitres}
              onChange={(e) => setUsageLitres(e.target.value)}
              className="pl-10 w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Purpose Selector */}
          <div className="relative mb-4">
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="pl-3 w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
              <option value="processing">Processing</option>
              <option value="cooling">Cooling</option>
              <option value="cleaning">Cleaning</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Remarks Input */}
          <div className="relative mb-4">
            <textarea
              placeholder="Remarks (optional)"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Date Input */}
          <div className="relative mb-6">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleAddUsage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg flex items-center justify-center space-x-2"
          >
            <LucidePlusCircle size={22} />
            <span className="text-lg font-semibold">Record Usage</span>
          </motion.button>
        </motion.div>
      </motion.div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        draggable
      />
    </div>
  );
};

export default WaterUsage;
