import React from "react";
import Link from "next/link";
import { Heart, ShieldCheck } from "lucide-react";

export default function ResponsiblePlayPage() {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-[#7E9F8E]">
      <div className="space-y-3 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#5A7D6C]/20 text-[#D96B27] flex items-center justify-center mx-auto">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-[#D96B27]">
          Player Welfare &amp; Integrity
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAF9]">
          Responsible Play &amp; Fair Scoring Policy
        </h1>
        <p className="text-sm text-[#7E9F8E] max-w-2xl mx-auto leading-relaxed">
          Digital Heroes is dedicated to maintaining a safe, transparent, and charity-focused subscription platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-[#141E3D] p-6 rounded-2xl border border-[#233159] space-y-3">
          <h2 className="text-base font-bold text-[#F8FAF9] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#5A7D6C]" /> Age Limit Requirement
          </h2>
          <p className="text-xs leading-relaxed">
            Participation in Digital Heroes subscription draws is restricted strictly to individuals 18 years of age or older (or the legal age of majority in your jurisdiction).
          </p>
        </div>

        <div className="bg-[#141E3D] p-6 rounded-2xl border border-[#233159] space-y-3">
          <h2 className="text-base font-bold text-[#F8FAF9] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#5A7D6C]" /> Single Active Account
          </h2>
          <p className="text-xs leading-relaxed">
            Subscribers are permitted a maximum of 1 active subscription account. Multiple account creation to gaming draw odds is strictly forbidden.
          </p>
        </div>

        <div className="bg-[#141E3D] p-6 rounded-2xl border border-[#233159] space-y-3">
          <h2 className="text-base font-bold text-[#F8FAF9] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D96B27]" /> Score Honesty Commitment
          </h2>
          <p className="text-xs leading-relaxed">
            Submitted Stableford scores must reflect real, played golf rounds. Scores are subject to verification prior to prize disbursement.
          </p>
        </div>

        <div className="bg-[#141E3D] p-6 rounded-2xl border border-[#233159] space-y-3">
          <h2 className="text-base font-bold text-[#F8FAF9] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#A8D5C5]" /> Easy Self-Exclusion
          </h2>
          <p className="text-xs leading-relaxed">
            Subscribers can pause or cancel their subscription at any time directly through their account portal with zero penalty fees.
          </p>
        </div>
      </div>

      <div className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] text-center space-y-4">
        <h3 className="text-lg font-bold text-[#F8FAF9]">Need Assistance or Player Support?</h3>
        <p className="text-xs text-[#7E9F8E] max-w-xl mx-auto">
          If you or someone you know needs support or guidance regarding online draw participation, please visit international responsible play resources or contact our support team.
        </p>
        <div className="pt-2">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#5A7D6C] text-[#F8FAF9] hover:bg-[#7E9F8E] transition-colors"
          >
            Learn More About Our Platform
          </Link>
        </div>
      </div>
    </div>
  );
}
