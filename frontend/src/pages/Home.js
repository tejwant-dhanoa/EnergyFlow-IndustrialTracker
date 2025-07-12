import { motion } from "framer-motion";
import {
  FaWallet,
  FaChartLine,
  FaUserShield,
  FaUsers,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import {
  BarChart,
  Wallet,
  FileText,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  LucideArrowRight,
  LucideStar,
  LucideTrendingUp,
  LucideWallet,
} from "lucide-react";
import KeenSlider from "keen-slider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TestimonialSlider from "../components/Testimonals";
import Footer from "../components/Footer";
const Home = () => {
  useEffect(() => {
    import("keen-slider/keen-slider.min.css");
  }, []);
  useEffect(() => {
    const element = document.querySelector(".some-class");
    if (element) {
      element.classList.add("new-class");
    }
  }, []);

  // const testimonials = [
  //   {
  //     name: "John Doe",
  //     position: "CEO, Company A",
  //     image: "https://via.placeholder.com/100",
  //     text: "This platform completely transformed how we manage water and energy across our plant. The real-time alerts and weekly reports have helped us cut waste by 25%",
  //   },
  //   {
  //     name: "Jane Smith",
  //     position: "CTO, Company B",
  //     image: "https://via.placeholder.com/100",
  //     text: "We were spending hours compiling utility data manually. Now it's fully automated — from tracking to reporting.",
  //   },
  //   {
  //     name: "Robert Johnson",
  //     position: "Manager, Company C",
  //     image: "https://via.placeholder.com/100",
  //     text: " The dashboard is intuitive, the AI predictions are spot on, and we've already noticed a significant drop in unnecessary resource consumption.",
  //   },
  // ];
  const [sliderRef, setSliderRef] = useState(null);

  useEffect(() => {
    if (sliderRef) {
      const slider = new KeenSlider(sliderRef, {
        loop: true,
        slidesPerView: 1,
        spacing: 10,
        breakpoints: {
          "(min-width: 768px)": {
            slidesPerView: 2,
            spacing: 15,
          },
          "(min-width: 1024px)": {
            slidesPerView: 3,
            spacing: 20,
          },
        },
      });
      return () => slider.destroy();
    }
  }, [sliderRef]);

  const features = [
    {
      icon: Wallet,
      title: "Real-Time Monitoring",
      description:
        "Instantly track water and energy metrics across all departments.",
    },
    {
      icon: BarChart,
      title: "AI-Powered Insights",
      description: "Forecast usage, detect anomalies, and optimize efficiency.",
    },
    {
      icon: FileText,
      title: "Automated Reports",
      description: "Receive monthly usage reports with regulation summaries.",
    },
    {
      icon: ShieldCheck,
      title: "Top-Notch Security",
      description: "All data is encrypted and backed by robust infrastructure.",
    },
    {
      icon: TrendingUp,
      title: "Custom Threshold Alerts",
      description:
        "Set usage thresholds and get instant alerts when limits are breached.",
    },
    {
      icon: Users,
      title: "Trusted by Industry Leaders",
      description:
        "Adopted by modern facilities for smarter resource management.",
    },
  ];
  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-gray-950/30 to-indigo-900/20 animate-gradient-x"></div>

          <div className="relative z-10 max-w-7xl px-6 py-12 mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Enhanced */}
            <motion.div
              className="text-left space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Highlighted Text Element */}
              <motion.div
                className="flex items-center space-x-3 bg-blue-500/20 px-4 py-2 rounded-lg border border-blue-500/50 shadow-lg backdrop-blur-md w-max"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <LucideTrendingUp size={20} className="text-blue-400" />
                <span className="text-blue-400 font-medium text-sm uppercase tracking-wide">
                  Smart Industrial Energy Management
                </span>
              </motion.div>

              {/* Animated Heading */}
              <motion.h1
                className="text-5xl md:text-6xl font-extrabold leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text ">
                  Take Control of Energy and Water Utlization
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="mt-6 text-lg text-gray-300 max-w-lg bg-gray-800/50 px-6 py-4 rounded-lg shadow-lg backdrop-blur-lg border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Smart industry monitoring made simple - track water usage,
                energy consumption, and environmental health in real time.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-6 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <motion.a
                  href="/signup"
                  className="relative flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all px-8 py-3.5 text-lg font-semibold rounded-lg shadow-xl overflow-hidden group border border-blue-500"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 text-white drop-shadow-lg">
                    Get Started
                  </span>
                  <LucideArrowRight size={20} className="ml-3 text-white" />
                  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.a>

                <motion.a
                  href="/about"
                  className="relative flex items-center justify-center border border-gray-600 px-8 py-3.5 text-lg font-semibold rounded-lg hover:bg-gray-800/50 transition-all overflow-hidden group"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span className="relative z-10">Learn More</span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Side - Floating 3D Card */}
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-lg p-6 bg-gray-900/60 rounded-lg shadow-2xl backdrop-blur-md border border-gray-700/50 hover:border-gray-600/50 transition-all group">
                <motion.img
                  className="rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                  src="https://nira-water.com/wp-content/uploads/2020/07/industrial-commercial-waste-water-treatment-purification-plant-companies-jakarta-nira-chemical-industry-plant-indoor-view.jpg"
                  alt="water plant"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                />

                {/* Floating Icons */}
                <motion.div
                  className="absolute -top-6 -left-6 w-12 h-12 bg-blue-700/20 rounded-full flex items-center justify-center backdrop-blur-md border border-blue-700/30 shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <LucideStar size={24} className="text-blue-400" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -right-6 w-12 h-12 bg-indigo-700/20 rounded-full flex items-center justify-center backdrop-blur-md border border-indigo-700/30 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <LucideTrendingUp size={24} className="text-indigo-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Stats Section */}
        <section className="mt-12 px-6 pb-10">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 
        bg-[radial-gradient(circle_at_top,#0B0F19,#06080F)] p-12 rounded-xl shadow-lg 
        text-center text-white border-t border-gray-700"
          >
            {/* Total Expenses */}
            <motion.div
              className="flex flex-col items-center group"
              whileHover={{ scale: 1.05 }}
            >
              <FaWallet className="text-6xl text-blue-500 mb-3 transition group-hover:text-blue-400 drop-shadow-md" />
              <h2 className="text-4xl font-extrabold">Lower Costs</h2>
              <p className="text-gray-400">Saves your energy</p>
            </motion.div>

            {/* Budget Success Rate */}
            <motion.div
              className="flex flex-col items-center group"
              whileHover={{ scale: 1.05 }}
            >
              <FaChartLine className="text-6xl text-green-500 mb-3 transition group-hover:text-green-400 drop-shadow-md" />
              <h2 className="text-4xl font-extrabold">90%</h2>
              <p className="text-gray-400">Alert Accuracy</p>
            </motion.div>

            {/* Secure Data */}
            <motion.div
              className="flex flex-col items-center group"
              whileHover={{ scale: 1.05 }}
            >
              <FaUserShield className="text-6xl text-red-500 mb-3 transition group-hover:text-red-400 drop-shadow-md" />
              <h2 className="text-4xl font-extrabold">Secure</h2>
              <p className="text-gray-400">Protected Data</p>
            </motion.div>

            {/* Active Users */}
            <motion.div
              className="flex flex-col items-center group"
              whileHover={{ scale: 1.05 }}
            >
              <FaUsers className="text-6xl text-yellow-500 mb-3 transition group-hover:text-yellow-400 drop-shadow-md" />
              <h2 className="text-4xl font-extrabold">Many</h2>
              <p className="text-gray-400">Initial Nodes Connected</p>
            </motion.div>
          </div>
        </section>
        {/* Features Section */}
        <section className="py-16 bg-[#0B0F19] text-white">
          <h2 className="text-center text-4xl font-bold mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-10 px-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
                className="bg-[#161B22] p-6 rounded-xl shadow-md border border-gray-700 hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <feature.icon className="text-blue-500 w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        {/* Testimonials Section */}
        <TestimonialSlider />
        {/* Call to Action */}
        <section className="relative bg-[#0B0F19] text-white py-20 px-6 lg:px-20 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between"
          >
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left lg:w-1/2">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
              >
                Optimize Your{" "}
                <span className="text-blue-400">Industrial Resources</span>{" "}
                Today
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-gray-300 text-lg mb-6"
              >
                Track water usage, monitor energy consumption, and stay
                compliant with real-time AI-powered insights.
              </motion.p>

              {/* Key Benefits with Animated Icons */}
              <div className="flex flex-col gap-3 text-gray-200">
                {[
                  "AI-Driven Utility Management",
                  "Secure & Scalable Infrastructure",
                  "Real-Time Environmental Insights",
                ].map((item, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-blue-400 hover:text-blue-500 transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-md" />
                    {item}
                  </motion.p>
                ))}
              </div>

              {/* Sign Up Button with 3D Hover Effect */}
              <Link to="/signup">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0px 10px 20px rgba(0, 123, 255, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 bg-blue-500 px-8 py-3 rounded-lg text-lg font-semibold text-white shadow-lg hover:bg-blue-600 transition-all duration-300"
                >
                  Get Started for Free
                </motion.button>{" "}
              </Link>
            </div>

            {/* Right Side - Illustration with Zoom Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-10 lg:mt-0 lg:w-1/2"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                src="https://www.repsol.com/content/dam/repsol-corporate/es/energia-e-innovacion/consumo-energetico-cabecera.jpg.transform/rp-rendition-md/image.jpg"
                alt="Energy Tracker Dashboard"
                className="w-full rounded-lg shadow-xl border border-gray-800 transition-transform duration-500"
              />
            </motion.div>
          </motion.div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Home;
