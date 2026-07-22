import { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
);

function PoliceDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [selectedCase, setSelectedCase] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [incidentFeed, setIncidentFeed] = useState([]);

  const notifications = [
    {
      icon: "🚨",
      title: "High Risk Scam Reported",
      time: "2 min ago",
      color: "border-red-500",
    },
    {
      icon: "🤖",
      title: "AI detected suspicious keyword pattern",
      time: "5 min ago",
      color: "border-blue-500",
    },
    {
      icon: "👮",
      title: "Officer assigned to Case SRK-1008",
      time: "8 min ago",
      color: "border-green-500",
    },
    {
      icon: "🏦",
      title: "Suspicious Bank Account Linked",
      time: "12 min ago",
      color: "border-yellow-500",
    },
  ];

  const investigationTimeline = [
    {
      time: "09:12 AM",
      title: "Citizen Report Submitted",
      color: "bg-red-500",
    },
    {
      time: "09:14 AM",
      title: "AI Risk Analysis Completed",
      color: "bg-orange-500",
    },
    {
      time: "09:16 AM",
      title: "Evidence Stored Securely",
      color: "bg-blue-500",
    },
    {
      time: "09:18 AM",
      title: "Officer Assigned",
      color: "bg-purple-500",
    },
    {
      time: "09:25 AM",
      title: "Investigation Started",
      color: "bg-green-500",
    },
  ];

  const officers = [
    {
      name: "Inspector Raj Sharma",
      badge: "CR-1021",
      department: "Cyber Crime Cell",
      status: "Available",
    },
    {
      name: "SI Priya Singh",
      badge: "CR-1045",
      department: "Digital Forensics",
      status: "On Investigation",
    },
    {
      name: "Inspector Amit Verma",
      badge: "CR-1088",
      department: "Financial Fraud",
      status: "Available",
    },
  ];

  const assignedOfficer = officers[0];

  const alerts = [
    "🔴 High Risk Scam reported from Delhi",
    "🟠 Banking Fraud detected in Mumbai",
    "🟢 AI Detection Engine Running",
    "🔵 OCR Scanner Active",
    "🟣 New Citizen Complaint Received",
  ];

  const [currentAlert, setCurrentAlert] = useState(0);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/reports");
      setReports(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Case ID", "Type", "Risk", "City", "Status"];

    const rows = reports.map((item, index) => [
      `SRK-${1001 + index}`,
      item.type,
      item.risk,
      item.city,
      item.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "SurakshaNet_Reports.csv");
  };

  useEffect(() => {
    fetchReports();

    const interval = setInterval(() => {
      fetchReports();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % alerts.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const highRisk = reports.filter((r) => r.risk === "High").length;
  const mediumRisk = reports.filter((r) => r.risk === "Medium").length;
  const lowRisk = reports.filter((r) => r.risk === "Low").length;

  const pieData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [highRisk, mediumRisk, lowRisk],
        backgroundColor: ["#ef4444", "#facc15", "#22c55e"],
      },
    ],
  };

  const cityCount = {};

  reports.forEach((r) => {
    const city = r.city || "Unknown";
    cityCount[city] = (cityCount[city] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(cityCount),
    datasets: [
      {
        label: "Reports",
        data: Object.values(cityCount),
        backgroundColor: "#2563eb",
      },
    ],
  };

  const topCities = Object.entries(cityCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const trendData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Fraud Reports",
        data: [3, 5, 4, 8, 6, 10, reports.length],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.type.toLowerCase().includes(search.toLowerCase()) ||
      report.city.toLowerCase().includes(search.toLowerCase());

    const matchesRisk = riskFilter === "All" || report.risk === riskFilter;

    return matchesSearch && matchesRisk;
  });

  const threatLevel =
    highRisk >= 5
      ? {
          text: "CRITICAL",
          color: "bg-red-600",
          icon: "🔴",
        }
      : highRisk >= 2
        ? {
            text: "ELEVATED",
            color: "bg-yellow-500",
            icon: "🟠",
          }
        : {
            text: "NORMAL",
            color: "bg-green-600",
            icon: "🟢",
          };

  const timeline = [
    {
      time: "10:12 AM",
      city: "Delhi",
      event: "High Risk Scam Detected",
      color: "bg-red-500",
    },
    {
      time: "10:16 AM",
      city: "Mumbai",
      event: "OTP Fraud Reported",
      color: "bg-yellow-500",
    },
    {
      time: "10:22 AM",
      city: "Lucknow",
      event: "Citizen Complaint Submitted",
      color: "bg-blue-500",
    },
    {
      time: "10:31 AM",
      city: "Bangalore",
      event: "Investigation Started",
      color: "bg-green-500",
    },
  ];

  const prediction = {
    level: highRisk >= 5 ? "Very High" : highRisk >= 2 ? "Moderate" : "Low",

    probability: highRisk >= 5 ? "92%" : highRisk >= 2 ? "63%" : "18%",

    recommendation:
      highRisk >= 5
        ? "Increase Cyber Patrol & Citizen Alerts"
        : highRisk >= 2
          ? "Monitor Financial Frauds"
          : "Normal Monitoring",
  };

  const liveStats = [
    {
      title: "Scams Prevented",
      value: "1,284",
      color: "text-green-500",
    },
    {
      title: "Active Investigations",
      value: "84",
      color: "text-blue-500",
    },
    {
      title: "Citizen Reports",
      value: reports.length,
      color: "text-purple-500",
    },
    {
      title: "AI Accuracy",
      value: "98.4%",
      color: "text-red-500",
    },
  ];

  const lastUpdated = new Date().toLocaleTimeString();

  useEffect(() => {
    if (highRisk > 0) {
      setShowAlert(true);
      setIncidentFeed((prev) => [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          message: `🚨 High Risk ${reports[reports.length - 1]?.type || "Scam"} detected`,
        },
        ...prev.slice(0, 4),
      ]);

      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [highRisk]);
  const todayReports = reports.length;
  const activeCases = reports.filter((r) => r.status === "Active").length;

  const liveFeed = [
    {
      id: 1,
      level: "🔴",
      text: "Delhi: Digital Arrest Scam detected",
      time: "2 min ago",
    },
    {
      id: 2,
      level: "🟠",
      text: "Mumbai: Fake KYC website reported",
      time: "6 min ago",
    },
    {
      id: 3,
      level: "🟢",
      text: "Lucknow: UPI fraud blocked",
      time: "10 min ago",
    },
    {
      id: 4,
      level: "🔴",
      text: "Bangalore: Multiple scam calls linked",
      time: "15 min ago",
    },
  ];

  const alertMessage =
    threatLevel.text === "CRITICAL"
      ? "Multiple high-risk cyber fraud cases detected. Immediate investigation required."
      : threatLevel.text === "ELEVATED"
        ? "Suspicious cyber activity increasing across monitored regions."
        : "Cyber threat level is stable. Continue routine monitoring.";

  const topCity =
    Object.entries(cityCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const topScam = reports.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});

  const mostCommonScam =
    Object.entries(topScam).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const latestReports = [...reports].reverse().slice(0, 5);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-950 p-8">
      {showAlert && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div className="bg-red-600 text-white rounded-xl shadow-2xl p-5 w-96 border-l-8 border-yellow-300">
            <h2 className="text-xl font-bold">🚨 NATIONAL CYBER ALERT</h2>

            <p className="mt-2">High Risk Scam Activity Detected</p>

            <div className="mt-4 space-y-1 text-sm">
              <p>📍 Active Cases: {highRisk}</p>

              <p>⚠ Threat Level: {threatLevel.text}</p>

              <p>🕒 {lastUpdated}</p>
            </div>
          </div>
        </div>
      )}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-xl overflow-hidden">
        <div className="flex items-center gap-4 px-6 py-4">
          <div className="w-4 h-4 rounded-full bg-white animate-ping"></div>

          <h2 className="text-xl font-bold whitespace-nowrap">
            🚨 LIVE CYBER ALERT
          </h2>

          <div className="overflow-hidden flex-1">
            <div className="animate-[marquee_18s_linear_infinite] whitespace-nowrap font-semibold">
              🔴 High Risk Digital Arrest Scam detected in Delhi | 🟠 Multiple
              Fake KYC Calls reported in Lucknow | 🔴 Fraud Network Active in
              Mumbai | 🟢 AI Monitoring All Incoming Reports 24×7
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">
          👮 SurakshaNet Command Center
        </h1>

        <div className="flex gap-3">
          <button
            onClick={fetchReports}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            🔄 Refresh
          </button>

          <button
            onClick={exportCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {liveStats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-5 text-center hover:scale-105 transition"
          >
            <h3 className="text-gray-500">{item.title}</h3>

            <p className={`text-3xl font-bold mt-3 ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div
        className={`mb-8 rounded-2xl shadow-xl overflow-hidden ${threatLevel.color}`}
      >
        <div className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white">
                🛡 National Cyber Threat Status
              </h2>

              <p className="text-white/90 mt-2">
                AI Powered Real-Time Fraud Monitoring System
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-md">
                <p className="text-sm text-white/80">Threat Level</p>

                <p className="text-xl font-bold text-white mt-2">
                  {threatLevel.icon} {threatLevel.text}
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-md">
                <p className="text-sm text-white/80">Reports</p>

                <p className="text-3xl font-bold text-white mt-2">
                  {reports.length}
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-md">
                <p className="text-sm text-white/80">High Risk</p>

                <p className="text-3xl font-bold text-white mt-2">{highRisk}</p>
              </div>

              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-md">
                <p className="text-sm text-white/80">AI Engine</p>

                <p className="text-xl font-bold text-green-300 mt-2 animate-pulse">
                  ● ONLINE
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-md">
                <p className="text-sm text-white/80">Last Updated</p>

                <p className="text-lg font-bold text-white mt-2">
                  {lastUpdated}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total Reports</h3>
          <p className="text-4xl font-bold mt-3">{reports.length}</p>
        </div>

        <div className="bg-red-600 text-white rounded-xl shadow p-6">
          <h3>High Risk</h3>
          <p className="text-4xl font-bold mt-3">{highRisk}</p>
        </div>

        <div className="bg-yellow-500 text-white rounded-xl shadow p-6">
          <h3>Medium Risk</h3>
          <p className="text-4xl font-bold mt-3">{mediumRisk}</p>
        </div>

        <div className="bg-green-600 text-white rounded-xl shadow p-6">
          <h3>Low Risk</h3>
          <p className="text-4xl font-bold mt-3">{lowRisk}</p>
        </div>
      </div>

      <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">📡 Live AI Investigation Feed</h2>

          <span className="bg-green-500 px-3 py-1 rounded-full text-sm animate-pulse">
            LIVE
          </span>
        </div>

        <div className="space-y-4">
          {liveFeed.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-700 pb-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.level}</span>

                <p>{item.text}</p>
              </div>

              <span className="text-gray-400 text-sm">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-semibold">🤖 AI Intelligence</h3>

          <p className="text-5xl font-bold mt-4">92%</p>

          <p className="mt-2 text-blue-100">Threat Detection Confidence</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h3 className="text-gray-500">Fraud Pattern</h3>

          <p className="text-2xl font-bold mt-4 text-red-600">
            Digital Arrest Scam
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h3 className="text-gray-500">Linked Cases</h3>

          <p className="text-4xl font-bold mt-4">18</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h3 className="text-gray-500">Active Fraud Network</h3>

          <p className="text-4xl font-bold mt-4 text-red-500">Delhi Cluster</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mt-10">
        <div className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition">
          <p className="text-gray-500">📞 Phone Numbers</p>
          <h2 className="text-3xl font-bold mt-2 text-red-600">143</h2>
          <p className="text-sm text-green-600 mt-2">+12 Today</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition">
          <p className="text-gray-500">🏦 Bank Accounts</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-600">27</h2>
          <p className="text-sm text-green-600 mt-2">+3 Today</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition">
          <p className="text-gray-500">💳 UPI IDs</p>
          <h2 className="text-3xl font-bold mt-2 text-green-600">59</h2>
          <p className="text-sm text-green-600 mt-2">+8 Today</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition">
          <p className="text-gray-500">🌐 Fake Websites</p>
          <h2 className="text-3xl font-bold mt-2 text-purple-600">18</h2>
          <p className="text-sm text-red-600 mt-2">High Activity</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition">
          <p className="text-gray-500">📱 WhatsApp IDs</p>
          <h2 className="text-3xl font-bold mt-2 text-emerald-600">94</h2>
          <p className="text-sm text-green-600 mt-2">+6 Today</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition">
          <p className="text-gray-500">📧 Email IDs</p>
          <h2 className="text-3xl font-bold mt-2 text-orange-600">41</h2>
          <p className="text-sm text-green-600 mt-2">+4 Today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-5">📊 Risk Distribution</h2>
          <Pie data={pieData} />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-5">📍 Reports by City</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-5">🔴 Live Incident Feed</h2>

          <div className="space-y-4 max-h-[350px] overflow-y-auto">
            {incidentFeed.length === 0 ? (
              <p className="text-gray-500">No incidents yet.</p>
            ) : (
              incidentFeed.map((item) => (
                <div
                  key={item.id}
                  className="border-l-4 border-red-600 pl-4 py-2 bg-gray-50 rounded"
                >
                  <p className="font-semibold">{item.message}</p>

                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6">🛰 Live Incident Timeline</h2>

          <div className="space-y-5">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${item.color}`}></div>

                <div>
                  <p className="font-semibold">{item.event}</p>

                  <p className="text-sm text-gray-500">
                    {item.city} • {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6">🎯 AI Threat Status</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>AI Detection Engine</span>
              <span className="text-green-400">ONLINE</span>
            </div>

            <div className="flex justify-between">
              <span>OCR Scanner</span>
              <span className="text-green-400">ACTIVE</span>
            </div>

            <div className="flex justify-between">
              <span>Fraud Monitoring</span>
              <span className="text-green-400">RUNNING</span>
            </div>

            <div className="flex justify-between">
              <span>Emergency Response</span>
              <span className="text-yellow-400">READY</span>
            </div>

            <div className="flex justify-between">
              <span>National Threat Level</span>
              <span className="text-red-400 font-bold">{threatLevel.text}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6">
          🏙 Top 5 Most Affected Cities
        </h2>

        <div className="space-y-4">
          {topCities.length === 0 ? (
            <p className="text-gray-500">No reports available.</p>
          ) : (
            topCities.map(([city, count], index) => (
              <div
                key={city}
                className="flex justify-between items-center bg-gray-100 rounded-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold">#{index + 1}</span>

                  <span className="font-semibold">{city}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-52 bg-gray-300 rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{
                        width: `${Math.min(count * 20, 100)}%`,
                      }}
                    />
                  </div>

                  <span className="font-bold">{count}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg pt-0 mb-5">
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white rounded-xl shadow-lg p-8 mt-10 mb-10">
          <h2 className="text-3xl font-bold mb-6">
            🧠 AI Intelligence Summary
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold">📍 Most Affected City</h3>

              <p className="text-3xl font-bold mt-3">{topCity}</p>
            </div>

            <div className="bg-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold">🚨 Most Common Scam</h3>

              <p className="text-2xl font-bold mt-3">{mostCommonScam}</p>
            </div>

            <div className="bg-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold">⚠ AI Recommendation</h3>

              <p className="mt-3 text-blue-100">
                Increase surveillance in <b>{topCity}</b> and prioritize
                investigation of <b>{mostCommonScam}</b> cases.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-10">📈 Weekly Crime Trend</h2>

        <Line data={trendData} />
      </div>

      <div className="mt-10 bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6">🔔 Live Intelligence Feed</h2>

        <div className="space-y-4">
          {notifications.map((item, index) => (
            <div
              key={index}
              className={`border-l-4 ${item.color} bg-gray-50 rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition`}
            >
              <div>
                <p className="font-semibold">
                  {item.icon} {item.title}
                </p>

                <p className="text-sm text-gray-500">{item.time}</p>
              </div>

              <span className="text-green-600 font-semibold">● LIVE</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow mt-10 p-6">
        <h2 className="text-2xl font-bold mb-5">Recent Reports</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search by city or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-3 flex-1"
          />

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="All">All Risks</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center py-8 text-gray-500">Loading reports...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Case ID</th>
                <th className="text-left">Type</th>
                <th className="text-left">Risk</th>
                <th className="text-left">City</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No matching reports found.
                  </td>
                </tr>
              ) : (
                filteredReports.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      console.log(item);
                      setSelectedCase(item);
                    }}
                    onClick={() => setSelectedCase(item)}
                    className="border-b hover:bg-blue-50 hover:shadow-md hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                  >
                    <td className="py-4">SRK-{1001 + index}</td>

                    <td>{item.type}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          item.risk === "High"
                            ? "bg-red-600"
                            : item.risk === "Medium"
                              ? "bg-yellow-500"
                              : "bg-green-600"
                        }`}
                      >
                        {item.risk}
                      </span>
                    </td>

                    <td>{item.city}</td>

                    <td>{item.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {selectedCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[850px] max-w-[95%] max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative">
            <div className="sticky top-0 bg-white flex justify-between items-center pb-4 mb-6 border-b z-10">
              <h2 className="text-3xl font-bold">🚔 Investigation Report</h2>

              <button
                onClick={() => setSelectedCase(null)}
                className="w-10 h-10 rounded-full bg-red-100 hover:bg-red-600 hover:text-white text-red-600 text-xl font-bold transition"
              >
                ✕
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-5">
                🕒 Investigation Timeline
              </h3>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-5">📷 Digital Evidence</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-xl p-4 bg-gray-50">
                    {selectedCase.image && (
                      <img
                        src={selectedCase.image}
                        alt="Evidence"
                        className="w-full h-60 object-contain rounded-xl border"
                      />
                    )}
                    <p className="mt-3 text-center text-gray-600">
                      Screenshot Evidence
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <h4 className="font-bold mb-2">📄 OCR Extracted Text</h4>

                      <p>{selectedCase.extracted_text || "No text detected"}</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-bold mb-2">🤖 AI Confidence</h4>

                      <p className="text-2xl font-bold text-blue-600">
                        {selectedCase.confidence}%
                      </p>
                    </div>
                    <div className="mt-6">
                      <h3 className="font-bold mb-3">🚨 AI Findings</h3>

                      <ul className="list-disc pl-5 space-y-2">
                        {selectedCase.findings?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-bold mb-3">✅ Recommended Actions</h3>

                      <ul className="list-disc pl-5 space-y-2">
                        {selectedCase.recommendation?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-bold mb-3">🧠 AI Explanation</h3>

                      <ul className="list-disc pl-5 space-y-2">
                        {selectedCase.explanation?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-red-50 rounded-xl p-4 mt-6">
                      <h3 className="font-bold">🎯 AI Risk Score</h3>

                      <p className="text-3xl font-bold text-red-600">
                        {selectedCase.score}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <p>Citizen complaint received</p>
                </div>

                <div className="ml-2 h-6 border-l-2 border-gray-300"></div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <p>OCR extracted suspicious content</p>
                </div>

                <div className="ml-2 h-6 border-l-2 border-gray-300"></div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <p>AI analyzed fraud indicators</p>
                </div>

                <div className="ml-2 h-6 border-l-2 border-gray-300"></div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <p>High-risk case flagged for investigation</p>
                </div>

                <div className="ml-2 h-6 border-l-2 border-gray-300"></div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                  <p>Assigned to Cyber Crime Officer</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h3 className="font-semibold"> Scam Type</h3>
                <p>{selectedCase.type}</p>
              </div>

              <div>
                <h3 className="font-semibold">Risk Level</h3>

                <span
                  className={`px-4 py-2 rounded-full text-white ${
                    selectedCase.risk === "High"
                      ? "bg-red-600"
                      : selectedCase.risk === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-600"
                  }`}
                >
                  {selectedCase.risk}
                </span>
              </div>

              <div>
                <h3 className="font-semibold">City</h3>
                <p>{selectedCase.city}</p>
              </div>

              <div>
                <h3 className="font-semibold">Status</h3>
                <p>{selectedCase.status}</p>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-6">
                    🕒 Investigation Timeline
                  </h3>

                  <div className="space-y-5">
                    {investigationTimeline.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div
                          className={`w-4 h-4 rounded-full mt-2 ${item.color}`}
                        ></div>

                        <div>
                          <p className="text-sm text-gray-500">{item.time}</p>

                          <p className="font-semibold">{item.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-blue-50 rounded-xl p-5 border border-blue-200">
                    <h3 className="text-xl font-bold mb-4">
                      👮 Assigned Officer
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500">Officer</p>
                        <p className="font-bold">{assignedOfficer.name}</p>
                      </div>

                      <div>
                        <p className="text-gray-500">Badge ID</p>
                        <p className="font-bold">{assignedOfficer.badge}</p>
                      </div>

                      <div>
                        <p className="text-gray-500">Department</p>
                        <p>{assignedOfficer.department}</p>
                      </div>

                      <div>
                        <p className="text-gray-500">Status</p>

                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                          {assignedOfficer.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-5">
                    📅 Investigation Timeline
                  </h3>

                  <div className="relative border-l-4 border-blue-600 ml-3">
                    <div className="mb-8 ml-6">
                      <div className="absolute -left-3 w-6 h-6 bg-blue-600 rounded-full"></div>

                      <p className="font-semibold">📩 Complaint Received</p>

                      <p className="text-gray-500 text-sm">
                        {new Date().toLocaleString()}
                      </p>
                    </div>

                    <div className="mb-8 ml-6">
                      <div className="absolute -left-3 w-6 h-6 bg-purple-600 rounded-full"></div>

                      <p className="font-semibold">🤖 AI Analysis Completed</p>

                      <p className="text-gray-500 text-sm">
                        Threat classified as {selectedCase.risk}
                      </p>
                    </div>

                    <div className="mb-8 ml-6">
                      <div className="absolute -left-3 w-6 h-6 bg-red-600 rounded-full"></div>

                      <p className="font-semibold">
                        🚨 Investigation Initiated
                      </p>

                      <p className="text-gray-500 text-sm">
                        Digital evidence preserved.
                      </p>
                    </div>

                    <div className="ml-6">
                      <div className="absolute -left-3 w-6 h-6 bg-green-600 rounded-full"></div>

                      <p className="font-semibold">📂 Report Ready</p>

                      <p className="text-gray-500 text-sm">
                        Available for Cyber Cell.
                      </p>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold mb-2 mt-5">🤖 AI Recommendation</h3>

                <p>
                  Immediate verification recommended. Contact the cyber crime
                  unit, preserve digital evidence, and investigate associated
                  financial transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PoliceDashboard;
