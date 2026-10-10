'use client';

import React, { useState, useMemo } from 'react';
import { 
  SocialMessage, 
  SocialPlatform, 
  ThreatSeverity 
} from '@/types/threat';
import { 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Smartphone, 
  CheckCircle2, 
  AlertOctagon, 
  UserX, 
  Globe 
} from 'lucide-react';

interface ThreatInboxProps {
  messages: SocialMessage[];
  selectedMessageId: string | null;
  onSelectMessage: (message: SocialMessage) => void;
}

export function ThreatInbox({
  messages,
  selectedMessageId,
  onSelectMessage
}: ThreatInboxProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      if (selectedPlatform !== 'all' && msg.platform !== selectedPlatform) return false;
      if (selectedSeverity !== 'all' && msg.analysis.severity !== selectedSeverity) return false;
      if (filterCategory !== 'all') {
        if (filterCategory === 'rogue_app' && !msg.analysis.fakeMobileAppDetected) return false;
        if (filterCategory === 'impersonator' && msg.analysis.impersonationScore < 50) return false;
        if (filterCategory === 'phishing' && !msg.analysis.maliciousPayloadDetected) return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSender = 
          msg.sender.username.toLowerCase().includes(query) ||
          msg.sender.displayName.toLowerCase().includes(query);
        const matchesContent = msg.content.toLowerCase().includes(query);
        const matchesIndicators = msg.analysis.indicators.some(i => 
          i.title.toLowerCase().includes(query) || i.evidence.toLowerCase().includes(query)
        );
        return matchesSender || matchesContent || matchesIndicators;
      }

      return true;
    });
  }, [messages, selectedPlatform, selectedSeverity, filterCategory, searchQuery]);

  const platformBadge = (platform: SocialPlatform) => {
    switch (platform) {
      case 'x_twitter':
        return { label: 'X (Twitter)', color: 'bg-[#111827] text-[#94a3b8] border-[#1f2937]' };
      case 'instagram':
        return { label: 'Instagram', color: 'bg-[#111827] text-[#94a3b8] border-[#1f2937]' };
      case 'telegram':
        return { label: 'Telegram', color: 'bg-[#030712] text-[#38bdf8] border-[#38bdf8]/40' };
      case 'linkedin':
        return { label: 'LinkedIn', color: 'bg-[#111827] text-[#94a3b8] border-[#1f2937]' };
      case 'discord':
        return { label: 'Discord', color: 'bg-[#111827] text-[#94a3b8] border-[#1f2937]' };
      default:
        return { label: platform, color: 'bg-[#111827] text-[#94a3b8] border-[#1f2937]' };
    }
  };

  const severityBadge = (severity: ThreatSeverity) => {
    switch (severity) {
      case 'critical':
        return {
          label: 'CRITICAL',
          icon: AlertOctagon,
          classes: 'bg-rose-950/60 text-rose-400 border-rose-900 font-bold'
        };
      case 'high':
        return {
          label: 'HIGH RISK',
          icon: AlertTriangle,
          classes: 'bg-amber-950/60 text-amber-400 border-amber-900 font-bold'
        };
      case 'medium':
        return {
          label: 'MEDIUM',
          icon: AlertTriangle,
          classes: 'bg-slate-800 text-slate-300 border-slate-700'
        };
      case 'low':
      case 'clean':
        return {
          label: 'CLEAN',
          icon: ShieldCheck,
          classes: 'bg-emerald-950/60 text-emerald-400 border-emerald-900'
        };
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#030712] border-r border-[#1f2937] font-mono">
      {/* Search and Filters Header */}
      <div className="p-4 border-b border-[#1f2937] space-y-3 shrink-0 bg-[#030712]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#f8fafc] flex items-center gap-2">
              <span>INBOUND THREAT STREAM</span>
              <span className="px-2 py-0.5 rounded bg-[#111827] text-[#38bdf8] border border-[#1f2937] text-xs tnum">
                {filteredMessages.length}
              </span>
            </h2>
            <p className="text-xs text-[#94a3b8] mt-0.5 font-sans">
              Live direct messages across connected handles
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Grep sender, handle, keywords..."
            className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] pl-8 pr-4 py-1.5 text-xs text-[#f8fafc] placeholder-[#94a3b8]/60 focus:outline-none focus:border-[#38bdf8] transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2 text-xs text-[#94a3b8] hover:text-[#f8fafc]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Selects */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-[#111827] border border-[#1f2937] text-[#94a3b8] text-xs rounded-[6px] px-2 py-1 focus:outline-none focus:border-[#38bdf8]"
          >
            <option value="all">All Channels</option>
            <option value="x_twitter">X (Twitter)</option>
            <option value="instagram">Instagram</option>
            <option value="telegram">Telegram</option>
            <option value="linkedin">LinkedIn</option>
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-[#111827] border border-[#1f2937] text-[#94a3b8] text-xs rounded-[6px] px-2 py-1 focus:outline-none focus:border-[#38bdf8]"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium</option>
            <option value="clean">Clean</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#111827] border border-[#1f2937] text-[#94a3b8] text-xs rounded-[6px] px-2 py-1 focus:outline-none focus:border-[#38bdf8]"
          >
            <option value="all">All Attack Vectors</option>
            <option value="rogue_app">Rogue Mobile APKs</option>
            <option value="impersonator">Impersonators</option>
            <option value="phishing">Phishing URLs</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#1f2937]">
        {filteredMessages.length === 0 ? (
          <div className="p-8 text-center text-[#94a3b8] space-y-2">
            <ShieldCheck className="w-8 h-8 mx-auto text-[#1f2937]" />
            <p className="text-xs font-medium text-[#f8fafc]">No messages matched query</p>
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const isSelected = selectedMessageId === msg.id;
            const pBadge = platformBadge(msg.platform);
            const sBadge = severityBadge(msg.analysis.severity);
            const SeverityIcon = sBadge.icon;

            return (
              <div
                key={msg.id}
                onClick={() => onSelectMessage(msg)}
                className={`p-4 transition cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#111827] border-l-2 border-l-[#38bdf8]'
                    : 'hover:bg-[#111827]/60 border-l-2 border-l-transparent'
                }`}
              >
                {/* Top Row: Platform, Severity & Timestamp */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${pBadge.color}`}>
                      {pBadge.label}
                    </span>
                    <span className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border ${sBadge.classes} tnum`}>
                      <SeverityIcon className="w-3 h-3" />
                      {sBadge.label} ({msg.analysis.riskScore})
                    </span>
                  </div>

                  <span className="text-[11px] text-[#94a3b8] flex items-center gap-1 tnum">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Sender Details */}
                <div className="flex items-start gap-3 mb-2">
                  <img
                    src={msg.sender.avatarUrl}
                    alt={msg.sender.displayName}
                    className="w-8 h-8 rounded-[4px] object-cover border border-[#1f2937] shrink-0 mt-0.5"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-semibold text-[#f8fafc] truncate font-sans">
                        {msg.sender.displayName}
                      </span>
                      {msg.sender.isFakeBadgeEmoji && (
                        <span className="text-[10px] bg-rose-950/60 text-rose-400 border border-rose-900 px-1 rounded font-medium">
                          Fake Badge
                        </span>
                      )}
                      {msg.sender.isVerifiedBadge && (
                        <span className="text-[10px] bg-[#030712] text-[#38bdf8] border border-[#38bdf8]/40 px-1 rounded font-medium">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">
                      @{msg.sender.username}
                    </div>
                  </div>
                </div>

                {/* Message Content Snippet */}
                <p className="text-xs text-[#94a3b8] line-clamp-2 leading-relaxed mb-2.5 font-sans">
                  {msg.content}
                </p>

                {/* Threat Tags / Detected Artifacts */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {msg.analysis.fakeMobileAppDetected && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-rose-950/60 text-rose-400 border border-rose-900 font-medium">
                      <Smartphone className="w-2.5 h-2.5" />
                      Rogue APK
                    </span>
                  )}
                  {msg.analysis.impersonationScore >= 50 && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-900 font-medium tnum">
                      <UserX className="w-2.5 h-2.5" />
                      Impersonator ({msg.analysis.impersonationScore}%)
                    </span>
                  )}
                  {msg.analysis.maliciousPayloadDetected && (
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-[#030712] text-[#38bdf8] border border-[#38bdf8]/30 font-medium">
                      <Globe className="w-2.5 h-2.5" />
                      Phishing URL
                    </span>
                  )}
                  {msg.status === 'quarantined' && (
                    <span className="ml-auto text-[10px] text-rose-400 uppercase font-semibold">
                      [QUARANTINED]
                    </span>
                  )}
                  {msg.status === 'resolved' && (
                    <span className="ml-auto text-[10px] text-emerald-400 uppercase font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Safe
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
