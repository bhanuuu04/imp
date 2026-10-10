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
  ShieldCheck,
  Terminal,
  Code2,
  Copy,
  Check
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
  const [activeCliTab, setActiveCliTab] = useState<'cli' | 'python' | 'webhook'>('cli');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const recentThreats = [
    {
      id: 'rt-1',
      type: 'Fake Profile',
      typeIcon: 'mask',
      title: '@acme.supportt',
      subtitle: 'Homoglyph handle impersonating official support',
      source: 'instagram',
      risk: 'Critical',
      riskColor: 'bg-rose-950/60 text-rose-400 border-rose-900',
      time: '2 hours ago',
      platformIcon: 'instagram'
    },
    {
      id: 'rt-2',
      type: 'Scam Link',
      typeIcon: 'link',
      title: 'acme-offer.com',
      subtitle: 'Credential harvesting phishing payload',
      source: 'x_twitter',
      risk: 'High',
      riskColor: 'bg-amber-950/60 text-amber-400 border-amber-900',
      time: '4 hours ago',
      platformIcon: 'x_twitter'
    },
    {
      id: 'rt-3',
      type: 'Fake App',
      typeIcon: 'package',
      title: 'Acme Wallet Pro',
      subtitle: 'Trojanized APK distributing rogue keylogger',
      source: 'playstore',
      risk: 'Critical',
      riskColor: 'bg-rose-950/60 text-rose-400 border-rose-900',
      time: '6 hours ago',
      platformIcon: 'playstore'
    },
    {
      id: 'rt-4',
      type: 'Fake Profile',
      typeIcon: 'mask',
      title: 'Acme Global',
      subtitle: 'Stolen brand copyright assets in display metadata',
      source: 'facebook',
      risk: 'Medium',
      riskColor: 'bg-slate-800 text-slate-300 border-slate-700',
      time: '8 hours ago',
      platformIcon: 'facebook'
    },
    {
      id: 'rt-5',
      type: 'Scam Link',
      typeIcon: 'link',
      title: 'acme-giveaway.net',
      subtitle: 'Crypto wallet drainer contract redirect',
      source: 'tiktok',
      risk: 'High',
      riskColor: 'bg-amber-950/60 text-amber-400 border-amber-900',
      time: '12 hours ago',
      platformIcon: 'tiktok'
    }
  ];

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const codeSnippets = {
    cli: `$ npm i -g @astra/secops
$ astra connect --platform x_twitter --webhook https://astra.sh/wh
✓ Registered 248 social hooks
✓ Real-time AI threat stream established`,
    python: `from astra_secops import ThreatEngine, ChannelConnector

engine = ThreatEngine(model="astra-forensics-v3")
connector = ChannelConnector(platform="instagram")

@connector.on_inbound_dm
def inspect_payload(msg):
    verdict = engine.analyze(msg.content, msg.sender)
    if verdict.is_critical:
        engine.airgap_quarantine(msg.id)
        engine.dispatch_dmca_takedown(target=msg.sender.handle)`,
    webhook: `POST /api/webhooks/x_twitter HTTP/1.1
Host: api.astra.security
X-Astra-Signature: sha256=9f83...2ec4
Content-Type: application/json

{
  "event": "direct_message_received",
  "sender": { "handle": "acme.supportt", "verified": false },
  "payload": "Download security update: https://apk-mirror.top/app.apk"
}`
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#030712] p-6 lg:p-10 space-y-8 font-sans">
      {/* Live System Uptime Ticker Bar (Theme #132 Signature Element) */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-[8px] bg-[#111827] border border-[#1f2937] text-xs font-mono text-[#94a3b8]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
          <span className="font-semibold text-[#f8fafc]">SYSTEM METRICS</span>
          <span className="text-[#1f2937]">|</span>
          <span className="tnum">248 Inbound Handles Active</span>
          <span className="text-[#1f2937]">|</span>
          <span className="tnum">14ms Engine Latency</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[#94a3b8]">
          <span className="text-[#38bdf8] font-semibold tnum">99.99% SOC UPTIME</span>
          <span className="text-[#1f2937]">|</span>
          <span>ISO-27001 SECURED</span>
        </div>
      </div>

      {/* Hero Section: Monospace Minimalist CLI Hub (Pulumi Theme #132 DNA) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-2">
        <div className="max-w-xl">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#38bdf8] mb-2">
            Infrastructure as Code For Brand Defense
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f8fafc] tracking-tight leading-[1.12]">
            Declare brand security like code. Defend in real time.
          </h1>
          <p className="text-base text-[#94a3b8] mt-3 leading-relaxed">
            Continuously intercept social impersonators, malicious APK mirrors, and credential-harvesting phishing networks with developer-first precision.
          </p>
          <div className="flex items-center gap-3 mt-6 font-mono">
            <button
              onClick={() => onNavigateToTab('threats')}
              className="px-5 py-2.5 rounded-[8px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition duration-150 active:scale-97 shadow-xs flex items-center gap-2"
            >
              <span>Inspect Threat Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateToTab('impersonation')}
              className="px-5 py-2.5 rounded-[8px] bg-[#111827] hover:bg-[#1f2937] border border-[#1f2937] text-[#f8fafc] text-xs font-semibold transition duration-150 active:scale-97"
            >
              Homoglyph CLI Sandbox
            </button>
          </div>
        </div>

        {/* Theme #132 Signature Terminal Window with Syntax Highlighting */}
        <div className="w-full max-w-lg rounded-[8px] bg-[#111827] border border-[#1f2937] shadow-2xl overflow-hidden font-mono">
          {/* Terminal Titlebar with dots and tabs */}
          <div className="px-4 py-2.5 bg-[#030712] border-b border-[#1f2937] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] text-[#94a3b8] ml-2 font-mono">astra-daemon.sh</span>
            </div>

            <div className="flex items-center gap-1">
              {(['cli', 'python', 'webhook'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveCliTab(tab)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition ${
                    activeCliTab === tab
                      ? 'bg-[#111827] text-[#38bdf8] border border-[#1f2937]'
                      : 'text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
              <button
                onClick={() => copyCode(codeSnippets[activeCliTab])}
                className="ml-2 text-[#94a3b8] hover:text-[#f8fafc]"
                title="Copy code"
              >
                {copiedSnippet ? <Check className="w-3 h-3 text-[#38bdf8]" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Terminal Code Snippet Body */}
          <div className="p-4 bg-[#030712] text-xs font-mono text-[#f8fafc] overflow-x-auto leading-relaxed select-all">
            <pre className="text-[#94a3b8]">
              <code>
                {activeCliTab === 'cli' && (
                  <>
                    <span className="text-[#38bdf8]">$</span> <span className="text-[#f8fafc]">npm i -g @astra/secops</span>{'\n'}
                    <span className="text-[#38bdf8]">$</span> <span className="text-[#f8fafc]">astra connect --platform x_twitter --webhook https://astra.sh/wh</span>{'\n'}
                    <span className="text-emerald-400">✓ Registered 248 social hooks</span>{'\n'}
                    <span className="text-emerald-400">✓ Real-time AI threat stream established</span>{'\n'}
                    <span className="text-[#38bdf8]">ℹ Intercepting incoming DM payloads with 14ms latency...</span>
                  </>
                )}
                {activeCliTab === 'python' && (
                  <>
                    <span className="text-[#38bdf8]">from</span> astra_secops <span className="text-[#38bdf8]">import</span> ThreatEngine, ChannelConnector{'\n\n'}
                    engine = ThreatEngine(model=<span className="text-emerald-400">&quot;astra-forensics-v3&quot;</span>){'\n'}
                    connector = ChannelConnector(platform=<span className="text-emerald-400">&quot;instagram&quot;</span>){'\n\n'}
                    <span className="text-[#38bdf8]">@connector.on_inbound_dm</span>{'\n'}
                    <span className="text-[#38bdf8]">def</span> <span className="text-amber-400">inspect_payload</span>(msg):{'\n'}
                    {'    '}verdict = engine.analyze(msg.content, msg.sender){'\n'}
                    {'    '}<span className="text-[#38bdf8]">if</span> verdict.is_critical:{'\n'}
                    {'        '}engine.airgap_quarantine(msg.id){'\n'}
                    {'        '}engine.dispatch_dmca_takedown(target=msg.sender.handle)
                  </>
                )}
                {activeCliTab === 'webhook' && (
                  <>
                    <span className="text-[#38bdf8]">POST</span> /api/webhooks/x_twitter HTTP/1.1{'\n'}
                    Host: api.astra.security{'\n'}
                    X-Astra-Signature: sha256=9f83...2ec4{'\n'}
                    Content-Type: application/json{'\n\n'}
                    {`{
  "event": "direct_message_received",
  "sender": { "handle": "acme.supportt", "verified": false },
  "payload": "Download security update: https://apk-mirror.top/app.apk"
}`}
                  </>
                )}
              </code>
            </pre>
          </div>

          <div className="px-4 py-2 bg-[#111827] border-t border-[#1f2937] flex items-center justify-between text-[11px] text-[#94a3b8]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Runtime: Node.js 22 / Next.js 16 (Turbopack)
            </span>
            <span className="text-[#38bdf8]">docs.astra.sh/cli</span>
          </div>
        </div>
      </div>

      {/* Top 4 Stat Cards: Theme #132 Monospace Minimalist Hub Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Threats Detected */}
        <div className="pulumi-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-[6px] bg-[#1f2937] border border-[#374151] flex items-center justify-center text-[#38bdf8]">
              <Shield className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <svg className="w-20 h-7" viewBox="0 0 80 30" fill="none">
              <path d="M2 22 Q 18 28, 30 16 T 50 14 T 70 8 T 78 12" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="mt-4 font-mono">
            <div className="text-[11px] text-[#94a3b8] uppercase tracking-wider">Total Threats Flagged</div>
            <div className="text-2xl font-black text-[#f8fafc] mt-1 tracking-tight tnum">248</div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 mt-2 tnum">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>32%</span>
              <span className="text-[#94a3b8] font-normal ml-0.5">vs 30d baseline</span>
            </div>
          </div>
        </div>

        {/* Card 2: Fake Profiles */}
        <div className="pulumi-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-[6px] bg-[#1f2937] border border-[#374151] flex items-center justify-center text-rose-400">
              <Fingerprint className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <svg className="w-20 h-7" viewBox="0 0 80 30" fill="none">
              <path d="M2 20 Q 20 8, 35 22 T 55 12 T 78 20" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="mt-4 font-mono">
            <div className="text-[11px] text-[#94a3b8] uppercase tracking-wider">Impersonation Profiles</div>
            <div className="text-2xl font-black text-[#f8fafc] mt-1 tracking-tight tnum">96</div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 mt-2 tnum">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>18%</span>
              <span className="text-[#94a3b8] font-normal ml-0.5">vs 30d baseline</span>
            </div>
          </div>
        </div>

        {/* Card 3: Scam Links */}
        <div className="pulumi-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-[6px] bg-[#1f2937] border border-[#374151] flex items-center justify-center text-emerald-400">
              <LinkIcon className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <svg className="w-20 h-7" viewBox="0 0 80 30" fill="none">
              <path d="M2 24 Q 15 12, 35 24 T 55 10 T 78 18" stroke="#34d399" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="mt-4 font-mono">
            <div className="text-[11px] text-[#94a3b8] uppercase tracking-wider">Phishing Domains & URLs</div>
            <div className="text-2xl font-black text-[#f8fafc] mt-1 tracking-tight tnum">71</div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 mt-2 tnum">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>41%</span>
              <span className="text-[#94a3b8] font-normal ml-0.5">vs 30d baseline</span>
            </div>
          </div>
        </div>

        {/* Card 4: Rogue Apps & APKs */}
        <div className="pulumi-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-[6px] bg-[#1f2937] border border-[#374151] flex items-center justify-center text-amber-400">
              <Smartphone className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <svg className="w-20 h-7" viewBox="0 0 80 30" fill="none">
              <path d="M2 18 Q 20 28, 40 14 T 60 22 T 78 12" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="mt-4 font-mono">
            <div className="text-[11px] text-[#94a3b8] uppercase tracking-wider">Rogue Mobile APKs</div>
            <div className="text-2xl font-black text-[#f8fafc] mt-1 tracking-tight tnum">12</div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 mt-2 tnum">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>8%</span>
              <span className="text-[#94a3b8] font-normal ml-0.5">vs 30d baseline</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row: Dark Canvas with #38bdf8 Accent Glow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Area Chart: Threat Detection Velocity */}
        <div className="lg:col-span-2 pulumi-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#1f2937]">
            <div>
              <h2 className="text-sm font-bold text-[#f8fafc] font-mono flex items-center gap-2">
                <span>THREAT DETECTION VELOCITY</span>
                <span className="text-[10px] text-[#38bdf8] bg-[#38bdf8]/15 px-2 py-0.5 rounded border border-[#38bdf8]/30">LIVE</span>
              </h2>
              <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">
                Real-time ingestion across X, Instagram, Facebook, and APK mirrors
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="flex items-center gap-1.5 text-[#f8fafc]">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                All Threats
              </span>
              <span className="flex items-center gap-1.5 text-[#94a3b8]">
                <span className="w-2 h-2 rounded-full bg-[#1f2937]" />
                Quarantined
              </span>
            </div>
          </div>

          {/* SVG Area Chart */}
          <div className="relative h-64 w-full mt-6">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pulumiAccentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="#1f2937" strokeDasharray="3 3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#1f2937" strokeDasharray="3 3" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#1f2937" strokeDasharray="3 3" />

              {/* Area */}
              <path
                d="M 0 160 Q 60 140, 100 120 T 200 110 T 300 60 T 380 40 T 450 85 T 500 70 L 500 200 L 0 200 Z"
                fill="url(#pulumiAccentGradient)"
              />

              {/* Line */}
              <path
                d="M 0 160 Q 60 140, 100 120 T 200 110 T 300 60 T 380 40 T 450 85 T 500 70"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Peak Point on Sep 12 */}
              <circle cx="380" cy="40" r="5" fill="#38bdf8" stroke="#030712" strokeWidth="2" />
            </svg>

            {/* Peak Tooltip */}
            <div className="absolute left-[70%] top-[8%] -translate-x-1/2 p-2 rounded-[6px] bg-[#030712] border border-[#1f2937] text-xs font-mono text-[#f8fafc] shadow-lg pointer-events-none">
              <div className="text-[10px] text-[#94a3b8]">Peak: Sep 12, 14:00 UTC</div>
              <div className="text-[#38bdf8] font-bold mt-0.5 tnum">48 threats / hr</div>
            </div>
          </div>

          <div className="flex justify-between text-xs font-mono text-[#94a3b8] pt-3 border-t border-[#1f2937]">
            <span>Aug 14</span>
            <span>Aug 21</span>
            <span>Aug 28</span>
            <span>Sep 04</span>
            <span>Sep 11</span>
          </div>
        </div>

        {/* Donut Chart: Threat Distribution by Channel */}
        <div className="pulumi-card p-6 flex flex-col justify-between font-mono">
          <div className="pb-4 border-b border-[#1f2937]">
            <h2 className="text-sm font-bold text-[#f8fafc]">ATTACK SURFACE VECTOR</h2>
            <p className="text-xs text-[#94a3b8] mt-0.5">Distribution by connected channel</p>
          </div>

          <div className="flex items-center justify-center my-6 relative">
            <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100">
              {/* Instagram (40%) */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#38bdf8" strokeWidth="12" strokeDasharray="95.5 238.7" strokeDashoffset="0" />
              {/* X/Twitter (28%) */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#0284c7" strokeWidth="12" strokeDasharray="66.8 238.7" strokeDashoffset="-95.5" />
              {/* Facebook (18%) */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#1d4ed8" strokeWidth="12" strokeDasharray="43 238.7" strokeDashoffset="-162.3" />
              {/* Playstore & Others (14%) */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#374151" strokeWidth="12" strokeDasharray="33.4 238.7" strokeDashoffset="-205.3" />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-[#f8fafc] tnum">248</span>
              <span className="text-[10px] text-[#94a3b8] uppercase">Active Targets</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#94a3b8]">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
                Instagram (DMs & Clones)
              </span>
              <span className="text-[#f8fafc] font-semibold tnum">40%</span>
            </div>
            <div className="flex items-center justify-between text-[#94a3b8]">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                X / Twitter (Botnets)
              </span>
              <span className="text-[#f8fafc] font-semibold tnum">28%</span>
            </div>
            <div className="flex items-center justify-between text-[#94a3b8]">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1d4ed8]" />
                Facebook & Meta
              </span>
              <span className="text-[#f8fafc] font-semibold tnum">18%</span>
            </div>
            <div className="flex items-center justify-between text-[#94a3b8]">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#374151]" />
                Rogue APK Mirrors
              </span>
              <span className="text-[#f8fafc] font-semibold tnum">14%</span>
            </div>
          </div>
        </div>
      </div>

      {/* High-Craft Threat Feed Ledger Table */}
      <div className="pulumi-card overflow-hidden font-mono">
        <div className="p-4 bg-[#030712] border-b border-[#1f2937] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#f8fafc] flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#38bdf8]" />
              ACTIVE INCIDENT TELEMETRY FEED
            </h2>
            <p className="text-[11px] text-[#94a3b8] mt-0.5">
              Live heuristic stream flagged by Astra Core 3.2
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={threatTimeFilter}
              onChange={(e) => setThreatTimeFilter(e.target.value)}
              className="bg-[#111827] border border-[#1f2937] text-xs text-[#94a3b8] rounded-[6px] px-2.5 py-1 focus:outline-none focus:border-[#38bdf8]"
            >
              <option value="All Threat Types">All Threat Vectors</option>
              <option value="Fake Profile">Impersonation Profiles</option>
              <option value="Scam Link">Phishing Links</option>
              <option value="Fake App">Counterfeit APKs</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-[#1f2937]">
          {recentThreats.map((threat) => (
            <div
              key={threat.id}
              onClick={() => onSelectThreat(threat.id)}
              className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#111827]/80 transition cursor-pointer"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-8 h-8 rounded-[6px] bg-[#111827] border border-[#1f2937] flex items-center justify-center shrink-0 text-[#38bdf8]">
                  {threat.type === 'Fake Profile' && <Fingerprint className="w-4 h-4" strokeWidth={1.5} />}
                  {threat.type === 'Scam Link' && <LinkIcon className="w-4 h-4" strokeWidth={1.5} />}
                  {threat.type === 'Fake App' && <Package className="w-4 h-4" strokeWidth={1.5} />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-[#f8fafc]">{threat.title}</span>
                    <span className="text-[10px] uppercase px-1.5 py-0.2 rounded bg-[#030712] border border-[#1f2937] text-[#94a3b8]">
                      {threat.source}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.2 rounded border ${threat.riskColor}`}>
                      {threat.risk} RISK
                    </span>
                  </div>
                  <div className="text-xs text-[#94a3b8] mt-1 truncate">
                    {threat.subtitle}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-auto text-xs">
                <span className="text-[#94a3b8] text-[11px] tnum">{threat.time}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenTakedown(threat);
                  }}
                  className="px-3 py-1 rounded-[6px] bg-[#111827] hover:bg-[#1f2937] text-[#38bdf8] border border-[#1f2937] hover:border-[#38bdf8]/50 text-xs font-semibold transition"
                >
                  File Notice →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
