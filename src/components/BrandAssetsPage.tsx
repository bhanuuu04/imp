'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Building2, 
  Globe, 
  Smartphone, 
  UserCheck, 
  Plus, 
  Check, 
  ExternalLink, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck,
  Terminal,
  Code2
} from 'lucide-react';
import { BrandAssetRegistry } from '@/types/threat';

interface BrandAssetsPageProps {
  brand: BrandAssetRegistry;
  onSaveBrand: (updated: BrandAssetRegistry) => void;
}

export function BrandAssetsPage({
  brand,
  onSaveBrand
}: BrandAssetsPageProps) {
  const [brandName, setBrandName] = useState(brand.brandName);
  const [legalEntity, setLegalEntity] = useState(brand.legalEntity);
  const [contactEmail, setContactEmail] = useState(brand.contactEmail);
  const [domains, setDomains] = useState(brand.officialDomains);
  const [newDomain, setNewDomain] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain.trim()) return;
    setDomains([...domains, newDomain.trim().toLowerCase()]);
    setNewDomain('');
  };

  const handleRemoveDomain = (dom: string) => {
    setDomains(domains.filter(d => d !== dom));
  };

  const handleSaveAll = () => {
    onSaveBrand({
      ...brand,
      brandName,
      legalEntity,
      contactEmail,
      officialDomains: domains
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#030712] p-6 lg:p-8 space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#1f2937]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            <span className="text-[11px] font-semibold text-[#38bdf8] tracking-wider uppercase">
              Brand Ground Truth Manifest
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#f8fafc]">
            Brand Assets & Identity Registry
          </h1>
          <p className="text-xs text-[#94a3b8] mt-1 font-sans">
            Declare authorized corporate domains, official bundle IDs, and VIP handles to calibrate AI threat heuristics.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-3.5 py-1.5 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition flex items-center gap-1.5 active:scale-97"
        >
          {savedSuccess ? <Check className="w-3.5 h-3.5" /> : null}
          {savedSuccess ? 'Manifest Saved' : 'Save Manifest'}
        </button>
      </div>

      {/* Brand Identity Card */}
      <div className="terminal-window p-6 space-y-4">
        <h2 className="text-sm font-bold text-[#f8fafc] flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#38bdf8]" />
          Corporate & Legal Identity Declaration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-[11px] font-medium text-[#94a3b8] mb-1 block">Brand Display Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#94a3b8] mb-1 block">Registered Legal Entity</label>
            <input
              type="text"
              value={legalEntity}
              onChange={(e) => setLegalEntity(e.target.value)}
              className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#94a3b8] mb-1 block">Brand Security Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
            />
          </div>
        </div>
      </div>

      {/* Authorized Domains */}
      <div className="terminal-window p-6 space-y-4">
        <h2 className="text-sm font-bold text-[#f8fafc] flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#38bdf8]" />
          Whitelisted Domain Infrastructure
        </h2>
        <p className="text-xs text-[#94a3b8] font-sans">
          Domains listed here will never be flagged as typosquats or phishing endpoints by Astra.
        </p>

        <form onSubmit={handleAddDomain} className="flex gap-2">
          <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            placeholder="e.g. acmepayments.com"
            className="flex-1 bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-[6px] bg-[#111827] border border-[#1f2937] hover:bg-[#1f2937] text-[#94a3b8] hover:text-[#f8fafc] text-xs font-medium transition flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Append Domain
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-2">
          {domains.map((dom) => (
            <span
              key={dom}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#111827] border border-[#1f2937] text-xs text-[#f8fafc]"
            >
              {dom}
              <button
                type="button"
                onClick={() => handleRemoveDomain(dom)}
                className="text-[#94a3b8] hover:text-rose-400 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
