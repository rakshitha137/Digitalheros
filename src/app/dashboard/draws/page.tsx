import React from "react";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import { INITIAL_DEMO_DRAWS } from "@/lib/demo-data";

export default function DashboardDrawsPage() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8D5C5] hover:text-[#F8FAF9] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div>
        <h1 className="text-3xl font-extrabold text-[#F8FAF9]">Monthly Draws &amp; Participation</h1>
        <p className="text-xs text-[#7E9F8E] mt-1">
          View upcoming scheduled draws and results from published monthly prize draws.
        </p>
      </div>

      <div className="space-y-6">
        {INITIAL_DEMO_DRAWS.map((draw) => (
          <div
            key={draw.id}
            className="bg-[#141E3D] p-6 sm:p-8 rounded-3xl border border-[#233159] space-y-4 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#233159] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A8D5C5]">
                  {draw.draw_year} — Month {draw.draw_month}
                </span>
                <h2 className="text-xl font-bold text-[#F8FAF9] flex items-center gap-2 mt-0.5">
                  <Calendar className="w-5 h-5 text-[#5A7D6C]" /> Draw Date: {draw.draw_date}
                </h2>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${
                  draw.status === "published"
                    ? "bg-[#5A7D6C]/20 text-[#A8D5C5]"
                    : "bg-[#D96B27]/20 text-[#D96B27]"
                }`}
              >
                {draw.status === "published" ? "Published Draw" : "Upcoming Scheduled Draw"}
              </span>
            </div>

            {draw.status === "published" && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-[#F8FAF9]">Winning Numbers</div>
                <div className="flex flex-wrap items-center gap-3">
                  {draw.winning_numbers.map((num, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-xl bg-[#D96B27] text-[#F8FAF9] font-bold text-lg flex items-center justify-center shadow-md"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs text-[#7E9F8E]">
              <div>
                Total Revenue:{" "}
                <strong className="text-[#F8FAF9]">
                  \${(draw.total_subscription_revenue_minor / 100).toLocaleString()}
                </strong>
              </div>
              <div>
                Prize Pool:{" "}
                <strong className="text-[#A8D5C5]">
                  \${(draw.prize_pool_allocated_minor / 100).toLocaleString()}
                </strong>
              </div>
              <div>
                Rollover:{" "}
                <strong className="text-[#D96B27]">
                  \${(draw.jackpot_rollover_carried_forward_minor / 100).toLocaleString()}
                </strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
