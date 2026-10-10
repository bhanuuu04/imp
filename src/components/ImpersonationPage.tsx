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
  ExternalLink,
  Terminal,
  Code2
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
      platformColor: 'text-[#38bdf8] bg-[#030712] border border-[#1f2937]',
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
      platformColor: 'text-[#38bdf8] bg-[#030712] border border-[#1f2937]',
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
      platformColor: 'text-[#38bdf8] bg-[#030712] border border-[#1f2937]',
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
      platformColor: 'text-[#38bdf8] bg-[#030712] border border-[#1f2937]',
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
    <div className="flex-1 overflow-y-auto bg-[#030712] p-6 lg:p-8 space-y-6 font-mono">
      {/* Header */}
      <div className="pb-3 border-b border-[#1f2937]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          <span className="text-[11px] font-semibold text-[#38bdf8] tracking-wider uppercase">
            Identity Protection Core
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#f8fafc]">
          Impersonation & Homoglyph Defense
        </h1>
        <p className="text-xs text-[#94a3b8] mt-1 font-sans">
          Algorithmic detection of homoglyphs, typosquatting, executive VIP clones, and fraudulent support handles.
        </p>
      </div>

      {/* KPI Cards - Theme #132 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Fake Profiles Detected</div>
          <div className="text-2xl font-bold text-[#f8fafc] mt-1 tnum">96</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1">↓ 18% vs last month</div>
        </div>

        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">VIP / Executive Clones</div>
          <div className="text-2xl font-bold text-rose-400 mt-1 tnum">14</div>
          <div className="text-[11px] text-rose-500 font-medium mt-1">Targeting leadership</div>
        </div>

        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Account Takeover Attempts</div>
          <div className="text-2xl font-bold text-[#f8fafc] mt-1 tnum">8</div>
          <div className="text-[11px] text-[#94a3b8]/70 mt-1">Direct message probes</div>
        </div>

        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Takedown Success Rate</div>
          <div className="text-2xl font-bold text-[#38bdf8] mt-1 tnum">94.2%</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1">Avg 3.2 hrs resolution</div>
        </div>
      </div>

      {/* Interactive Homoglyph Diagnostic CLI Sandbox */}
      <div className="terminal-window p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#f8fafc] flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#38bdf8]" />
              Homoglyph & Unicode Sandbox Terminal
            </h2>
            <p className="text-xs text-[#94a3b8] mt-0.5 font-sans">
              Test candidate usernames against Cyrillic, Greek, and numeric visual lookalikes.
            </p>
          </div>
        </div>

        <form onSubmit={handleTestHomoglyph} className="flex gap-2">
          <input
            type="text"
            value={testHandle}
            onChange={(e) => setTestHandle(e.target.value)}
            placeholder="e.g. acmè.support_official or аcme_help"
            className="flex-1 bg-[#111827] border border-[#1f2937] rounded-[6px] px-3.5 py-2 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition flex items-center gap-1.5 active:scale-97"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Execute Analysis
          </button>
        </form>

        {testResult && (
          <div className="p-3.5 rounded-[6px] bg-[#111827] border border-[#1f2937] text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#f8fafc]">Verdict: {testResult.verdict}</span>
              <span className="px-2 py-0.5 rounded bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 font-semibold tnum">
                {testResult.similarity}% Phonetic Match
              </span>
            </div>
            <div className="text-[#94a3b8]">
              Normalized ASCII: <strong className="text-[#f8fafc]">{testResult.normalized}</strong>
            </div>
            {testResult.isHomoglyph && (
              <div className="text-rose-400 font-semibold flex items-center gap-1 pt-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Hostile homoglyph characters detected! Attacker replaced standard Latin characters with visual lookalikes.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Flagged Impersonator Profiles Grid */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-3">
          Monitored Impersonation Profiles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {impersonatorProfiles.map((imp) => (
            <div
              key={imp.id}
              className="pulumi-card p-5 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={imp.avatar}
                    alt={imp.displayName}
                    className="w-10 h-10 rounded-[6px] object-cover border border-[#1f2937]"
                  />
                  <div>
                    <div className="font-bold text-[#f8fafc] text-sm font-sans">{imp.displayName}</div>
                    <div className="text-xs text-[#94a3b8]">@{imp.handle}</div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${imp.platformColor}`}>
                        {imp.platform}
                      </span>
                      <span className="text-[10px] text-[#94a3b8]/70">
                        {imp.detectedAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-[#94a3b8] uppercase">Risk Index</div>
                  <div className="text-xl font-bold text-rose-400 tnum">{imp.riskScore}/100</div>
                </div>
              </div>

              <div className="p-3 rounded-[6px] bg-[#030712] border border-[#1f2937] text-xs text-[#94a3b8] leading-relaxed font-sans">
                <span className="font-semibold text-[#f8fafc] mr-1.5 font-mono">TTP:</span>
                {imp.tactics}
              </div>

              <div className="flex items-center justify-between text-xs text-[#94a3b8] pt-1">
                <div className="tnum">
                  <strong className="text-[#f8fafc]">{imp.followers}</strong> followers • <strong className="text-[#f8fafc]">{imp.following}</strong> following
                </div>

                <button
                  onClick={() => onOpenTakedown(imp)}
                  className="px-3 py-1.5 rounded-[6px] bg-[#111827] hover:bg-[#1f2937] text-[#38bdf8] border border-[#1f2937] hover:border-[#38bdf8]/40 font-medium transition flex items-center gap-1"
                >
                  File Notice <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
