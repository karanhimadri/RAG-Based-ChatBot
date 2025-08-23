"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";

export default function AuthModal({ mode = "login" }) {
  const { login, signUp, setIsAuthModelOpen, isAuthModelOpen } = useAuth();
  const [formMode, setFormMode] = useState(mode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (isAuthModelOpen) {
      setFormMode(mode);
      setError("");
      setValues({ name: "", email: "", password: "" });
    }
  }, [mode, isAuthModelOpen]);

  const isSignup = formMode === "signup";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isSignup) {
        if (!values.name || !values.email || !values.password) {
          setError("All field are needed.")
          return
        }
        await signUp(values)
      } else {
        if (!values.email || !values.password) {
          setError("All field are needed.")
          return
        }
        await login({ email: values.email, password: values.password })
      }

    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
      setIsAuthModelOpen(o => !o)
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={() => setIsAuthModelOpen(o => !o)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-wide">
            {isSignup ? "Create account" : "Welcome back"}
          </h2>
          <button
            onClick={() => setIsAuthModelOpen(o => !o)}
            className="w-8 h-8 inline-flex items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="space-y-1">
              <label className="text-xs font-medium uppercase tracking-wide text-neutral-600 dark:text-neutral-300">Name</label>
              <input
                type="text"
                name="name"
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Jane Doe"
                value={values.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs font-medium uppercase tracking-wide text-neutral-600 dark:text-neutral-300">Email</label>
            <input
              type="email"
              name="email"
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium uppercase tracking-wide text-neutral-600 dark:text-neutral-300">Password</label>
            <input
              type="password"
              name="password"
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              autoComplete={isSignup ? "new-password" : "current-password"}
            />
          </div>
          {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 shadow-sm transition-colors"
          >
            {loading ? (isSignup ? "Creating..." : "Signing in...") : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 text-center">
          {isSignup ? (
            <span>
              Already have an account?{' '}
              <button
                className="text-emerald-600 hover:underline font-medium"
                onClick={() => { setFormMode("login"); setError(""); }}
              >
                Login
              </button>
            </span>
          ) : (
            <span>
              Need an account?{' '}
              <button
                className="text-emerald-600 hover:underline font-medium"
                onClick={() => { setFormMode("signup"); setError(""); }}
              >
                Sign Up
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
