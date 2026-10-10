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
  DownloadCloud 
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
    <div className="flex flex-col h-full bg-[#f8fafc] overflow-y-auto">
      {/* Action Toolbar */}
      <div className="p-3.5 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500">Triage:</span>
          <select
            value={message.status}
            onChange={(e) => onUpdateStatus(message.id, e.target.value as SocialMessage['status'])}
            className="bg-white border border-slate-200 text-xs font-mono rounded-md px-2.5 py-1 text-slate-800 focus:outline-none focus:border-sky-600"
          >
            <option value="new">New (Needs Triage)</option>
            <option value="investigating">Investigating</option>
            <option value="quarantined">Quarantined (Airgapped)</option>
            <option value="takedown_requested">Takedown Dispatched</option>
            <option value="resolved">Resolved / Safe</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Export JSON */}
          <button
            onClick={exportForensicJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium mercury-transition"
            title="Download forensic JSON"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-sky-600" />
            Export IOC
          </button>

          {/* Quarantine / Block */}
          {message.status !== 'quarantined' && (
            <button
              onClick={() => onUpdateStatus(message.id, 'quarantined')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-medium mercury-transition"
            >
              <Ban className="w-3.5 h-3.5" />
              Airgap Quarantine
            </button>
          )}

          {/* 1-Click Takedown Generator */}
          <button
            onClick={() => onOpenTakedown(message)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium mercury-transition mercury-btn-press"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Generate Takedown Notice
          </button>
        </div>
      </div>

      <div className="p-4 lg:p-6 space-y-6">
        {/* Executive Threat Score Banner */}
        <div className="mercury-card p-5 bg-white border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-md border ${
                analysis.severity === 'critical'
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : 'bg-sky-50 border-sky-200 text-sky-700'
              }`}>
                {analysis.severity === 'critical' ? (
                  <AlertOctagon className="w-6 h-6" />
                ) : (
                  <Fingerprint className="w-6 h-6" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    Risk Classification
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-slate-100 text-slate-800 border border-slate-200">
                    {analysis.severity}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mt-0.5">
                  {analysis.summary}
                </h3>
              </div>
            </div>

            {/* Score Gauges */}
            <div className="flex items-center gap-4 shrink-0 font-mono">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase">Astra Risk Score</div>
                <div className="text-2xl font-bold text-slate-900 tnum">
                  {analysis.riskScore}<span className="text-xs text-slate-400 font-normal">/100</span>
                </div>
              </div>

              <div className="text-right border-l border-slate-200 pl-4">
                <div className="text-[10px] text-slate-400 uppercase">Impersonation</div>
                <div className="text-lg font-bold text-amber-700 tnum">
                  {analysis.impersonationScore}%
                </div>
              </div>

              <div className="text-right border-l border-slate-200 pl-4">
                <div className="text-[10px] text-slate-400 uppercase">Fake Probability</div>
                <div className="text-lg font-bold text-rose-600 tnum">
                  {analysis.fakeAccountProbability}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sender Profile Forensic Dossier */}
        <div className="mercury-card overflow-hidden">
          <div className="px-5 py-3 bg-slate-50/60 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <UserX className="w-3.5 h-3.5 text-sky-600" />
              Sender Profile Intelligence ({message.platform.toUpperCase()})
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              ID: {sender.id}
            </span>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={sender.avatarUrl}
                  alt={sender.displayName}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">
                      {sender.displayName}
                    </span>
                    {sender.isFakeBadgeEmoji && (
                      <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded font-mono font-medium">
                        Fake Badge Emoji
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    @{sender.username}
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 tnum">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span><strong className="text-slate-800">{sender.followerCount}</strong> Followers</span>
                </div>
                <div className="flex items-center gap-1">
                  <span><strong className="text-slate-800">{sender.followingCount}</strong> Following</span>
                </div>
                {sender.accountCreatedAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Created {new Date(sender.accountCreatedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {sender.bio && (
              <div className="p-3 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono">
                <span className="text-slate-400 mr-2 font-medium">Bio:</span>
                &quot;{sender.bio}&quot;
              </div>
            )}
          </div>
        </div>

        {/* Message Content & Inspection */}
        <div className="mercury-card overflow-hidden">
          <div className="px-5 py-3 bg-slate-50/60 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-sky-600" />
              Inbound Direct Message Payload
            </span>
            <span className="text-[11px] font-mono text-slate-400 tnum">
              {new Date(message.timestamp).toLocaleString()}
            </span>
          </div>

          <div className="p-5">
            <div className="p-4 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-mono whitespace-pre-wrap">
              {message.content}
            </div>
          </div>
        </div>

        {/* Extracted Artifacts / IOCs (APKs, URLs, Domains, Wallets) */}
        {analysis.extractedArtifacts.length > 0 && (
          <div className="mercury-card overflow-hidden">
            <div className="px-5 py-3 bg-slate-50/60 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <FileWarning className="w-3.5 h-3.5 text-rose-600" />
                Extracted Threat Artifacts (IOCs)
              </span>
              <span className="text-[11px] font-mono text-slate-400 tnum">
                {analysis.extractedArtifacts.length} Captured
              </span>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.extractedArtifacts.map((art, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-md border flex flex-col justify-between gap-2 ${
                    art.isMalicious
                      ? 'bg-rose-50/40 border-rose-200 text-rose-900'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white border border-slate-200 font-semibold text-slate-700">
                      {art.type}
                    </span>
                    {art.isMalicious && (
                      <span className="text-[10px] font-mono text-rose-700 font-semibold uppercase">
                        MALICIOUS
                      </span>
                    )}
                  </div>

                  <div className="font-mono text-xs break-all text-slate-900 font-medium">
                    {art.value}
                  </div>

                  {art.notes && (
                    <div className="text-[11px] text-slate-500">
                      {art.notes}
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-end">
                    <button
                      onClick={() => copyToClipboard(art.value, `art-${idx}`)}
                      className="text-xs font-mono text-slate-500 hover:text-slate-900 flex items-center gap-1"
                    >
                      {copiedArtifact === `art-${idx}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
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
        <div className="mercury-card overflow-hidden">
          <div className="px-5 py-3 bg-slate-50/60 border-b border-slate-200">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-sky-600" />
              Forensic Risk Signals & Trigger Heuristics
            </span>
          </div>

          <div className="p-5 space-y-3">
            {analysis.indicators.map((ind, i) => (
              <div
                key={i}
                className="p-3.5 rounded-md bg-slate-50 border border-slate-200 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-900">
                    {ind.title}
                  </span>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                    ind.severity === 'critical'
                      ? 'bg-rose-50 text-rose-700 border-rose-200 font-semibold'
                      : ind.severity === 'high'
                      ? 'bg-amber-50 text-amber-800 border-amber-200 font-semibold'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {ind.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {ind.description}
                </p>
                <div className="p-2 rounded bg-white border border-slate-200 font-mono text-[11px] text-slate-800">
                  <strong className="text-slate-400 mr-2">Evidence:</strong>
                  {ind.evidence}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Incident Response Actions */}
        <div className="mercury-card p-5 bg-white border-slate-200 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <ArrowRight className="w-4 h-4 text-sky-600" />
            Recommended SOC Playbook Actions
          </h4>
          <ul className="space-y-2">
            {analysis.recommendedActions.map((act, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs text-slate-600 font-mono"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
