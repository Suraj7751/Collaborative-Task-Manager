import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";


type Props = {
  onSuccess?: (user: any) => void;
};

// ✅ Backend URL from Vercel / .env
const API_URL = import.meta.env.VITE_API_URL;

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
      // 1️⃣ Login
      await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      // 2️⃣ Fetch logged-in user
      const meRes = await axios.get(
        `${API_URL}/api/auth/me`,
        { withCredentials: true }
      );

      setMsg("Login successful");

      // 3️⃣ Notify parent
      onSuccess?.(meRes.data);

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

        <form onSubmit={submit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-indigo-600 text-white rounded-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {msg && <p className="mt-4 text-center text-red-500">{msg}</p>}
      </motion.div>
    </div>
  );
}
