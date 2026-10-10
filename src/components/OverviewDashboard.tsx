'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Link as LinkIcon, 
  Package, 
  ArrowDownRight, 
  ArrowRight, 
  ChevronDown, 
  Globe, 
  Smartphone,
  CheckCircle2,
  Lock,
  Radio,
  Fingerprint,
  Zap,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

const InstagramIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

interface OverviewDashboardProps {
  onSelectThreat: (threatId?: string) => void;
  onOpenTakedown: (threat: any) => void;
  onNavigateToTab: (tab: string) => void;
}

export function OverviewDashboard({
  onSelectThreat,
  onOpenTakedown,
  onNavigateToTab
}: OverviewDashboardProps) {
  const [threatTimeFilter, setThreatTimeFilter] = useState('All Threat Types');

  const recentThreats = [
    {
      id: 'rt-1',
      type: 'Fake Profile',
      typeIcon: 'mask',
      title: '@acme.supportt',
      subtitle: 'Impersonating official support',
      source: 'instagram',
      risk: 'High',
      riskColor: 'bg-red-50 text-red-600 border-red-200',
      time: '2 hours ago',
      platformIcon: 'instagram'
    },
    {
      id: 'rt-2',
      type: 'Scam Link',
      typeIcon: 'link',
      title: 'acme-offer.com',
      subtitle: 'Phishing campaign',
      source: 'x_twitter',
      risk: 'High',
      riskColor: 'bg-red-50 text-red-600 border-red-200',
      time: '4 hours ago',
      platformIcon: 'x_twitter'
    },
    {
      id: 'rt-3',
      type: 'Fake App',
      typeIcon: 'package',
      title: 'Acme Wallet Pro',
      subtitle: 'Malicious Android app',
      source: 'playstore',
      risk: 'High',
      riskColor: 'bg-red-50 text-red-600 border-red-200',
      time: '6 hours ago',
      platformIcon: 'playstore'
    },
    {
      id: 'rt-4',
      type: 'Fake Profile',
      typeIcon: 'mask',
      title: 'Acme Global',
      subtitle: 'Using similar logo and name',
      source: 'facebook',
      risk: 'Medium',
      riskColor: 'bg-amber-50 text-amber-700 border-amber-200',
      time: '8 hours ago',
      platformIcon: 'facebook'
    },
    {
      id: 'rt-5',
      type: 'Scam Link',
      typeIcon: 'link',
      title: 'acme-giveaway.net',
      subtitle: 'Fake reward campaign',
      source: 'tiktok',
      risk: 'Medium',
      riskColor: 'bg-amber-50 text-amber-700 border-amber-200',
      time: '12 hours ago',
      platformIcon: 'tiktok'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-6 lg:p-10 space-y-8">
      {/* Live Financial Metric Ticker (Theme #166 Signature Requirement) */}
      <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-2xs text-xs font-mono text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-900">Live Brand Telemetry</span>
          <span className="text-slate-300">|</span>
          <span className="tnum">248 Inbound Handles Monitored</span>
          <span className="text-slate-300">|</span>
          <span className="tnum">18ms API Handshake</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-500">
          <span className="text-emerald-600 font-semibold tnum">99.99% SOC Uptime</span>
          <span className="text-slate-300">•</span>
          <span>Regulatory Compliance ISO-27001</span>
        </div>
      </div>

      {/* Hero Section: Mercury Clean Editorial Canvas with Virtual Security Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-2">
        <div className="max-w-xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0284c7] font-mono mb-2">
            Automated Brand Protection & Threat Intelligence
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15]">
            Your brand, defended with <span className="text-[#0284c7]">banking-grade</span> precision.
          </h1>
          <p className="text-base text-slate-500 mt-3 leading-relaxed">
            Continuous reconnaissance against social impersonators, counterfeit mobile APKs, and phishing domains across every channel.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => onNavigateToTab('threats')}
              className="px-5 py-2.5 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold transition duration-150 active:scale-97 shadow-xs flex items-center gap-2"
            >
              <span>Inspect Active Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateToTab('impersonation')}
              className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition duration-150 active:scale-97"
            >
              Homoglyph Sandbox
            </button>
          </div>
        </div>

        {/* Mercury Signature Virtual Defense Card Mockup (3D tilt & high-trust styling) */}
        <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-br from-white via-[#f8fafc] to-slate-100 p-6 border border-slate-200/90 shadow-sm transition hover:shadow-md duration-200">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0284c7] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900 font-mono tracking-tight">ASTRA DEFENSE ID</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              VERIFIED
            </span>
          </div>

          <div className="space-y-1 font-mono">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">Protected Brand Entity</div>
            <div className="text-lg font-bold text-slate-900 tracking-tight">Acme CyberDefense Technologies</div>
            <div className="text-xs text-slate-500 tnum pt-2">SHA-256: 9f83•••0b41•••2ec4</div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">SOC Policy: #2026-PRO</span>
            <span className="text-[#0284c7] font-semibold flex items-center gap-1">
              Live Monitor <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Top 4 Stat Cards: Tabular Numeric Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Threats Detected */}
        <div className="mercury-card rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
              <Shield className="w-4 h-4 fill-[#0284c7]/20" strokeWidth={1.5} />
            </div>
            <svg className="w-20 h-7" viewBox="0 0 80 30" fill="none">
              <path d="M2 22 Q 18 28, 30 16 T 50 14 T 70 8 T 78 12" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="mt-4">
            <div className="text-xs font-medium text-slate-500">Total Threats Detected</div>
            <div className="text-2xl font-black text-slate-900 mt-1 tracking-tight tnum font-mono">248</div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-2 font-mono tnum">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>32%</span>
              <span className="text-slate-400 font-normal ml-0.5">vs previous 30 days</span>
            </div>
          </div>
        </div>

        {/* Card 2: Fake Profiles */}
        <div className="mercury-card rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <Fingerprint className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <svg className="w-20 h-7" viewBox="0 0 80 30" fill="none">
              <path d="M2 20 Q 20 8, 35 22 T 55 12 T 78 20" stroke="#f87171" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="mt-4">
            <div className="text-xs font-medium text-slate-500">Fake Profiles</div>
            <div className="text-2xl font-black text-slate-900 mt-1 tracking-tight tnum font-mono">96</div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-2 font-mono tnum">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>18%</span>
              <span className="text-slate-400 font-normal ml-0.5">vs previous 30 days</span>
            </div>
          </div>
        </div>

        {/* Card 3: Scam Links */}
        <div className="mercury-card rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <LinkIcon className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <svg className="w-20 h-7" viewBox="0 0 80 30" fill="none">
              <path d="M2 24 Q 15 12, 35 24 T 55 10 T 78 18" stroke="#34d399" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="mt-4">
            <div className="text-xs font-medium text-slate-500">Scam Links</div>
            <div className="text-2xl font-black text-slate-900 mt-1 tracking-tight tnum font-mono">71</div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-2 font-mono tnum">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>41%</span>
              <span className="text-slate-400 font-normal ml-0.5">vs previous 30 days</span>
            </div>
          </div>
        </div>

        {/* Card 4: Fake Apps */}
        <div className="mercury-card rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-[#0284c7]">
              <Package className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <svg className="w-20 h-7" viewBox="0 0 80 30" fill="none">
              <path d="M2 22 Q 18 26, 32 14 T 52 18 T 78 10" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="mt-4">
            <div className="text-xs font-medium text-slate-500">Fake Apps</div>
            <div className="text-2xl font-black text-slate-900 mt-1 tracking-tight tnum font-mono">34</div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-2 font-mono tnum">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>27%</span>
              <span className="text-slate-400 font-normal ml-0.5">vs previous 30 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Threats Over Time & Threats by Source */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Threats Over Time Area Chart */}
        <div className="lg:col-span-2 mercury-card rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Threats Over Time</h2>
              <p className="text-xs text-slate-500 mt-0.5">Total incidents detected across connected platforms</p>
            </div>

            <div className="relative">
              <select
                value={threatTimeFilter}
                onChange={(e) => setThreatTimeFilter(e.target.value)}
                className="appearance-none bg-[#f8fafc] border border-slate-200 rounded-lg px-3.5 py-1.5 pr-8 text-xs font-medium text-slate-700 hover:bg-slate-100 transition cursor-pointer focus:outline-none focus:border-[#0284c7]"
              >
                <option>All Threat Types</option>
                <option>Impersonation Profiles</option>
                <option>Counterfeit Mobile APKs</option>
                <option>Phishing Domains</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="relative w-full h-56 pt-2">
            {/* Tooltip on Sep 12 */}
            <div className="absolute left-[36%] top-3 -translate-x-1/2 bg-white rounded-lg px-3 py-1.5 shadow-sm border border-slate-200 z-20 pointer-events-none flex flex-col items-center">
              <div className="text-[10px] text-slate-400 font-mono">Sep 12</div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-mono tnum">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                62 threats
              </div>
              <div className="w-2 h-2 bg-white border-r border-b border-slate-200 rotate-45 -mb-2 mt-0.5" />
            </div>

            <svg className="w-full h-44 overflow-visible" viewBox="0 0 700 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="mercuryChartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                  <stop offset="70%" stopColor="#0284c7" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="0" y1="10" x2="700" y2="10" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="50" x2="700" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="130" x2="700" y2="130" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

              <path
                d="M 0 145 C 50 140, 70 125, 120 115 C 160 100, 200 40, 250 35 C 290 85, 330 110, 380 95 C 430 85, 470 110, 520 40 C 560 90, 600 80, 700 135 L 700 160 L 0 160 Z"
                fill="url(#mercuryChartGradient)"
              />

              <path
                d="M 0 145 C 50 140, 70 125, 120 115 C 160 100, 200 40, 250 35 C 290 85, 330 110, 380 95 C 430 85, 470 110, 520 40 C 560 90, 600 80, 700 135"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <circle cx="250" cy="35" r="4.5" fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" />
            </svg>

            <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono mt-3 px-1 tnum">
              <span>Sep 1</span>
              <span>Sep 5</span>
              <span>Sep 10</span>
              <span>Sep 15</span>
              <span>Sep 20</span>
              <span>Sep 25</span>
              <span>Sep 30</span>
            </div>
          </div>
        </div>

        {/* Right: Threats by Source Donut Chart */}
        <div className="mercury-card rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Threats by Source</h2>
            <p className="text-xs text-slate-500 mt-0.5">Platform distribution telemetry</p>
          </div>

          <div className="my-4 flex items-center justify-between gap-4">
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#ec4899" strokeWidth="11" strokeDasharray="64.5 174.5" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#0284c7" strokeWidth="11" strokeDasharray="52.5 186.5" strokeDashoffset="-64.5" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#0f172a" strokeWidth="11" strokeDasharray="45.5 193.5" strokeDashoffset="-117" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#06b6d4" strokeWidth="11" strokeDasharray="36 203" strokeDashoffset="-162.5" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#ef4444" strokeWidth="11" strokeDasharray="24 215" strokeDashoffset="-198.5" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="#94a3b8" strokeWidth="11" strokeDasharray="17 222" strokeDashoffset="-222.5" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-lg font-black text-slate-900 leading-none tnum font-mono">248</span>
                <span className="text-[10px] text-slate-400 font-medium mt-0.5">Total</span>
              </div>
            </div>

            <div className="space-y-2 text-xs flex-1 min-w-0 font-mono tnum">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-[#ec4899] shrink-0" />
                  <span className="text-slate-700 font-sans truncate font-medium">Instagram</span>
                </div>
                <div className="text-slate-500 text-[11px] shrink-0">
                  <strong className="text-slate-900">68</strong> 27%
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-[#0284c7] shrink-0" />
                  <span className="text-slate-700 font-sans truncate font-medium">Facebook</span>
                </div>
                <div className="text-slate-500 text-[11px] shrink-0">
                  <strong className="text-slate-900">54</strong> 22%
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-[#0f172a] shrink-0" />
                  <span className="text-slate-700 font-sans truncate font-medium">X (Twitter)</span>
                </div>
                <div className="text-slate-500 text-[11px] shrink-0">
                  <strong className="text-slate-900">46</strong> 19%
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-[#06b6d4] shrink-0" />
                  <span className="text-slate-700 font-sans truncate font-medium">TikTok</span>
                </div>
                <div className="text-slate-500 text-[11px] shrink-0">
                  <strong className="text-slate-900">38</strong> 15%
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-[#ef4444] shrink-0" />
                  <span className="text-slate-700 font-sans truncate font-medium">YouTube</span>
                </div>
                <div className="text-slate-500 text-[11px] shrink-0">
                  <strong className="text-slate-900">24</strong> 10%
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-[#94a3b8] shrink-0" />
                  <span className="text-slate-700 font-sans truncate font-medium">Others</span>
                </div>
                <div className="text-slate-500 text-[11px] shrink-0">
                  <strong className="text-slate-900">18</strong> 7%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Threats Table & Right Column Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recent Threats Table (Hairline border & high-craft rows) */}
        <div className="lg:col-span-2 mercury-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Threats</h2>
              <p className="text-xs text-slate-500 mt-0.5">High-priority actionable incidents</p>
            </div>
            <button
              onClick={() => onNavigateToTab('threats')}
              className="text-xs font-semibold text-[#0284c7] hover:text-[#0369a1] flex items-center gap-1 transition"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-medium">
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Details</th>
                  <th className="pb-3 font-medium text-center">Source</th>
                  <th className="pb-3 font-medium">Risk</th>
                  <th className="pb-3 font-medium">Detected</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentThreats.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 pr-2 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {item.typeIcon === 'mask' && (
                          <div className="w-6 h-6 rounded-md bg-red-50 text-red-500 flex items-center justify-center text-xs">
                            🎭
                          </div>
                        )}
                        {item.typeIcon === 'link' && (
                          <div className="w-6 h-6 rounded-md bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center">
                            <LinkIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </div>
                        )}
                        {item.typeIcon === 'package' && (
                          <div className="w-6 h-6 rounded-md bg-indigo-50 text-[#0284c7] flex items-center justify-center">
                            <Package className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </div>
                        )}
                        <span className="font-semibold text-slate-900">{item.type}</span>
                      </div>
                    </td>

                    <td className="py-3.5 pr-3 min-w-[160px]">
                      <div className="font-bold text-slate-900 font-mono text-xs leading-snug">{item.title}</div>
                      <div className="text-[11px] text-slate-400 truncate">{item.subtitle}</div>
                    </td>

                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      <div className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-slate-700">
                        {item.source === 'instagram' && <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />}
                        {item.source === 'x_twitter' && <span className="font-bold text-xs">𝕏</span>}
                        {item.source === 'playstore' && <Smartphone className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.5} />}
                        {item.source === 'facebook' && <FacebookIcon className="w-3.5 h-3.5 text-blue-600" />}
                        {item.source === 'tiktok' && <span className="font-bold text-xs">♪</span>}
                      </div>
                    </td>

                    <td className="py-3.5 pr-3 whitespace-nowrap font-mono tnum">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${item.riskColor}`}>
                        {item.risk}
                      </span>
                    </td>

                    <td className="py-3.5 pr-3 text-slate-500 whitespace-nowrap text-[11px] font-mono tnum">
                      {item.time}
                    </td>

                    <td className="py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => onOpenTakedown(item)}
                        className="px-3 py-1 rounded-md bg-[#e0f2fe]/70 hover:bg-[#e0f2fe] text-[#0284c7] font-semibold text-xs transition duration-150 active:scale-97"
                      >
                        Take Action
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Threats by Region & Active Monitored Assets */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Threats by Region */}
          <div className="mercury-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900">Threats by Region</h3>
              <button
                onClick={() => onNavigateToTab('threats')}
                className="text-xs font-semibold text-[#0284c7] hover:text-[#0369a1] flex items-center gap-1"
              >
                View map <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="relative w-full h-20 mb-4 flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
              <svg className="w-full h-full opacity-60" viewBox="0 0 300 100" fill="none">
                <circle cx="60" cy="40" r="14" fill="#0284c7" fillOpacity="0.15" />
                <circle cx="60" cy="40" r="4" fill="#0284c7" />
                <circle cx="150" cy="50" r="16" fill="#0284c7" fillOpacity="0.18" />
                <circle cx="150" cy="50" r="5" fill="#0284c7" />
                <circle cx="210" cy="45" r="18" fill="#0284c7" fillOpacity="0.22" />
                <circle cx="210" cy="45" r="6" fill="#0284c7" />
                <circle cx="240" cy="65" r="12" fill="#0284c7" fillOpacity="0.15" />
                <circle cx="240" cy="65" r="3.5" fill="#0284c7" />
              </svg>
            </div>

            <div className="space-y-2.5 text-xs font-mono tnum">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold flex items-center justify-center">🇮🇳</span>
                  <span className="text-slate-700 font-sans font-medium">India</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0284c7] h-full rounded-full" style={{ width: '32%' }} />
                  </div>
                  <span className="text-slate-500 text-[11px] w-7 text-right">32%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center">🇺🇸</span>
                  <span className="text-slate-700 font-sans font-medium">United States</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0284c7] h-full rounded-full" style={{ width: '18%' }} />
                  </div>
                  <span className="text-slate-500 text-[11px] w-7 text-right">18%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-700 text-[10px] font-bold flex items-center justify-center">🇮🇩</span>
                  <span className="text-slate-700 font-sans font-medium">Indonesia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0284c7] h-full rounded-full" style={{ width: '12%' }} />
                  </div>
                  <span className="text-slate-500 text-[11px] w-7 text-right">12%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">🇧🇷</span>
                  <span className="text-slate-700 font-sans font-medium">Brazil</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0284c7] h-full rounded-full" style={{ width: '8%' }} />
                  </div>
                  <span className="text-slate-500 text-[11px] w-7 text-right">8%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center">🇬🇧</span>
                  <span className="text-slate-700 font-sans font-medium">United Kingdom</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0284c7] h-full rounded-full" style={{ width: '7%' }} />
                  </div>
                  <span className="text-slate-500 text-[11px] w-7 text-right">7%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Monitored Assets */}
          <div className="mercury-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Active Monitored Assets</h3>
              <button
                onClick={() => onNavigateToTab('brand_assets')}
                className="text-xs font-semibold text-[#0284c7] hover:text-[#0369a1] flex items-center gap-1"
              >
                Manage <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-[#f8fafc] hover:bg-slate-100 transition flex flex-col items-center">
                <div className="w-7 h-7 rounded-md bg-pink-50 text-pink-600 flex items-center justify-center mb-1">
                  <InstagramIcon className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-bold text-slate-900 font-mono tnum">12</div>
                <div className="text-[10px] text-slate-400">Accounts</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#f8fafc] hover:bg-slate-100 transition flex flex-col items-center">
                <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                  <FacebookIcon className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-bold text-slate-900 font-mono tnum">8</div>
                <div className="text-[10px] text-slate-400">Pages</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#f8fafc] hover:bg-slate-100 transition flex flex-col items-center">
                <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-900 flex items-center justify-center mb-1 font-bold text-xs">
                  𝕏
                </div>
                <div className="text-xs font-bold text-slate-900 font-mono tnum">6</div>
                <div className="text-[10px] text-slate-400">Handles</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#f8fafc] hover:bg-slate-100 transition flex flex-col items-center">
                <div className="w-7 h-7 rounded-md bg-red-50 text-red-600 flex items-center justify-center mb-1">
                  <YoutubeIcon className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-bold text-slate-900 font-mono tnum">4</div>
                <div className="text-[10px] text-slate-400">Channels</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#f8fafc] hover:bg-slate-100 transition flex flex-col items-center">
                <div className="w-7 h-7 rounded-md bg-sky-50 text-[#0284c7] flex items-center justify-center mb-1">
                  <Globe className="w-3.5 h-3.5" strokeWidth={1.5} />
                </div>
                <div className="text-xs font-bold text-slate-900 font-mono tnum">18</div>
                <div className="text-[10px] text-slate-400">Domains</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#f8fafc] hover:bg-slate-100 transition flex flex-col items-center">
                <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
                  <Smartphone className="w-3.5 h-3.5" strokeWidth={1.5} />
                </div>
                <div className="text-xs font-bold text-slate-900 font-mono tnum">6</div>
                <div className="text-[10px] text-slate-400">Apps</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
