import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-2">Page Not Found</p>
      <p className="text-sm text-gray-600 mb-6">
        Redirecting to home in <span className="font-medium">{seconds}</span> second{seconds !== 1 ? "s" : ""}...
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition cursor-pointer"
      >
        Go to Homepage Now
      </button>
    </div>
  );
};

export default NotFound;
