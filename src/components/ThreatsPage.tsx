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
  Terminal,
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
    <div className="flex-1 overflow-y-auto bg-[#030712] p-6 lg:p-8 space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#1f2937]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#38bdf8] tracking-wider uppercase">
              CLI Telemetry Stream
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#f8fafc]">
            Active Threats Docket
          </h1>
          <p className="text-xs text-[#94a3b8] mt-1 font-sans">
            Real-time feed of detected brand impersonation, rogue APKs, and phishing payloads across all channels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-[6px] bg-rose-950/60 text-rose-400 border border-rose-900 text-xs font-semibold tnum">
            {criticalCount} CRITICAL
          </span>
          <span className="px-2.5 py-1 rounded-[6px] bg-amber-950/60 text-amber-400 border border-amber-900 text-xs font-semibold tnum">
            {highCount} HIGH RISK
          </span>
        </div>
      </div>

      {/* Top 4 KPI Cards - Theme #132 Pulumi */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Total Flagged</div>
          <div className="text-2xl font-bold text-[#f8fafc] mt-1 tnum">{messages.length}</div>
          <div className="text-[11px] text-[#94a3b8]/70 mt-1">Across all social handles</div>
        </div>

        <div className="pulumi-card p-5 border-rose-900/60 bg-rose-950/20">
          <div className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">Critical Threats</div>
          <div className="text-2xl font-bold text-rose-400 mt-1 tnum">{criticalCount}</div>
          <div className="text-[11px] text-rose-500 font-medium mt-1">Immediate action required</div>
        </div>

        <div className="pulumi-card p-5">
          <div className="text-[11px] font-medium text-[#94a3b8] uppercase tracking-wider">Quarantined</div>
          <div className="text-2xl font-bold text-[#f8fafc] mt-1 tnum">{quarantinedCount}</div>
          <div className="text-[11px] text-[#94a3b8]/70 mt-1">Airgapped from team inboxes</div>
        </div>

        <div className="pulumi-card p-5">
          <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Resolved / Clean</div>
          <div className="text-2xl font-bold text-[#f8fafc] mt-1 tnum">{resolvedCount}</div>
          <div className="text-[11px] text-emerald-500 font-medium mt-1">Legitimate accounts verified</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="pulumi-card p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['all', 'new', 'investigating', 'quarantined', 'resolved'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-[6px] text-xs transition capitalize ${
                statusFilter === tab
                  ? 'bg-[#111827] text-[#38bdf8] border border-[#38bdf8]/40'
                  : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#111827]'
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
            className="bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#94a3b8] focus:outline-none focus:border-[#38bdf8]"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="clean">Clean</option>
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Grep threat vector..."
              className="bg-[#111827] border border-[#1f2937] rounded-[6px] pl-8 pr-3 py-1.5 text-xs text-[#f8fafc] placeholder-[#94a3b8]/60 focus:outline-none focus:border-[#38bdf8]"
            />
          </div>
        </div>
      </div>

      {/* Threats List Cards */}
      <div className="space-y-3">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className="pulumi-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4 min-w-0">
              <img
                src={msg.sender.avatarUrl}
                alt={msg.sender.displayName}
                className="w-10 h-10 rounded-[6px] object-cover border border-[#1f2937] shrink-0 mt-0.5"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#f8fafc] text-sm truncate font-sans">
                    {msg.sender.displayName}
                  </span>
                  <span className="text-xs text-[#94a3b8]">
                    @{msg.sender.username}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#030712] border border-[#1f2937] text-[#94a3b8] uppercase font-semibold">
                    {msg.platform.replace('_', ' ')}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded uppercase border tnum ${
                    msg.analysis.severity === 'critical'
                      ? 'bg-rose-950/60 text-rose-400 border-rose-900'
                      : msg.analysis.severity === 'high'
                      ? 'bg-amber-950/60 text-amber-400 border-amber-900'
                      : 'bg-emerald-950/60 text-emerald-400 border-emerald-900'
                  }`}>
                    {msg.analysis.severity} ({msg.analysis.riskScore}/100)
                  </span>
                </div>

                <p className="text-xs text-[#94a3b8] mt-1.5 line-clamp-2 leading-relaxed font-sans">
                  {msg.content}
                </p>

                {/* Threat Tags */}
                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  {msg.analysis.fakeMobileAppDetected && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-rose-950/60 text-rose-400 border border-rose-900 font-medium">
                      <Smartphone className="w-3 h-3" /> Rogue Mobile APK
                    </span>
                  )}
                  {msg.analysis.impersonationScore >= 50 && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-900 font-medium tnum">
                      Impersonator ({msg.analysis.impersonationScore}%)
                    </span>
                  )}
                  {msg.analysis.maliciousPayloadDetected && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-[#030712] text-[#38bdf8] border border-[#38bdf8]/30 font-medium">
                      <LinkIcon className="w-3 h-3" /> Phishing Link
                    </span>
                  )}
                  <span className="text-[11px] text-[#94a3b8] flex items-center gap-1 tnum">
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
                  className="px-3 py-1.5 rounded-[6px] bg-[#111827] border border-[#1f2937] hover:bg-[#1f2937] text-[#94a3b8] text-xs transition"
                >
                  Airgap Quarantine
                </button>
              )}

              <button
                onClick={() => onOpenTakedown(msg)}
                className="px-3.5 py-1.5 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition flex items-center gap-1 active:scale-97"
              >
                File Notice <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
