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
  CheckCircle2,
  Code2
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/80 backdrop-blur-xs animate-fade-in font-mono">
      <div className="w-full max-w-3xl bg-[#030712] border border-[#1f2937] rounded-[8px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-[#111827] border-b border-[#1f2937] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-[4px] bg-[#030712] border border-[#1f2937] text-[#38bdf8]">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#f8fafc]">
                Astra Forensic CLI Diagnostic Sandbox
              </h2>
              <p className="text-xs text-[#94a3b8] font-sans">
                Evaluate candidate payloads and handles against Astra&apos;s real-time risk scoring engine.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#030712] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          <form onSubmit={handleRunAnalysis} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[#94a3b8] font-medium">Platform Channel</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as SocialPlatform)}
                  className="w-full mt-1 bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                >
                  <option value="instagram">Instagram</option>
                  <option value="x_twitter">X (Twitter)</option>
                  <option value="telegram">Telegram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="discord">Discord</option>
                </select>
              </div>

              <div>
                <label className="text-[#94a3b8] font-medium">Sender Username (@)</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. astra_support"
                  className="w-full mt-1 bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] font-medium">Display Name</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Astra Support ✓"
                  className="w-full mt-1 bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#94a3b8] font-medium">Followers Count</label>
                <input
                  type="number"
                  value={followers}
                  onChange={(e) => setFollowers(Number(e.target.value))}
                  className="w-full mt-1 bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                />
              </div>
              <div>
                <label className="text-[#94a3b8] font-medium">Following Count</label>
                <input
                  type="number"
                  value={following}
                  onChange={(e) => setFollowing(Number(e.target.value))}
                  className="w-full mt-1 bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                />
              </div>
            </div>

            <div>
              <label className="text-[#94a3b8] font-medium">Inbound Message Body</label>
              <textarea
                required
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste suspect message text..."
                className="w-full mt-1 bg-[#111827] border border-[#1f2937] rounded-[6px] p-2.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8] leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition flex items-center justify-center gap-2 active:scale-97"
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
            <div className="p-4 rounded-[6px] bg-[#111827] border border-[#1f2937] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f2937] pb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase border tnum ${
                    analysis.severity === 'critical'
                      ? 'bg-rose-950/60 text-rose-400 border-rose-900'
                      : analysis.severity === 'high'
                      ? 'bg-amber-950/60 text-amber-400 border-amber-900'
                      : 'bg-emerald-950/60 text-emerald-400 border-emerald-900'
                  }`}>
                    {analysis.severity}
                  </span>
                  <span className="text-xs font-bold text-[#f8fafc] tnum">
                    Score: {analysis.riskScore}/100
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs tnum">
                  <span className="text-[#94a3b8]">Impersonation: <strong className="text-amber-400">{analysis.impersonationScore}%</strong></span>
                  <span className="text-[#94a3b8]">Fake Probability: <strong className="text-rose-400">{analysis.fakeAccountProbability}%</strong></span>
                </div>
              </div>

              <div className="text-xs text-[#f8fafc] font-sans">
                {analysis.summary}
              </div>

              {/* Matched Indicators */}
              <div className="space-y-2">
                <div className="text-[10px] text-[#94a3b8] uppercase font-semibold">Signals Triggered:</div>
                {analysis.indicators.map((ind, i) => (
                  <div key={i} className="p-2.5 rounded bg-[#030712] border border-[#1f2937] text-xs space-y-0.5">
                    <div className="text-[#38bdf8] font-semibold">{ind.title}</div>
                    <div className="text-[#94a3b8] text-[11px] font-sans">{ind.description}</div>
                  </div>
                ))}
              </div>

              {/* Ingest to main feed button */}
              {onIngestAsNewMessage && (
                <div className="pt-2 border-t border-[#1f2937] flex justify-end">
                  <button
                    onClick={handleIngestToFeed}
                    className="px-3.5 py-1.5 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold flex items-center gap-1.5 transition active:scale-97"
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
