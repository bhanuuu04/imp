'use client';

import React, { useState } from 'react';
import { 
  Link as LinkIcon, 
  Search, 
  ShieldAlert, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  Copy, 
  Check, 
  Send, 
  Sparkles,
  Terminal,
  Code2
} from 'lucide-react';

interface ScamLinksPageProps {
  onOpenTakedown: (threat: any) => void;
}

export function ScamLinksPage({ onOpenTakedown }: ScamLinksPageProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [urlScannerInput, setUrlScannerInput] = useState('https://acme-security-verify.top/login.php');
  const [scanResult, setScanResult] = useState<any>(null);

  const scamLinks = [
    {
      id: 'sl-1',
      url: 'https://acme-offer.com/claim',
      domain: 'acme-offer.com',
      campaignType: 'Phishing / Credential Harvester',
      threatVector: 'X (Twitter) Mention Botnet',
      riskScore: 98,
      status: 'Active Phishing',
      registrar: 'NameCheap (Abuse Filed)',
      ipAddress: '185.220.101.44',
      firstSeen: '4 hours ago'
    },
    {
      id: 'sl-2',
      url: 'https://bit.ly/acme-meta-appeal-case',
      domain: 'bit.ly (Masked redirect)',
      campaignType: 'Account Takeover Extortion',
      threatVector: 'Instagram Direct Message',
      riskScore: 92,
      status: 'Redirect Blocked',
      registrar: 'Bitly Trust Desk',
      ipAddress: '104.244.42.1',
      firstSeen: '7 hours ago'
    },
    {
      id: 'sl-3',
      url: 'https://acme-giveaway.net/airdrop',
      domain: 'acme-giveaway.net',
      campaignType: 'Crypto Wallet Drainer',
      threatVector: 'TikTok Comment Spam',
      riskScore: 94,
      status: 'Active Phishing',
      registrar: 'Cloudflare Proxy (Reported)',
      ipAddress: '172.67.182.11',
      firstSeen: '12 hours ago'
    },
    {
      id: 'sl-4',
      url: 'https://secure-doc-review.live/acme-invoice.pdf',
      domain: 'secure-doc-review.live',
      campaignType: 'Spear-Phishing Payload',
      threatVector: 'LinkedIn InMail',
      riskScore: 89,
      status: 'Safe Browsing Flagged',
      registrar: 'Porkbun LLC',
      ipAddress: '45.142.214.2',
      firstSeen: '18 hours ago'
    }
  ];

  const copyUrl = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleScanUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setScanResult({
      url: urlScannerInput,
      domain: 'acme-security-verify.top',
      tld: '.top (High Risk TLD)',
      riskScore: 97,
      indicators: [
        'Domain registered 3 days ago',
        'Stolen logo favicon hash matched',
        'Credential harvesting POST endpoint active',
        'No valid SPF/DKIM verification'
      ]
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#030712] p-6 lg:p-8 space-y-6 font-mono">
      {/* Header */}
      <div className="pb-3 border-b border-[#1f2937]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          <span className="text-[11px] font-semibold text-[#38bdf8] tracking-wider uppercase">
            DNS & Phishing Payload De-cloaker
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#f8fafc]">
          Scam Links & Malicious Domains
        </h1>
        <p className="text-xs text-[#94a3b8] mt-1 font-sans">
          De-obfuscate shortened redirects, inspect host SSL cert provenance, and issue registrar abuse suspensions.
        </p>
      </div>

      {/* Live URL Forensics Terminal */}
      <div className="terminal-window p-6 space-y-4">
        <div>
          <h2 className="text-sm font-bold text-[#f8fafc] flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#38bdf8]" />
            Live URL Forensics Terminal & Safe-Browsing Probe
          </h2>
          <p className="text-xs text-[#94a3b8] mt-0.5 font-sans">
            Inspect any suspicious link extracted from DMs or comments to reveal redirects, host IP, and registrar abuse desks.
          </p>
        </div>

        <form onSubmit={handleScanUrl} className="flex gap-2">
          <input
            type="text"
            value={urlScannerInput}
            onChange={(e) => setUrlScannerInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 bg-[#111827] border border-[#1f2937] rounded-[6px] px-3.5 py-2 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition flex items-center gap-1.5 active:scale-97"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Probe Payload
          </button>
        </form>

        {scanResult && (
          <div className="p-4 rounded-[6px] bg-[#111827] border border-[#1f2937] text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Confirmed Malicious Phishing Endpoint (Score: {scanResult.riskScore}/100)
              </span>
              <span className="text-[#94a3b8] text-[11px]">{scanResult.tld}</span>
            </div>
            <ul className="list-disc pl-4 text-[#94a3b8] space-y-1 font-sans text-xs">
              {scanResult.indicators.map((ind: string, idx: number) => (
                <li key={idx}>{ind}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Flagged Links Feed */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-3">
          Intercepted Malicious URLs ({scamLinks.length})
        </h2>
        <div className="space-y-3">
          {scamLinks.map((link) => (
            <div
              key={link.id}
              className="pulumi-card p-5 space-y-3"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-900 px-2 py-0.5 rounded">
                      {link.status}
                    </span>
                    <span className="text-sm font-semibold text-[#f8fafc]">
                      {link.domain}
                    </span>
                    <span className="text-xs text-[#94a3b8]">
                      IP: {link.ipAddress}
                    </span>
                  </div>

                  <div className="text-xs text-[#94a3b8] font-sans">
                    <strong className="text-[#f8fafc] font-mono">{link.campaignType}</strong> • Vector: {link.threatVector}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => copyUrl(link.url, link.id)}
                    className="px-3 py-1.5 rounded-[6px] bg-[#111827] border border-[#1f2937] hover:bg-[#1f2937] text-[#94a3b8] hover:text-[#f8fafc] text-xs font-medium transition flex items-center gap-1"
                  >
                    {copiedId === link.id ? <Check className="w-3.5 h-3.5 text-[#38bdf8]" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy URL
                  </button>

                  <button
                    onClick={() => onOpenTakedown(link)}
                    className="px-3.5 py-1.5 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition flex items-center gap-1 active:scale-97"
                  >
                    File Notice <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-xs text-[#94a3b8] pt-2 border-t border-[#1f2937] flex justify-between items-center">
                <span>Registrar: {link.registrar}</span>
                <span className="tnum">First seen: {link.firstSeen}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
