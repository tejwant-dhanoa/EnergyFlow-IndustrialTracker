import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EffluentQuality = () => {
  const [formData, setFormData] = useState({
    location: "",
    date: new Date().toISOString().split("T")[0],
    pH: "",
    BOD: "",
    COD: "",
    TSS: "",
    TDS: "",
    heavyMetals: "",
    turbidity: "",
    dissolvedOxygen: "",
    ammonia: "",
    nitrates: "",
    phosphates: "",
    temperature: "",
    oilAndGrease: "",
    coliformCount: "",
    remarks: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const email = localStorage.getItem("email");
    if (!email) return toast.error("User not logged in");

    const { location, date } = formData;
    if (!location || !date)
      return toast.error("Location and date are required");

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}/api/effluent-quality`, {
        ...formData,
        email,
        // Convert numeric fields to float
        pH: parseFloat(formData.pH),
        BOD: parseFloat(formData.BOD),
        COD: parseFloat(formData.COD),
        TSS: parseFloat(formData.TSS),
        TDS: parseFloat(formData.TDS),
        heavyMetals: parseFloat(formData.heavyMetals),
        turbidity: parseFloat(formData.turbidity),
        dissolvedOxygen: parseFloat(formData.dissolvedOxygen),
        ammonia: parseFloat(formData.ammonia),
        nitrates: parseFloat(formData.nitrates),
        phosphates: parseFloat(formData.phosphates),
        temperature: parseFloat(formData.temperature),
        oilAndGrease: parseFloat(formData.oilAndGrease),
        coliformCount: parseFloat(formData.coliformCount),
      });

      toast.success("Effluent quality record added!");
      setFormData((prev) => ({
        ...prev,
        location: "",
        remarks: "",
        pH: "",
        BOD: "",
        COD: "",
        TSS: "",
        TDS: "",
        heavyMetals: "",
        turbidity: "",
        dissolvedOxygen: "",
        ammonia: "",
        nitrates: "",
        phosphates: "",
        temperature: "",
        oilAndGrease: "",
        coliformCount: "",
        date: new Date().toISOString().split("T")[0],
      }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to add effluent quality record.");
    }
  };

  const fields = [
    "pH",
    "BOD",
    "COD",
    "TSS",
    "TDS",
    "heavyMetals",
    "turbidity",
    "dissolvedOxygen",
    "ammonia",
    "nitrates",
    "phosphates",
    "temperature",
    "oilAndGrease",
    "coliformCount",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 animate-gradient-bg"></div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-6 bg-gray-800 border-b border-gray-700 relative z-10"
      >
        <h1 className="text-3xl font-bold text-blue-400">
          Effluent Quality Form
        </h1>
      </motion.header>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="p-8 relative z-10"
      >
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-3 bg-gray-700 text-white rounded-lg"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <input
                key={field}
                type="number"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field}
                className="p-3 bg-gray-700 text-white rounded-lg"
              />
            ))}
          </div>

          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Remarks (optional)"
            className="w-full p-3 bg-gray-700 text-white rounded-lg resize-none"
            rows={3}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="w-full p-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-lg text-lg font-semibold"
          >
            Submit Effluent Data
          </motion.button>
        </div>
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

export default EffluentQuality;
