"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Calendar, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { isValidScoreValue, convertScoresToDrawNumbers } from "@/lib/draw/score-converter";

interface ScoreItem {
  id: string;
  score_value: number;
  date_played: string;
  created_at: string;
}

export default function DashboardScoresPage() {
  const [scores, setScores] = useState<ScoreItem[]>([
    { id: "s1", score_value: 36, date_played: "2026-09-18", created_at: "2026-09-18T10:00:00Z" },
    { id: "s2", score_value: 38, date_played: "2026-09-15", created_at: "2026-09-15T10:00:00Z" },
    { id: "s3", score_value: 34, date_played: "2026-09-10", created_at: "2026-09-10T10:00:00Z" },
    { id: "s4", score_value: 41, date_played: "2026-09-05", created_at: "2026-09-05T10:00:00Z" },
    { id: "s5", score_value: 39, date_played: "2026-09-01", created_at: "2026-09-01T10:00:00Z" },
  ]);

  const [newScore, setNewScore] = useState<string>("");
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  // Keep 5 latest scores sorted by date_played descending
  const sortedScores = [...scores]
    .sort((a, b) => new Date(b.date_played).getTime() - new Date(a.date_played).getTime())
    .slice(0, 5);

  // Compute generated draw numbers from 5 latest scores
  let generatedResult = null;
  if (sortedScores.length >= 5) {
    try {
      generatedResult = convertScoresToDrawNumbers(sortedScores);
    } catch (err) {
      console.error(err);
    }
  }

  const handleAddScore = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const val = parseInt(newScore, 10);
    if (isNaN(val) || !isValidScoreValue(val)) {
      setErrorMsg("Score must be an integer between 1 and 45 inclusive.");
      return;
    }

    if (!newDate) {
      setErrorMsg("Date played is required.");
      return;
    }

    // Check duplicate date constraint
    const duplicate = scores.find((s) => s.date_played === newDate);
    if (duplicate) {
      setErrorMsg(`A score for date ${newDate} has already been logged. Max 1 score per date.`);
      return;
    }

    const newItem: ScoreItem = {
      id: `s_${Date.now()}`,
      score_value: val,
      date_played: newDate,
      created_at: new Date().toISOString(),
    };

    setScores([newItem, ...scores]);
    setNewScore("");
    setSuccessMsg(`Score ${val} logged for ${newDate}.`);
  };

  const handleDeleteScore = (id: string) => {
    setScores(scores.filter((s) => s.id !== id));
    setSuccessMsg("Score deleted.");
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8D5C5] hover:text-[#F8FAF9] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#F8FAF9]">Stableford Score Management</h1>
          <p className="text-xs text-[#7E9F8E] mt-1">
            Valid range: 1 to 45. Max 1 score per date. The 5 most recent scores generate your draw numbers.
          </p>
        </div>
      </div>

      {/* Messages */}
      {errorMsg && (
        <div className="bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs p-4 rounded-2xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="bg-[#5A7D6C]/20 border border-[#5A7D6C] text-[#A8D5C5] text-xs p-4 rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#A8D5C5] shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add Score Form */}
      <div className="bg-[#141E3D] p-6 rounded-3xl border border-[#233159] space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-[#F8FAF9] flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#D96B27]" /> Log New Stableford Score
        </h2>

        <form onSubmit={handleAddScore} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#F8FAF9]">Stableford Score (1–45)</label>
            <input
              type="number"
              min="1"
              max="45"
              required
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
              placeholder="e.g. 36"
              className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-2.5 text-sm text-[#F8FAF9] focus:outline-none focus:border-[#5A7D6C]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#F8FAF9]">Date Played</label>
            <input
              type="date"
              required
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-2.5 text-sm text-[#F8FAF9] focus:outline-none focus:border-[#5A7D6C]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-sm font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Save Score
          </button>
        </form>
      </div>

      {/* Live Draw Numbers Preview */}
      {generatedResult && (
        <div className="bg-gradient-to-r from-[#141E3D] via-[#1C2A52] to-[#141E3D] p-6 rounded-3xl border border-[#233159] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8D5C5]">
              Live Generated Monthly Draw Numbers
            </span>
            <span className="text-[10px] text-[#7E9F8E] font-mono">
              Version: {generatedResult.converter_version}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 py-2">
            {generatedResult.generated_numbers.map((num, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-2xl bg-[#D96B27] text-[#F8FAF9] text-xl font-black flex items-center justify-center shadow-lg shadow-orange-900/30 border border-orange-400/30"
              >
                {num}
              </div>
            ))}
          </div>

          <p className="text-xs text-center text-[#7E9F8E]">
            Derived deterministically from your 5 latest scores sorted newest-first with +1 wraparound collision resolution.
          </p>
        </div>
      )}

      {/* Active Rolling 5 Scores List */}
      <div className="bg-[#141E3D] p-6 rounded-3xl border border-[#233159] space-y-4">
        <h2 className="text-lg font-bold text-[#F8FAF9]">Active 5 Rolling Scores (Newest First)</h2>

        {sortedScores.length === 0 ? (
          <p className="text-sm text-[#7E9F8E] py-4 text-center">No scores logged yet. Add your first score above!</p>
        ) : (
          <div className="space-y-3">
            {sortedScores.map((score, idx) => (
              <div
                key={score.id}
                className="bg-[#0B132B] p-4 rounded-2xl border border-[#233159] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-xl bg-[#5A7D6C]/20 text-[#A8D5C5] text-xs font-bold flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="text-base font-bold text-[#F8FAF9]">
                      Score: <span className="text-[#D96B27]">{score.score_value}</span>
                    </div>
                    <div className="text-xs text-[#7E9F8E] flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-[#5A7D6C]" /> {score.date_played}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteScore(score.id)}
                  title="Delete score"
                  className="p-2 rounded-xl text-rose-400 hover:text-rose-200 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
