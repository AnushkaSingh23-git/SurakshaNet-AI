import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo2 from "../assets/logo2.png";

function Home() {
  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
      },
    }),
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 text-white">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 flex flex-col lg:flex-row items-center justify-between">

        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold leading-tight">
            SurakshaNet AI
          </h1>

          <p className="mt-8 text-2xl text-blue-100">
            AI Powered Digital Fraud Detection &
            Cyber Crime Intelligence Platform
          </p>

          <p className="mt-6 text-lg text-blue-200">
            Detect scam messages, analyze screenshots,
            monitor fraud networks and protect citizens
            from Digital Arrest Scams.
          </p>

          <div className="mt-10 flex gap-5 flex-wrap">

            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/role-selection"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold shadow-xl"
              >
                🚀 Get Started
              </Link>
            </motion.div>

            {/* <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            > */}
              {/* <Link
                to="/role-selection"
                className="border border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition"
              >
                👤 Choose Your Role
              </Link>
            </motion.div> */}

          </div>

        </motion.div>

        <motion.div
          className="lg:w-1/2 flex justify-center mt-16 lg:mt-0"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
          >
            <img
              src={logo2}
              alt="SurakshaNet AI"
              className="h-60 w-auto object-contain mx-auto"
            />

            <p className="text-center mt-6 text-2xl font-semibold">
              Secure India with AI
            </p>

          </motion.div>

        </motion.div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-8 py-20">

        <h2 className="text-4xl font-bold text-center mb-16">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            ["📝", "AI Detection", "Analyze suspicious messages instantly."],
            ["🖼", "OCR Scanner", "Extract text from scam screenshots."],
            ["🗺", "Heatmap", "View fraud hotspots across India."],
            ["🕸", "Network Graph", "Visualize fraud connections."],
          ].map((item, index) => (

            <motion.div
              key={index}
              custom={index}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -10,
              }}
              className="bg-white/10 rounded-2xl p-8 backdrop-blur-md shadow-xl"
            >

              <div className="text-5xl">
                {item[0]}
              </div>

              <h3 className="text-2xl font-bold mt-5">
                {item[1]}
              </h3>

              <p className="mt-4">
                {item[2]}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* How It Works */}

      <section className="max-w-7xl mx-auto px-8 py-20">

        <h2 className="text-4xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {[
            ["📝","Enter Data","Paste a scam message or upload a screenshot."],
            ["🤖","AI Analysis","AI detects fraud indicators."],
            ["📊","Risk Report","View score and recommendations."],
            ["🚨","Report Scam","Send report to police dashboard."],
          ].map((step,index)=>(

            <motion.div
              key={index}
              custom={index}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once:true }}
              whileHover={{ scale:1.05 }}
              className="bg-white/10 rounded-2xl p-8 text-center backdrop-blur-md shadow-xl"
            >

              <div className="text-5xl mb-4">
                {step[0]}
              </div>

              <h3 className="text-2xl font-bold">
                {step[1]}
              </h3>

              <p className="mt-4">
                {step[2]}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* Statistics */}

      <section className="max-w-7xl mx-auto px-8 py-20">

        <h2 className="text-4xl font-bold text-center mb-16">
          Platform Statistics
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            ["1200+","Reports"],
            ["98%","Accuracy"],
            ["500+","Networks"],
            ["24×7","Monitoring"],
          ].map((item,index)=>(

            <motion.div
              key={index}
              custom={index}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once:true }}
              whileHover={{
                scale:1.08
              }}
              className="bg-white/10 rounded-2xl p-8 text-center shadow-xl"
            >

              <h3 className="text-5xl font-bold">
                {item[0]}
              </h3>

              <p className="mt-3">
                {item[1]}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-blue-950 py-10">
  <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

    <img
      src={logo2}
      alt="SurakshaNet AI"
      className="h-16 w-auto mb-4"
    />

    <h2 className="text-3xl font-bold text-white">
      SurakshaNet AI
    </h2>

    <p className="mt-3 text-blue-200">
      AI Powered Digital Fraud Detection Platform
    </p>

    <p className="mt-8 text-blue-300">
      © 2026 SurakshaNet AI • Secure India with AI
    </p>

  </div>
</footer>

    </div>
  );
}

export default Home;