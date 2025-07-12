import React, { useEffect, useRef, useState, useContext } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const MonthlyReport = () => {
  const [waterData, setWaterData] = useState([]);
  const [elecData, setElecData] = useState([]);
  const [effluentData, setEffluentData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [notification, setNotification] = useState(null);
  const reportRef = useRef();

  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    if (!user || !token) return;

    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const email = user.email;

        const [water, elec, effluent, userRes] = await Promise.all([
          axios.get(`/api/water-usage?email=${email}`, config),
          axios.get(`/api/elec-usage?email=${email}`, config),
          axios.get(`/api/effluent-quality?email=${email}`, config),
          axios.get(`/api/auth/profile?email=${email}`, config),
        ]);

        setWaterData(water.data);
        setElecData(elec.data);
        setEffluentData(effluent.data);
        setUserInfo(userRes.data);
      } catch (err) {
        if (err.response?.status === 401) {
          console.warn("Token expired or unauthorized. Logging out.");
          logout();
          navigate("/login");
        } else {
          console.error("Error fetching monthly report data", err);
        }
      }
    };

    fetchData();
  }, [user, token, logout, navigate]);

  const filterCurrentMonth = (dataArray) => {
    const now = new Date();
    return dataArray.filter((item) => {
      const date = new Date(item.date);
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    });
  };

  const filteredWater = filterCurrentMonth(waterData);
  const filteredElec = filterCurrentMonth(elecData);
  const filteredEffluent = filterCurrentMonth(effluentData);

  const exportToPDF = async () => {
    const canvas = await html2canvas(reportRef.current, {
      useCORS: true,
      scale: 2,
      windowWidth: reportRef.current.scrollWidth,
      windowHeight: reportRef.current.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * width) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, width, imgHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, width, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save(`Monthly_Report_${currentMonth}.pdf`);
  };

  const sendToEmail = async () => {
    const canvas = await html2canvas(reportRef.current, {
      useCORS: true,
      scale: 2,
      windowWidth: reportRef.current.scrollWidth,
      windowHeight: reportRef.current.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * width) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, width, imgHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, width, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    const pdfBlob = pdf.output("blob");
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("pdf", pdfBlob, `Monthly_Report_${currentMonth}.pdf`);

    try {
      await axios.post("/api/auth/send-monthly-report", formData);
      setNotification({
        type: "success",
        message: "Report emailed successfully!",
      });
    } catch (err) {
      setNotification({
        type: "error",
        message: "Failed to email the report.",
      });
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-6 pt-24">
      <div
        className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-300 text-black"
        ref={reportRef}
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          Monthly Resource Report – {currentMonth}
        </h2>

        <p className="mb-4 text-gray-700">
          <strong>User:</strong> {userInfo.name || "-"} (
          {userInfo.email || "N/A"})
        </p>

        {filteredWater.length === 0 &&
        filteredElec.length === 0 &&
        filteredEffluent.length === 0 ? (
          <div className="bg-blue-50 p-6 rounded-lg mt-6 text-center">
            <p className="text-xl text-blue-600 font-semibold mb-2">
              No industrial data added for this month yet.
            </p>
            <p className="text-gray-500">
              Start tracking water usage, electricity consumption, or effluent
              quality to view reports here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredWater.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Daily Water Usage
                </h3>
                {filteredWater.map((entry, idx) => (
                  <div key={idx} className="border-b pb-4 mb-4">
                    <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
                    <p>Usage: {entry.usageLitres} Litres</p>
                  </div>
                ))}
              </section>
            )}

            {filteredElec.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Daily Electricity Usage
                </h3>
                {filteredElec.map((entry, idx) => (
                  <div key={idx} className="border-b pb-4 mb-4">
                    <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
                    <p>Usage: {entry.usageKWh} kWh</p>
                  </div>
                ))}
              </section>
            )}

            {filteredEffluent.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-blue-700 mb-4">
                  Effluent Summary (Daily)
                </h3>
                {filteredEffluent.map((entry, idx) => (
                  <div key={idx} className="border-b pb-4 mb-4">
                    <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
                    <p>BOD: {entry.BOD}</p>
                    <p>TSS: {entry.TSS}</p>
                    <p>Coliform Count: {entry.coliformCount}</p>
                    <p>
                      Status:{" "}
                      <strong>
                        {entry.BOD > 30 ||
                        entry.TSS > 100 ||
                        entry.coliformCount > 5000
                          ? "Unsafe"
                          : "Safe"}
                      </strong>
                    </p>
                  </div>
                ))}
              </section>
            )}
          </div>
        )}
      </div>

      {notification && (
        <div
          className={`mt-6 mx-auto max-w-4xl p-4 rounded-md text-white shadow-md ${
            notification.type === "success" ? "bg-blue-600" : "bg-red-600"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={exportToPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          Export as PDF
        </button>
        <button
          onClick={sendToEmail}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Send to My Email
        </button>
      </div>
    </div>
  );
};

export default MonthlyReport;
