import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { brandName } from "../../data";

export default function Login() {
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setTab("login");
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Welcome to {brandName}
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Sign in or create a new account
        </p>

        {/* Tabs */}
        <div className="flex mb-4 border rounded overflow-hidden">
          {["login", "register"].map((type) => (
            <button
              key={type}
              onClick={() => setTab(type)}
              className={`w-1/2 py-2 text-sm font-medium ${
                tab === type
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {type === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="rishabh@email.com"
                  required
                  className="w-full border pl-10 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black/50"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="w-full border pl-10 pr-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black/50"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-black/80 transition"
            >
              Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4" autoComplete="off">
            <div>
              <label className="text-sm font-medium block mb-1">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="Rishabh Gokhe"
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black/50"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="rishabh@email.com"
                required
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black/50"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="w-full border px-3 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-black/50"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-black/80 transition"
            >
              Create Account
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-black transition underline"
          >
            Continue as guest
          </a>
        </div>
      </div>
    </div>
  );
}
