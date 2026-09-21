import React from "react";
import Link from "next/link";
import {
  Trophy,
  Heart,
  Target,
  CreditCard,
  Plus,
  ChevronRight,
} from "lucide-react";
import { INITIAL_DEMO_SCORES, INITIAL_DEMO_CHARITIES } from "@/lib/demo-data";
import { convertScoresToDrawNumbers } from "@/lib/draw/score-converter";

export default function SubscriberDashboardPage() {
  const latestScores = INITIAL_DEMO_SCORES.slice(0, 5);
  const activeCharity = INITIAL_DEMO_CHARITIES[0];

  let drawNumbers: number[] = [];
  try {
    const res = convertScoresToDrawNumbers(latestScores);
    drawNumbers = res.generated_numbers;
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#A8D5C5]">
            Subscriber Dashboard
          </span>
          <h1 className="text-3xl font-extrabold text-[#F8FAF9] mt-0.5">Welcome Back, Alex</h1>
        </div>

        <Link
          href="/dashboard/scores"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] transition-colors shadow-lg w-fit"
        >
          <Plus className="w-4 h-4" /> Log New Score
        </Link>
      </div>

      {/* Top Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Subscription Card */}
        <div className="bg-[#141E3D] p-6 rounded-3xl border border-[#233159] space-y-3">
          <div className="flex justify-between items-center text-[#7E9F8E]">
            <span className="text-xs font-medium">Subscription Status</span>
            <CreditCard className="w-4 h-4 text-[#A8D5C5]" />
          </div>
          <div className="text-2xl font-bold text-[#F8FAF9] flex items-center gap-2">
            Monthly Plan <span className="w-2 h-2 rounded-full bg-[#5A7D6C]"></span>
          </div>
          <div className="text-xs text-[#7E9F8E] flex justify-between">
            <span>Renews: Oct 1, 2026</span>
            <span className="text-[#A8D5C5]">Active</span>
          </div>
        </div>

        {/* Charity Selection Card */}
        <Link
          href="/dashboard/charity"
          className="bg-[#141E3D] p-6 rounded-3xl border border-[#233159] space-y-3 hover:border-[#5A7D6C] transition-all group"
        >
          <div className="flex justify-between items-center text-[#7E9F8E]">
            <span className="text-xs font-medium">Partner Charity</span>
            <Heart className="w-4 h-4 text-[#D96B27] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-base font-bold text-[#F8FAF9] truncate">
            {activeCharity.name}
          </div>
          <div className="text-xs text-[#7E9F8E] flex justify-between">
            <span>Allocation: 10%</span>
            <span className="text-[#A8D5C5] flex items-center gap-1">
              Edit <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </Link>

        {/* Scores Card */}
        <Link
          href="/dashboard/scores"
          className="bg-[#141E3D] p-6 rounded-3xl border border-[#233159] space-y-3 hover:border-[#5A7D6C] transition-all group"
        >
          <div className="flex justify-between items-center text-[#7E9F8E]">
            <span className="text-xs font-medium">Active Rolling Scores</span>
            <Target className="w-4 h-4 text-[#A8D5C5] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-[#F8FAF9]">
            5 / 5 Logged
          </div>
          <div className="text-xs text-[#7E9F8E] flex justify-between">
            <span>Latest: 36 pts</span>
            <span className="text-[#A8D5C5] flex items-center gap-1">
              Scores <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </Link>

        {/* Winnings Card */}
        <Link
          href="/dashboard/winnings"
          className="bg-[#141E3D] p-6 rounded-3xl border border-[#233159] space-y-3 hover:border-[#5A7D6C] transition-all group"
        >
          <div className="flex justify-between items-center text-[#7E9F8E]">
            <span className="text-xs font-medium">Total Winnings</span>
            <Trophy className="w-4 h-4 text-[#D96B27] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-[#D96B27]">
            \$1,250.00
          </div>
          <div className="text-xs text-[#7E9F8E] flex justify-between">
            <span>Pending Proof Verification</span>
            <span className="text-[#A8D5C5] flex items-center gap-1">
              Claim <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </Link>
      </div>

      {/* Main Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Draw Numbers Banner */}
        <div className="lg:col-span-2 bg-gradient-to-r from-[#141E3D] via-[#1C2A52] to-[#141E3D] p-8 rounded-3xl border border-[#233159] space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A8D5C5]">
                Upcoming September Draw Entry
              </span>
              <h2 className="text-2xl font-bold text-[#F8FAF9] mt-0.5">Your Generated Draw Numbers</h2>
            </div>
            <Link
              href="/dashboard/draws"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#0B132B] text-[#A8D5C5] hover:text-[#F8FAF9] border border-[#233159]"
            >
              View Draw Schedule
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 py-2">
            {drawNumbers.map((num, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-2xl bg-[#D96B27] text-[#F8FAF9] text-xl font-black flex items-center justify-center shadow-lg border border-orange-400/30"
              >
                {num}
              </div>
            ))}
          </div>

          <p className="text-xs text-[#7E9F8E]">
            Generated from your 5 latest Stableford scores (`v1_date_order_increment_wrap`). Draw date: September 30, 2026.
          </p>
        </div>

        {/* Recent Scores Quick Widget */}
        <div className="bg-[#141E3D] p-6 rounded-3xl border border-[#233159] space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-[#F8FAF9]">Latest 5 Scores</h3>
            <Link href="/dashboard/scores" className="text-xs text-[#A8D5C5] hover:underline">
              Manage
            </Link>
          </div>

          <div className="space-y-2.5">
            {latestScores.map((score) => (
              <div
                key={score.id}
                className="bg-[#0B132B] p-3 rounded-xl border border-[#233159] flex items-center justify-between text-xs"
              >
                <span className="text-[#7E9F8E] font-medium">{score.date_played}</span>
                <span className="font-bold text-[#F8FAF9]">{score.score_value} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
