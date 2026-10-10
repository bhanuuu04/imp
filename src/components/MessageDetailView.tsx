'use client';

import React from 'react';
import { 
  SocialMessage, 
  BrandAssetRegistry 
} from '@/types/threat';
import { 
  ShieldAlert, 
  FileWarning, 
  UserX, 
  Terminal, 
  Copy, 
  Check, 
  Ban, 
  ArrowRight, 
  Fingerprint, 
  Calendar, 
  Users, 
  AlertOctagon, 
  DownloadCloud,
  Code2
} from 'lucide-react';

interface MessageDetailViewProps {
  message: SocialMessage;
  brand: BrandAssetRegistry;
  onOpenTakedown: (message: SocialMessage) => void;
  onUpdateStatus: (messageId: string, status: SocialMessage['status']) => void;
}

export function MessageDetailView({
  message,
  brand,
  onOpenTakedown,
  onUpdateStatus
}: MessageDetailViewProps) {
  const [copiedArtifact, setCopiedArtifact] = React.useState<string | null>(null);

  const sender = message.sender;
  const analysis = message.analysis;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedArtifact(id);
    setTimeout(() => setCopiedArtifact(null), 2000);
  };

  const exportForensicJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(message, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ASTRA_THREAT_${message.id}_${sender.username}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex flex-col h-full bg-[#030712] overflow-y-auto font-mono">
      {/* Action Toolbar */}
      <div className="p-3.5 border-b border-[#1f2937] bg-[#030712] flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#94a3b8]">Status:</span>
          <select
            value={message.status}
            onChange={(e) => onUpdateStatus(message.id, e.target.value as SocialMessage['status'])}
            className="bg-[#111827] border border-[#1f2937] text-xs rounded-[6px] px-2.5 py-1 text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
          >
            <option value="new">New (Needs Triage)</option>
            <option value="investigating">Investigating</option>
            <option value="quarantined">Quarantined (Airgapped)</option>
            <option value="takedown_requested">Takedown Dispatched</option>
            <option value="resolved">Resolved / Clean</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Export JSON */}
          <button
            onClick={exportForensicJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#111827] border border-[#1f2937] hover:bg-[#1f2937] text-[#94a3b8] hover:text-[#f8fafc] text-xs font-medium transition"
            title="Download forensic JSON payload"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-[#38bdf8]" />
            Export IOC Payload
          </button>

          {/* Quarantine / Block */}
          {message.status !== 'quarantined' && (
            <button
              onClick={() => onUpdateStatus(message.id, 'quarantined')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#111827] border border-rose-900/60 hover:bg-rose-950/40 text-rose-400 text-xs font-medium transition"
            >
              <Ban className="w-3.5 h-3.5" />
              Airgap Quarantine
            </button>
          )}

          {/* 1-Click Takedown Generator */}
          <button
            onClick={() => onOpenTakedown(message)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition active:scale-97"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Dispatch DMCA Notice
          </button>
        </div>
      </div>

      <div className="p-4 lg:p-6 space-y-6">
        {/* Executive Threat Score Banner */}
        <div className="pulumi-card p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-[6px] border ${
                analysis.severity === 'critical'
                  ? 'bg-rose-950/60 border-rose-900 text-rose-400'
                  : 'bg-[#030712] border-[#38bdf8]/40 text-[#38bdf8]'
              }`}>
                {analysis.severity === 'critical' ? (
                  <AlertOctagon className="w-6 h-6" />
                ) : (
                  <Fingerprint className="w-6 h-6" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#94a3b8]">
                    CLASSIFICATION
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#030712] text-[#f8fafc] border border-[#1f2937]">
                    {analysis.severity}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#f8fafc] mt-0.5 font-sans">
                  {analysis.summary}
                </h3>
              </div>
            </div>

            {/* Score Gauges */}
            <div className="flex items-center gap-4 shrink-0 font-mono">
              <div className="text-right">
                <div className="text-[10px] text-[#94a3b8] uppercase">Risk Score</div>
                <div className="text-2xl font-bold text-[#f8fafc] tnum">
                  {analysis.riskScore}<span className="text-xs text-[#94a3b8]">/100</span>
                </div>
              </div>

              <div className="text-right border-l border-[#1f2937] pl-4">
                <div className="text-[10px] text-[#94a3b8] uppercase">Impersonation</div>
                <div className="text-lg font-bold text-amber-400 tnum">
                  {analysis.impersonationScore}%
                </div>
              </div>

              <div className="text-right border-l border-[#1f2937] pl-4">
                <div className="text-[10px] text-[#94a3b8] uppercase">Fake Score</div>
                <div className="text-lg font-bold text-rose-400 tnum">
                  {analysis.fakeAccountProbability}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sender Profile Forensic Dossier */}
        <div className="terminal-window overflow-hidden">
          <div className="px-5 py-3 bg-[#111827] border-b border-[#1f2937] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#f8fafc] flex items-center gap-1.5 uppercase tracking-wider">
              <UserX className="w-3.5 h-3.5 text-[#38bdf8]" />
              Sender Profile Intelligence ({message.platform.toUpperCase()})
            </span>
            <span className="text-[11px] text-[#94a3b8]">
              ID: {sender.id}
            </span>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={sender.avatarUrl}
                  alt={sender.displayName}
                  className="w-11 h-11 rounded-[6px] object-cover border border-[#1f2937]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#f8fafc] font-sans">
                      {sender.displayName}
                    </span>
                    {sender.isFakeBadgeEmoji && (
                      <span className="text-[10px] bg-rose-950/60 text-rose-400 border border-rose-900 px-1.5 py-0.5 rounded font-medium">
                        Fake Badge Emoji
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#38bdf8]">
                    @{sender.username}
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div className="flex items-center gap-4 text-xs text-[#94a3b8] tnum">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#94a3b8]" />
                  <span><strong className="text-[#f8fafc]">{sender.followerCount}</strong> Followers</span>
                </div>
                <div className="flex items-center gap-1">
                  <span><strong className="text-[#f8fafc]">{sender.followingCount}</strong> Following</span>
                </div>
                {sender.accountCreatedAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#94a3b8]" />
                    <span>Created {new Date(sender.accountCreatedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {sender.bio && (
              <div className="p-3 rounded-[6px] bg-[#030712] border border-[#1f2937] text-xs text-[#94a3b8]">
                <span className="text-[#94a3b8]/70 mr-2">Bio:</span>
                &quot;{sender.bio}&quot;
              </div>
            )}
          </div>
        </div>

        {/* Message Content & Inspection */}
        <div className="terminal-window overflow-hidden">
          <div className="px-5 py-3 bg-[#111827] border-b border-[#1f2937] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#f8fafc] flex items-center gap-1.5 uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-[#38bdf8]" />
              Inbound Direct Message Payload
            </span>
            <span className="text-[11px] text-[#94a3b8] tnum">
              {new Date(message.timestamp).toLocaleString()}
            </span>
          </div>

          <div className="p-5">
            <div className="p-4 rounded-[6px] bg-[#030712] border border-[#1f2937] text-xs text-[#f8fafc] leading-relaxed whitespace-pre-wrap select-all">
              {message.content}
            </div>
          </div>
        </div>

        {/* Extracted Artifacts / IOCs (APKs, URLs, Domains, Wallets) */}
        {analysis.extractedArtifacts.length > 0 && (
          <div className="terminal-window overflow-hidden">
            <div className="px-5 py-3 bg-[#111827] border-b border-[#1f2937] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#f8fafc] flex items-center gap-1.5 uppercase tracking-wider">
                <FileWarning className="w-3.5 h-3.5 text-rose-400" />
                Extracted Threat Artifacts (IOCs)
              </span>
              <span className="text-[11px] text-[#94a3b8] tnum">
                {analysis.extractedArtifacts.length} Captured
              </span>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.extractedArtifacts.map((art, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-[6px] border flex flex-col justify-between gap-2 ${
                    art.isMalicious
                      ? 'bg-rose-950/20 border-rose-900/80 text-rose-300'
                      : 'bg-[#030712] border-[#1f2937] text-[#94a3b8]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-[#111827] border border-[#1f2937] font-semibold text-[#f8fafc]">
                      {art.type}
                    </span>
                    {art.isMalicious && (
                      <span className="text-[10px] text-rose-400 font-bold uppercase">
                        MALICIOUS
                      </span>
                    )}
                  </div>

                  <div className="text-xs break-all text-[#f8fafc] font-bold">
                    {art.value}
                  </div>

                  {art.notes && (
                    <div className="text-[11px] text-[#94a3b8] font-sans">
                      {art.notes}
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#1f2937] flex items-center justify-end">
                    <button
                      onClick={() => copyToClipboard(art.value, `art-${idx}`)}
                      className="text-xs text-[#94a3b8] hover:text-[#f8fafc] flex items-center gap-1"
                    >
                      {copiedArtifact === `art-${idx}` ? (
                        <>
                          <Check className="w-3 h-3 text-[#38bdf8]" />
                          <span className="text-[#38bdf8]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Forensic Diagnostic Indicators */}
        <div className="terminal-window overflow-hidden">
          <div className="px-5 py-3 bg-[#111827] border-b border-[#1f2937]">
            <span className="text-xs font-semibold text-[#f8fafc] flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-[#38bdf8]" />
              Forensic Risk Signals & Trigger Heuristics
            </span>
          </div>

          <div className="p-5 space-y-3">
            {analysis.indicators.map((ind, i) => (
              <div
                key={i}
                className="p-3.5 rounded-[6px] bg-[#030712] border border-[#1f2937] space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#f8fafc]">
                    {ind.title}
                  </span>
                  <span className={`text-[10px] uppercase px-2 py-0.5 rounded border ${
                    ind.severity === 'critical'
                      ? 'bg-rose-950/60 text-rose-400 border-rose-900 font-semibold'
                      : ind.severity === 'high'
                      ? 'bg-amber-950/60 text-amber-400 border-amber-900 font-semibold'
                      : 'bg-[#111827] text-[#94a3b8] border-[#1f2937]'
                  }`}>
                    {ind.severity}
                  </span>
                </div>
                <p className="text-xs text-[#94a3b8] leading-relaxed font-sans">
                  {ind.description}
                </p>
                <div className="p-2 rounded bg-[#111827] border border-[#1f2937] text-[11px] text-[#f8fafc]">
                  <strong className="text-[#94a3b8] mr-2">Evidence:</strong>
                  {ind.evidence}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Incident Response Actions */}
        <div className="terminal-window p-5 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5">
            <ArrowRight className="w-4 h-4" />
            Recommended SOC Playbook Actions
          </h4>
          <ul className="space-y-2">
            {analysis.recommendedActions.map((act, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs text-[#94a3b8]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-1.5 shrink-0" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
