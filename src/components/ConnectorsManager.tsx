'use client';

import React, { useState } from 'react';
import { ConnectorCredential, SocialPlatform } from '@/types/threat';
import { 
  Link2, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Copy, 
  Check, 
  ExternalLink, 
  Send, 
  Eye, 
  EyeOff, 
  Radio, 
  Sparkles,
  Terminal,
  Code2
} from 'lucide-react';

interface ConnectorsManagerProps {
  connectors: ConnectorCredential[];
  onUpdateConnector: (platform: SocialPlatform, credentials: any, enabled: boolean) => void;
  onInjectTestMessage: (platform: SocialPlatform, customContent?: string, customUsername?: string) => void;
}

export function ConnectorsManager({
  connectors,
  onUpdateConnector,
  onInjectTestMessage
}: ConnectorsManagerProps) {
  const [activePlatform, setActivePlatform] = useState<SocialPlatform>('x_twitter');
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [testingStatus, setTestingStatus] = useState<{ loading: boolean; message?: string; success?: boolean } | null>(null);

  const currentConnector = connectors.find(c => c.platform === activePlatform) || connectors[0];
  const [formCredentials, setFormCredentials] = useState<any>(currentConnector.credentials || {});

  React.useEffect(() => {
    const conn = connectors.find(c => c.platform === activePlatform);
    if (conn) {
      setFormCredentials(conn.credentials || {});
      setTestingStatus(null);
    }
  }, [activePlatform, connectors]);

  const toggleShowSecret = (field: string) => {
    setShowSecrets(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const copyWebhookUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleTestConnection = async () => {
    setTestingStatus({ loading: true });
    try {
      const res = await fetch('/api/connectors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'test_connection',
          platform: activePlatform,
          credentials: formCredentials
        })
      });
      const data = await res.json();
      setTestingStatus({
        loading: false,
        success: data.success,
        message: `${data.message} (${data.latencyMs}ms)`
      });
    } catch (err: any) {
      setTestingStatus({
        loading: false,
        success: false,
        message: err.message || 'Connection test failed'
      });
    }
  };

  const handleSaveCredentials = () => {
    onUpdateConnector(activePlatform, formCredentials, true);
    setTestingStatus({
      loading: false,
      success: true,
      message: 'Credentials securely stored in Astra Key Vault.'
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#030712] p-6 lg:p-8 space-y-6 font-mono">
      {/* Header */}
      <div className="pb-3 border-b border-[#1f2937]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          <span className="text-[11px] font-semibold text-[#38bdf8] tracking-wider uppercase">
            Inbound Webhook Infrastructure
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#f8fafc]">
          Social Connectors & Webhook Endpoints
        </h1>
        <p className="text-xs text-[#94a3b8] mt-1 font-sans max-w-3xl">
          Connect your brand&apos;s verified handles and configure real-time webhook listeners. Astra intercepts inbound direct messages, mentions, and shared payloads in under 15ms.
        </p>
      </div>

      {/* Platform Tabs - Theme #132 Pulumi */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {connectors.map((conn) => {
          const isSelected = conn.platform === activePlatform;
          return (
            <button
              key={conn.platform}
              onClick={() => setActivePlatform(conn.platform)}
              className={`p-3.5 rounded-[6px] border text-left transition flex flex-col justify-between h-24 ${
                isSelected
                  ? 'bg-[#111827] border-[#38bdf8] ring-1 ring-[#38bdf8]/40'
                  : 'bg-[#111827]/70 border-[#1f2937] hover:border-[#374151]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-semibold text-[#f8fafc] uppercase">
                  {conn.platform.replace('_', ' ')}
                </span>
                <span className={`w-2 h-2 rounded-full ${
                  conn.status === 'connected' ? 'bg-[#38bdf8]' : 'bg-[#1f2937]'
                }`} />
              </div>

              <div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                  conn.status === 'connected'
                    ? 'bg-[#38bdf8]/15 text-[#38bdf8] border-[#38bdf8]/30 font-semibold'
                    : 'bg-[#030712] text-[#94a3b8] border-[#1f2937]'
                }`}>
                  {conn.status.toUpperCase()}
                </span>
                <div className="text-[10px] text-[#94a3b8] mt-1 truncate tnum">
                  {conn.metrics.threatsDetected} threats flagged
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Configuration Terminal Window */}
      <div className="terminal-window overflow-hidden">
        {/* Terminal Header */}
        <div className="p-4 bg-[#111827] border-b border-[#1f2937] flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#f8fafc]">
                {currentConnector.name}
              </h2>
              <span className={`text-xs px-2 py-0.5 rounded border ${
                currentConnector.status === 'connected'
                  ? 'bg-[#38bdf8]/15 text-[#38bdf8] border-[#38bdf8]/30 font-medium'
                  : 'bg-[#030712] text-[#94a3b8] border-[#1f2937]'
              }`}>
                {currentConnector.status === 'connected' ? 'LIVE & MONITORING' : 'NOT CONFIGURED'}
              </span>
            </div>
            <p className="text-xs text-[#94a3b8] mt-0.5 font-sans">
              Auth Mode: <strong className="text-[#38bdf8] font-mono uppercase">{currentConnector.authType}</strong> | Last Synced: {currentConnector.lastSyncedAt ? new Date(currentConnector.lastSyncedAt).toLocaleString() : 'Never'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestConnection}
              disabled={testingStatus?.loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#030712] hover:bg-[#111827] text-[#94a3b8] hover:text-[#f8fafc] text-xs font-medium transition border border-[#1f2937]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingStatus?.loading ? 'animate-spin text-[#38bdf8]' : ''}`} />
              Test API Ping
            </button>

            <button
              onClick={handleSaveCredentials}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition active:scale-97"
            >
              Save Credentials
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {testingStatus && (
          <div className={`p-3 border-b text-xs flex items-center gap-2 ${
            testingStatus.success
              ? 'bg-emerald-950/40 border-emerald-900 text-emerald-400'
              : 'bg-rose-950/40 border-rose-900 text-rose-400'
          }`}>
            {testingStatus.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
            <span>{testingStatus.message}</span>
          </div>
        )}

        <div className="p-6 space-y-6">
          {/* Credentials Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activePlatform === 'x_twitter' && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#94a3b8] flex items-center justify-between">
                    <span>OAuth 2.0 Client ID</span>
                    <span className="text-[10px] text-[#94a3b8]/60">Twitter Developer Portal</span>
                  </label>
                  <input
                    type="text"
                    value={formCredentials.clientId || ''}
                    onChange={(e) => setFormCredentials({ ...formCredentials, clientId: e.target.value })}
                    placeholder="e.g. ASTRA_X_CLIENT_ID_PROD"
                    className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#94a3b8] flex items-center justify-between">
                    <span>Client Secret / Consumer Secret</span>
                    <button
                      type="button"
                      onClick={() => toggleShowSecret('clientSecret')}
                      className="text-[10px] text-[#38bdf8] flex items-center gap-1 hover:underline"
                    >
                      {showSecrets['clientSecret'] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {showSecrets['clientSecret'] ? 'Hide' : 'Show'}
                    </button>
                  </label>
                  <input
                    type={showSecrets['clientSecret'] ? 'text' : 'password'}
                    value={formCredentials.clientSecret || ''}
                    onChange={(e) => setFormCredentials({ ...formCredentials, clientSecret: e.target.value })}
                    placeholder="Enter Secret Key"
                    className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-[#94a3b8]">
                    Bearer Token / User Access Token (Read DMs & Mentions)
                  </label>
                  <input
                    type={showSecrets['accessToken'] ? 'text' : 'password'}
                    value={formCredentials.accessToken || ''}
                    onChange={(e) => setFormCredentials({ ...formCredentials, accessToken: e.target.value })}
                    placeholder="AAAAAAAAAAAAAAAAAAAA..."
                    className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </>
            )}

            {activePlatform === 'instagram' && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#94a3b8]">
                    Meta Page ID / Instagram Professional Account ID
                  </label>
                  <input
                    type="text"
                    value={formCredentials.pageId || ''}
                    onChange={(e) => setFormCredentials({ ...formCredentials, pageId: e.target.value })}
                    placeholder="e.g. 109845729184712"
                    className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#94a3b8]">
                    Meta Webhook Verify Token
                  </label>
                  <input
                    type="text"
                    value={formCredentials.webhookSecret || 'astra_secure_webhook_token'}
                    onChange={(e) => setFormCredentials({ ...formCredentials, webhookSecret: e.target.value })}
                    className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-[#94a3b8]">
                    Page Access Token (Requires `instagram_manage_messages` scope)
                  </label>
                  <input
                    type="password"
                    value={formCredentials.accessToken || ''}
                    onChange={(e) => setFormCredentials({ ...formCredentials, accessToken: e.target.value })}
                    placeholder="EAABwzL9..."
                    className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </>
            )}

            {activePlatform === 'telegram' && (
              <>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-[#94a3b8] flex items-center justify-between">
                    <span>Telegram Bot API Token (@BotFather)</span>
                    <a
                      href="https://t.me/BotFather"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-[#38bdf8] flex items-center gap-1 hover:underline"
                    >
                      Open BotFather <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </label>
                  <input
                    type="text"
                    value={formCredentials.botToken || ''}
                    onChange={(e) => setFormCredentials({ ...formCredentials, botToken: e.target.value })}
                    placeholder="e.g. 682940172:AAFZ_sample_token..."
                    className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </>
            )}

            {activePlatform === 'linkedin' && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#94a3b8]">
                    LinkedIn Organization URN
                  </label>
                  <input
                    type="text"
                    value={formCredentials.pageId || 'urn:li:organization:9847291'}
                    onChange={(e) => setFormCredentials({ ...formCredentials, pageId: e.target.value })}
                    placeholder="urn:li:organization:..."
                    className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#94a3b8]">
                    OAuth 2.0 Client ID
                  </label>
                  <input
                    type="text"
                    value={formCredentials.clientId || ''}
                    onChange={(e) => setFormCredentials({ ...formCredentials, clientId: e.target.value })}
                    placeholder="Enter Client ID"
                    className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Ingest Webhook Endpoint Box */}
          <div className="p-4 rounded-[6px] bg-[#030712] border border-[#1f2937] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#f8fafc] flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#38bdf8]" />
                Live Ingestion Webhook URL
              </span>
              <span className="text-[10px] text-[#94a3b8]">
                POST / GET Handshake
              </span>
            </div>

            <p className="text-xs text-[#94a3b8] font-sans">
              Provide this endpoint to your {activePlatform.replace('_', ' ')} developer console to route live inbound messages into Astra:
            </p>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#38bdf8] select-all overflow-x-auto">
                {typeof window !== 'undefined' ? `${window.location.origin}/api/webhooks/${activePlatform}` : `https://your-domain.com/api/webhooks/${activePlatform}`}
              </div>
              <button
                onClick={() => {
                  const url = typeof window !== 'undefined' ? `${window.location.origin}/api/webhooks/${activePlatform}` : `https://your-domain.com/api/webhooks/${activePlatform}`;
                  copyWebhookUrl(url, 'webhook-url');
                }}
                className="px-3 py-1.5 rounded-[6px] bg-[#111827] hover:bg-[#1f2937] text-[#94a3b8] hover:text-[#f8fafc] text-xs font-medium flex items-center gap-1.5 transition shrink-0 border border-[#1f2937]"
              >
                {copiedUrl === 'webhook-url' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span className="text-[#38bdf8]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Test Live Webhook Payload Injector */}
          <div className="p-5 rounded-[6px] bg-[#111827] border border-[#1f2937] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#f8fafc] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                Interactive API Parameter & Payload Injector
              </span>
              <span className="text-[10px] text-[#38bdf8]">
                Real-time Handshake Test
              </span>
            </div>

            <p className="text-xs text-[#94a3b8] font-sans">
              Inject a simulated live threat event into Astra&apos;s real threat engine to verify that homoglyphs, rogue APKs, and phishing payloads are airgapped in real time:
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onInjectTestMessage(
                  activePlatform,
                  'URGENT: Your brand account is being suspended for violating Meta Trademark standards. Download the official Astra Security mobile compliance update immediately: https://astra-support-patch.xyz/files/AstraProtect_v3.4.apk or confirm your master seed phrase.',
                  'astra_security_compliance_team'
                )}
                className="px-3.5 py-1.5 rounded-[6px] bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5 active:scale-97"
              >
                <Send className="w-3 h-3" />
                Inject Rogue APK Threat DM
              </button>

              <button
                onClick={() => onInjectTestMessage(
                  activePlatform,
                  'Hello support team, we noticed our enterprise license is up for renewal next week. Can you send the updated invoice to billing@enterprise-cloud.io?',
                  'legitimate_enterprise_client'
                )}
                className="px-3.5 py-1.5 rounded-[6px] bg-[#030712] hover:bg-[#111827] text-[#94a3b8] hover:text-[#f8fafc] text-xs font-medium transition flex items-center gap-1.5 border border-[#1f2937]"
              >
                <Send className="w-3 h-3" />
                Inject Clean Inbound Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
