import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#D96B27]">
          Simple & Transparent
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F8FAF9]">
          Digital Heroes Membership Plans
        </h1>
        <p className="text-lg text-[#7E9F8E] leading-relaxed">
          Both plans grant full access to Stableford score entry, monthly prize pool draws, and direct charity support.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Monthly Plan */}
        <div className="bg-[#141E3D] p-8 sm:p-10 rounded-3xl border border-[#233159] space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A8D5C5]">
                Monthly Plan
              </span>
              <span className="px-3 py-1 rounded-full bg-[#0B132B] text-[#7E9F8E] text-xs">
                Flexible Recurring
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-[#F8FAF9]">\$15</span>
                <span className="text-[#7E9F8E]">/ month</span>
              </div>
              <p className="text-xs text-[#7E9F8E] mt-2">Billed monthly. Cancel anytime.</p>
            </div>

            <ul className="space-y-3 pt-6 border-t border-[#233159] text-sm text-[#F8FAF9]">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5A7D6C] shrink-0" />
                <span>Unlimited Stableford score logging (1/day max)</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5A7D6C] shrink-0" />
                <span>Rolling 5 scores converted into monthly draw numbers</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5A7D6C] shrink-0" />
                <span>Direct allocation to your chosen partner charity</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5A7D6C] shrink-0" />
                <span>Eligibility for 5-number, 4-number &amp; 3-number prize pools</span>
              </li>
            </ul>
          </div>

          <Link
            href="/signup?plan=monthly"
            className="w-full py-4 rounded-full text-center text-sm font-bold bg-[#5A7D6C] text-[#F8FAF9] hover:bg-[#7E9F8E] transition-colors"
          >
            Choose Monthly (\$15/mo)
          </Link>
        </div>

        {/* Yearly Plan */}
        <div className="bg-[#141E3D] p-8 sm:p-10 rounded-3xl border-2 border-[#D96B27] space-y-8 flex flex-col justify-between relative shadow-2xl shadow-orange-950/20">
          <div className="absolute -top-4 right-8 px-4 py-1.5 rounded-full bg-[#D96B27] text-[#F8FAF9] text-xs font-bold uppercase tracking-wider">
            Save \$30 / Year
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D96B27]">
                Yearly Plan
              </span>
              <span className="px-3 py-1 rounded-full bg-[#D96B27]/20 text-[#D96B27] text-xs font-semibold">
                Best Value
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-[#F8FAF9]">\$150</span>
                <span className="text-[#7E9F8E]">/ year</span>
              </div>
              <p className="text-xs text-[#7E9F8E] mt-2">Billed annually (\$12.50/mo equivalent).</p>
            </div>

            <ul className="space-y-3 pt-6 border-t border-[#233159] text-sm text-[#F8FAF9]">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D96B27] shrink-0" />
                <span>All Monthly Plan features included</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D96B27] shrink-0" />
                <span>12 uninterrupted monthly draw entries</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D96B27] shrink-0" />
                <span>2 months free compared to monthly billing</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D96B27] shrink-0" />
                <span>Maximized year-round charity support</span>
              </li>
            </ul>
          </div>

          <Link
            href="/signup?plan=yearly"
            className="w-full py-4 rounded-full text-center text-sm font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] transition-colors shadow-lg"
          >
            Choose Yearly (\$150/yr)
          </Link>
        </div>
      </div>
    </div>
  );
}
