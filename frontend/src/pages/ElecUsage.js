import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LucideBolt, LucideMapPin, LucideClipboardCheck } from "lucide-react";

const ElecUsagePage = () => {
  const [location, setLocation] = useState("");
  const [usageKWh, setUsageKWh] = useState("");
  const [purpose, setPurpose] = useState("machinery");
  const [remarks, setRemarks] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleAddUsage = async () => {
    const email = localStorage.getItem("email");

    if (!email) {
      toast.error("User not logged in.");
      return;
    }

    if (!location || !usageKWh || !date) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}/api/elec-usage/`, {
        email,
        location,
        usageKWh: parseFloat(usageKWh),
        purpose,
        remarks,
        date,
      });

      toast.success("Electricity usage recorded successfully!");
      setLocation("");
      setUsageKWh("");
      setPurpose("machinery");
      setRemarks("");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Error adding electricity usage:", error);
      toast.error("Failed to add electricity usage.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 relative overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-6 bg-gray-800 border-b border-gray-700"
      >
        <h1 className="text-3xl font-bold text-yellow-400">
          Record Electricity Usage ⚡
        </h1>
      </motion.header>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="p-8"
      >
        <motion.div className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">
            Add New Electricity Usage Record
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
              className="pl-10 w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Electricity Usage (kWh) Input */}
          <div className="relative mb-4">
            <LucideBolt
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            />
            <input
              type="number"
              placeholder="Usage in kWh"
              value={usageKWh}
              onChange={(e) => setUsageKWh(e.target.value)}
              className="pl-10 w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Purpose Selector */}
          <div className="relative mb-4">
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="pl-3 w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
            >
              <option value="machinery">Machinery</option>
              <option value="lighting">Lighting</option>
              <option value="HVAC">HVAC</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Remarks Input */}
          <div className="relative mb-4">
            {/* <LucideClipboardCheck
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            /> */}
            <textarea
              placeholder="Remarks (optional)"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Date Input */}
          <div className="relative mb-6">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleAddUsage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full p-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg shadow-lg flex items-center justify-center space-x-2"
          >
            <LucideBolt size={22} />
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

export default ElecUsagePage;
