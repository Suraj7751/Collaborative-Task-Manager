import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type Props = {
  onSuccess?: (user: any) => void;
  onLoginClick?: () => void;
};

// ✅ API URL from env (Vercel / local both)
const API_URL = import.meta.env.VITE_API_URL;

export default function Register({ onSuccess, onLoginClick }: Props) {
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
      // 1️⃣ Register user
      await axios.post(
        `${API_URL}/api/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );

      // 2️⃣ Fetch logged-in user
      const meRes = await axios.get(
        `${API_URL}/api/auth/me`,
        { withCredentials: true }
      );

      setMsg("Registration successful");

      // 3️⃣ Tell App user is logged in
      onSuccess?.(meRes.data);

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
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full h-11 px-4 border rounded-xl"
          />

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-11 px-4 border rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-11 px-4 border rounded-xl"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full h-11 px-4 border rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-indigo-600 text-white rounded-xl"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {msg && (
          <p
            className={`mt-4 text-center text-sm ${
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
          <span
            onClick={onLoginClick}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
