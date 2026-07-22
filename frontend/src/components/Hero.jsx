function Hero() {
  return (
    <section className="bg-slate-50 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-8">
        <div className="flex flex-col justify-center">
          <p className="text-blue-600 font-semibold uppercase tracking-wider">
            AI Powered Public Safety
          </p>

          <h1 className="text-6xl font-bold mt-4 leading-tight">
            Detect.
            <br />
            Prevent.
            <br />
            Protect.
          </h1>

          <p className="text-gray-600 mt-8 text-lg leading-8">
            SurakshaNet AI helps citizens and law enforcement detect digital
            arrest scams, fraud networks and cyber threats before they cause
            financial loss.
          </p>

          <div className="flex gap-5 mt-10">
            <button className="bg-blue-600 text-white px-7 py-4 rounded-xl hover:bg-blue-700">
              Analyze Fraud
            </button>

            <button className="border border-blue-600 text-blue-600 px-7 py-4 rounded-xl hover:bg-blue-50">
              Police Dashboard
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-96 h-96 rounded-full bg-blue-100 flex items-center justify-center text-8xl">
            🛡️
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
