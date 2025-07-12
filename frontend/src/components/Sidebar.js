import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Sidebar.css";
import { useContext } from "react"; // Add this import
import AuthContext from "../context/AuthContext"; // Add this import
import { useNavigate } from "react-router-dom";

// SVG Icons (Heroicons-inspired)
const DashboardIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);
const LogoutIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

const WaterDropIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 3C12 3 7 9 7 13a5 5 0 0010 0c0-4-5-10-5-10z"
    />
  </svg>
);

const ElectricityIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 10V3L5 14h6v7l8-11h-6z"
    />
  </svg>
);

const ProfileIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

// const AdviceIcon = () => (
//   <svg
//     className="w-5 h-5"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//     />
//   </svg>
// );

const EffluentQualityIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Drop shape */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 3C12 3 7 9 7 13a5 5 0 0010 0c0-4-5-10-5-10z"
    />
    {/* Test tube / bubbles inside */}
    <circle cx="12" cy="12" r="1" strokeWidth="2" />
    <circle cx="12" cy="15" r="0.5" strokeWidth="1" />
  </svg>
);

const MonthlyReportIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 17v-4m4 4V9m4 8V5M3 3h18v18H3V3z"
    />
  </svg>
);

const BudgetSuggestionIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useContext(AuthContext);
  const closeSidebar = () => {
    console.log("Sidebar close called");
    toggleSidebar();
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    closeSidebar();
    navigate("/login"); // Redirect after logout
  };
  // Animation variants for sidebar
  const sidebarVariants = {
    open: {
      x: 0,
      transition: { duration: 0.5, ease: [0.6, 0.05, 0.36, 0.95] },
    },
    closed: {
      x: "-100%",
      transition: { duration: 0.5, ease: [0.6, 0.05, 0.36, 0.95] },
    },
  };

  // Animation variants for links
  const linkVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`sidebar ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.h2
          className="text-3xl font-bold text-blue-200 mb-10 tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          User Dashboard
        </motion.h2>
        <ul>
          {[
            { to: "/user/", label: "Dashboard", Icon: DashboardIcon },
            // {
            //   to: "/user/add-transaction",
            //   label: "Add Transaction",
            //   Icon: TransactionIcon,
            // },
            {
              to: "/user/add-water-usage",
              label: " Add Water Usage",
              Icon: WaterDropIcon,
            },
            {
              to: "/user/add-effluent-quality",
              label: "Effluent Quality",
              Icon: EffluentQualityIcon,
            },
            {
              to: "/user/add-electric-usage",
              label: "Add Electricity Consumption ",
              Icon: ElectricityIcon,
            },

            {
              to: "/user/budget",
              label: "AI Resource Suggestions",
              Icon: BudgetSuggestionIcon,
            },

            {
              to: "/user/report",
              label: "Monthly Report",
              Icon: MonthlyReportIcon,
            },

            { to: "/user/profile", label: "Profile", Icon: ProfileIcon },
          ].map((item, index) => (
            <motion.li
              key={item.to}
              className="mb-4"
              custom={index}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
            >
              <NavLink
                to={item.to}
                className="sidebar-link"
                activeClassName="active-link"
                onClick={closeSidebar}
              >
                <item.Icon />
                <span>{item.label}</span>
              </NavLink>
            </motion.li>
          ))}

          {/* Add Logout Button */}
          <motion.li
            className="mb-4 mt-8" // Added mt-8 for top margin
            custom={5} // Next index after the last menu item
            variants={linkVariants}
            initial="hidden"
            animate="visible"
          >
            <button
              onClick={handleLogout}
              className="sidebar-link w-full text-left" // Use same styling as other links
            >
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </motion.li>
        </ul>
      </motion.div>
    </>
  );
};

export default Sidebar;
