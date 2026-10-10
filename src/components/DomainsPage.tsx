'use client';

import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Mail, 
  Server, 
  ShieldCheck, 
  Plus,
  Terminal
} from 'lucide-react';

interface DomainsPageProps {
  onOpenTakedown: (threat: any) => void;
}

export function DomainsPage({ onOpenTakedown }: DomainsPageProps) {
  const [search, setSearch] = useState('');

  const monitoredDomains = [
    {
      domain: 'acme-security.com',
      technique: 'Hyphen Addition',
      similarity: '96%',
      status: 'Active Phishing Site',
      statusColor: 'bg-rose-950/60 text-rose-400 border-rose-900',
      hasMxRecords: true,
      mxWarning: 'Active MX Record configured! Can send email as your brand.',
      ip: '185.193.125.10',
      registrar: 'NameSilo LLC',
      registeredOn: 'Sep 08, 2026',
      sslIssuer: "Let's Encrypt"
    },
    {
      domain: 'acme-login.net',
      technique: 'TLD Swap + Keyword Spoof',
      similarity: '91%',
      status: 'Credential Harvester',
      statusColor: 'bg-rose-950/60 text-rose-400 border-rose-900',
      hasMxRecords: false,
      ip: '194.38.20.5',
      registrar: 'Hostinger Operations',
      registeredOn: 'Aug 24, 2026',
      sslIssuer: "Cloudflare Inc"
    },
    {
      domain: 'acmè.com',
      technique: 'IDN Homoglyph (Punycode: xn--acm-7la.com)',
      similarity: '98%',
      status: 'Parked / Under Observation',
      statusColor: 'bg-amber-950/60 text-amber-400 border-amber-900',
      hasMxRecords: false,
      ip: '104.21.55.2',
      registrar: 'GoDaddy.com LLC',
      registeredOn: 'Jul 15, 2026',
      sslIssuer: 'None'
    },
    {
      domain: 'acme-support.top',
      technique: 'High-Abuse TLD (.top)',
      similarity: '94%',
      status: 'Active Phishing Site',
      statusColor: 'bg-rose-950/60 text-rose-400 border-rose-900',
      hasMxRecords: true,
      mxWarning: 'Active MX Record detected (Spam mail server).',
      ip: '45.154.255.8',
      registrar: 'Alibaba Cloud',
      registeredOn: 'Sep 10, 2026',
      sslIssuer: "Let's Encrypt"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#030712] p-6 lg:p-8 space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#1f2937]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            <span className="text-[11px] font-semibold text-[#38bdf8] tracking-wider uppercase">
              DNS Zone & Registrar Surveillance
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#f8fafc]">
            Domain Defense Radar
          </h1>
          <p className="text-xs text-[#94a3b8] mt-1 font-sans">
            Continuous zone reconnaissance for typosquats, lookalikes, IDN homoglyphs, and unauthorized MX record mail spoofing.
          </p>
        </div>

        <button className="px-3.5 py-1.5 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition flex items-center gap-1.5 active:scale-97">
          <Plus className="w-4 h-4" />
          Add Root Target
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Typosquats Monitored</div>
          <div className="text-2xl font-bold text-[#f8fafc] mt-1 tnum">1,420</div>
          <div className="text-[11px] text-[#94a3b8]/70 mt-1">Combos generated daily</div>
        </div>

        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Active Hostile Domains</div>
          <div className="text-2xl font-bold text-rose-400 mt-1 tnum">18</div>
          <div className="text-[11px] text-rose-500 font-medium mt-1">Live web servers detected</div>
        </div>

        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Armed with MX Records</div>
          <div className="text-2xl font-bold text-amber-400 mt-1 tnum">4</div>
          <div className="text-[11px] text-amber-500 mt-1">Can spoof email identity</div>
        </div>

        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Registrar Lockout Avg</div>
          <div className="text-2xl font-bold text-[#38bdf8] mt-1 tnum">3.1h</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1">UDRP / abuse suspension</div>
        </div>
      </div>

      {/* Domains Table */}
      <div className="pulumi-card overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1f2937] bg-[#030712] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#f8fafc] uppercase tracking-wider">
            Detected Hostile Domains ({monitoredDomains.length})
          </span>
          <span className="text-xs text-[#94a3b8]">
            DNS ZONE TRANSFER AUDITED
          </span>
        </div>

        <div className="divide-y divide-[#1f2937]">
          {monitoredDomains.map((dom, idx) => (
            <div key={idx} className="p-5 space-y-3 hover:bg-[#111827]/80 transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-[#f8fafc]">
                      {dom.domain}
                    </span>
                    <span className="text-xs text-[#94a3b8] bg-[#030712] px-2 py-0.5 rounded border border-[#1f2937]">
                      {dom.technique}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${dom.statusColor}`}>
                      {dom.status}
                    </span>
                  </div>

                  <div className="text-xs text-[#94a3b8] flex items-center gap-3 flex-wrap">
                    <span>IP: <strong className="text-[#f8fafc]">{dom.ip}</strong></span>
                    <span>Registrar: {dom.registrar}</span>
                    <span className="tnum">Registered: {dom.registeredOn}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onOpenTakedown(dom)}
                    className="px-3.5 py-1.5 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition flex items-center gap-1 active:scale-97"
                  >
                    File Injunction <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {dom.hasMxRecords && (
                <div className="p-2.5 rounded-[6px] bg-amber-950/40 border border-amber-900 text-xs text-amber-400 flex items-center gap-2 font-medium">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  {dom.mxWarning}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
