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
  Plus
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
      statusColor: 'bg-rose-50 text-rose-700 border-rose-200',
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
      statusColor: 'bg-rose-50 text-rose-700 border-rose-200',
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
      statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
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
      statusColor: 'bg-rose-50 text-rose-700 border-rose-200',
      hasMxRecords: true,
      mxWarning: 'Active MX Record detected (Spam mail server).',
      ip: '45.154.255.8',
      registrar: 'Alibaba Cloud',
      registeredOn: 'Sep 10, 2026',
      sslIssuer: "Let's Encrypt"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase font-mono">
              DNS & Registrar Telemetry
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
            Domain Defense Radar
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Early-warning surveillance for typosquats, lookalikes, IDN homoglyphs, and unauthorized MX record mail spoofing.
          </p>
        </div>

        <button className="px-3.5 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium mercury-transition flex items-center gap-1.5 mercury-btn-press">
          <Plus className="w-4 h-4" />
          Add Monitored Root
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Typosquats Monitored</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 tnum">1,420</div>
          <div className="text-[11px] text-slate-400 mt-1">Combos generated daily</div>
        </div>

        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Active Hostile Domains</div>
          <div className="text-2xl font-bold text-rose-600 mt-1 tnum">18</div>
          <div className="text-[11px] text-rose-500 font-medium mt-1">Live web servers detected</div>
        </div>

        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Armed with MX Records</div>
          <div className="text-2xl font-bold text-amber-600 mt-1 tnum">4</div>
          <div className="text-[11px] text-amber-700 mt-1">Can impersonate your email</div>
        </div>

        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Registrar Lockout Avg</div>
          <div className="text-2xl font-bold text-sky-600 mt-1 tnum">3.1h</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">UDRP / abuse suspension</div>
        </div>
      </div>

      {/* Domains Table */}
      <div className="mercury-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Detected Infringing Domains ({monitoredDomains.length})
          </span>
          <span className="text-xs text-slate-400 font-mono">
            DNS Zone Transfer Audited
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {monitoredDomains.map((dom, idx) => (
            <div key={idx} className="p-5 space-y-3 hover:bg-slate-50/50 mercury-transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-900 font-mono">
                      {dom.domain}
                    </span>
                    <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
                      {dom.technique}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${dom.statusColor}`}>
                      {dom.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-3 flex-wrap">
                    <span>IP: <strong className="text-slate-700 font-mono">{dom.ip}</strong></span>
                    <span>Registrar: {dom.registrar}</span>
                    <span className="font-mono tnum">Registered: {dom.registeredOn}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onOpenTakedown(dom)}
                    className="px-3.5 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium mercury-transition flex items-center gap-1 mercury-btn-press"
                  >
                    File Domain Takedown <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {dom.hasMxRecords && (
                <div className="p-2.5 rounded-md bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2 font-medium">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-amber-600" />
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
