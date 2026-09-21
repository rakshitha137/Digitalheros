"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-rose-500/15 text-rose-400 flex items-center justify-center border border-rose-500/30">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold text-[#F8FAF9]">Something went wrong</h1>
        <p className="text-sm text-[#7E9F8E]">
          An unexpected error occurred. Please try refreshing the page or returning to the homepage.
        </p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#141E3D] text-[#A8D5C5] hover:bg-[#1C2A52] border border-[#233159] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
