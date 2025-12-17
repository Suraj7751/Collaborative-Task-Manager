import React, { useState, useEffect } from "react";
import Register from "./page/register";
import Login from "./page/login";
import Dashboard from "./page/dashboard";
import { api } from "./api/axios";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<"login" | "register">("login");

  // 🔥 CHECK AUTH ON LOAD
  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  // ✅ AUTHENTICATED → DASHBOARD
  if (user) {
    return <Dashboard />;
  }

  // ❌ NOT AUTHENTICATED → LOGIN / REGISTER
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex justify-center gap-4 p-4 bg-white shadow">
        <button
          onClick={() => setPage("register")}
          className={page === "register" ? "font-bold" : ""}
        >
          Register
        </button>
        <button
          onClick={() => setPage("login")}
          className={page === "login" ? "font-bold" : ""}
        >
          Login
        </button>
      </div>

      {page === "register" ? (
        <Register onSuccess={() => window.location.reload()} />
      ) : (
        <Login onSuccess={() => window.location.reload()} />
      )}
    </div>
  );
}
