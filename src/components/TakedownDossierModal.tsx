'use client';

import React, { useState, useEffect } from 'react';
import { SocialMessage, BrandAssetRegistry } from '@/types/threat';
import { 
  X, 
  ShieldAlert, 
  Copy, 
  Check, 
  ExternalLink, 
  CheckCircle2 
} from 'lucide-react';

interface TakedownDossierModalProps {
  message: SocialMessage | null;
  brand: BrandAssetRegistry;
  onClose: () => void;
  onConfirmTakedown: (messageId: string) => void;
}

export function TakedownDossierModal({
  message,
  brand,
  onClose,
  onConfirmTakedown
}: TakedownDossierModalProps) {
  const [loading, setLoading] = useState(true);
  const [dossier, setDossier] = useState<any>(null);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  useEffect(() => {
    if (!message) return;
    setLoading(true);

    const isRogueApp = message.analysis.fakeMobileAppDetected;
    fetch('/api/takedown', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        targetType: isRogueApp ? 'rogue_app' : 'platform_impersonation',
        brand
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setDossier(data.takedownDossier);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [message, brand]);

  if (!message) return null;

  const copyToClipboard = (text: string, type: 'subject' | 'body') => {
    navigator.clipboard.writeText(text);
    if (type === 'subject') {
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } else {
      setCopiedBody(true);
      setTimeout(() => setCopiedBody(false), 2000);
    }
  };

  const handleApplyAndFile = () => {
    onConfirmTakedown(message.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                DMCA & Impersonation Enforcement Notice
              </h2>
              <p className="text-xs text-slate-500">
                Target: @{message.sender.username} on {message.platform.toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {loading ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <p className="font-medium text-slate-700">Compiling Legal Rights Evidence & Formulating Notice...</p>
            </div>
          ) : dossier ? (
            <>
              {/* Destination Abuse Portal */}
              <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Filing Destination</div>
                  <div className="text-xs font-semibold text-slate-900 mt-0.5">
                    {dossier.destination?.policy || 'Platform Abuse Desk'}
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    Abuse Desk: <span className="font-mono text-slate-800 font-medium">{dossier.destination?.email}</span>
                  </div>
                </div>

                {dossier.destination?.portal && (
                  <a
                    href={dossier.destination.portal}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium transition"
                  >
                    Open Platform Desk <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Subject Line */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-slate-600 font-medium">
                  <span>Formal Notice Subject Line</span>
                  <button
                    onClick={() => copyToClipboard(dossier.subject, 'subject')}
                    className="text-sky-600 hover:underline flex items-center gap-1"
                  >
                    {copiedSubject ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedSubject ? 'Copied' : 'Copy Subject'}
                  </button>
                </div>
                <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 select-all font-sans font-medium">
                  {dossier.subject}
                </div>
              </div>

              {/* Notice Body */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-slate-600 font-medium">
                  <span>Structured Legal Notice & Proof</span>
                  <button
                    onClick={() => copyToClipboard(dossier.bodyText, 'body')}
                    className="text-sky-600 hover:underline flex items-center gap-1"
                  >
                    {copiedBody ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedBody ? 'Copied' : 'Copy Notice'}
                  </button>
                </div>
                <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200 text-slate-800 whitespace-pre-wrap select-all max-h-64 overflow-y-auto leading-relaxed font-mono text-[11px]">
                  {dossier.bodyText}
                </div>
              </div>
            </>
          ) : (
            <div className="text-rose-600 font-medium">Failed to generate takedown notice.</div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50/70 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleApplyAndFile}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium transition mercury-btn-press"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Mark Dispatched & Update Case
          </button>
        </div>
      </div>
    </div>
  );
}
