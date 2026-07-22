import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-700 text-white">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold">404</h1>

        <p className="text-3xl mt-4 font-bold">Page Not Found</p>

        <p className="mt-4 text-gray-200">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-bold transition"
        >
          🏠 Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
