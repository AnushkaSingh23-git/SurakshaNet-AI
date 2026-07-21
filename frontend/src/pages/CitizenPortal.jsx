import { useState } from "react";
import InputPanel from "../components/InputPanel";
import ResultPanel from "../components/ResultPanel";
import logo2 from "../assets/logo2.png";

function CitizenPortal() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 ">

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 text-white shadow-2xl">

  <div className="max-w-7xl mx-auto px-8 py-12">

    <div className="flex flex-col lg:flex-row items-center justify-between">

      <div className="flex items-center gap-5">

        <img
          src={logo2}
          alt="SurakshaNet AI"
          className="h-24 w-auto"
        />

        <div>

          <h1 className="text-5xl font-extrabold">
            SurakshaNet AI
          </h1>

          <p className="text-cyan-300 text-xl mt-2">
            AI Powered Citizen Fraud Analyzer
          </p>

        </div>

      </div>

      <div className="mt-8 lg:mt-0">

        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-5 shadow-xl">

          <h3 className="text-2xl font-bold">
            🛡 Stay Safe
          </h3>

          <p className="text-blue-100 mt-2">
            Detect scams before losing money.
          </p>

        </div>

      </div>

    </div>

    <p className="mt-10 max-w-4xl text-lg text-blue-100 leading-8">

      Analyze suspicious SMS, WhatsApp messages,
      Emails, Websites and Screenshots using AI.
      Get instant risk assessment, extracted evidence,
      fraud explanation and actionable recommendations
      to stay protected from cyber criminals.

    </p>

  </div>

</div>

      <div className="max-w-7xl mx-auto px-8 py-10">

        <div className="grid lg:grid-cols-2 gap-8">

          <InputPanel
            setAnalysisResult={setAnalysisResult}
            setLoading={setLoading}
          />

          <ResultPanel
            analysisResult={analysisResult}
            loading={loading}
          />

        </div>

      </div>

    </div>
  );
}

export default CitizenPortal;