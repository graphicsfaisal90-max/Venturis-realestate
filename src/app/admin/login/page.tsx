"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // For now, use mock credentials
      if (email === "admin@venturisrealtors.com" && password === "F@isal098") {
        sessionStorage.setItem("venturis_admin_logged_in", "true");
        router.push("/admin");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-white">VENTURIS</span>
            <span className="gold-gradient">.</span>
          </h1>
          <p className="text-[#888] text-sm mt-2">Admin Dashboard</p>
        </div>

        <div className="glass rounded-2xl p-8 luxury-shadow">
          <h2 className="text-xl font-semibold text-white mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#888] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@venturisrealtors.com"
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg py-2.5 px-4 text-sm text-white placeholder:text-[#555] focus:outline-none focus:border-[#988060] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[#888] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="F@isal098"
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg py-2.5 px-4 pr-10 text-sm text-white placeholder:text-[#555] focus:outline-none focus:border-[#988060] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full gold-gradient-bg text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <LogIn size={16} />
              )}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#222]">
            <p className="text-xs text-[#555] text-center">
              Default credentials for demo:
            </p>
            <p className="text-xs text-[#555] text-center mt-1">
              Email: <span className="text-[#888]">admin@venturisrealtors.com</span>
              {" | "}
              Password: <span className="text-[#888]">F@isal098</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
