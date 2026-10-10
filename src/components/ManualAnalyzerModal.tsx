'use client';

import React, { useState } from 'react';
import { 
  SocialPlatform, 
  SenderProfile, 
  ThreatAnalysis, 
  BrandAssetRegistry 
} from '@/types/threat';
import { 
  X, 
  Terminal, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

interface ManualAnalyzerModalProps {
  brand: BrandAssetRegistry;
  onClose: () => void;
  onIngestAsNewMessage?: (message: any) => void;
}

export function ManualAnalyzerModal({
  brand,
  onClose,
  onIngestAsNewMessage
}: ManualAnalyzerModalProps) {
  const [platform, setPlatform] = useState<SocialPlatform>('instagram');
  const [username, setUsername] = useState('astra_official_helpdesk');
  const [displayName, setDisplayName] = useState('Astra Technical Support ✓');
  const [followers, setFollowers] = useState(18);
  const [following, setFollowing] = useState(940);
  const [content, setContent] = useState(
    'URGENT: Your account requires immediate security patch confirmation. Download the emergency Astra Mobile Security update: https://astra-mobile-patch.xyz/AstraSecurity_v2.apk to avoid permanent termination within 12 hours.'
  );

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ThreatAnalysis | null>(null);

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const senderProfile: SenderProfile = {
      id: `manual-${Date.now()}`,
      platform,
      username: username.replace('@', ''),
      displayName,
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      followerCount: Number(followers) || 0,
      followingCount: Number(following) || 0,
      isVerifiedBadge: false,
      isFakeBadgeEmoji: displayName.includes('✓') || displayName.includes('☑️'),
      accountCreatedAt: new Date(Date.now() - 1000 * 3600 * 24 * 4).toISOString()
    };

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          sender: senderProfile,
          brand
        })
      });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  const handleIngestToFeed = () => {
    if (!analysis) return;
    if (onIngestAsNewMessage) {
      onIngestAsNewMessage({
        id: `manual-inbound-${Date.now()}`,
        platform,
        brandAccountId: brand.id,
        sender: {
          id: `manual-usr-${Date.now()}`,
          platform,
          username: username.replace('@', ''),
          displayName,
          avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          followerCount: Number(followers),
          followingCount: Number(following),
          isVerifiedBadge: false,
          isFakeBadgeEmoji: displayName.includes('✓')
        },
        content,
        timestamp: new Date().toISOString(),
        analysis,
        status: analysis.severity === 'critical' ? 'quarantined' : 'new'
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-sky-50 border border-sky-200 text-sky-700">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Threat Diagnostic Sandbox
              </h2>
              <p className="text-xs text-slate-500">
                Evaluate candidate messages and handles against Astra&apos;s real-time risk scoring engine.
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
          <form onSubmit={handleRunAnalysis} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-700 font-medium">Platform Channel</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as SocialPlatform)}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-sky-600"
                >
                  <option value="instagram">Instagram</option>
                  <option value="x_twitter">X (Twitter)</option>
                  <option value="telegram">Telegram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="discord">Discord</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-medium">Sender Username (@)</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. astra_support"
                  className="w-full mt-1 bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
                />
              </div>

              <div>
                <label className="text-slate-700 font-medium">Display Name</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Astra Support ✓"
                  className="w-full mt-1 bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-sky-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-700 font-medium">Followers Count</label>
                <input
                  type="number"
                  value={followers}
                  onChange={(e) => setFollowers(Number(e.target.value))}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
                />
              </div>
              <div>
                <label className="text-slate-700 font-medium">Following Count</label>
                <input
                  type="number"
                  value={following}
                  onChange={(e) => setFollowing(Number(e.target.value))}
                  className="w-full mt-1 bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 font-medium">Inbound Message Body</label>
              <textarea
                required
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste suspect message text..."
                className="w-full mt-1 bg-white border border-slate-200 rounded-md p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium mercury-transition flex items-center justify-center gap-2 mercury-btn-press"
            >
              {loading ? (
                <span>Executing Diagnostics...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Execute Threat Diagnostics</span>
                </>
              )}
            </button>
          </form>

          {/* Analysis Results View */}
          {analysis && (
            <div className="p-4 rounded-md bg-slate-50 border border-slate-200 space-y-3 font-mono">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase border tnum ${
                    analysis.severity === 'critical'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : analysis.severity === 'high'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {analysis.severity}
                  </span>
                  <span className="text-xs font-bold text-slate-900 tnum">
                    Score: {analysis.riskScore}/100
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs tnum">
                  <span className="text-slate-600">Impersonation: <strong className="text-amber-800">{analysis.impersonationScore}%</strong></span>
                  <span className="text-slate-600">Fake Probability: <strong className="text-rose-600">{analysis.fakeAccountProbability}%</strong></span>
                </div>
              </div>

              <div className="text-xs text-slate-700 font-sans">
                {analysis.summary}
              </div>

              {/* Matched Indicators */}
              <div className="space-y-2">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Signals Triggered:</div>
                {analysis.indicators.map((ind, i) => (
                  <div key={i} className="p-2.5 rounded bg-white border border-slate-200 text-xs space-y-0.5">
                    <div className="text-sky-700 font-semibold">{ind.title}</div>
                    <div className="text-slate-500 text-[11px] font-sans">{ind.description}</div>
                  </div>
                ))}
              </div>

              {/* Ingest to main feed button */}
              {onIngestAsNewMessage && (
                <div className="pt-2 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={handleIngestToFeed}
                    className="px-3.5 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium flex items-center gap-1.5 mercury-transition mercury-btn-press"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Push to Active Inbox
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
