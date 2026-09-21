"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, X, FileText, ArrowLeft, CheckCircle2, DollarSign } from "lucide-react";
import { DemoWinner } from "@/lib/demo-data";

export default function AdminWinnersPage() {
  const [winners, setWinners] = useState<DemoWinner[]>([
    {
      id: "win-101",
      draw_id: "draw-prev-1",
      draw_entry_id: "entry-1",
      user_id: "demo-user-1",
      user_name: "Alex Morgan",
      tier_level: 4,
      prize_amount_minor: 125000,
      status: "proof_submitted",
      proof_storage_path: "winner-proofs/demo-user-1/win-101_scorecard.pdf",
      created_at: "2026-08-31T23:59:59Z",
    },
  ]);

  const [rejectionNotes, setRejectionNotes] = useState<Record<string, string>>({});
  const [payoutRef, setPayoutRef] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<string>("");

  const handleApprove = (id: string) => {
    setWinners(
      winners.map((w) => (w.id === id ? { ...w, status: "verified" } : w))
    );
    setMsg(`Winner claim #${id} approved successfully.`);
  };

  const handleReject = (id: string) => {
    const notes = rejectionNotes[id];
    if (!notes) {
      alert("Rejection review notes are required before rejecting a winner claim.");
      return;
    }
    setWinners(
      winners.map((w) =>
        w.id === id ? { ...w, status: "rejected", rejection_reason: notes } : w
      )
    );
    setMsg(`Winner claim #${id} rejected.`);
  };

  const handleMarkPaid = (id: string) => {
    const ref = payoutRef[id] || `PAY_REF_${Date.now()}`;
    setWinners(
      winners.map((w) =>
        w.id === id ? { ...w, status: "paid", payment_reference: ref } : w
      )
    );
    setMsg(`Winner claim #${id} marked as paid with reference ${ref}.`);
  };

  const handleGenerateSignedUrl = (storagePath: string) => {
    alert(
      `Short-lived Signed URL generated (1-hour TTL):\nhttps://your-supabase.storage/signed/${encodeURIComponent(storagePath)}?token=demo_signed_token`
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
          Administrative Queue
        </span>
        <h1 className="text-3xl font-extrabold text-[#F8FAF9] mt-0.5">Winner Proof Verification &amp; Payouts</h1>
        <p className="text-xs text-[#7E9F8E] mt-1">
          Review private winner proof files via signed URLs, approve/reject claims, and record payout references.
        </p>
      </div>

      {msg && (
        <div className="bg-[#5A7D6C]/20 border border-[#5A7D6C] text-[#A8D5C5] text-xs p-4 rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#A8D5C5] shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* Winners Queue */}
      <div className="space-y-6">
        {winners.map((win) => (
          <div
            key={win.id}
            className="bg-[#141E3D] p-6 sm:p-8 rounded-3xl border border-[#233159] space-y-6 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#233159] pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#A8D5C5]">
                  Claim ID: {win.id} — Subscriber: {win.user_name} ({win.user_id})
                </span>
                <div className="text-2xl font-bold text-[#F8FAF9] mt-1">
                  Prize: \${(win.prize_amount_minor / 100).toLocaleString()} ({win.tier_level}-Number Tier)
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  win.status === "paid"
                    ? "bg-[#5A7D6C]/30 text-[#A8D5C5]"
                    : win.status === "verified"
                    ? "bg-[#A8D5C5]/30 text-[#A8D5C5]"
                    : win.status === "proof_submitted"
                    ? "bg-amber-500/20 text-amber-300"
                    : win.status === "rejected"
                    ? "bg-rose-500/20 text-rose-300"
                    : "bg-[#D96B27]/20 text-[#D96B27]"
                }`}
              >
                {win.status.toUpperCase()}
              </span>
            </div>

            {/* Proof Inspection */}
            {win.proof_storage_path ? (
              <div className="bg-[#0B132B] p-4 rounded-2xl border border-[#233159] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#7E9F8E]">
                  <FileText className="w-4 h-4 text-[#D96B27]" />
                  <span>Private Storage Path: <code className="text-[#F8FAF9] font-mono">{win.proof_storage_path}</code></span>
                </div>
                <button
                  onClick={() => handleGenerateSignedUrl(win.proof_storage_path!)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#141E3D] text-[#A8D5C5] hover:text-[#F8FAF9] border border-[#233159] shrink-0"
                >
                  Generate Signed Preview URL
                </button>
              </div>
            ) : (
              <div className="text-xs text-[#7E9F8E]">No proof uploaded yet by winner.</div>
            )}

            {/* Actions */}
            {win.status === "proof_submitted" && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => handleApprove(win.id)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#5A7D6C] text-[#F8FAF9] hover:bg-[#7E9F8E] flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Approve Claim
                  </button>

                  <div className="flex-grow w-full flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Rejection review notes..."
                      value={rejectionNotes[win.id] || ""}
                      onChange={(e) =>
                        setRejectionNotes({ ...rejectionNotes, [win.id]: e.target.value })
                      }
                      className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-2 text-xs text-[#F8FAF9]"
                    />
                    <button
                      onClick={() => handleReject(win.id)}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-500 shrink-0 flex items-center gap-1"
                    >
                      <X className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              </div>
            )}

            {win.status === "verified" && (
              <div className="bg-[#0B132B] p-4 rounded-2xl border border-[#233159] flex flex-col sm:flex-row items-center justify-between gap-4">
                <input
                  type="text"
                  placeholder="Payout payment reference (e.g. TXN_98765)"
                  value={payoutRef[win.id] || ""}
                  onChange={(e) => setPayoutRef({ ...payoutRef, [win.id]: e.target.value })}
                  className="w-full sm:w-80 bg-[#141E3D] border border-[#233159] rounded-xl px-4 py-2 text-xs text-[#F8FAF9]"
                />
                <button
                  onClick={() => handleMarkPaid(win.id)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] flex items-center gap-2 shrink-0"
                >
                  <DollarSign className="w-4 h-4" /> Mark Payout Paid
                </button>
              </div>
            )}

            {win.payment_reference && (
              <div className="text-xs text-[#A8D5C5] font-mono">
                Payment Reference: {win.payment_reference}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
