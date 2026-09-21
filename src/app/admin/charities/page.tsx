"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Archive, RotateCcw, Star, CheckCircle2, ArrowLeft } from "lucide-react";
import { INITIAL_DEMO_CHARITIES, DemoCharity } from "@/lib/demo-data";

export default function AdminCharitiesPage() {
  const [charities, setCharities] = useState<DemoCharity[]>(INITIAL_DEMO_CHARITIES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [msg, setMsg] = useState("");

  const handleToggleFeature = (id: string) => {
    setCharities(
      charities.map((c) => (c.id === id ? { ...c, is_featured: !c.is_featured } : c))
    );
    setMsg("Charity feature status updated.");
  };

  const handleToggleArchive = (id: string) => {
    setCharities(
      charities.map((c) => (c.id === id ? { ...c, is_archived: !c.is_archived } : c))
    );
    setMsg("Charity archive status updated.");
  };

  const handleCreateCharity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !description || !website) {
      alert("All fields are required.");
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newCharity: DemoCharity = {
      id: `charity_${Date.now()}`,
      slug,
      name,
      category,
      description,
      logo_url: "",
      website,
      is_active: true,
      is_featured: false,
      is_archived: false,
      total_raised_minor: 0,
    };

    setCharities([newCharity, ...charities]);
    setShowAddModal(false);
    setName("");
    setCategory("");
    setDescription("");
    setWebsite("");
    setMsg(`Charity '${name}' created successfully.`);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#A8D5C5] hover:text-[#F8FAF9] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Admin Console
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D96B27]">
            Administrative Portal
          </span>
          <h1 className="text-3xl font-extrabold text-[#F8FAF9] mt-0.5">Charity Management</h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36] transition-colors shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Partner Charity
        </button>
      </div>

      {msg && (
        <div className="bg-[#5A7D6C]/20 border border-[#5A7D6C] text-[#A8D5C5] text-xs p-4 rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#A8D5C5] shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* Charity Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#0B132B]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141E3D] p-8 rounded-3xl border border-[#233159] max-w-lg w-full space-y-4 shadow-2xl">
            <h2 className="text-xl font-bold text-[#F8FAF9]">Add New Partner Charity</h2>

            <form onSubmit={handleCreateCharity} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#F8FAF9]">Charity Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Hope Wildlife Rescue"
                  className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-2 text-sm text-[#F8FAF9] focus:outline-none focus:border-[#5A7D6C]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#F8FAF9]">Category</label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Animal Welfare"
                  className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-2 text-sm text-[#F8FAF9] focus:outline-none focus:border-[#5A7D6C]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#F8FAF9]">Description</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mission statement and overview..."
                  className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-2 text-sm text-[#F8FAF9] focus:outline-none focus:border-[#5A7D6C]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#F8FAF9]">Website URL</label>
                <input
                  type="url"
                  required
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://example.org"
                  className="w-full bg-[#0B132B] border border-[#233159] rounded-xl px-4 py-2 text-sm text-[#F8FAF9] focus:outline-none focus:border-[#5A7D6C]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#D96B27] text-[#F8FAF9] hover:bg-[#E87A36]"
                >
                  Create Charity
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#0B132B] text-[#7E9F8E] border border-[#233159]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Charities List */}
      <div className="space-y-4">
        {charities.map((charity) => (
          <div
            key={charity.id}
            className={`p-6 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              charity.is_archived
                ? "bg-[#0B132B]/50 border-[#233159]/40 opacity-60"
                : "bg-[#141E3D] border-[#233159]"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A8D5C5]">
                  {charity.category}
                </span>
                {charity.is_featured && (
                  <span className="px-2 py-0.5 rounded-full bg-[#D96B27]/20 text-[#D96B27] text-[10px] font-bold">
                    Featured
                  </span>
                )}
                {charity.is_archived && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400 text-[10px] font-bold">
                    Archived
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-[#F8FAF9]">{charity.name}</h3>
              <p className="text-xs text-[#7E9F8E] line-clamp-1">{charity.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleFeature(charity.id)}
                title={charity.is_featured ? "Unfeature Charity" : "Feature Charity"}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  charity.is_featured
                    ? "bg-[#D96B27] text-[#F8FAF9] border-[#D96B27]"
                    : "bg-[#0B132B] text-[#7E9F8E] border-[#233159] hover:text-[#F8FAF9]"
                }`}
              >
                <Star className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={() => handleToggleArchive(charity.id)}
                title={charity.is_archived ? "Restore Charity" : "Archive Charity"}
                className="p-2.5 rounded-xl bg-[#0B132B] border border-[#233159] text-xs font-semibold text-[#7E9F8E] hover:text-[#F8FAF9] transition-colors"
              >
                {charity.is_archived ? <RotateCcw className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
