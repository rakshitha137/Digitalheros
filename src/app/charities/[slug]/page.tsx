import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, ExternalLink, Calendar, MapPin, ArrowLeft, ShieldCheck } from "lucide-react";
import { INITIAL_DEMO_CHARITIES } from "@/lib/demo-data";

export default async function CharityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const charity = INITIAL_DEMO_CHARITIES.find((c) => c.slug === slug);

  if (!charity) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <Link
        href="/charities"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8D5C5] hover:text-[#F8FAF9] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Charity Directory
      </Link>

      <div className="bg-[#141E3D] p-8 sm:p-10 rounded-3xl border border-[#233159] space-y-8 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#233159] pb-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8D5C5]">
              {charity.category}
            </span>
            <h1 className="text-3xl font-extrabold text-[#F8FAF9]">{charity.name}</h1>
            <div className="flex items-center gap-2 text-xs text-[#5A7D6C] bg-[#0B132B] px-3 py-1.5 rounded-full border border-[#233159] w-fit">
              <ShieldCheck className="w-4 h-4 text-[#D96B27]" />
              <span>Verified Non-Profit Partner</span>
            </div>
          </div>

          <div className="bg-[#0B132B] p-6 rounded-2xl border border-[#233159] text-center min-w-[180px]">
            <div className="text-xs text-[#7E9F8E]">Total Raised</div>
            <div className="text-2xl font-bold text-[#D96B27] mt-1">
              \${(charity.total_raised_minor / 100).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#F8FAF9]">About the Organization</h2>
          <p className="text-sm text-[#7E9F8E] leading-relaxed">{charity.description}</p>
          <a
            href={charity.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8D5C5] hover:underline pt-2"
          >
            Visit Official Website <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-4 pt-6 border-t border-[#233159]">
          <h2 className="text-lg font-bold text-[#F8FAF9]">Upcoming Events &amp; Initiatives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0B132B] p-5 rounded-2xl border border-[#233159] space-y-2">
              <div className="text-sm font-bold text-[#F8FAF9]">Annual Charity Golf Classic</div>
              <div className="text-xs text-[#7E9F8E] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#5A7D6C]" /> October 24, 2026
              </div>
              <div className="text-xs text-[#7E9F8E] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D96B27]" /> Pine Valley Golf Resort
              </div>
            </div>

            <div className="bg-[#0B132B] p-5 rounded-2xl border border-[#233159] space-y-2">
              <div className="text-sm font-bold text-[#F8FAF9]">Community Outreach Clinic</div>
              <div className="text-xs text-[#7E9F8E] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#5A7D6C]" /> November 12, 2026
              </div>
              <div className="text-xs text-[#7E9F8E] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D96B27]" /> Municipal Golf Center
              </div>
            </div>
          </div>
        </div>

        {/* Selection CTA */}
        <div className="pt-6 text-center border-t border-[#233159]">
          <Link
            href={`/signup?charity=${charity.id}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] shadow-xl transition-all"
          >
            Select {charity.name} <Heart className="w-5 h-5 fill-current" />
          </Link>
        </div>
      </div>
    </div>
  );
}
