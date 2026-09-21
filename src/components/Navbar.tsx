"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Trophy } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/charities", label: "Charities" },
    { href: "/pricing", label: "Pricing" },
    { href: "/responsible-play", label: "Responsible Play" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#0B132B]/90 backdrop-blur-md border-b border-[#233159]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D96B27] to-[#5A7D6C] p-0.5 flex items-center justify-center shadow-lg shadow-orange-500/10 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center">
              <Trophy className="w-5 h-5 text-[#A8D5C5]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#F8FAF9] flex items-center gap-1.5">
              Digital Heroes <span className="w-2 h-2 rounded-full bg-[#D96B27]"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#7E9F8E] font-medium">
              Score &amp; Give Back
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#141E3D]/60 p-1.5 rounded-full border border-[#233159]/60">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive(link.href)
                  ? "bg-[#5A7D6C] text-[#F8FAF9] shadow-sm"
                  : "text-[#7E9F8E] hover:text-[#F8FAF9] hover:bg-[#1C2A52]/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-[#A8D5C5] hover:text-[#F8FAF9] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] shadow-lg shadow-orange-900/20 hover:shadow-orange-700/30 transition-all flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-[#F8FAF9]" />
            Join &amp; Support
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 rounded-lg text-[#7E9F8E] hover:text-[#F8FAF9] hover:bg-[#141E3D] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141E3D] border-b border-[#233159] px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-[#5A7D6C] text-[#F8FAF9]"
                  : "text-[#7E9F8E] hover:text-[#F8FAF9] hover:bg-[#1C2A52]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#233159] flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-medium text-[#A8D5C5] hover:text-[#F8FAF9]"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl text-sm font-semibold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] shadow-md"
            >
              Join &amp; Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
