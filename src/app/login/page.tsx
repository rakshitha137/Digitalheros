"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { getBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const supabase = getBrowserClient();
    if (!supabase) {
      setError("Backend is not configured yet. Please try again later.");
      return;
    }

    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
      <div className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#F8FAF9]">Welcome Back</h1>
          <p className="text-xs text-[#7E9F8E]">
            Sign in to your Digital Heroes subscriber account
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#F8FAF9]">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#7E9F8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="golfer@example.com"
                className="w-full bg-[#0B132B] border border-[#233159] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F8FAF9] placeholder-[#7E9F8E]/50 focus:outline-none focus:border-[#5A7D6C]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[#F8FAF9]">Password</label>
              <a href="#" className="text-[11px] text-[#A8D5C5] hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#7E9F8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0B132B] border border-[#233159] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F8FAF9] placeholder-[#7E9F8E]/50 focus:outline-none focus:border-[#5A7D6C]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] transition-colors shadow-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-[#233159] text-xs text-[#7E9F8E]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#A8D5C5] font-semibold hover:underline">
            Join Digital Heroes
          </Link>
        </div>
      </div>
    </div>
  );
}