import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B132B] border-t border-[#233159] text-[#7E9F8E] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#233159]/60">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#F8FAF9]">
                Digital Heroes <span className="text-[#D96B27]">.</span>
              </span>
            </Link>
            <p className="text-sm text-[#7E9F8E] leading-relaxed">
              Combining Stableford golf scoring, monthly draw excitement, and meaningful charity support into one powerful subscription platform.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#A8D5C5] bg-[#141E3D] px-3 py-1.5 rounded-full border border-[#233159] w-fit">
              <ShieldCheck className="w-4 h-4 text-[#D96B27]" />
              <span>Verified Charity Partner Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#F8FAF9] uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#F8FAF9] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#F8FAF9] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/charities" className="hover:text-[#F8FAF9] transition-colors">
                  Partner Charities
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#F8FAF9] transition-colors">
                  Subscription Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Gaming Compliance */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#F8FAF9] uppercase tracking-wider">
              Compliance &amp; Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-[#F8FAF9] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#F8FAF9] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/responsible-play"
                  className="hover:text-[#F8FAF9] transition-colors flex items-center gap-1.5 text-[#A8D5C5]"
                >
                  <Heart className="w-3.5 h-3.5 text-[#D96B27]" />
                  Responsible Play Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Impact Statement */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#F8FAF9] uppercase tracking-wider">
              Our Charity Commitment
            </h3>
            <p className="text-xs text-[#7E9F8E] leading-relaxed">
              Every monthly and yearly subscription directly supports your chosen charity. Subscribers enter our monthly score-based draw for a chance to win from the prize pool while giving back to causes that matter.
            </p>
            <div className="pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#F8FAF9] bg-[#5A7D6C] hover:bg-[#7E9F8E] px-4 py-2 rounded-lg transition-colors"
              >
                Become a Hero <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7E9F8E] gap-4">
          <p>© {new Date().getFullYear()} Digital Heroes. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Score Range: 1–45</span>
            <span>Rolling 5 Scores</span>
            <span>Monthly Prize Draws</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
