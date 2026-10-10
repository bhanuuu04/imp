'use client';

import React, { useState } from 'react';
import { RogueAppListing, BrandAssetRegistry } from '@/types/threat';
import { 
  Smartphone, 
  ShieldAlert, 
  ExternalLink, 
  CheckCircle2, 
  Search, 
  Plus, 
  Copy, 
  Check,
  Terminal,
  Code2
} from 'lucide-react';

interface RogueAppsRadarProps {
  rogueApps: RogueAppListing[];
  brand: BrandAssetRegistry;
  onUpdateAppStatus: (id: string, status: RogueAppListing['status']) => void;
  onAddRogueApp: (app: Partial<RogueAppListing>) => void;
}

export function RogueAppsRadar({
  rogueApps,
  brand,
  onUpdateAppStatus,
  onAddRogueApp
}: RogueAppsRadarProps) {
  const [search, setSearch] = useState('');
  const [copiedSha, setCopiedSha] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAppName, setNewAppName] = useState('');
  const [newPackage, setNewPackage] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const filteredApps = rogueApps.filter((app) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      app.appName.toLowerCase().includes(q) ||
      app.packageName.toLowerCase().includes(q) ||
      app.downloadUrl.toLowerCase().includes(q) ||
      app.impersonationDetails.toLowerCase().includes(q)
    );
  });

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSha(id);
    setTimeout(() => setCopiedSha(null), 2000);
  };

  const handleCreateRogueApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName.trim() || !newPackage.trim()) return;

    onAddRogueApp({
      appName: newAppName,
      packageName: newPackage,
      downloadUrl: newUrl || 'https://malicious-apk-mirror.top/download.apk',
      impersonationDetails: newNotes || 'Manual threat feed submission',
      riskScore: 92,
      status: 'active_threat',
      sourcePlatform: 'third_party_apk',
      discoveredAt: new Date().toISOString()
    });

    setNewAppName('');
    setNewPackage('');
    setNewUrl('');
    setNewNotes('');
    setIsAddingNew(false);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#030712] p-6 lg:p-8 space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#1f2937]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            <span className="text-[11px] font-semibold text-[#38bdf8] tracking-wider uppercase">
              Mobile Binaries & Decompiler Radar
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#f8fafc]">
            Rogue APK & Mobile App Radar
          </h1>
          <p className="text-xs text-[#94a3b8] mt-1 font-sans max-w-3xl">
            Astra continuously scans direct message payloads, rogue APK mirrors, and third-party stores for trojanized apps masquerading as {brand.brandName}.
          </p>
        </div>

        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="px-3.5 py-1.5 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto active:scale-97"
        >
          <Plus className="w-4 h-4" />
          {isAddingNew ? 'Close Form' : 'Ingest Rogue APK'}
        </button>
      </div>

      {/* Manual APK Registration Drawer */}
      {isAddingNew && (
        <form onSubmit={handleCreateRogueApp} className="terminal-window p-5 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#f8fafc]">
            Submit Suspect Android APK or iOS Package
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-[#94a3b8] mb-1 block">App Display Name</label>
              <input
                type="text"
                value={newAppName}
                onChange={(e) => setNewAppName(e.target.value)}
                placeholder="e.g. Acme Authenticator v3"
                className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-[#94a3b8] mb-1 block">Reverse Domain Package Identifier</label>
              <input
                type="text"
                value={newPackage}
                onChange={(e) => setNewPackage(e.target.value)}
                placeholder="e.g. com.acme.secure.auth.apk"
                className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-medium text-[#94a3b8] mb-1 block">Download Mirror or Direct Message URL</label>
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://cdn.apk-direct.xyz/apps/acme.apk"
              className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-3 py-1.5 rounded-[6px] bg-[#111827] border border-[#1f2937] text-xs text-[#94a3b8] hover:bg-[#1f2937]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition"
            >
              Ingest Binary
            </button>
          </div>
        </form>
      )}

      {/* Official Whitelist vs Rogue Detection Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="pulumi-card p-5 space-y-2 border-emerald-900/60">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Official Brand Footprint
          </div>
          <div className="text-sm font-semibold text-[#f8fafc] font-sans">{brand.brandName} Certified Package</div>
          <div className="text-xs text-[#94a3b8] bg-[#030712] p-2 rounded-[6px] border border-[#1f2937]">
            {brand.officialMobileApps[0]?.identifier || 'com.acme.official'}
          </div>
          <div className="text-[11px] text-[#94a3b8]">
            Google Play / App Store verified certificate signature.
          </div>
        </div>

        <div className="pulumi-card p-5 space-y-1">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Active Rogue Packages</div>
          <div className="text-2xl font-bold text-rose-400 tnum">
            {rogueApps.filter(a => a.status === 'active_threat').length}
          </div>
          <div className="text-[11px] text-[#94a3b8]/70">Under takedown with Google Play / hosting mirrors</div>
        </div>

        <div className="pulumi-card p-5 space-y-1">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Malware Payloads Extracted</div>
          <div className="text-2xl font-bold text-[#f8fafc] tnum">100%</div>
          <div className="text-[11px] text-emerald-400 font-medium">Static decompilation & signature matched</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter package identifiers, SHA256 hashes, host mirrors..."
          className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] pl-9 pr-4 py-2 text-xs text-[#f8fafc] placeholder-[#94a3b8]/60 focus:outline-none focus:border-[#38bdf8]"
        />
      </div>

      {/* Rogue Apps Table / List */}
      <div className="pulumi-card overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1f2937] bg-[#030712] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#f8fafc] uppercase tracking-wider">
            Flagged Mobile Binaries ({filteredApps.length})
          </span>
          <span className="text-xs text-[#94a3b8]">
            ASTRA DECOMPILER ENGINE 3.2
          </span>
        </div>

        <div className="divide-y divide-[#1f2937]">
          {filteredApps.map((app) => (
            <div key={app.id} className="p-5 space-y-3 hover:bg-[#111827]/80 transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-[6px] bg-[#111827] border border-rose-900/60 flex items-center justify-center shrink-0 text-rose-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-[#f8fafc] text-sm font-sans">{app.appName}</span>
                      <span className="text-xs text-[#94a3b8] bg-[#030712] px-2 py-0.5 rounded border border-[#1f2937]">
                        {app.packageName}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border tnum ${
                        app.status === 'active_threat'
                          ? 'bg-rose-950/60 text-rose-400 border-rose-900'
                          : 'bg-emerald-950/60 text-emerald-400 border-emerald-900'
                      }`}>
                        {app.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-xs text-[#94a3b8] mt-1 font-sans">
                      {app.impersonationDetails}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                  <button
                    onClick={() => onUpdateAppStatus(
                      app.id, 
                      app.status === 'active_threat' ? 'takedown_submitted' : 'removed'
                    )}
                    className="px-3 py-1.5 rounded-[6px] bg-[#111827] border border-[#1f2937] hover:bg-[#1f2937] text-[#94a3b8] hover:text-[#f8fafc] text-xs font-medium transition"
                  >
                    {app.status === 'active_threat' ? 'Dispatch Abuse Notice' : 'Mark Removed'}
                  </button>

                  <a
                    href={app.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-[6px] bg-[#111827] text-[#38bdf8] hover:bg-[#1f2937] border border-[#1f2937] hover:border-[#38bdf8]/40 text-xs font-medium transition flex items-center gap-1"
                  >
                    Mirror <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Hashes and discovery footer */}
              <div className="pt-2 border-t border-[#1f2937] flex flex-wrap items-center justify-between gap-2 text-xs text-[#94a3b8]">
                <div className="flex items-center gap-2">
                  <span className="text-[#94a3b8]/70">SHA256:</span>
                  <span className="text-[#f8fafc] bg-[#030712] px-2 py-0.5 rounded border border-[#1f2937] text-[11px] truncate max-w-xs">
                    {app.sha256 || '8f4343b67d519d5ef769749e7cfc0a6bbf0f498c8a14e9f3b5849'}
                  </span>
                  <button
                    onClick={() => copyText(app.sha256 || '8f4343b67d519d5ef769749e7cfc0a6bbf0f498c8a14e9f3b5849', app.id)}
                    className="text-[#94a3b8] hover:text-[#f8fafc]"
                    title="Copy hash"
                  >
                    {copiedSha === app.id ? <Check className="w-3.5 h-3.5 text-[#38bdf8]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="text-[11px] text-[#94a3b8]/70 tnum">
                  Discovered: {new Date(app.discoveredAt).toLocaleDateString()} via {app.sourcePlatform.replace('_', ' ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
