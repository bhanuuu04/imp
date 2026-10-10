'use client';

import React, { useState } from 'react';
import { BrandAssetRegistry } from '@/types/threat';
import { 
  X, 
  Building2, 
  UserCheck, 
  Plus, 
  Trash2, 
  Check,
  Terminal,
  Code2
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/80 backdrop-blur-xs animate-fade-in font-mono">
      <div className="w-full max-w-2xl bg-[#030712] border border-[#1f2937] rounded-[8px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-[#111827] border-b border-[#1f2937] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-[4px] bg-[#030712] border border-[#1f2937] text-[#38bdf8]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#f8fafc]">
                Brand Registry & Ground Truth Manifest
              </h2>
              <p className="text-xs text-[#94a3b8] font-sans">
                Calibrate AI heuristics with your organization&apos;s verified digital footprint.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#030712] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Brand Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-[#94a3b8] font-medium">Brand Trademark / Public Name</label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#94a3b8] font-medium">Legal Corporate Entity</label>
              <input
                type="text"
                required
                value={legalEntity}
                onChange={(e) => setLegalEntity(e.target.value)}
                className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[#94a3b8] font-medium">Official Domains (Comma Separated)</label>
              <input
                type="text"
                value={domainsStr}
                onChange={(e) => setDomainsStr(e.target.value)}
                className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[#94a3b8] font-medium">SOC / Legal Abuse Email</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
              />
            </div>
          </div>

          {/* Protected Leadership / VIPs */}
          <div className="space-y-3 pt-3 border-t border-[#1f2937]">
            <div className="flex items-center justify-between">
              <span className="text-[#f8fafc] font-medium flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
                Protected Executive VIPs
              </span>
              <button
                type="button"
                onClick={handleAddExecutive}
                className="text-[11px] text-[#38bdf8] font-medium hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Executive
              </button>
            </div>

            <div className="space-y-2">
              {executives.map((exec, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-[6px] bg-[#111827] border border-[#1f2937] flex items-center justify-between gap-2"
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
                      className="bg-[#030712] border border-[#1f2937] rounded px-2.5 py-1 text-[#f8fafc] text-xs"
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
                      className="bg-[#030712] border border-[#1f2937] rounded px-2.5 py-1 text-[#f8fafc] text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveExecutive(idx)}
                    className="text-[#94a3b8] hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#1f2937]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-[6px] bg-[#111827] border border-[#1f2937] text-[#94a3b8] hover:text-[#f8fafc] font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] font-bold transition flex items-center gap-1.5 active:scale-97"
            >
              {savedSuccess ? <Check className="w-3.5 h-3.5 text-[#030712]" /> : null}
              {savedSuccess ? 'Saved' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
