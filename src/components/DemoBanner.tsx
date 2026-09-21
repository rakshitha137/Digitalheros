import React from "react";
import { AlertCircle } from "lucide-react";

export default function DemoBanner() {
  return (
    <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-200 text-xs sm:text-sm py-2 px-4 text-center flex items-center justify-center gap-2">
      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
      <span>
        <strong>Phase 1 UI Preview:</strong> Static demo content & layout active. Backend services (Supabase & Stripe) will be integrated in subsequent phases.
      </span>
    </div>
  );
}
