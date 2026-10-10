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
  Check 
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
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase font-mono">
              Mobile Ecosystem Forensics
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
            Counterfeit Mobile Apps & APK Radar
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Astra continuously scans direct message payloads, rogue APK mirrors, and third-party stores for trojanized apps masquerading as {brand.brandName}.
          </p>
        </div>

        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="px-3.5 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium mercury-transition flex items-center gap-1.5 self-start sm:self-auto mercury-btn-press"
        >
          <Plus className="w-4 h-4" />
          {isAddingNew ? 'Close Ingestion Form' : 'Register Rogue APK'}
        </button>
      </div>

      {/* Manual APK Registration Drawer */}
      {isAddingNew && (
        <form onSubmit={handleCreateRogueApp} className="mercury-card p-5 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-900">
            Submit Suspect Android APK or iOS Package
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-500 mb-1 block">App Display Name</label>
              <input
                type="text"
                value={newAppName}
                onChange={(e) => setNewAppName(e.target.value)}
                placeholder="e.g. Acme Authenticator v3"
                className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-sky-600"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-500 mb-1 block">Reverse Domain Package Identifier</label>
              <input
                type="text"
                value={newPackage}
                onChange={(e) => setNewPackage(e.target.value)}
                placeholder="e.g. com.acme.secure.auth.apk"
                className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-medium text-slate-500 mb-1 block">Download Mirror or Direct Message URL</label>
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://cdn.apk-direct.xyz/apps/acme.apk"
              className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-3 py-1.5 rounded-md bg-white border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium mercury-transition"
            >
              Ingest for Threat Analysis
            </button>
          </div>
        </form>
      )}

      {/* Official Whitelist vs Rogue Detection Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="mercury-card p-5 bg-white space-y-2 border-emerald-200/70">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Official Brand Footprint
          </div>
          <div className="text-sm font-semibold text-slate-900">{brand.brandName} Certified Package</div>
          <div className="text-xs font-mono text-slate-500 bg-slate-50 p-2 rounded border border-slate-200">
            {brand.officialMobileApps[0]?.identifier || 'com.acme.official'}
          </div>
          <div className="text-[11px] text-slate-500">
            Store ID: Google Play / Apple App Store verified developer certificate.
          </div>
        </div>

        <div className="mercury-card p-5 space-y-1">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Active Rogue Packages</div>
          <div className="text-2xl font-bold text-rose-600 tnum">
            {rogueApps.filter(a => a.status === 'active_threat').length}
          </div>
          <div className="text-[11px] text-slate-400">Under takedown with Google Play / hosting mirrors</div>
        </div>

        <div className="mercury-card p-5 space-y-1">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Malware Payloads Extracted</div>
          <div className="text-2xl font-bold text-slate-900 tnum">100%</div>
          <div className="text-[11px] text-emerald-600 font-medium">Static decompilation & signature matched</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter package names, SHA256 hashes, host mirrors..."
          className="w-full bg-white border border-slate-200 rounded-md pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 mercury-card"
        />
      </div>

      {/* Rogue Apps Table / List */}
      <div className="mercury-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Flagged Mobile APK Binaries ({filteredApps.length})
          </span>
          <span className="text-xs text-slate-400 font-mono tnum">
            Astra Threat Engine 3.2
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredApps.map((app) => (
            <div key={app.id} className="p-5 space-y-3 hover:bg-slate-50/50 mercury-transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 text-rose-600">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900 text-sm">{app.appName}</span>
                      <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {app.packageName}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border tnum ${
                        app.status === 'active_threat'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {app.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 mt-1">
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
                    className="px-3 py-1.5 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium mercury-transition"
                  >
                    {app.status === 'active_threat' ? 'Dispatch Abuse Notice' : 'Mark Removed'}
                  </button>

                  <a
                    href={app.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-md bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-medium mercury-transition flex items-center gap-1"
                  >
                    Mirror <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Hashes and discovery footer */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">SHA256:</span>
                  <span className="text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 text-[11px] truncate max-w-xs">
                    {app.sha256 || '8f4343b67d519d5ef769749e7cfc0a6bbf0f498c8a14e9f3b5849'}
                  </span>
                  <button
                    onClick={() => copyText(app.sha256 || '8f4343b67d519d5ef769749e7cfc0a6bbf0f498c8a14e9f3b5849', app.id)}
                    className="text-slate-400 hover:text-slate-600"
                    title="Copy hash"
                  >
                    {copiedSha === app.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 tnum">
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
