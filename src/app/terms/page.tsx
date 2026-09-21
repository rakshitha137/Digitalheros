import React from "react";

export default function TermsPage() {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-[#7E9F8E]">
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#D96B27]">Legal</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAF9]">Terms of Service</h1>
        <p className="text-xs text-[#7E9F8E]">Last updated: September 21, 2026</p>
      </div>

      <div className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#F8FAF9]">1. Subscription &amp; Membership Terms</h2>
          <p>
            Digital Heroes is a subscription-based platform. By creating an account and selecting a Monthly (\$15/mo) or Yearly (\$150/yr) plan, you agree to recurring billing through our authorized payment processor. Subscriptions may be cancelled at any time prior to the current billing period end.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#F8FAF9]">2. Stableford Score Entry Rules</h2>
          <p>
            Subscribers must submit genuine golf Stableford scores. The valid score range is integer values strictly from 1 through 45, inclusive. A maximum of 1 score entry is permitted per user per calendar date. Submission of false scores or automated script submissions is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#F8FAF9]">3. Monthly Draw Engine &amp; Prize Allocation</h2>
          <p>
            Monthly draws process active rolling scores using our deterministic converter. Prize pools are split into 5-number (40% + Rollover), 4-number (35%), and 3-number (25%) match tiers. Unclaimed 5-number jackpots roll over into subsequent draws. Unclaimed 3-number and 4-number tier allocations are logged as undistributed amounts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#F8FAF9]">4. Winner Verification &amp; Payouts</h2>
          <p>
            Winners are required to upload proof documentation to our private storage vault for administrative verification. Verified payouts are disbursed in accordance with platform payment schedules.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#F8FAF9]">5. Partner Charity Allocation</h2>
          <p>
            Subscribers designate a partner charity upon sign up. A portion of subscription revenue is distributed to partner non-profit organizations in good standing.
          </p>
        </section>
      </div>
    </div>
  );
}
