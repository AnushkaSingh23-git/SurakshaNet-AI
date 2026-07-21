function Features() {
  const features = [
    {
      icon: "🛡️",
      title: "Fraud Detection",
      description:
        "Detect digital arrest scams, phishing messages, fake websites and suspicious payment requests using AI.",
    },
    {
      icon: "🕸️",
      title: "Fraud Network Intelligence",
      description:
        "Connect related complaints, phone numbers, UPI IDs and scam patterns to uncover organized fraud networks.",
    },
    {
      icon: "📍",
      title: "Crime Heatmap",
      description:
        "Visualize fraud hotspots across different locations to help law enforcement prioritize investigations.",
    },
    {
      icon: "🤖",
      title: "Predictive AI",
      description:
        "Analyze complaint trends and generate early warnings before scams spread to more victims.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center">
          Why SurakshaNet AI?
        </h2>

        <p className="text-gray-600 text-center mt-4 max-w-3xl mx-auto">
          One intelligent platform that empowers citizens and law enforcement
          to detect, prevent and investigate cyber fraud.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="text-5xl">{item.icon}</div>

              <h3 className="text-2xl font-semibold mt-6">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;