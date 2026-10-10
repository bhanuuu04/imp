'use client';

import React, { useState } from 'react';
import { 
  UserX, 
  Search, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Fingerprint,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { calculateSimilarity, normalizeHomoglyphs } from '@/lib/threat-engine';

interface ImpersonationPageProps {
  onOpenTakedown: (threat: any) => void;
}

export function ImpersonationPage({ onOpenTakedown }: ImpersonationPageProps) {
  const [testHandle, setTestHandle] = useState('acmè.support_help');
  const [testResult, setTestResult] = useState<any>(null);

  // Impersonators dataset
  const impersonatorProfiles = [
    {
      id: 'imp-1',
      displayName: 'Acme Official Support ✓',
      handle: 'acme.supportt',
      platform: 'Instagram',
      platformColor: 'text-slate-700 bg-slate-100',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
      riskScore: 96,
      similarity: '94% Match',
      tactics: 'Homoglyph handle spoofing, deceptive Unicode badge in display name',
      followers: 14,
      following: 1140,
      detectedAt: '2 hours ago',
      status: 'Active Threat'
    },
    {
      id: 'imp-2',
      displayName: 'Acme Global Verification',
      handle: 'acme_global_verify',
      platform: 'Facebook',
      platformColor: 'text-slate-700 bg-slate-100',
      avatar: 'https://images.unsplash.com/photo-1633409381658-a0cdef852895?w=150',
      riskScore: 88,
      similarity: '89% Match',
      tactics: 'Stolen brand logo, claiming copyright deactivation rights',
      followers: 32,
      following: 480,
      detectedAt: '5 hours ago',
      status: 'Takedown Submitted'
    },
    {
      id: 'imp-3',
      displayName: 'Alex Mercer (Acme CISO)',
      handle: 'alex-mercer-acme92',
      platform: 'LinkedIn',
      platformColor: 'text-slate-700 bg-slate-100',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      riskScore: 92,
      similarity: 'VIP Executive Clone',
      tactics: 'Executive impersonation targeting internal staff with fake invoice links',
      followers: 18,
      following: 890,
      detectedAt: '12 hours ago',
      status: 'Active Threat'
    },
    {
      id: 'imp-4',
      displayName: 'Acme CyberDefenders Rewards',
      handle: 'AcmeAirdrop_OfficialBot',
      platform: 'Telegram',
      platformColor: 'text-slate-700 bg-slate-100',
      avatar: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=150',
      riskScore: 95,
      similarity: '91% Match',
      tactics: 'Fake crypto airdrop bot soliciting wallet secret keys',
      followers: 240,
      following: 0,
      detectedAt: '1 day ago',
      status: 'Takedown Submitted'
    }
  ];

  const handleTestHomoglyph = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeHomoglyphs(testHandle);
    const sim = calculateSimilarity(normalized, 'acme');
    setTestResult({
      original: testHandle,
      normalized,
      similarity: sim,
      isHomoglyph: normalized !== testHandle.toLowerCase().replace(/[^a-z0-9]/g, ''),
      verdict: sim >= 65 ? 'High Impersonation Risk' : 'Low Impersonation Risk'
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
          <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase font-mono">
            Identity Protection Engine
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
          Impersonation Defense
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Algorithmic detection of homoglyphs, typosquatting, executive VIP clones, and fraudulent support handles.
        </p>
      </div>

      {/* KPI Cards - Theme #166 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Fake Profiles Detected</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 tnum">96</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">↓ 18% vs last month</div>
        </div>

        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">VIP / Executive Clones</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 tnum">14</div>
          <div className="text-[11px] text-rose-600 font-medium mt-1">Targeting leadership</div>
        </div>

        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Account Takeover Attempts</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 tnum">8</div>
          <div className="text-[11px] text-slate-400 mt-1">Direct message probes</div>
        </div>

        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Takedown Success Rate</div>
          <div className="text-2xl font-bold text-sky-600 mt-1 tnum">94.2%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Avg 3.2 hrs resolution</div>
        </div>
      </div>

      {/* Interactive Homoglyph & Typosquat Diagnostic Tool */}
      <div className="mercury-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-sky-600" />
              Homoglyph & Unicode Sandbox
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verify suspected handles against lookalike Cyrillic, Greek, and numeric characters.
            </p>
          </div>
        </div>

        <form onSubmit={handleTestHomoglyph} className="flex gap-2">
          <input
            type="text"
            value={testHandle}
            onChange={(e) => setTestHandle(e.target.value)}
            placeholder="e.g. acmè.support_official or аcme_help"
            className="flex-1 bg-white border border-slate-200 rounded-md px-3.5 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium mercury-transition flex items-center gap-1.5 mercury-btn-press"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Analyze Handle
          </button>
        </form>

        {testResult && (
          <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200 text-xs font-mono space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">Verdict: {testResult.verdict}</span>
              <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-semibold tnum">
                {testResult.similarity}% Phonetic Match
              </span>
            </div>
            <div className="text-slate-600">
              Normalized Latin Representation: <strong className="text-slate-900">{testResult.normalized}</strong>
            </div>
            {testResult.isHomoglyph && (
              <div className="text-rose-600 font-semibold flex items-center gap-1 pt-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Homoglyph characters detected! Attacker replaced standard ASCII with deceptive lookalikes.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Flagged Impersonator Profiles Grid */}
      <div>
        <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs">
          Monitored Impersonation Targets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {impersonatorProfiles.map((imp) => (
            <div
              key={imp.id}
              className="mercury-card p-5 space-y-4 hover:border-slate-300 mercury-transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={imp.avatar}
                    alt={imp.displayName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{imp.displayName}</div>
                    <div className="text-xs text-slate-500 font-mono">@{imp.handle}</div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${imp.platformColor}`}>
                        {imp.platform}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {imp.detectedAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Risk Index</div>
                  <div className="text-xl font-bold text-rose-600 tnum">{imp.riskScore}/100</div>
                </div>
              </div>

              <div className="p-3 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900 mr-1.5">Tactics:</span>
                {imp.tactics}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-1">
                <div className="tnum">
                  <strong className="text-slate-800">{imp.followers}</strong> followers • <strong className="text-slate-800">{imp.following}</strong> following
                </div>

                <button
                  onClick={() => onOpenTakedown(imp)}
                  className="px-3 py-1.5 rounded-md bg-sky-50 hover:bg-sky-100 text-sky-700 font-medium mercury-transition flex items-center gap-1 border border-sky-200"
                >
                  File Takedown <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
