import React, { useState } from "react";
import { loginUser, getMe } from "../api/auth.api";

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
      // ✅ Login
      await loginUser({ email, password });

      // ✅ Fetch logged-in user
      const meRes = await getMe();

      onSuccess?.(meRes.data);
    } catch (err: any) {
      setMsg(
        err?.response?.data?.message ||
          "Login failed. Please check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={submit} className="space-y-4">
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

        {msg && <p className="mt-4 text-center text-red-600">{msg}</p>}
      </div>
    </div>
  );
}
