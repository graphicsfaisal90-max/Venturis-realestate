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
    <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,164,107,0.06)_0%,transparent_60%)]" />
      <div className="w-full max-w-md relative">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C8A46B] to-[#D6B98C] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#C8A46B]/20">
            <span className="text-2xl font-bold text-[#0B0B0C]">V</span>
          </div>
          <h1 className="text-3xl font-bold font-heading">
            <span className="text-white">VENTURIS</span>
          </h1>
          <p className="text-[#7D8590] text-sm mt-2">Admin Dashboard</p>
        </div>

        <div className="bg-[#17191C] rounded-2xl border border-[#ffffff0a] p-8 luxury-shadow">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#C8A46B]/10 flex items-center justify-center">
              <LogIn size={18} className="text-[#C8A46B]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white font-heading">Sign In</h2>
              <p className="text-xs text-[#7D8590]">Access your admin dashboard</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-[#7D8590] mb-1.5 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@venturisrealtors.com"
                className="w-full bg-[#111315] border border-[#ffffff1a] rounded-xl py-3 px-4 text-sm text-white placeholder:text-[#7D8590] focus:outline-none focus:border-[#C8A46B]/50 focus:ring-1 focus:ring-[#C8A46B]/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-[#7D8590] mb-1.5 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#111315] border border-[#ffffff1a] rounded-xl py-3 px-4 pr-11 text-sm text-white placeholder:text-[#7D8590] focus:outline-none focus:border-[#C8A46B]/50 focus:ring-1 focus:ring-[#C8A46B]/20 transition-all"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7D8590] hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm bg-red-400/5 border border-red-400/10 rounded-lg px-4 py-2">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#C8A46B] to-[#D6B98C] text-[#0B0B0C] py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#C8A46B]/20">
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : <LogIn size={16} />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
