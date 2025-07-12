import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/Aboutus";
import ContactUs from "./pages/Contactus";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";

import WaterUsage from "./pages/WaterUsage";
import ElecUsage from "./pages/ElecUsage";
import EffluentQuality from "./pages/EffluentQuality";
import Profile from "./pages/Profile";
import User from "./pages/User";
import AdminLogin from "./pages/AdminLogin";
import MonthlyReport from "./pages/MonthlyReport";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-water-usage" element={<WaterUsage />} />
          <Route path="/add-electric-usage" element={<ElecUsage />} />
          <Route path="/add-effluent-quality" element={<EffluentQuality />} />
          <Route path="/report" element={<MonthlyReport />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/user/*"
            element={
              <PrivateRoute>
                <User
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
