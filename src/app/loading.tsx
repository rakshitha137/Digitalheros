import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 space-y-4">
      <div className="w-12 h-12 border-4 border-[#233159] border-t-[#D96B27] rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-[#7E9F8E]">Loading Digital Heroes...</p>
    </div>
  );
}
