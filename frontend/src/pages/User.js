import React from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
//import BudgetPlanning from "./Budgetsuggestion";
import BudgetSuggestion from "./Budgetsuggestion";
import WaterUsage from "./WaterUsage";
import ElecUsage from "./ElecUsage";
import EffluentQuality from "./EffluentQuality";
import MonthlyReport from "./MonthlyReport";

const User = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Content area */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-water-usage" element={<WaterUsage />} />
          <Route path="/add-electric-usage" element={<ElecUsage />} />
          <Route path="/add-effluent-quality" element={<EffluentQuality />} />
          <Route path="/budget" element={<BudgetSuggestion />} />
          <Route path="/report" element={<MonthlyReport />} />
        </Routes>
      </div>
    </div>
  );
};

export default User;
