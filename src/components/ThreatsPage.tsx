'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  ArrowRight, 
  Clock, 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Smartphone, 
  Link as LinkIcon, 
  ExternalLink,
  ChevronDown,
  Ban
} from 'lucide-react';
import { SocialMessage } from '@/types/threat';

interface ThreatsPageProps {
  messages: SocialMessage[];
  onOpenTakedown: (message: SocialMessage) => void;
  onUpdateStatus: (messageId: string, status: SocialMessage['status']) => void;
  onSelectMessageDetail: (message: SocialMessage) => void;
}

export function ThreatsPage({
  messages,
  onOpenTakedown,
  onUpdateStatus,
  onSelectMessageDetail
}: ThreatsPageProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'investigating' | 'quarantined' | 'resolved'>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const filtered = messages.filter(m => {
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (severityFilter !== 'all' && m.analysis.severity !== severityFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        m.sender.username.toLowerCase().includes(q) ||
        m.sender.displayName.toLowerCase().includes(q) ||
        m.content.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const criticalCount = messages.filter(m => m.analysis.severity === 'critical').length;
  const highCount = messages.filter(m => m.analysis.severity === 'high').length;
  const quarantinedCount = messages.filter(m => m.status === 'quarantined').length;
  const resolvedCount = messages.filter(m => m.status === 'resolved').length;

  return (
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase font-mono">
              Live Threat Interceptor
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
            Active Threats
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry of detected brand impersonation, rogue APKs, and phishing payloads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold tnum">
            {criticalCount} Critical
          </span>
          <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold tnum">
            {highCount} High Risk
          </span>
        </div>
      </div>

      {/* Top 4 Metric KPI Cards - Theme #166 Mercury */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Flagged</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 tnum">{messages.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Across all social handles</div>
        </div>

        <div className="mercury-card p-5 border-rose-200/80 bg-rose-50/10">
          <div className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider">Critical Threats</div>
          <div className="text-2xl font-bold text-rose-600 mt-1 tnum">{criticalCount}</div>
          <div className="text-[11px] text-rose-500 font-medium mt-1">Immediate action required</div>
        </div>

        <div className="mercury-card p-5">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Quarantined</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 tnum">{quarantinedCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Airgapped from team inboxes</div>
        </div>

        <div className="mercury-card p-5">
          <div className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">Resolved / Safe</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 tnum">{resolvedCount}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Legitimate accounts verified</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mercury-card p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['all', 'new', 'investigating', 'quarantined', 'resolved'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize mercury-transition ${
                statusFilter === tab
                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab === 'all' ? 'All Threats' : tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-sky-600"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="clean">Clean</option>
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter threat vector..."
              className="bg-white border border-slate-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600"
            />
          </div>
        </div>
      </div>

      {/* Threats List Cards */}
      <div className="space-y-3">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className="mercury-card p-5 hover:border-slate-300 mercury-transition flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4 min-w-0">
              <img
                src={msg.sender.avatarUrl}
                alt={msg.sender.displayName}
                className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0 mt-0.5"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-900 text-sm truncate">
                    {msg.sender.displayName}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    @{msg.sender.username}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase font-semibold">
                    {msg.platform.replace('_', ' ')}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase border tnum ${
                    msg.analysis.severity === 'critical'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : msg.analysis.severity === 'high'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {msg.analysis.severity} ({msg.analysis.riskScore}/100)
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {msg.content}
                </p>

                {/* Threat Tags */}
                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  {msg.analysis.fakeMobileAppDetected && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-medium">
                      <Smartphone className="w-3 h-3" /> Rogue Mobile APK
                    </span>
                  )}
                  {msg.analysis.impersonationScore >= 50 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                      Impersonator ({msg.analysis.impersonationScore}%)
                    </span>
                  )}
                  {msg.analysis.maliciousPayloadDetected && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-medium">
                      <LinkIcon className="w-3 h-3" /> Phishing Link
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono tnum">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              {msg.status !== 'quarantined' && (
                <button
                  onClick={() => onUpdateStatus(msg.id, 'quarantined')}
                  className="px-3 py-1.5 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium mercury-transition"
                >
                  Quarantine
                </button>
              )}

              <button
                onClick={() => onOpenTakedown(msg)}
                className="px-3.5 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium mercury-transition flex items-center gap-1 mercury-btn-press"
              >
                Take Action <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
