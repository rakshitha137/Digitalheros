import React from "react";
import Link from "next/link";
import {
  Users,
  CreditCard,
  Trophy,
  Heart,
  ShieldCheck,
  ChevronRight,
  FileText,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D96B27]">
            Administrative Console
          </span>
          <h1 className="text-3xl font-extrabold text-[#F8FAF9] mt-0.5">Platform Overview &amp; Control</h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#A8D5C5] bg-[#141E3D] px-4 py-2 rounded-full border border-[#233159]">
          <ShieldCheck className="w-4 h-4 text-[#D96B27]" />
          <span>Server-Side Admin Role Verified</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#141E3D] p-6 rounded-3xl border border-[#233159] space-y-3">
          <div className="flex justify-between items-center text-[#7E9F8E]">
            <span className="text-xs font-medium">Total Subscribers</span>
            <Users className="w-4 h-4 text-[#A8D5C5]" />
          </div>
          <div className="text-3xl font-extrabold text-[#F8FAF9]">1,420</div>
          <div className="text-xs text-[#7E9F8E]">Active Monthly &amp; Yearly</div>
        </div>

        <div className="bg-[#141E3D] p-6 rounded-3xl border border-[#233159] space-y-3">
          <div className="flex justify-between items-center text-[#7E9F8E]">
            <span className="text-xs font-medium">Monthly Recurring Revenue</span>
            <CreditCard className="w-4 h-4 text-[#5A7D6C]" />
          </div>
          <div className="text-3xl font-extrabold text-[#F8FAF9]">\$21,300</div>
          <div className="text-xs text-[#7E9F8E]">Calculated in Minor Units</div>
        </div>

        <div className="bg-[#141E3D] p-6 rounded-3xl border border-[#233159] space-y-3">
          <div className="flex justify-between items-center text-[#7E9F8E]">
            <span className="text-xs font-medium">Charity Allocation Total</span>
            <Heart className="w-4 h-4 text-[#D96B27]" />
          </div>
          <div className="text-3xl font-extrabold text-[#D96B27]">\$150,400</div>
          <div className="text-xs text-[#7E9F8E]">Distributed to Partners</div>
        </div>

        <div className="bg-[#141E3D] p-6 rounded-3xl border border-[#233159] space-y-3">
          <div className="flex justify-between items-center text-[#7E9F8E]">
            <span className="text-xs font-medium">Pending Verifications</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-[#F8FAF9]">1 Claim</div>
          <div className="text-xs text-[#A8D5C5]">Awaiting Proof Review</div>
        </div>
      </div>

      {/* Admin Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/draws"
          className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] hover:border-[#D96B27] transition-all group space-y-4 shadow-xl"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#D96B27]/20 text-[#D96B27] flex items-center justify-center">
            <Trophy className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#F8FAF9] flex items-center justify-between">
              Monthly Draw Engine <ChevronRight className="w-5 h-5 text-[#7E9F8E] group-hover:translate-x-1 transition-transform" />
            </h2>
            <p className="text-xs text-[#7E9F8E] leading-relaxed">
              Create drafts, run simulations, view prize pool allocations, and publish draw results idempotently.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/winners"
          className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] hover:border-[#5A7D6C] transition-all group space-y-4 shadow-xl"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#5A7D6C]/20 text-[#A8D5C5] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#F8FAF9] flex items-center justify-between">
              Winner Verification Queue <ChevronRight className="w-5 h-5 text-[#7E9F8E] group-hover:translate-x-1 transition-transform" />
            </h2>
            <p className="text-xs text-[#7E9F8E] leading-relaxed">
              Preview proof files securely via signed URLs, approve/reject claims, and record payout references.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/charities"
          className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] hover:border-[#A8D5C5] transition-all group space-y-4 shadow-xl"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#A8D5C5]/20 text-[#A8D5C5] flex items-center justify-center">
            <Heart className="w-6 h-6 group-hover:scale-110 transition-transform text-[#D96B27]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#F8FAF9] flex items-center justify-between">
              Charity Management <ChevronRight className="w-5 h-5 text-[#7E9F8E] group-hover:translate-x-1 transition-transform" />
            </h2>
            <p className="text-xs text-[#7E9F8E] leading-relaxed">
              Add new partner charities, feature key causes, edit details, and manage non-profit archives.
            </p>
          </div>
        </Link>
      </div>

      {/* Audit Logs Preview */}
      <div className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-[#F8FAF9] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#D96B27]" /> System Audit Log Preview
        </h2>

        <div className="space-y-3 text-xs">
          <div className="bg-[#0B132B] p-4 rounded-2xl border border-[#233159] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#F8FAF9]">DRAW_PUBLISHED</span> — Month 8/2026 draw published idempotently.
            </div>
            <span className="text-[#7E9F8E] font-mono">2026-08-31 23:59:59 UTC</span>
          </div>

          <div className="bg-[#0B132B] p-4 rounded-2xl border border-[#233159] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#F8FAF9]">WINNER_PROOF_SUBMITTED</span> — User demo-user-1 submitted proof for win-101.
            </div>
            <span className="text-[#7E9F8E] font-mono">2026-09-01 10:14:02 UTC</span>
          </div>

          <div className="bg-[#0B132B] p-4 rounded-2xl border border-[#233159] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#F8FAF9]">SUBSCRIPTION_SYNC</span> — Stripe subscription created sub_demo_123.
            </div>
            <span className="text-[#7E9F8E] font-mono">2026-09-01 08:30:11 UTC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
