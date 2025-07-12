import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaUserShield,
  FaChartPie,
  FaLock,
  FaRocket,
  FaMobileAlt,
  FaBell,
  FaHandsHelping,
  FaLightbulb,
  FaDollarSign,
  FaCogs,
  FaGlobe,
  FaHandshake,
  FaShieldAlt,
} from "react-icons/fa";
import React, { useRef } from "react";
import {
  LucideChevronDown,
  LucideChevronUp,
  LucideHelpCircle,
} from "lucide-react";
import { useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const featuresRef = useRef(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const faqs = [
    {
      question: "How does EnergyFlow help my organization?",
      answer:
        "EnergyFlow offers real-time monitoring and intelligent analytics for water usage, energy consumption, and effluent quality—helping you stay compliant and optimize resource efficiency.",
    },
    {
      question: "Is my data safe with EnergyFlow?",
      answer:
        "Absolutely. We use end-to-end encryption and secure cloud infrastructure to ensure your industrial data remains private and protected at all times.",
    },
    {
      question: "Can I integrate EnergyFlow with existing systems?",
      answer:
        "Yes! EnergyFlow supports API integrations and custom connectors to sync with your current monitoring systems and databases.",
    },
    {
      question: "Is EnergyFlow accessible on mobile devices?",
      answer:
        "Yes, EnergyFlow is fully responsive and can be accessed seamlessly from mobile, tablet, or desktop—perfect for on-the-go monitoring.",
    },
    {
      question: "Is there a free plan available?",
      answer:
        "Yes! We offer all the core features with advanced analytics, reporting, and alerting capabilities free which are tailored for industrial use.",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden py-40 text-center bg-[#0F172A]">
        {/* Background Wave Animation */}
        <div className="absolute inset-0">
          <svg
            className="absolute bottom-0 left-0 w-full h-60 opacity-60"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#waveGradient)"
              fillOpacity="1"
              d="M0,256L60,229.3C120,203,240,149,360,160C480,171,600,245,720,256C840,267,960,213,1080,192C1200,171,1320,213,1380,234.7L1440,256V320H0Z"
            ></path>
            <defs>
              <linearGradient
                id="waveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#1E3A8A", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#2563EB", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Animated Heading with Shimmer Effect */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 animate-shimmer"
        >
          About Us 🌟
        </motion.h1>

        {/* Subtitle with Fade-in Effect */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-5 text-xl text-blue-300 max-w-2xl mx-auto px-6"
        >
          Discover what this app stands for, and how we could together make a
          difference!
        </motion.p>

        {/* Call-to-Action Button with Smooth Hover Animation */}
        <motion.button
          onClick={scrollToFeatures}
          whileHover={{
            scale: 1.12,
            boxShadow: "0px 0px 30px rgba(37, 99, 235, 0.9)",
            textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
          }}
          transition={{ duration: 0.3 }}
          className="mt-10 inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 px-10 py-4 text-lg font-semibold text-white rounded-full shadow-md hover:shadow-blue-600 transition-all duration-300"
        >
          Learn More 📖
        </motion.button>

        {/* Floating Gradient Orbs */}
        <div className="absolute top-14 left-20 w-10 h-10 bg-blue-400 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-40 right-16 w-12 h-12 bg-cyan-500 rounded-full animate-bounce opacity-80"></div>
        <div className="absolute bottom-28 left-28 w-8 h-8 bg-blue-500 rounded-full animate-spin opacity-60"></div>

        {/* CSS for Shimmer Animation */}
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          .animate-shimmer {
            background-size: 200% auto;
            animation: shimmer 3s infinite linear;
          }
        `}</style>
      </section>
      <section className="relative bg-[#0B0F19] text-white py-20 px-6 lg:px-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400">
              Track Industrial Expenses, <br />
              <strong className="text-blue-600">Securely & Smartly.</strong>
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              EnergyFlow is a smart industrial monitoring platform developed to
              help industries track water consumption, electricity usage, and
              environmental quality — all in one place.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-blue-500 px-8 py-3 rounded-md text-lg font-semibold shadow-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                >
                  Get Started
                </motion.button>
              </Link>

              <motion.button
                onClick={scrollToFeatures}
                whileHover={{ scale: 1.1 }}
                className="bg-gray-900 px-8 py-3 rounded-md text-lg font-semibold text-blue-400 shadow-lg hover:bg-gray-800 transition duration-300 cursor-pointer"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 flex justify-center"
          >
            <img
              src="https://greenlifezen.com/wp-content/uploads/2023/10/water-conservation-a-surprising-key-to-energy-savings.jpg"
              alt="Energy Flow"
              className="w-full max-w-lg rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </section>
      <section className="relative bg-[#0B0F19] text-white py-20 px-6 lg:px-20 pt-24">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Features Section */}
          <motion.div
            ref={featuresRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mt-20"
          >
            <h3 className="text-5xl font-extrabold text-center  bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-12">
              Key Features
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.08, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="relative bg-gray-900 bg-opacity-80 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-transparent hover:border-blue-500 transition-all duration-300 flex items-center gap-6 hover:shadow-2xl"
                >
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-md">
                    {React.createElement(feature.icon, {
                      className: "text-white text-4xl",
                    })}
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold text-white">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center text-center py-20 px-6"
          >
            {/* Floating Background Glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute w-96 h-96 bg-blue-500 blur-[120px] rounded-full"
            ></motion.div>

            {/* Vision Heading with Scale and Opacity Animation */}
            <motion.h3
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-5xl font-extrabold bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6"
            >
              Our Vision
            </motion.h3>

            {/* Description with Staggered Animation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
            >
              Our vision is to make{" "}
              <span className="text-blue-400 font-semibold">
                industrial resource tracking simple and effective
              </span>
              , born out of a passion for sustainability and efficiency, our
              system enables data-driven decision making and ensures compliance
              with environmental standards.
            </motion.p>

            {/* Animated Decorative Line */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "15%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 mt-6 rounded-full"
            ></motion.div>
          </motion.div>
          <div className="bg-gray-900 text-white py-20 px-6">
            <div className="container mx-auto max-w-4xl text-center">
              {/* Heading */}
              <div className="mb-12">
                <div className="flex justify-center items-center space-x-3">
                  <LucideHelpCircle size={36} className="text-blue-400" />
                  <h2 className="text-4xl font-bold bg-clip-text  bg-gradient-to-r from-blue-400 to-purple-500">
                    Frequently Asked Questions
                  </h2>
                </div>
                <p className="text-gray-300 mt-3">
                  Find answers to the most common questions about this platform.
                </p>
              </div>

              {/* FAQ List */}
              <div className="space-y-6 py-0 my-0">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-800 rounded-lg shadow-lg p-5 border border-gray-700 cursor-pointer transition-all hover:shadow-indigo-500/50"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {openIndex === index ? (
                          <LucideChevronUp
                            size={24}
                            className="text-blue-400"
                          />
                        ) : (
                          <LucideChevronDown
                            size={24}
                            className="text-gray-400"
                          />
                        )}
                      </motion.div>
                    </div>

                    {/* FAQ Answer */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: openIndex === index ? "auto" : 0,
                        opacity: openIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-gray-300 text-sm mt-2"
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {/* How We Help Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="mt-20"
          >
            <h3 className="text-4xl font-bold text-center text-blue-400 mb-10">
              How We Help
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {helpPoints.map((point, index) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={index}
                  className="bg-gray-900 p-6 rounded-lg shadow-md flex items-center gap-4 hover:bg-gray-800 transition duration-300"
                >
                  {React.createElement(point.icon, {
                    className: "text-blue-400 text-4xl",
                  })}
                  <div>
                    <h4 className="text-xl font-semibold">{point.title}</h4>
                    <p className="text-gray-300 text-sm">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

// Features Data
const features = [
  {
    title: "AI-Driven Analytics",
    description:
      "Leverage intelligent insights to manage water and energy efficiently.",
    icon: FaChartPie,
  },
  {
    title: "Secure Data Handling",
    description:
      "Your environmental and energy data is encrypted and protected.",
    icon: FaLock,
  },
  {
    title: "Real-Time Monitoring",
    description: "Continuously track usage, quality, and emissions live.",
    icon: FaRocket,
  },
  {
    title: "Intuitive Dashboard",
    description:
      "A clear, user-friendly interface for seamless navigation and insights.",
    icon: FaUserShield,
  },
  {
    title: "Custom Threshold Alerts",
    description:
      "Get notified instantly when water or energy usage exceeds set limits.",
    icon: FaCheckCircle,
  },
  {
    title: "Cross-Platform Access",
    description: "Monitor and manage data from any device, anywhere.",
    icon: FaMobileAlt,
  },
];

// How We Help Data
const helpPoints = [
  {
    title: "Smart Resource Management",
    description: "Optimize water and energy usage with intelligent analytics.",
    icon: FaLightbulb,
  },
  {
    title: "Remote Monitoring",
    description: "Track environmental and energy metrics from anywhere.",
    icon: FaGlobe,
  },
  {
    title: "24/7 Alerts & Support",
    description: "Get real-time alerts and dedicated support anytime.",
    icon: FaHandsHelping,
  },
];

export default AboutUs;
