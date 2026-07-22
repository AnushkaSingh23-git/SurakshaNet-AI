import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import LoadingTimeline from "./LoadingTimeline";
import axios from "axios";
import toast from "react-hot-toast";
import GaugeComponent from "react-gauge-component";
import { generatePdf } from "../utils/pdfGenerator";

function ResultPanel({ analysisResult, loading }) {
  if (!analysisResult) {
    return null;
  }

  const handleReport = async () => {
    if (!analysisResult) {
      toast.error("Please analyze a message first.");
      return;
    }

    try {
      console.log("Analysis Result:", analysisResult);
      await axios.post("https://surakshanet-ai.onrender.com/report", {
        ...analysisResult,
        city: "Unknown",
        status: "Active",
      });

      toast.success("Report submitted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit report");
    }
  };

  const downloadReport = async () => {
    try {
      const response = await axios.post(
        "https://surakshanet-ai.onrender.com/generate-pdf",
        analysisResult,
        {
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "SurakshaNet_Investigation_Report.pdf");

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.log(error);

      alert("Unable to generate PDF");
    }
  };

  const extractedData = {
    phone: analysisResult.phone?.length
      ? analysisResult.phone.join(", ")
      : "Not Found",

    upi: analysisResult.upi?.length
      ? analysisResult.upi.join(", ")
      : "Not Found",

    email: analysisResult.email?.length
      ? analysisResult.email.join(", ")
      : "Not Found",

    website: analysisResult.website?.length
      ? analysisResult.website.join(", ")
      : "Not Found",

    bank: analysisResult.bank?.length
      ? analysisResult.bank.join(", ")
      : "Not Found",

    keywords: analysisResult.findings?.length
      ? analysisResult.findings
      : ["No suspicious keywords"],
  };

  const handleDownload = () => {
    if (!analysisResult) {
      toast.error("Please analyze a message first.");
      return;
    }

    generatePdf(analysisResult);

    toast.success("Report downloaded successfully!");
  };

  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8 h-[1300px] overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🛡 AI Analysis Report
      </h2>

      <div className="mb-6">
        <h3 className="font-semibold text-lg">Risk Level</h3>

        <div
          className={`mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold text-white shadow-lg
${
  analysisResult.risk === "High"
    ? "bg-gradient-to-r from-red-600 to-red-500"
    : analysisResult.risk === "Medium"
      ? "bg-gradient-to-r from-yellow-500 to-orange-400"
      : "bg-gradient-to-r from-green-600 to-emerald-500"
}`}
        >
          {analysisResult.risk === "High" && "🔴"}
          {analysisResult.risk === "Medium" && "🟡"}
          {analysisResult.risk === "Low" && "🟢"}
          {analysisResult.risk} Risk
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-xl mb-4">🎯 AI Risk Meter</h3>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <GaugeComponent
            value={analysisResult.score}
            type="radial"
            labels={{
              valueLabel: {
                formatTextValue: (value) => `${value}%`,
                style: {
                  fontSize: "32px",
                  fill: "#2563eb",
                  fontWeight: "bold",
                },
              },
            }}
            arc={{
              subArcs: [
                {
                  limit: 35,
                  color: "#22c55e",
                },
                {
                  limit: 70,
                  color: "#facc15",
                },
                {
                  color: "#ef4444",
                },
              ],
            }}
            pointer={{
              elastic: true,
            }}
          />

          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <span>🟢 Safe</span>

            <span>🟡 Medium</span>

            <span>🔴 Critical</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4">AI Confidence</h3>

        <div className="w-40 h-40 mx-auto">
          <CircularProgressbar
            value={analysisResult.confidence}
            text={`${analysisResult.confidence}%`}
            styles={buildStyles({
              textSize: "18px",
              pathColor: "#2563eb",
              textColor: "#111827",
              trailColor: "#e5e7eb",
            })}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg">Scam Type</h3>

        <p>{analysisResult.type}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">🔍 Suspicious Findings</h3>

        <ul className="list-disc pl-6">
          {analysisResult.findings?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-xl mb-4">
          🕵️ AI Threat Intelligence
        </h3>

        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-gray-300 text-sm">📞 Phone Number</p>
              <p className="font-bold mt-2">{extractedData.phone}</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-gray-300 text-sm">💳 UPI ID</p>
              <p className="font-bold mt-2">{extractedData.upi}</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-gray-300 text-sm">🏦 Bank</p>
              <p className="font-bold mt-2">{extractedData.bank}</p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-gray-300 text-sm">🌐 Website</p>
              <p className="font-bold mt-2 break-all">
                {extractedData.website}
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-4 md:col-span-2">
              <p className="text-gray-300 text-sm">📧 Email</p>
              <p className="font-bold mt-2">{extractedData.email}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-semibold mb-3">🚨 Detected Keywords</p>

            <div className="flex flex-wrap gap-3">
              {extractedData.keywords.map((word, index) => (
                <span
                  key={index}
                  className="bg-red-600 px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-5">
            <div className="bg-red-600 rounded-xl p-5">
              <p className="text-sm">Threat Category</p>

              <h2 className="text-2xl font-bold mt-2">{analysisResult.type}</h2>
            </div>

            <div className="bg-green-600 rounded-xl p-5">
              <p className="text-sm">AI Confidence</p>

              <h2 className="text-2xl font-bold mt-2">
                {analysisResult.confidence}%
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">🤖 AI Explanation</h3>

        <ul className="list-disc pl-6">
          {analysisResult.explanation?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="text-xl font-bold mb-4">
          🧠 Why did AI mark this as {analysisResult.risk} Risk?
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-red-500 text-xl">⚠️</span>
            <p>Detected urgent financial language.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-red-500 text-xl">⚠️</span>
            <p>Suspicious keywords matched fraud database.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-red-500 text-xl">⚠️</span>
            <p>Pattern resembles known Digital Arrest scams.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-red-500 text-xl">⚠️</span>
            <p>Confidence score exceeds investigation threshold.</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">✅ Recommended Actions</h3>

        <ul className="list-disc pl-6">
          {analysisResult.recommendation?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <div className="mt-8 mb-8 bg-white rounded-xl border p-5">
          <h3 className="text-xl font-bold mb-5">
            🕒 AI Investigation Timeline
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-green-600 text-xl">🟢</span>
              <div>
                <p className="font-semibold">Message Received</p>
                <p className="text-sm text-gray-500">
                  Citizen submitted suspicious content.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-yellow-500 text-xl">🟡</span>
              <div>
                <p className="font-semibold">AI Analysis Started</p>
                <p className="text-sm text-gray-500">
                  NLP engine processed the message.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-orange-500 text-xl">🟠</span>
              <div>
                <p className="font-semibold">Threat Indicators Found</p>
                <p className="text-sm text-gray-500">
                  Keywords and entities detected.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-red-600 text-xl">🔴</span>
              <div>
                <p className="font-semibold">
                  {analysisResult.risk} Risk Classified
                </p>
                <p className="text-sm text-gray-500">
                  AI assigned a risk score of {analysisResult.score}%.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-blue-600 text-xl">🔵</span>
              <div>
                <p className="font-semibold">Investigation Report Ready</p>
                <p className="text-sm text-gray-500">
                  Investigation completed at {currentTime}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-green-50 border border-green-300 p-5">
            <h3 className="text-xl font-bold text-green-700">
              ✅ AI Investigation Completed
            </h3>

            <p className="mt-3 text-gray-700">
              Risk assessment completed successfully. You can now download the
              report or forward this case to the Police Dashboard.
            </p>
          </div>
        </div>

        <button
          onClick={handleReport}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-red-600 to-orange-500 hover:scale-[1.02] transition-all shadow-xl"
        >
          🚨 Report This Scam
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <button
          onClick={handleDownload}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:scale-[1.02] transition-all shadow-xl"
        >
          📑 Download Investigation Report
        </button>
      </div>
    </div>
  );
}

export default ResultPanel;
