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
  Plus
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
      statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
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
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
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
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
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
      statusColor: 'bg-sky-50 text-sky-700 border-sky-200',
      caseNumber: '#TG-1192'
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
              Enforcement & Legal Dispatch
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
            Takedown Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor and expedite DMCA statutory notices, registrar abuse suspensions, and app store takedowns.
          </p>
        </div>

        <button
          onClick={onOpenNewTakedown}
          className="px-3.5 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium mercury-transition flex items-center gap-1.5 mercury-btn-press"
        >
          <Plus className="w-4 h-4" />
          Dispatch New Notice
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Active Legal Notices</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 tnum">12</div>
          <div className="text-[11px] text-slate-400 mt-1">Under formal review</div>
        </div>

        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Enforcement SLA Avg</div>
          <div className="text-2xl font-bold text-sky-600 mt-1 tnum">2.4h</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">↓ 42% vs industry standard</div>
        </div>

        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Completed Takedowns</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1 tnum">84</div>
          <div className="text-[11px] text-slate-400 mt-1">Profiles and APKs terminated</div>
        </div>

        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Host Injunction Rate</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 tnum">98.1%</div>
          <div className="text-[11px] text-slate-400 mt-1">Legally binding enforcement</div>
        </div>
      </div>

      {/* Takedown Records Table */}
      <div className="mercury-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Active Case Records ({takedownsList.length})
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Automated Escalation Active
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {takedownsList.map((tk) => (
            <div key={tk.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 mercury-transition">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {tk.id}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {tk.target}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {tk.caseNumber}
                  </span>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${tk.statusColor}`}>
                    {tk.status}
                  </span>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-4 flex-wrap">
                  <span>Enforcing Against: <strong className="text-slate-700">{tk.destination}</strong></span>
                  <span>Policy: <span className="text-slate-600">{tk.policy}</span></span>
                  <span className="font-mono tnum">ETA: {tk.eta}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                <button className="px-3 py-1.5 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium mercury-transition flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
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
