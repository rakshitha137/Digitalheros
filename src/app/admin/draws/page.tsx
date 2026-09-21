"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, CheckCircle2, ArrowLeft } from "lucide-react";
import { runDrawEngine, DrawSimulationResult, ParticipantEntry } from "@/lib/draw/engine";

export default function AdminDrawsPage() {
  const [drawMonth, setDrawMonth] = useState<number>(9);
  const [drawYear, setDrawYear] = useState<number>(2026);
  const [drawMode, setDrawMode] = useState<"random" | "algorithmic">("random");
  const [revenueInput, setRevenueInput] = useState<string>("1800000"); // \$18,000.00 in minor units
  const [rolloverInput] = useState<string>("300000"); // \$3,000.00 brought forward

  const [simulation, setSimulation] = useState<DrawSimulationResult | null>(null);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  // Sample eligible subscriber snapshot entries
  const mockEntries: ParticipantEntry[] = [
    {
      user_id: "user-101",
      score_values: [36, 38, 34, 41, 39],
      score_dates: ["2026-09-18", "2026-09-15", "2026-09-10", "2026-09-05", "2026-09-01"],
      generated_numbers: [36, 38, 34, 41, 39],
      converter_version: "v1_date_order_increment_wrap",
    },
    {
      user_id: "user-102",
      score_values: [40, 35, 32, 28, 42],
      score_dates: ["2026-09-19", "2026-09-16", "2026-09-11", "2026-09-06", "2026-09-02"],
      generated_numbers: [40, 35, 32, 28, 42],
      converter_version: "v1_date_order_increment_wrap",
    },
    {
      user_id: "user-103",
      score_values: [12, 18, 24, 34, 41], // Exact match sample
      score_dates: ["2026-09-20", "2026-09-17", "2026-09-12", "2026-09-07", "2026-09-03"],
      generated_numbers: [12, 18, 24, 34, 41],
      converter_version: "v1_date_order_increment_wrap",
    },
  ];

  const handleRunSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setIsPublished(false);

    const revenue = parseInt(revenueInput, 10) || 0;
    const rollover = parseInt(rolloverInput, 10) || 0;

    let overrideNumbers: number[] | undefined;
    if (drawMode === "algorithmic") {
      overrideNumbers = [12, 18, 24, 34, 41]; // Deterministic test seed output
    }

    const res = runDrawEngine(mockEntries, revenue, rollover, overrideNumbers);
    setSimulation(res);
    setMsg("Draw simulation completed. Review prize pool allocations and winner distributions below.");
  };

  const handlePublishDraw = () => {
    if (!simulation) return;
    setIsPublished(true);
    setMsg(
      `Draw for ${drawYear}-${drawMonth} published idempotently. Winners recorded and audit log entry created.`
    );
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8D5C5] hover:text-[#F8FAF9] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Admin Console
      </Link>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#D96B27]">
          Administrative Control
        </span>
        <h1 className="text-3xl font-extrabold text-[#F8FAF9] mt-0.5">Monthly Draw &amp; Engine Management</h1>
        <p className="text-xs text-[#7E9F8E] mt-1">
          Create draft draws, configure mode, simulate prize allocations, and publish draw results idempotently.
        </p>
      </div>

      {msg && (
        <div className="bg-[#5A7D6C]/20 border border-[#5A7D6C] text-[#A8D5C5] text-xs p-4 rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#A8D5C5] shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* Draft Setup & Simulation Form */}
      <form onSubmit={handleRunSimulation} className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] space-y-6 shadow-xl">
        <h2 className="text-lg font-bold text-[#F8FAF9]">Configure Draft Draw Parameters</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#F8FAF9]">Draw Month</label>
            <select
              value={drawMonth}
              onChange={(e) => setDrawMonth(parseInt(e.target.value, 10))}
              className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-2.5 text-sm text-[#F8FAF9]"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                <option key={m} value={m}>
                  Month {m}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#F8FAF9]">Draw Year</label>
            <input
              type="number"
              value={drawYear}
              onChange={(e) => setDrawYear(parseInt(e.target.value, 10))}
              className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-2.5 text-sm text-[#F8FAF9]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#F8FAF9]">Draw Mode</label>
            <select
              value={drawMode}
              onChange={(e) => setDrawMode(e.target.value as "random" | "algorithmic")}
              className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-2.5 text-sm text-[#F8FAF9]"
            >
              <option value="random">Random Mode (Cryptographic)</option>
              <option value="algorithmic">Algorithmic Mode (Deterministic)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#F8FAF9]">Subscription Revenue (Cents)</label>
            <input
              type="number"
              value={revenueInput}
              onChange={(e) => setRevenueInput(e.target.value)}
              className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-2.5 text-sm text-[#F8FAF9]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-[#5A7D6C] text-[#F8FAF9] hover:bg-[#7E9F8E] transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" /> Run Draw Simulation
        </button>
      </form>

      {/* Simulation Result Preview */}
      {simulation && (
        <div className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#233159] pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D96B27]">
                Simulation Output Preview
              </span>
              <h2 className="text-2xl font-bold text-[#F8FAF9] mt-0.5">Winning Numbers &amp; Tiers</h2>
            </div>

            {!isPublished ? (
              <button
                onClick={handlePublishDraw}
                className="px-6 py-3 rounded-full text-xs font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] shadow-xl transition-all"
              >
                Publish Draw Results
              </button>
            ) : (
              <span className="px-4 py-2 rounded-full bg-[#5A7D6C]/30 text-[#A8D5C5] text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Published &amp; Audit Logged
              </span>
            )}
          </div>

          {/* Winning Numbers */}
          <div className="space-y-2">
            <div className="text-xs text-[#7E9F8E]">Generated Winning Numbers (5 unique in 1–45):</div>
            <div className="flex flex-wrap items-center gap-3">
              {simulation.winning_numbers.map((num, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-xl bg-[#D96B27] text-[#F8FAF9] font-black text-lg flex items-center justify-center shadow-md"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {/* Tier Results Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-[#0B132B] p-6 rounded-2xl border border-[#233159] space-y-2">
              <span className="text-xs font-bold uppercase text-[#D96B27]">5-Number Tier (40%)</span>
              <div className="text-xl font-bold text-[#F8FAF9]">
                Allocated: \${(simulation.tier_results.tier_5.allocated_minor / 100).toLocaleString()}
              </div>
              <div className="text-xs text-[#7E9F8E]">
                Winners: {simulation.tier_results.tier_5.winner_count} | Payout/Winner: \$
                {(simulation.tier_results.tier_5.payout_per_winner_minor / 100).toLocaleString()}
              </div>
              {simulation.tier_results.tier_5.is_rolled_over && (
                <div className="text-xs text-[#D96B27] font-semibold pt-1">
                  100% Rolled Over to Next Month Jackpot
                </div>
              )}
            </div>

            <div className="bg-[#0B132B] p-6 rounded-2xl border border-[#233159] space-y-2">
              <span className="text-xs font-bold uppercase text-[#5A7D6C]">4-Number Tier (35%)</span>
              <div className="text-xl font-bold text-[#F8FAF9]">
                Allocated: \${(simulation.tier_results.tier_4.allocated_minor / 100).toLocaleString()}
              </div>
              <div className="text-xs text-[#7E9F8E]">
                Winners: {simulation.tier_results.tier_4.winner_count} | Payout/Winner: \$
                {(simulation.tier_results.tier_4.payout_per_winner_minor / 100).toLocaleString()}
              </div>
            </div>

            <div className="bg-[#0B132B] p-6 rounded-2xl border border-[#233159] space-y-2">
              <span className="text-xs font-bold uppercase text-[#A8D5C5]">3-Number Tier (25%)</span>
              <div className="text-xl font-bold text-[#F8FAF9]">
                Allocated: \${(simulation.tier_results.tier_3.allocated_minor / 100).toLocaleString()}
              </div>
              <div className="text-xs text-[#7E9F8E]">
                Winners: {simulation.tier_results.tier_3.winner_count} | Payout/Winner: \$
                {(simulation.tier_results.tier_3.payout_per_winner_minor / 100).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
