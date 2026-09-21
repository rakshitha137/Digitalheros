import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#D96B27]">
          Complete Guide
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F8FAF9]">
          How Digital Heroes Works
        </h1>
        <p className="text-lg text-[#7E9F8E] leading-relaxed">
          From logging your weekly Stableford golf rounds to winning monthly prize pools and supporting verified charities — here is every detail of the process.
        </p>
      </div>

      {/* 1. Stableford Score Rules */}
      <section className="bg-[#141E3D] p-8 sm:p-10 rounded-3xl border border-[#233159] space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#5A7D6C]/30 flex items-center justify-center text-[#A8D5C5] font-bold text-lg">
            1
          </div>
          <h2 className="text-2xl font-bold text-[#F8FAF9]">Stableford Score Entry Rules</h2>
        </div>
        <p className="text-[#7E9F8E] leading-relaxed">
          Subscribers log their standard golf Stableford scores directly in their subscriber dashboard. Our system enforces strict, transparent rules for integrity:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="bg-[#0B132B] p-6 rounded-2xl border border-[#233159] space-y-2">
            <div className="text-lg font-bold text-[#D96B27]">1 to 45 Range</div>
            <p className="text-xs text-[#7E9F8E]">
              Valid score range: integer values from 1 through 45, inclusive. Out-of-bounds scores are strictly rejected.
            </p>
          </div>
          <div className="bg-[#0B132B] p-6 rounded-2xl border border-[#233159] space-y-2">
            <div className="text-lg font-bold text-[#A8D5C5]">1 Score per Date</div>
            <p className="text-xs text-[#7E9F8E]">
              Maximum of 1 score entry allowed per user per calendar date to prevent duplicate batch submissions.
            </p>
          </div>
          <div className="bg-[#0B132B] p-6 rounded-2xl border border-[#233159] space-y-2">
            <div className="text-lg font-bold text-[#5A7D6C]">Rolling 5 Scores</div>
            <p className="text-xs text-[#7E9F8E]">
              The system keeps your 5 most recent active scores for draw entry calculation. Older scores are safely archived.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Deterministic Score-to-Number Converter */}
      <section className="bg-[#141E3D] p-8 sm:p-10 rounded-3xl border border-[#233159] space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D96B27]/30 flex items-center justify-center text-[#D96B27] font-bold text-lg">
            2
          </div>
          <h2 className="text-2xl font-bold text-[#F8FAF9]">
            Deterministic Score-to-Number Conversion Algorithm
          </h2>
        </div>
        <p className="text-[#7E9F8E] leading-relaxed">
          Before each monthly draw, our converter translates your 5 latest Stableford scores into 5 unique draw numbers (1–45) using this exact algorithm:
        </p>
        <div className="bg-[#0B132B] p-6 rounded-2xl border border-[#233159] space-y-4">
          <ol className="list-decimal list-inside space-y-3 text-sm text-[#F8FAF9]">
            <li>
              <strong>Sort by Date:</strong> Sort your 5 latest scores by date played, newest first.
            </li>
            <li>
              <strong>Candidate Selection:</strong> Use each score value as an initial candidate draw number.
            </li>
            <li>
              <strong>Collision Resolution with Wraparound:</strong> If a duplicate number occurs, increment by +1 with wraparound (45 wraps to 1) until an unused number from 1 to 45 is found.
            </li>
            <li>
              <strong>Immutable Snapshot:</strong> Store the generated 5 draw numbers and converter version (`v1_date_order_increment_wrap`) immutably in the draw entry snapshot.
            </li>
          </ol>
        </div>
      </section>

      {/* 3. Monthly Draw Engine & Prize Tiers */}
      <section className="bg-[#141E3D] p-8 sm:p-10 rounded-3xl border border-[#233159] space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#A8D5C5]/30 flex items-center justify-center text-[#A8D5C5] font-bold text-lg">
            3
          </div>
          <h2 className="text-2xl font-bold text-[#F8FAF9]">Monthly Draws & Prize Tiers</h2>
        </div>
        <p className="text-[#7E9F8E] leading-relaxed">
          Monthly draws execute in Random or Algorithmic mode using integer minor currency calculations (cents):
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0B132B] p-6 rounded-2xl border border-[#D96B27] space-y-3">
            <span className="px-3 py-1 rounded-full bg-[#D96B27] text-[#F8FAF9] text-xs font-bold">
              5-Number Match
            </span>
            <div className="text-3xl font-extrabold text-[#F8FAF9]">40% Pool</div>
            <p className="text-xs text-[#7E9F8E]">
              Jackpot tier! If no 5-number match occurs, 100% of this 40% pool rolls over to next month&apos;s jackpot.
            </p>
          </div>

          <div className="bg-[#0B132B] p-6 rounded-2xl border border-[#5A7D6C] space-y-3">
            <span className="px-3 py-1 rounded-full bg-[#5A7D6C] text-[#F8FAF9] text-xs font-bold">
              4-Number Match
            </span>
            <div className="text-3xl font-extrabold text-[#F8FAF9]">35% Pool</div>
            <p className="text-xs text-[#7E9F8E]">
              Shared equally among all subscribers matching 4 numbers. If unclaimed, recorded as undistributed.
            </p>
          </div>

          <div className="bg-[#0B132B] p-6 rounded-2xl border border-[#A8D5C5] space-y-3">
            <span className="px-3 py-1 rounded-full bg-[#A8D5C5] text-[#0B132B] text-xs font-bold">
              3-Number Match
            </span>
            <div className="text-3xl font-extrabold text-[#F8FAF9]">25% Pool</div>
            <p className="text-xs text-[#7E9F8E]">
              Shared equally among all subscribers matching 3 numbers. If unclaimed, recorded as undistributed.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pt-8">
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] shadow-xl transition-all"
        >
          Join Digital Heroes Today <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
