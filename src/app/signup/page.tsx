"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Heart, ArrowRight, AlertCircle, Check } from "lucide-react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
  const [charityId, setCharityId] = useState("1");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the Terms of Service and Responsible Play Policy.");
      return;
    }
    alert(`Phase 1 Preview Mode: Subscription setup for ${email} on ${plan} plan with charity #${charityId} will be connected to Stripe & Supabase in Phase 2 & 3.`);
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

        {/* Phase 1 Notice */}
        <div className="bg-[#0B132B] p-4 rounded-xl border border-[#233159] text-xs text-[#A8D5C5] flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-[#D96B27] shrink-0 mt-0.5" />
          <span>
            <strong>Phase 1 UI Preview:</strong> Subscription checkout & payment processing via Stripe will be connected in Phase 3.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Plan Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#F8FAF9]">Select Membership Plan</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPlan("monthly")}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  plan === "monthly"
                    ? "bg-[#5A7D6C]/20 border-[#5A7D6C] text-[#F8FAF9]"
                    : "bg-[#0B132B] border-[#233159] text-[#7E9F8E] hover:border-[#233159]"
                }`}
              >
                <div className="text-sm font-bold flex justify-between">
                  <span>Monthly</span>
                  {plan === "monthly" && <Check className="w-4 h-4 text-[#5A7D6C]" />}
                </div>
                <div className="text-xs text-[#A8D5C5] mt-1">\$15 / month</div>
              </button>

              <button
                type="button"
                onClick={() => setPlan("yearly")}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  plan === "yearly"
                    ? "bg-[#D96B27]/20 border-[#D96B27] text-[#F8FAF9]"
                    : "bg-[#0B132B] border-[#233159] text-[#7E9F8E] hover:border-[#233159]"
                }`}
              >
                <div className="text-sm font-bold flex justify-between">
                  <span>Yearly (Save \$30)</span>
                  {plan === "yearly" && <Check className="w-4 h-4 text-[#D96B27]" />}
                </div>
                <div className="text-xs text-[#D96B27] mt-1">\$150 / year</div>
              </button>
            </div>
          </div>

          {/* Charity Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#F8FAF9] flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#D96B27]" /> Select Designated Partner Charity
            </label>
            <select
              value={charityId}
              onChange={(e) => setCharityId(e.target.value)}
              className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-2.5 text-sm text-[#F8FAF9] focus:outline-none focus:border-[#5A7D6C]"
            >
              <option value="1">Veterans Golf & Wellness Foundation</option>
              <option value="2">Junior Golf & Youth Opportunity Fund</option>
              <option value="3">Clean Oceans & Environmental Trust</option>
              <option value="4">National Cancer Research Alliance</option>
            </select>
          </div>

          {/* User Fields */}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-[#0B132B] border border-[#233159] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F8FAF9] placeholder-[#7E9F8E]/50 focus:outline-none focus:border-[#5A7D6C]"
              />
            </div>
          </div>

          {/* Terms Agreement */}
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
              <Link href="/terms" className="text-[#A8D5C5] underline">
                Terms of Service
              </Link>
              ,{" "}
              <Link href="/privacy" className="text-[#A8D5C5] underline">
                Privacy Policy
              </Link>
              , and{" "}
              <Link href="/responsible-play" className="text-[#A8D5C5] underline">
                Responsible Play Policy
              </Link>
              .
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
          >
            Create Hero Account ({plan === "monthly" ? "\$15/mo" : "\$150/yr"}) <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-[#233159] text-xs text-[#7E9F8E]">
          Already registered?{" "}
          <Link href="/login" className="text-[#A8D5C5] font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
