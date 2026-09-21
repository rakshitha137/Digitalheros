"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, CheckCircle2, ArrowLeft, Save } from "lucide-react";
import { INITIAL_DEMO_CHARITIES } from "@/lib/demo-data";

export default function DashboardCharityPage() {
  const [selectedCharityId, setSelectedCharityId] = useState("11111111-1111-1111-1111-111111111111");
  const [contributionPercent, setContributionPercent] = useState<number>(10);
  const [successMsg, setSuccessMsg] = useState<string>("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (contributionPercent < 10 || contributionPercent > 100) {
      alert("Contribution percentage must be between 10% and 100% inclusive.");
      return;
    }
    const charity = INITIAL_DEMO_CHARITIES.find((c) => c.id === selectedCharityId);
    setSuccessMsg(
      `Charity preference updated to ${charity?.name || "Selected Charity"} at ${contributionPercent}% allocation.`
    );
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8D5C5] hover:text-[#F8FAF9] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div>
        <h1 className="text-3xl font-extrabold text-[#F8FAF9]">Charity Preference &amp; Allocation</h1>
        <p className="text-xs text-[#7E9F8E] mt-1">
          Specify which verified partner charity receives your subscription contributions. Minimum 10% contribution required.
        </p>
      </div>

      {successMsg && (
        <div className="bg-[#5A7D6C]/20 border border-[#5A7D6C] text-[#A8D5C5] text-xs p-4 rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#A8D5C5] shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] space-y-6 shadow-xl">
        {/* Charity Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#F8FAF9] flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#D96B27]" /> Designated Charity Partner
          </label>
          <select
            value={selectedCharityId}
            onChange={(e) => setSelectedCharityId(e.target.value)}
            className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-3 text-sm text-[#F8FAF9] focus:outline-none focus:border-[#5A7D6C]"
          >
            {INITIAL_DEMO_CHARITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.category})
              </option>
            ))}
          </select>
        </div>

        {/* Contribution Percentage Slider/Input */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-[#F8FAF9]">
              Contribution Percentage (Min 10% – Max 100%)
            </label>
            <span className="text-base font-bold text-[#D96B27]">{contributionPercent}%</span>
          </div>

          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={contributionPercent}
            onChange={(e) => setContributionPercent(parseInt(e.target.value, 10))}
            className="w-full accent-[#D96B27] cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-[#7E9F8E]">
            <span>10% (Min Required)</span>
            <span>50%</span>
            <span>100% (Full Contribution)</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Charity Preference
        </button>
      </form>
    </div>
  );
}
