import React, { useEffect, useState } from "react";
import Register from "./page/register";
import Login from "./page/login";
import Dashboard from "./page/dashboard";
import { getMe, logoutUser } from "./api/auth.api";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<"login" | "register">("login");

  /* =====================
     CHECK AUTH ON LOAD
  ===================== */
  const checkAuth = () => {
    setLoading(true);
    getMe()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  /* =====================
     AUTHENTICATED VIEW
  ===================== */
  if (user) {
    return (
      <div className="min-h-screen bg-slate-100">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-4 bg-white shadow">
          <div className="font-medium">
            Logged in as <span className="font-semibold">{user.email}</span>
          </div>

          <button
            onClick={() =>
              logoutUser().then(() => {
                setUser(null);
                setPage("login");
              })
            }
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Logout
          </button>
        </div>

        <Dashboard />
      </div>
    );
  }

  /* =====================
     UNAUTHENTICATED VIEW
  ===================== */
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top navigation */}
      <div className="flex justify-center gap-4 p-4 bg-white shadow">
        <button
          onClick={() => setPage("register")}
          className={`px-4 py-2 rounded-lg font-medium ${
            page === "register"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Register
        </button>

        <button
          onClick={() => setPage("login")}
          className={`px-4 py-2 rounded-lg font-medium ${
            page === "login"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Login
        </button>
      </div>

      {/* Auth pages */}
      {page === "register" ? (
        <Register onSuccess={checkAuth} />
      ) : (
        <Login onSuccess={checkAuth} />
      )}
    </div>
  );
}
