"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Heart, ArrowRight, AlertCircle, Check } from "lucide-react";
import { getBrowserClient } from "@/lib/supabase/client";

const CHARITIES = [
  { id: "11111111-1111-1111-1111-111111111111", name: "Veterans Golf & Wellness Foundation" },
  { id: "22222222-2222-2222-2222-222222222222", name: "Junior Golf & Youth Opportunity Fund" },
  { id: "33333333-3333-3333-3333-333333333333", name: "Clean Oceans & Environmental Trust" },
  { id: "44444444-4444-4444-4444-444444444444", name: "National Cancer Research Alliance" },
];

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
  const [charityId, setCharityId] = useState(CHARITIES[0].id);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreed) {
      setError("Please agree to the Terms of Service and Responsible Play Policy.");
      return;
    }

    const supabase = getBrowserClient();
    if (!supabase) {
      setError("Backend is not configured yet. Please try again later.");
      return;
    }

    setLoading(true);

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    const userId = signUpData.user?.id;
    if (!userId) {
      setLoading(false);
      // Email confirmation is likely required before a session exists.
      setError(null);
      router.push("/login?confirm=1");
      return;
    }

    // Create profile row
    const { error: profileError } = await supabase.from("profiles").insert({
      id: userId,
      full_name: fullName,
      role: "subscriber",
    });

    // Save charity preference (10% minimum, matches the plan selection screen)
    const { error: charityError } = await supabase.from("user_charity_preferences").insert({
      user_id: userId,
      charity_id: charityId,
      contribution_percent: 10,
    });

    setLoading(false);

    if (profileError || charityError) {
      setError((profileError || charityError)?.message ?? "Something went wrong finishing setup.");
      return;
    }

    // Note: plan (monthly/yearly) is captured for the UI but not billed via
    // Stripe in this deployment — see README for the demo-mode fallback.
    void plan;

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto">
      <div className="bg-[#141E3D] p-8 sm:p-10 rounded-3xl border border-[#233159] space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-[#F8FAF9]">Become a Digital Hero</h1>
          <p className="text-xs text-[#7E9F8E]">
            Log Stableford scores, support your charity, and enter monthly prize draws
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#F8FAF9]">Select Membership Plan</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPlan("monthly")}
                className={`p-3.5 rounded-xl border text-left transition-all ${plan === "monthly"
                    ? "bg-[#5A7D6C]/20 border-[#5A7D6C] text-[#F8FAF9]"
                    : "bg-[#0B132B] border-[#233159] text-[#7E9F8E] hover:border-[#233159]"
                  }`}
              >
                <div className="text-sm font-bold flex justify-between">
                  <span>Monthly</span>
                  {plan === "monthly" && <Check className="w-4 h-4 text-[#5A7D6C]" />}
                </div>
                <div className="text-xs text-[#A8D5C5] mt-1">$15 / month</div>
              </button>

              <button
                type="button"
                onClick={() => setPlan("yearly")}
                className={`p-3.5 rounded-xl border text-left transition-all ${plan === "yearly"
                    ? "bg-[#D96B27]/20 border-[#D96B27] text-[#F8FAF9]"
                    : "bg-[#0B132B] border-[#233159] text-[#7E9F8E] hover:border-[#233159]"
                  }`}
              >
                <div className="text-sm font-bold flex justify-between">
                  <span>Yearly (Save $30)</span>
                  {plan === "yearly" && <Check className="w-4 h-4 text-[#D96B27]" />}
                </div>
                <div className="text-xs text-[#D96B27] mt-1">$150 / year</div>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#F8FAF9] flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#D96B27]" /> Select Designated Partner Charity
            </label>
            <select
              value={charityId}
              onChange={(e) => setCharityId(e.target.value)}
              className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-2.5 text-sm text-[#F8FAF9] focus:outline-none focus:border-[#5A7D6C]"
            >
              {CHARITIES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#F8FAF9]">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#7E9F8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full bg-[#0B132B] border border-[#233159] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F8FAF9] placeholder-[#7E9F8E]/50 focus:outline-none focus:border-[#5A7D6C]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#F8FAF9]">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#7E9F8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full bg-[#0B132B] border border-[#233159] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F8FAF9] placeholder-[#7E9F8E]/50 focus:outline-none focus:border-[#5A7D6C]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#F8FAF9]">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#7E9F8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-[#0B132B] border border-[#233159] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F8FAF9] placeholder-[#7E9F8E]/50 focus:outline-none focus:border-[#5A7D6C]"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 rounded bg-[#0B132B] border-[#233159] text-[#D96B27] focus:ring-0"
            />
            <label htmlFor="terms" className="text-xs text-[#7E9F8E] leading-relaxed">
              I agree to the{" "}
              <Link href="/terms" className="text-[#A8D5C5] underline">Terms of Service</Link>
              ,{" "}
              <Link href="/privacy" className="text-[#A8D5C5] underline">Privacy Policy</Link>
              , and{" "}
              <Link href="/responsible-play" className="text-[#A8D5C5] underline">Responsible Play Policy</Link>.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] transition-colors shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
          >
            {loading ? "Creating Account..." : `Create Hero Account (${plan === "monthly" ? "$15/mo" : "$150/yr"})`} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-[#233159] text-xs text-[#7E9F8E]">
          Already registered?{" "}
          <Link href="/login" className="text-[#A8D5C5] font-semibold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}