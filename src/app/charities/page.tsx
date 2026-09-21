import React from "react";
import Link from "next/link";
import { Heart, Search, ExternalLink, ShieldCheck, ArrowRight } from "lucide-react";

export default function CharitiesPage() {
  const sampleCharities = [
    {
      id: "1",
      name: "Veterans Golf & Wellness Foundation",
      category: "Veterans & Rehabilitation",
      description:
        "Providing therapeutic golf programs, mental health counseling, and community support for military veterans.",
      website: "https://example.org/veterans-golf",
      raised: "\$48,500",
      subscribers: 1240,
    },
    {
      id: "2",
      name: "Junior Golf & Youth Opportunity Fund",
      category: "Youth & Education",
      description:
        "Granting equipment, coaching, and academic scholarships to underrepresented youth across the country.",
      website: "https://example.org/junior-golf",
      raised: "\$39,200",
      subscribers: 980,
    },
    {
      id: "3",
      name: "Clean Oceans & Environmental Trust",
      category: "Environment & Conservation",
      description:
        "Funding coastal cleanup initiatives and marine habitat restoration through grassroots ocean protection projects.",
      website: "https://example.org/clean-oceans",
      raised: "\$34,100",
      subscribers: 850,
    },
    {
      id: "4",
      name: "National Cancer Research Alliance",
      category: "Health & Research",
      description:
        "Pioneering breakthrough medical research and providing patient care assistance for families affected by cancer.",
      website: "https://example.org/cancer-research",
      raised: "\$52,800",
      subscribers: 1420,
    },
  ];

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#5A7D6C]">
          Impact Directory
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F8FAF9]">
          Partnered Charities
        </h1>
        <p className="text-lg text-[#7E9F8E] leading-relaxed">
          Every Digital Heroes subscriber selects one partner charity. A portion of your monthly or yearly plan directly supports their mission.
        </p>
      </div>

      {/* Directory Controls Preview */}
      <div className="bg-[#141E3D] p-4 sm:p-6 rounded-2xl border border-[#233159] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 text-[#7E9F8E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search charities..."
            disabled
            className="w-full bg-[#0B132B] border border-[#233159] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F8FAF9] placeholder-[#7E9F8E]/60 cursor-not-allowed opacity-80"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-[#A8D5C5] bg-[#0B132B] px-4 py-2 rounded-xl border border-[#233159]">
          <ShieldCheck className="w-4 h-4 text-[#D96B27]" />
          <span>100% Verified Non-Profit Partners</span>
        </div>
      </div>

      {/* Charity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sampleCharities.map((charity) => (
          <div
            key={charity.id}
            className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] hover:border-[#5A7D6C] transition-all space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A8D5C5]">
                    {charity.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#F8FAF9] mt-1">{charity.name}</h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#5A7D6C]/20 flex items-center justify-center text-[#D96B27]">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
              </div>

              <p className="text-sm text-[#7E9F8E] leading-relaxed">{charity.description}</p>
            </div>

            <div className="pt-4 border-t border-[#233159] flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs text-[#7E9F8E]">Total Raised</div>
                <div className="text-lg font-bold text-[#F8FAF9]">{charity.raised}</div>
              </div>
              <Link
                href={`/signup?charity=${charity.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#5A7D6C] text-[#F8FAF9] hover:bg-[#7E9F8E] transition-colors"
              >
                Support Charity <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#141E3D]/80 p-8 rounded-3xl border border-[#233159] text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#F8FAF9]">Represent a Registered Charity?</h2>
        <p className="text-sm text-[#7E9F8E] max-w-xl mx-auto">
          We welcome applications from verified non-profit organizations. Partner with Digital Heroes to receive ongoing subscription contributions.
        </p>
        <div>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] transition-colors"
          >
            Apply for Partnership <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
