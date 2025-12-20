import React, { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api/axios"
import { useNavigate } from "react-router-dom";

type Props = {
  onSuccess?: (user: any) => void;
};

export default function Register({ onSuccess }: Props) {
  const navigate = useNavigate();

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
      setMsg("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // ✅ Register
      await api.post("/api/auth/register", { name, email, password });

      // ✅ Get user
      const meRes = await api.get("/api/auth/me");

      onSuccess?.(meRes.data);

      // ✅ THIS WAS MISSING
      navigate("/dashboard");

    } catch (err: any) {
      setMsg(err?.response?.data?.message || "Registration failed");
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
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={submit} className="space-y-4">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full p-3 border rounded" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 border rounded" />
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full p-3 border rounded" />

          <button disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {msg && <p className="text-center mt-4 text-red-600">{msg}</p>}
      </motion.div>
    </div>
  );
}
