"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trophy, Upload, ShieldCheck, CheckCircle2, ArrowLeft } from "lucide-react";
import { DemoWinner } from "@/lib/demo-data";

export default function DashboardWinningsPage() {
  const [winnings, setWinnings] = useState<DemoWinner[]>([
    {
      id: "win-101",
      draw_id: "draw-prev-1",
      draw_entry_id: "entry-1",
      user_id: "demo-user-1",
      user_name: "Alex Morgan",
      tier_level: 4,
      prize_amount_minor: 125000,
      status: "pending_proof",
      created_at: "2026-08-31T23:59:59Z",
    },
  ]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        alert("Invalid file format. Please upload an image (JPG, PNG, WEBP) or a PDF document.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds maximum limit of 5MB.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadProof = (winnerId: string) => {
    if (!selectedFile) {
      alert("Please select a valid proof file (Image or PDF) first.");
      return;
    }

    setUploadingId(winnerId);
    // Simulate private bucket upload: winner-proofs/{userId}/{winnerId}_{filename}
    setTimeout(() => {
      const storagePath = `winner-proofs/demo-user-1/${winnerId}_${selectedFile.name}`;
      setWinnings(
        winnings.map((w) =>
          w.id === winnerId
            ? { ...w, status: "proof_submitted", proof_storage_path: storagePath }
            : w
        )
      );
      setUploadingId(null);
      setSelectedFile(null);
      setMessage(`Proof uploaded securely to private bucket: ${storagePath}`);
    }, 1000);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8D5C5] hover:text-[#F8FAF9] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div>
        <h1 className="text-3xl font-extrabold text-[#F8FAF9]">My Prize Claims &amp; Winnings</h1>
        <p className="text-xs text-[#7E9F8E] mt-1">
          Upload proof files to our private storage vault for administrative verification and payout processing.
        </p>
      </div>

      {message && (
        <div className="bg-[#5A7D6C]/20 border border-[#5A7D6C] text-[#A8D5C5] text-xs p-4 rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#A8D5C5] shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {winnings.length === 0 ? (
        <div className="bg-[#141E3D] p-12 rounded-3xl border border-[#233159] text-center space-y-3">
          <Trophy className="w-12 h-12 text-[#7E9F8E] mx-auto opacity-50" />
          <h2 className="text-lg font-bold text-[#F8FAF9]">No Prize Claims Yet</h2>
          <p className="text-xs text-[#7E9F8E]">
            Log your Stableford scores regularly to participate in upcoming monthly draws!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {winnings.map((win) => (
            <div
              key={win.id}
              className="bg-[#141E3D] p-6 sm:p-8 rounded-3xl border border-[#233159] space-y-6 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#233159] pb-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D96B27]">
                    {win.tier_level}-Number Tier Win
                  </span>
                  <div className="text-3xl font-extrabold text-[#F8FAF9]">
                    \${(win.prize_amount_minor / 100).toLocaleString()}
                  </div>
                  <div className="text-xs text-[#7E9F8E]">Draw Reference: {win.draw_id}</div>
                </div>

                <div className="flex items-center gap-2">
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
                    Status: {win.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Upload Proof Module */}
              {win.status === "pending_proof" && (
                <div className="bg-[#0B132B] p-6 rounded-2xl border border-[#233159] space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-[#F8FAF9] flex items-center gap-2">
                      <Upload className="w-4 h-4 text-[#D96B27]" /> Upload Score &amp; Identity Proof
                    </h3>
                    <p className="text-xs text-[#7E9F8E]">
                      Upload a scorecard image or PDF verification document. Stored privately in restricted `winner-proofs` storage bucket.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,application/pdf"
                      onChange={handleFileChange}
                      className="text-xs text-[#7E9F8E] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#5A7D6C] file:text-[#F8FAF9] hover:file:bg-[#7E9F8E] cursor-pointer"
                    />
                    <button
                      onClick={() => handleUploadProof(win.id)}
                      disabled={!selectedFile || uploadingId === win.id}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] disabled:opacity-50 transition-colors shadow-md"
                    >
                      {uploadingId === win.id ? "Uploading to Vault..." : "Submit Proof"}
                    </button>
                  </div>
                </div>
              )}

              {win.proof_storage_path && (
                <div className="bg-[#0B132B] p-4 rounded-xl border border-[#233159] text-xs text-[#A8D5C5] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5A7D6C] shrink-0" />
                  <span>Private Storage Vault Location: <code className="text-[#F8FAF9] font-mono">{win.proof_storage_path}</code></span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
