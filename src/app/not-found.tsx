import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-[#141E3D] text-[#A8D5C5] flex items-center justify-center border border-[#233159]">
        <HelpCircle className="w-8 h-8" />
      </div>
      <div className="space-y-2 max-w-md">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D96B27]">404 Error</span>
        <h1 className="text-3xl font-extrabold text-[#F8FAF9]">Page Not Found</h1>
        <p className="text-sm text-[#7E9F8E]">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-[#5A7D6C] text-[#F8FAF9] hover:bg-[#7E9F8E] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home Page
      </Link>
    </div>
  );
}
