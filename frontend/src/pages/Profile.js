import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
} from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      setError("User email not found. Please log in again.");
      setLoading(false);
      return;
    }
    axios
      .get(`${process.env.REACT_APP_API_BASE}/api/auth/profile?email=${email}`)
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch profile data.");
        setLoading(false);
      });
  }, [email]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          Loading Profile...
        </motion.div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500"
        >
          {error || "No profile data found."}
        </motion.div>
      </div>
    );
  }

  const { name, phoneno, address, dob } = profile;

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-6">
      <motion.h2
        className="text-4xl font-extrabold text-center mb-10 text-blue-400"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Profile <FaUser className="inline ml-2 text-purple-400" />
      </motion.h2>

      <motion.div
        className="bg-gradient-to-br from-gray-800 to-gray-900 max-w-2xl mx-auto p-10 rounded-2xl shadow-2xl text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl">
            <FaUser />
          </div>
          <h3 className="text-3xl font-bold text-white">{name}</h3>
          <p className="text-blue-300 text-lg">{email}</p>
        </div>

        <div className="mt-8 space-y-5 text-left">
          <div className="flex items-center text-lg">
            <FaPhone className="text-blue-400 mr-3" />
            {phoneno || "Not provided"}
          </div>
          <div className="flex items-center text-lg">
            <FaMapMarkerAlt className="text-blue-400 mr-3" />
            {address || "Not provided"}
          </div>
          <div className="flex items-center text-lg">
            <FaBirthdayCake className="text-blue-400 mr-3" />
            {dob ? new Date(dob).toLocaleDateString("en-IN") : "Not provided"}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
