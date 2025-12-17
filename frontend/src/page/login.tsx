import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type Props = {
  onSuccess?: () => void;
};

export default function Login({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      setMsg("Login successful");

      // ✅ notify App to re-check /me
      setTimeout(() => {
        onSuccess?.();
      }, 300);
    } catch (err) {
      setMsg("Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to continue
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 h-11 px-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 h-11 px-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {msg && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              msg.includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span className="text-indigo-600 font-semibold cursor-pointer">
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}
