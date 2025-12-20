import React, { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api/axios";

type Props = {
  onSuccess?: (user: any) => void;
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
      // ✅ LOGIN
      await api.post("/auth/login", { email, password });

      // ✅ GET CURRENT USER (COOKIE SENT)
      const meRes = await api.get("/auth/me");

      setMsg("Login successful");
      onSuccess?.(meRes.data);
    } catch {
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
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

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

          <button className="w-full h-11 bg-indigo-600 text-white rounded-xl">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {msg && <p className="mt-4 text-center text-red-600">{msg}</p>}
      </motion.div>
    </div>
  );
}
