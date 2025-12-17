import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type Props = {
  onSuccess?: () => void;
};

export default function Register({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    if (password !== confirmPassword) {
      setMsg("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:4000/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );

      setMsg("Registration successful");

      // ✅ IMPORTANT: force app to re-check /me
      setTimeout(() => {
        onSuccess?.();
      }, 300);
    } catch (err: any) {
      setMsg(
        err?.response?.data?.message ||
          "Registration failed. Please try again."
      );
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
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Register to get started
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 h-11 px-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

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

          <div>
            <label className="text-sm text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full mt-1 h-11 px-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
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
          Already have an account?{" "}
          <span className="text-indigo-600 font-semibold cursor-pointer">
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
