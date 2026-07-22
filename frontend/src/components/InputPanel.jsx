import { useState } from "react";
import axios from "axios";

function InputPanel({ setAnalysisResult, setLoading }) {
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState("text");

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (file) {

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
  }
};

  const handleAnalyze = async () => {
    setLoading(true);

    try {
      let response;

      // Image Analysis
      if (selectedFile) {
        const formData = new FormData();

        formData.append("file", selectedFile);

        response = await axios.post(
          "https://surakshanet-ai.onrender.com/analyze-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: 120000,
          }
        );
      }

      // Text Analysis
      else if (mode === "text") {
        response = await axios.post("https://surakshanet-ai.onrender.com/analyze", {
          message,
        });
      }

      // URL Analysis
      else {
        response = await axios.post("https://surakshanet-ai.onrender.com/analyze-url", {
          url,
        });
      }

      setAnalysisResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Analysis failed.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8 hover:shadow-cyan-300/30 transition-all duration-300">
      <h2 className="text-3xl font-bold text-slate-800">
        🤖 AI Fraud Detection
      </h2>

      <p className="text-gray-500 mt-3 mb-8 leading-7">
        Paste a suspicious message, website URL or upload a screenshot. Our AI
        instantly analyzes cyber threats and generates a detailed risk report.
      </p>

      {/* Mode Selection */}

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setMode("text");
            setSelectedFile(null);
            setSelectedImage(null);
          }}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
            mode === "text"
              ? "bg-gradient-to-r from-blue-700 to-cyan-500 text-white shadow-lg"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          📝 Message
        </button>

        <button
          onClick={() => {
            setMode("url");
            setSelectedFile(null);
            setSelectedImage(null);
          }}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
            mode === "text"
              ? "bg-gradient-to-r from-blue-700 to-cyan-500 text-white shadow-lg"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          🌐 URL
        </button>
      </div>

      {/* Message */}

      {mode === "text" ? (
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste suspicious message..."
          className="w-full h-52 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 p-5 outline-none text-lg transition"
        />
      ) : (
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste suspicious website URL..."
          className="w-full rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 p-5 outline-none text-lg transition"
        />
      )}

      {/* Image Upload */}

      <div className="mt-6">
        <label className="mt-6 flex flex-col items-center justify-center border-2 border-dashed border-cyan-400 rounded-2xl p-8 cursor-pointer hover:bg-cyan-50 transition">
          <div className="text-5xl mb-3">📷</div>

          <p className="font-semibold">Click to Upload Screenshot</p>

          <p className="text-sm text-gray-500 mt-2">PNG • JPG • JPEG</p>

          <input
            id="upload-image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Image Preview */}

      {selectedImage && (
        <div className="mt-6 relative">
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-lg">🖼 Screenshot Preview</p>

            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                setSelectedImage(null);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
            >
              ✖ Remove
            </button>
          </div>

          <img
            src={selectedImage}
            alt="Preview"
            className="w-full max-h-72 object-contain rounded-2xl border border-gray-300 shadow-lg"
          />

          <p className="mt-3 text-sm text-gray-600">📄 {selectedFile?.name}</p>
        </div>
      )}
      {/* Analyze Button */}

      <button
        onClick={handleAnalyze}
        className="w-full mt-8 py-4 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-500 hover:scale-[1.02] transition-all duration-300 shadow-xl"
      >
        🔍 Analyze with AI
      </button>

      <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-green-700 font-semibold">
          🔒 Your uploaded data is analyzed securely and is never shared with
          third parties.
        </p>
      </div>
    </div>
  );
}

export default InputPanel;
