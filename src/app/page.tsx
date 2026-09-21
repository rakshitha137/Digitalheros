import React from "react";
import Link from "next/link";
import {
  Trophy,
  Heart,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export default function HomePage() {
  const faqs = [
    {
      q: "How does Digital Heroes turn my golf scores into draw numbers?",
      a: "When you log your Stableford scores (valid integer values 1 through 45), our deterministic converter takes your 5 most recent active scores ordered by date. If score duplicates occur, the system increments by 1 with wraparound (45 to 1) until 5 unique draw numbers are generated.",
    },
    {
      q: "How much of my subscription goes to charity?",
      a: "A configurable portion of every monthly or yearly subscription is allocated directly to your chosen partner charity, empowering you to support causes you care about every month.",
    },
    {
      q: "What happens if no one wins the 5-number jackpot?",
      a: "If no subscriber matches all 5 winning numbers in a monthly draw, the 40% jackpot pool automatically rolls over into the next month's 5-number jackpot, building bigger prize pools!",
    },
    {
      q: "What are the rules for entering Stableford scores?",
      a: "You can submit integer score values from 1 through 45 inclusive. You may submit a maximum of 1 score per date. The platform automatically maintains your 5 most recent scores for active draw calculations.",
    },
    {
      q: "How are winners verified and paid?",
      a: "Winners upload proof documentation securely to a private bucket. Once verified by our administration team, payouts are processed directly with complete status tracking.",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Organic Glow Elements */}
      <div className="organic-shape-bg w-96 h-96 bg-[#5A7D6C] top-10 -left-20"></div>
      <div className="organic-shape-bg w-96 h-96 bg-[#D96B27] top-96 right-0"></div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141E3D] border border-[#233159] text-xs font-semibold text-[#A8D5C5] shadow-lg">
            <Sparkles className="w-4 h-4 text-[#D96B27]" />
            <span>Play Golf • Support Charity • Win Monthly Prize Pools</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F8FAF9] leading-[1.15]">
            Turn Your Stableford Scores Into <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A8D5C5] via-[#7E9F8E] to-[#D96B27]">
              Life-Changing Charity Impact
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#7E9F8E] max-w-3xl mx-auto leading-relaxed">
            Log your regular golf Stableford scores (1–45). Your 5 latest scores generate your monthly draw entry. Support your chosen charity every month while competing for 5-number jackpots!
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] shadow-xl shadow-orange-900/30 hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              Start Your Subscription <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold bg-[#141E3D] text-[#A8D5C5] hover:bg-[#1C2A52] hover:text-[#F8FAF9] border border-[#233159] transition-all flex items-center justify-center gap-2"
            >
              How It Works
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-[#141E3D]/80 backdrop-blur-sm p-4 rounded-2xl border border-[#233159]">
              <div className="text-2xl sm:text-3xl font-bold text-[#F8FAF9]">\$150K+</div>
              <div className="text-xs text-[#7E9F8E]">Raised for Charities</div>
            </div>
            <div className="bg-[#141E3D]/80 backdrop-blur-sm p-4 rounded-2xl border border-[#233159]">
              <div className="text-2xl sm:text-3xl font-bold text-[#A8D5C5]">5 Rolling</div>
              <div className="text-xs text-[#7E9F8E]">Latest Scores Calculated</div>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-[#141E3D]/80 backdrop-blur-sm p-4 rounded-2xl border border-[#233159]">
              <div className="text-2xl sm:text-3xl font-bold text-[#D96B27]">40%</div>
              <div className="text-xs text-[#7E9F8E]">5-Match Jackpot Pool</div>
            </div>
          </div>
        </div>
      </section>

      {/* Charity Value Proposition */}
      <section className="py-16 bg-[#141E3D]/50 border-y border-[#233159]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D96B27]">
              Purpose Driven Scoring
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAF9]">
              Why Golfers Choose Digital Heroes
            </h2>
            <p className="text-[#7E9F8E]">
              We bridge individual golfing effort with ongoing charitable giving and monthly prize opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0B132B] p-8 rounded-3xl border border-[#233159] hover:border-[#5A7D6C] transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5A7D6C]/20 flex items-center justify-center text-[#A8D5C5]">
                <Heart className="w-6 h-6 text-[#D96B27]" />
              </div>
              <h3 className="text-xl font-bold text-[#F8FAF9]">Direct Charity Support</h3>
              <p className="text-sm text-[#7E9F8E] leading-relaxed">
                Choose your preferred partner charity upon sign up. Every monthly or yearly payment directly empowers your selected organization.
              </p>
            </div>

            <div className="bg-[#0B132B] p-8 rounded-3xl border border-[#233159] hover:border-[#5A7D6C] transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5A7D6C]/20 flex items-center justify-center text-[#A8D5C5]">
                <Target className="w-6 h-6 text-[#A8D5C5]" />
              </div>
              <h3 className="text-xl font-bold text-[#F8FAF9]">Rolling 5 Scores Logic</h3>
              <p className="text-sm text-[#7E9F8E] leading-relaxed">
                Log your Stableford scores (1–45). Only your 5 most recent scores are active, ensuring fair, dynamic draw entry month after month.
              </p>
            </div>

            <div className="bg-[#0B132B] p-8 rounded-3xl border border-[#233159] hover:border-[#5A7D6C] transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5A7D6C]/20 flex items-center justify-center text-[#A8D5C5]">
                <Trophy className="w-6 h-6 text-[#D96B27]" />
              </div>
              <h3 className="text-xl font-bold text-[#F8FAF9]">Rollover Jackpot Engine</h3>
              <p className="text-sm text-[#7E9F8E] leading-relaxed">
                Compete across 5-number (40%), 4-number (35%), and 3-number (25%) prize tiers. Unclaimed 5-number jackpots roll over continuously!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#A8D5C5]">
            Simple Step-by-Step
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAF9]">
            How Digital Heroes Works
          </h2>
          <p className="text-[#7E9F8E]">
            Getting started takes less than 2 minutes. Follow these three steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] space-y-4 relative">
            <span className="inline-block px-3 py-1 rounded-full bg-[#D96B27] text-[#F8FAF9] text-xs font-bold">
              Step 1
            </span>
            <h3 className="text-xl font-bold text-[#F8FAF9]">Subscribe & Choose Charity</h3>
            <p className="text-sm text-[#7E9F8E] leading-relaxed">
              Select a Monthly (\$15/mo) or Yearly (\$150/yr) plan. Select the charity you wish to support from our verified directory.
            </p>
          </div>

          <div className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] space-y-4 relative">
            <span className="inline-block px-3 py-1 rounded-full bg-[#5A7D6C] text-[#F8FAF9] text-xs font-bold">
              Step 2
            </span>
            <h3 className="text-xl font-bold text-[#F8FAF9]">Log Stableford Scores</h3>
            <p className="text-sm text-[#7E9F8E] leading-relaxed">
              Enter your golf Stableford scores (1–45) after your rounds. You can log max 1 score per date. The app keeps your 5 latest scores.
            </p>
          </div>

          <div className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] space-y-4 relative">
            <span className="inline-block px-3 py-1 rounded-full bg-[#A8D5C5] text-[#0B132B] text-xs font-bold">
              Step 3
            </span>
            <h3 className="text-xl font-bold text-[#F8FAF9]">Monthly Draw & Win</h3>
            <p className="text-sm text-[#7E9F8E] leading-relaxed">
              Our deterministic converter translates your 5 latest scores into 5 draw numbers. Match numbers in the monthly draw to win prizes!
            </p>
          </div>
        </div>
      </section>

      {/* Monthly Draw Breakdown Section */}
      <section className="py-16 bg-[#141E3D]/40 border-y border-[#233159]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D96B27]">
                Monthly Prize Pool Structure
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAF9]">
                Transparent Prize Tiers & Jackpot Rollovers
              </h2>
              <p className="text-[#7E9F8E] leading-relaxed">
                The monthly prize pool is allocated directly from subscription revenue using integer minor currency calculations. Every draw features three prize tiers:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-[#F8FAF9]">
                  <CheckCircle2 className="w-5 h-5 text-[#D96B27] shrink-0 mt-0.5" />
                  <span>
                    <strong>5-Number Match (40% Tier):</strong> Matches all 5 draw numbers. If unclaimed, the entire 40% rolls over to next month&apos;s jackpot!
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#F8FAF9]">
                  <CheckCircle2 className="w-5 h-5 text-[#5A7D6C] shrink-0 mt-0.5" />
                  <span>
                    <strong>4-Number Match (35% Tier):</strong> Distributed equally among 4-number match winners.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#F8FAF9]">
                  <CheckCircle2 className="w-5 h-5 text-[#A8D5C5] shrink-0 mt-0.5" />
                  <span>
                    <strong>3-Number Match (25% Tier):</strong> Distributed equally among 3-number match winners.
                  </span>
                </li>
              </ul>
            </div>

            {/* Visual Prize Pool Card */}
            <div className="bg-[#0B132B] p-8 rounded-3xl border border-[#233159] space-y-6">
              <div className="flex items-center justify-between border-b border-[#233159] pb-4">
                <span className="text-sm font-medium text-[#7E9F8E]">Monthly Draw Engine</span>
                <span className="px-3 py-1 rounded-full bg-[#5A7D6C]/20 text-[#A8D5C5] text-xs font-bold">
                  Random & Algorithmic Modes
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#141E3D] p-4 rounded-2xl border border-[#233159]">
                  <div>
                    <div className="text-sm font-semibold text-[#F8FAF9]">5-Number Jackpot</div>
                    <div className="text-xs text-[#7E9F8E]">40% Pool + Rollover</div>
                  </div>
                  <span className="text-xl font-bold text-[#D96B27]">40%</span>
                </div>

                <div className="flex justify-between items-center bg-[#141E3D] p-4 rounded-2xl border border-[#233159]">
                  <div>
                    <div className="text-sm font-semibold text-[#F8FAF9]">4-Number Match</div>
                    <div className="text-xs text-[#7E9F8E]">35% Pool Allocation</div>
                  </div>
                  <span className="text-xl font-bold text-[#5A7D6C]">35%</span>
                </div>

                <div className="flex justify-between items-center bg-[#141E3D] p-4 rounded-2xl border border-[#233159]">
                  <div>
                    <div className="text-sm font-semibold text-[#F8FAF9]">3-Number Match</div>
                    <div className="text-xs text-[#7E9F8E]">25% Pool Allocation</div>
                  </div>
                  <span className="text-xl font-bold text-[#A8D5C5]">25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D96B27]">
            Subscription Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAF9]">
            Choose Your Hero Plan
          </h2>
          <p className="text-[#7E9F8E]">
            Simple, recurring subscriptions with automatic monthly draw entry and charity contributions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <div className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A8D5C5]">
                Monthly Plan
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[#F8FAF9]">\$15</span>
                <span className="text-sm text-[#7E9F8E]">/ month</span>
              </div>
              <p className="text-sm text-[#7E9F8E]">
                Flexible monthly subscription with recurring draw entries and charity contributions.
              </p>
              <ul className="space-y-3 pt-4 border-t border-[#233159]">
                <li className="flex items-center gap-2 text-sm text-[#F8FAF9]">
                  <CheckCircle2 className="w-4 h-4 text-[#5A7D6C]" />
                  <span>Log up to 1 score per day (1–45)</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-[#F8FAF9]">
                  <CheckCircle2 className="w-4 h-4 text-[#5A7D6C]" />
                  <span>Rolling 5 scores converted to draw numbers</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-[#F8FAF9]">
                  <CheckCircle2 className="w-4 h-4 text-[#5A7D6C]" />
                  <span>Direct monthly charity contribution</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup?plan=monthly"
              className="w-full py-3.5 rounded-full text-center text-sm font-semibold bg-[#5A7D6C] text-[#F8FAF9] hover:bg-[#7E9F8E] transition-colors"
            >
              Select Monthly
            </Link>
          </div>

          {/* Yearly Plan (Featured) */}
          <div className="bg-[#141E3D] p-8 rounded-3xl border-2 border-[#D96B27] space-y-6 flex flex-col justify-between relative shadow-xl shadow-orange-950/20">
            <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#D96B27] text-[#F8FAF9] text-xs font-bold uppercase tracking-wider">
              Best Value (Save 17%)
            </div>
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D96B27]">
                Yearly Plan
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[#F8FAF9]">\$150</span>
                <span className="text-sm text-[#7E9F8E]">/ year</span>
              </div>
              <p className="text-sm text-[#7E9F8E]">
                Annual membership offering 12 months of draw entries for the price of 10.
              </p>
              <ul className="space-y-3 pt-4 border-t border-[#233159]">
                <li className="flex items-center gap-2 text-sm text-[#F8FAF9]">
                  <CheckCircle2 className="w-4 h-4 text-[#D96B27]" />
                  <span>Includes all Monthly features</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-[#F8FAF9]">
                  <CheckCircle2 className="w-4 h-4 text-[#D96B27]" />
                  <span>Full 12 months draw participation</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-[#F8FAF9]">
                  <CheckCircle2 className="w-4 h-4 text-[#D96B27]" />
                  <span>Maximized annual charity impact</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup?plan=yearly"
              className="w-full py-3.5 rounded-full text-center text-sm font-semibold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] transition-colors shadow-md"
            >
              Select Yearly Plan
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#141E3D]/40 border-t border-[#233159]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#A8D5C5]">
              Got Questions?
            </span>
            <h2 className="text-3xl font-bold text-[#F8FAF9]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#0B132B] p-6 rounded-2xl border border-[#233159] space-y-2"
              >
                <h3 className="text-base font-semibold text-[#F8FAF9] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#D96B27] shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-sm text-[#7E9F8E] leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-[#141E3D] via-[#1C2A52] to-[#141E3D] p-12 rounded-3xl border border-[#233159] space-y-6 max-w-4xl mx-auto shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAF9]">
            Ready to Play & Give Back?
          </h2>
          <p className="text-[#7E9F8E] max-w-2xl mx-auto text-base">
            Join thousands of golfers turning their weekly Stableford scores into monthly charity support and prize opportunities.
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] shadow-xl hover:scale-105 transition-all"
            >
              Sign Up Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
