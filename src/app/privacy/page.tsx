import React from "react";

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-[#7E9F8E]">
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#5A7D6C]">Privacy</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAF9]">Privacy Policy</h1>
        <p className="text-xs text-[#7E9F8E]">Last updated: September 21, 2026</p>
      </div>

      <div className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#F8FAF9]">1. Information We Collect</h2>
          <p>
            We collect personal information necessary to deliver our subscription, charity contribution, and monthly draw services, including your name, email address, Stableford score entries, and designated charity preferences.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#F8FAF9]">2. Private Winner Proof Documents</h2>
          <p>
            Winner proof files uploaded for prize verification are stored in isolated, private storage buckets with strict Row Level Security (RLS). Proof files are never publicly exposed or indexed by search engines. Access is restricted exclusively to the account owner and authorized platform administrators via short-lived signed URLs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#F8FAF9]">3. Payment Processing</h2>
          <p>
            Payment information is processed securely through Stripe. Digital Heroes does not store full credit card numbers or sensitive payment authentication data on our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-[#F8FAF9]">4. Audit & Transparency</h2>
          <p>
            System actions such as draw publishing, winner approval, and subscription state changes are recorded in encrypted audit logs to preserve platform integrity and compliance.
          </p>
        </section>
      </div>
    </div>
  );
}
