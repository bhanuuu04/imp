'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertOctagon, 
  FileText, 
  Copy, 
  Check, 
  ArrowRight,
  Plus,
  Terminal
} from 'lucide-react';

interface TakedownsPageProps {
  onOpenNewTakedown?: () => void;
}

export function TakedownsPage({ onOpenNewTakedown }: TakedownsPageProps) {
  const [filter, setFilter] = useState('all');

  const takedownsList = [
    {
      id: 'TK-8492',
      target: '@acme.supportt (Instagram)',
      targetType: 'Profile Impersonation',
      destination: 'Meta Brand Rights Operations',
      policy: 'Meta Impersonation & Trademark Policy',
      submittedAt: 'Today, 10:14 AM',
      eta: '1-3 hours',
      status: 'In Review',
      statusColor: 'bg-amber-950/60 text-amber-400 border-amber-900',
      caseNumber: '#META-992140'
    },
    {
      id: 'TK-8491',
      target: 'Acme Wallet Pro (com.acme.fake.apk)',
      targetType: 'Rogue Mobile APK',
      destination: 'Google Play Protect & Abuse',
      policy: 'Malware & Impersonating Developer Policy',
      submittedAt: 'Yesterday, 4:20 PM',
      eta: 'Resolved',
      status: 'App Removed',
      statusColor: 'bg-emerald-950/60 text-emerald-400 border-emerald-900',
      caseNumber: '#GPLAY-44820'
    },
    {
      id: 'TK-8490',
      target: 'https://acme-offer.com',
      targetType: 'Phishing Landing Domain',
      destination: 'NameCheap Abuse Operations',
      policy: 'Phishing Hosting Suspension',
      submittedAt: 'Yesterday, 2:10 PM',
      eta: 'Resolved',
      status: 'Domain Suspended',
      statusColor: 'bg-emerald-950/60 text-emerald-400 border-emerald-900',
      caseNumber: '#NC-884102'
    },
    {
      id: 'TK-8489',
      target: '@AcmeAirdrop_OfficialBot (Telegram)',
      targetType: 'Scam Bot / Wallet Drainer',
      destination: 'Telegram @notoscam & Legal Desk',
      policy: 'Telegram Fraud & Abuse Terms',
      submittedAt: '2 days ago',
      eta: 'Under Review',
      status: 'Scam Flag Applied',
      statusColor: 'bg-[#030712] text-[#38bdf8] border-[#38bdf8]/40',
      caseNumber: '#TG-1192'
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
              Enforcement & DMCA Dispatch
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#f8fafc]">
            Takedown Management & Injunctions
          </h1>
          <p className="text-xs text-[#94a3b8] mt-1 font-sans">
            Monitor and expedite statutory DMCA notices, registrar abuse suspensions, and mobile store takedowns.
          </p>
        </div>

        <button
          onClick={onOpenNewTakedown}
          className="px-3.5 py-1.5 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition flex items-center gap-1.5 active:scale-97"
        >
          <Plus className="w-4 h-4" />
          Dispatch Notice
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Active Legal Notices</div>
          <div className="text-2xl font-bold text-[#f8fafc] mt-1 tnum">12</div>
          <div className="text-[11px] text-[#94a3b8]/70 mt-1">Under formal review</div>
        </div>

        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Enforcement SLA Avg</div>
          <div className="text-2xl font-bold text-[#38bdf8] mt-1 tnum">2.4h</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1">↓ 42% vs industry standard</div>
        </div>

        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Completed Takedowns</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1 tnum">84</div>
          <div className="text-[11px] text-[#94a3b8]/70 mt-1">Profiles and APKs terminated</div>
        </div>

        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Host Injunction Rate</div>
          <div className="text-2xl font-bold text-[#f8fafc] mt-1 tnum">98.1%</div>
          <div className="text-[11px] text-[#94a3b8]/70 mt-1">Legally binding enforcement</div>
        </div>
      </div>

      {/* Takedown Records Table */}
      <div className="pulumi-card overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1f2937] bg-[#030712] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#f8fafc] uppercase tracking-wider">
            Active Case Records ({takedownsList.length})
          </span>
          <span className="text-xs text-[#94a3b8]">
            Automated Escalation Active
          </span>
        </div>

        <div className="divide-y divide-[#1f2937]">
          {takedownsList.map((tk) => (
            <div key={tk.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#111827]/80 transition">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-[#38bdf8] bg-[#030712] border border-[#1f2937] px-2 py-0.5 rounded">
                    {tk.id}
                  </span>
                  <span className="text-sm font-semibold text-[#f8fafc] font-sans">
                    {tk.target}
                  </span>
                  <span className="text-[11px] text-[#94a3b8]">
                    {tk.caseNumber}
                  </span>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${tk.statusColor}`}>
                    {tk.status}
                  </span>
                </div>

                <div className="text-xs text-[#94a3b8] flex items-center gap-4 flex-wrap">
                  <span>Enforcing Against: <strong className="text-[#f8fafc]">{tk.destination}</strong></span>
                  <span>Policy: <span>{tk.policy}</span></span>
                  <span className="tnum">ETA: {tk.eta}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                <button className="px-3 py-1.5 rounded-[6px] bg-[#111827] border border-[#1f2937] hover:bg-[#1f2937] text-[#94a3b8] hover:text-[#f8fafc] text-xs font-medium transition flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#38bdf8]" />
                  View Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
