function LoadingTimeline() {
  const steps = [
    "🔍 Reading Input",
    "🧠 Detecting Scam Pattern",
    "📊 Calculating Risk Score",
    "📄 Generating AI Report",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 h-[650px]">

      <h2 className="text-2xl font-bold mb-8">
        🤖 AI Analysis
      </h2>

      <div className="space-y-6">

        {steps.map((step, index) => (

          <div
            key={index}
            className="flex items-center justify-between p-4 border rounded-xl"
          >

            <span className="font-medium">
              {step}
            </span>

            <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

          </div>

        ))}

      </div>

      <p className="text-center text-gray-500 mt-10">
        Please wait while AI analyzes the submitted content...
      </p>

    </div>
  );
}

export default LoadingTimeline;