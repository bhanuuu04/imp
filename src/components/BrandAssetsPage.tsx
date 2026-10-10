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
  ShieldCheck 
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
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase font-mono">
              Ground Truth Whitelist
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
            Brand Assets & Identity Registry
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Define authorized corporate domains, official bundle IDs, and VIP handles to calibrate AI threat heuristics.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-3.5 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium mercury-transition flex items-center gap-1.5 mercury-btn-press"
        >
          {savedSuccess ? <Check className="w-3.5 h-3.5" /> : null}
          {savedSuccess ? 'Saved' : 'Save Registry'}
        </button>
      </div>

      {/* Brand Identity Card */}
      <div className="mercury-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-sky-600" />
          Corporate & Legal Identity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-[11px] font-medium text-slate-500 mb-1 block">Brand Display Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-sky-600"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-500 mb-1 block">Registered Legal Entity</label>
            <input
              type="text"
              value={legalEntity}
              onChange={(e) => setLegalEntity(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-sky-600"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-500 mb-1 block">Brand Security & Abuse Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
            />
          </div>
        </div>
      </div>

      {/* Authorized Domains */}
      <div className="mercury-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Globe className="w-4 h-4 text-sky-600" />
          Whitelisted Corporate Domains
        </h2>
        <p className="text-xs text-slate-500">
          Domains listed here will never be marked as typosquats or phishing endpoints by Astra.
        </p>

        <form onSubmit={handleAddDomain} className="flex gap-2">
          <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            placeholder="e.g. acmepayments.com"
            className="flex-1 bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium mercury-transition flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Domain
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-2">
          {domains.map((dom) => (
            <span
              key={dom}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800"
            >
              {dom}
              <button
                type="button"
                onClick={() => handleRemoveDomain(dom)}
                className="text-slate-400 hover:text-rose-600 mercury-transition"
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
