'use client';

import React, { useState } from 'react';
import { BrandAssetRegistry } from '@/types/threat';
import { 
  X, 
  Building2, 
  UserCheck, 
  Plus, 
  Trash2, 
  Check 
} from 'lucide-react';

interface BrandRegistryModalProps {
  brand: BrandAssetRegistry;
  onSave: (updated: BrandAssetRegistry) => void;
  onClose: () => void;
}

export function BrandRegistryModal({
  brand,
  onSave,
  onClose
}: BrandRegistryModalProps) {
  const [brandName, setBrandName] = useState(brand.brandName);
  const [legalEntity, setLegalEntity] = useState(brand.legalEntity);
  const [contactEmail, setContactEmail] = useState(brand.contactEmail);
  const [domainsStr, setDomainsStr] = useState(brand.officialDomains.join(', '));
  const [executives, setExecutives] = useState(brand.protectedExecutives);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddExecutive = () => {
    setExecutives([
      ...executives,
      { name: 'New Executive', role: 'Executive Officer', handles: [] }
    ]);
  };

  const handleRemoveExecutive = (index: number) => {
    setExecutives(executives.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BrandAssetRegistry = {
      ...brand,
      brandName,
      legalEntity,
      contactEmail,
      officialDomains: domainsStr.split(',').map(d => d.trim()).filter(Boolean),
      protectedExecutives: executives
    };
    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-sky-50 border border-sky-200 text-sky-700">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Brand Registry & Protected Assets
              </h2>
              <p className="text-xs text-slate-500">
                Calibrate AI heuristics with your organization&apos;s verified digital footprint.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Brand Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-slate-700 font-medium">Brand Trademark / Public Name</label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:border-sky-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-medium">Legal Corporate Entity</label>
              <input
                type="text"
                required
                value={legalEntity}
                onChange={(e) => setLegalEntity(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:border-sky-600"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-slate-700 font-medium">Official Domains (Comma Separated)</label>
              <input
                type="text"
                value={domainsStr}
                onChange={(e) => setDomainsStr(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:border-sky-600 font-mono"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-slate-700 font-medium">SOC / Legal Abuse Email</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-slate-900 focus:outline-none focus:border-sky-600 font-mono"
              />
            </div>
          </div>

          {/* Protected Leadership / VIPs */}
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-800 font-medium flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                Protected Executive VIPs
              </span>
              <button
                type="button"
                onClick={handleAddExecutive}
                className="text-[11px] text-sky-600 font-medium hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Executive
              </button>
            </div>

            <div className="space-y-2">
              {executives.map((exec, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                >
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <input
                      type="text"
                      value={exec.name}
                      onChange={(e) => {
                        const next = [...executives];
                        next[idx].name = e.target.value;
                        setExecutives(next);
                      }}
                      placeholder="Executive Name"
                      className="bg-white border border-slate-200 rounded px-2.5 py-1 text-slate-900 text-xs"
                    />
                    <input
                      type="text"
                      value={exec.role}
                      onChange={(e) => {
                        const next = [...executives];
                        next[idx].role = e.target.value;
                        setExecutives(next);
                      }}
                      placeholder="Title e.g. CEO / CISO"
                      className="bg-white border border-slate-200 rounded px-2.5 py-1 text-slate-900 text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveExecutive(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-medium transition flex items-center gap-1.5 mercury-btn-press"
            >
              {savedSuccess ? <Check className="w-3.5 h-3.5 text-white" /> : null}
              {savedSuccess ? 'Saved' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
