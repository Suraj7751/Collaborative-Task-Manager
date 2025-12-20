import React, { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api/axios";

type Props = {
  onSuccess?: (user: any) => void;
  onLoginClick?: () => void;
};

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
      setMsg("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // ✅ REGISTER
      await api.post("/auth/register", { name, email, password });

      // ✅ GET CURRENT USER
      const meRes = await api.get("/auth/me");

      setMsg("Registration successful");
      onSuccess?.(meRes.data);
    } catch (err: any) {
      setMsg(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <motion.div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={submit} className="space-y-5">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-11 px-4 border rounded-xl"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-4 border rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 px-4 border rounded-xl"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-11 px-4 border rounded-xl"
          />

          <button className="w-full h-11 bg-indigo-600 text-white rounded-xl">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {msg && <p className="mt-4 text-center">{msg}</p>}

        <p className="mt-6 text-center">
          Already have an account?{" "}
          <span onClick={onLoginClick} className="text-indigo-600 cursor-pointer">
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
