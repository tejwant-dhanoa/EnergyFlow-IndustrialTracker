// WaterElectricEffluentDashboard.js
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { AlertTriangle } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useMemo } from "react";

const WaterElectricEffluentDashboard = () => {
  const [waterUsage, setWaterUsage] = useState([]);
  const [elecUsage, setElecUsage] = useState([]);
  const [effluentData, setEffluentData] = useState([]);
  const [timeRange, setTimeRange] = useState("week");
  const [chartType, setChartType] = useState("bar");
  const email = localStorage.getItem("email");
  const dashboardRef = useRef();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [waterRes, elecRes, effluentRes] = await Promise.all([
          axios.get(
            `${process.env.REACT_APP_API_BASE}/api/water-usage?email=${email}`
          ),
          axios.get(
            `${process.env.REACT_APP_API_BASE}/api/elec-usage?email=${email}`
          ),
          axios.get(
            `${process.env.REACT_APP_API_BASE}/api/effluent-quality?email=${email}`
          ),
        ]);

        setWaterUsage(waterRes.data);
        setElecUsage(elecRes.data);
        setEffluentData(effluentRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    if (email) fetchAllData();
  }, [email]);

  const noDataAvailable =
    waterUsage.length === 0 &&
    elecUsage.length === 0 &&
    effluentData.length === 0;

  const filterByTimeRange = (data) => {
    const now = new Date();
    const past = new Date();
    past.setDate(now.getDate() - (timeRange === "week" ? 7 : 30));
    return data.filter((d) => new Date(d.date) >= past);
  };

  const getAvg = (arr, key) => {
    const valid = arr.filter((i) => i[key]);
    const sum = valid.reduce((a, b) => a + b[key], 0);
    return valid.length ? sum / valid.length : 0;
  };

  const renderUsageChart = (data, key, label, avg, color) => {
    const chartData = data.map((i) => ({ date: i.date, [key]: i[key] }));

    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-blue-300">{label}</h3>
        <ResponsiveContainer width="100%" height={300}>
          {chartType === "bar" ? (
            <BarChart data={chartData} barCategoryGap={20} barGap={5}>
              <XAxis
                dataKey="date"
                stroke="#ccc"
                tickFormatter={(d) =>
                  new Date(d).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })
                }
              />
              <YAxis stroke="#ccc" />
              <Tooltip
                formatter={(value, name) => [
                  `${value}`,
                  key === "usageLitres" ? "Litres" : "kWh",
                ]}
                labelFormatter={(label) =>
                  new Date(label).toLocaleDateString("en-IN")
                }
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <ReferenceLine
                y={""}
                stroke="#888"
                strokeDasharray="3 3"
                label={{
                  value: "Avg",
                  position: "insideTopRight",
                  fill: "#ccc",
                }}
              />
              <Bar dataKey={key} radius={[4, 4, 0, 0]} isAnimationActive>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry[key] > avg * 1.3 ? "#ff6b6b" : color}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <LineChart data={chartData}>
              <XAxis
                dataKey="date"
                stroke="#ccc"
                tickFormatter={(d) =>
                  new Date(d).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })
                }
              />
              <YAxis stroke="#ccc" />
              <Tooltip
                formatter={(value, name) => [
                  `${value}`,
                  key === "usageLitres" ? "Litres" : "kWh",
                ]}
                labelFormatter={(label) =>
                  new Date(label).toLocaleDateString("en-IN")
                }
              />
              <ReferenceLine
                y={avg}
                stroke="#888"
                strokeDasharray="3 3"
                label={{
                  value: "Avg",
                  position: "insideTopRight",
                  fill: "#ccc",
                }}
              />
              <Line
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
        {chartData.some((d) => d[key] > avg * 1.3) && (
          <p className="mt-2 text-red-400 flex items-center">
            <AlertTriangle className="mr-2" size={20} /> High usage spikes
            detected!
          </p>
        )}
      </div>
    );
  };

  const renderEffluentWarnings = () => {
    const dangerous = effluentData.filter(
      (entry) => entry.BOD > 30 || entry.TSS > 100 || entry.coliformCount > 5000
    );

    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-pink-400">
          Effluent Quality Alerts
        </h3>
        {dangerous.length > 0 ? (
          <ul className="space-y-2">
            {dangerous.map((entry, index) => (
              <li
                key={index}
                className="bg-red-900/40 p-3 rounded-lg border border-red-500"
              >
                <p>
                  <b>Location:</b> {entry.location}{" "}
                  <AlertTriangle className="inline text-red-500 ml-2 animate-pulse" />
                </p>
                <p className="text-sm text-red-300">
                  Exceeded safe levels: {entry.BOD > 30 && "BOD "}{" "}
                  {entry.TSS > 100 && "TSS "}{" "}
                  {entry.coliformCount > 5000 && "Coliforms"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-400">
            All effluent quality levels are within safe limits.
          </p>
        )}
      </div>
    );
  };

  const exportToPDF = () => {
    if (!dashboardRef.current) return;
    html2canvas(dashboardRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("dashboard.pdf");
    });
  };

  const waterAvg = getAvg(waterUsage, "usageLitres");
  const elecAvg = getAvg(elecUsage, "usageKWh");
  const anyCritical =
    waterUsage.some((i) => i.usageLitres > waterAvg * 1.5) ||
    elecUsage.some((i) => i.usageKWh > elecAvg * 1.5);

  const filteredWaterUsage = useMemo(
    () => filterByTimeRange(waterUsage),
    [waterUsage, timeRange]
  );
  const filteredElecUsage = useMemo(
    () => filterByTimeRange(elecUsage),
    [elecUsage, timeRange]
  );

  return (
    <div
      className="p-6 bg-gray-900 min-h-screen text-white pt-24"
      ref={dashboardRef}
    >
      {noDataAvailable ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-800 rounded-lg shadow-lg p-10">
          <svg
            className="w-20 h-20 text-indigo-400 mb-6 animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9V6.75a2.25 2.25 0 114.5 0V9m-9 4.5h13.5M4.5 13.5L6 18h12l1.5-4.5"
            />
          </svg>
          <h3 className="text-2xl font-bold text-white mb-2">
            No Data Available
          </h3>
          <p className="text-gray-300 text-center max-w-md">
            No industrial water, electricity, or effluent data has been added
            for your account yet. Please start uploading records to view your
            resource monitoring dashboard.
          </p>
        </div>
      ) : (
        <>
          {anyCritical && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center font-semibold animate-pulse">
              Critical Alert: Usage exceeded safe thresholds!
            </div>
          )}

          <motion.h2
            className="text-3xl font-bold text-center mb-6 text-blue-400"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Resource Monitoring Dashboard
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 relative z-50">
              <label className="text-sm text-gray-300">Time Range</label>
              <select
                className="relative z-50 bg-gray-800 border border-gray-600 text-sm px-3 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-300">Chart Type</label>
              <button
                onClick={() =>
                  setChartType((prev) => (prev === "bar" ? "line" : "bar"))
                }
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-indigo-600 transition"
              >
                Toggle to {chartType === "bar" ? "Line" : "Bar"}
              </button>
            </div>

            <button
              onClick={exportToPDF}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm px-5 py-2 rounded-lg shadow hover:from-green-600 hover:to-emerald-600 transition"
            >
              Export PDF
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {renderUsageChart(
              filteredWaterUsage,
              "usageLitres",
              "Water Usage (Litres)",
              waterAvg,
              "#3498db"
            )}
            {renderUsageChart(
              filteredElecUsage,
              "usageKWh",
              "Electricity Usage (kWh)",
              elecAvg,
              "#f1c40f"
            )}
          </div>

          <div className="mt-8">{renderEffluentWarnings()}</div>
        </>
      )}
    </div>
  );
};

export default WaterElectricEffluentDashboard;
