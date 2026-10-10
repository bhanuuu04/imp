'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  ShieldAlert, 
  Key, 
  Sparkles, 
  Check, 
  Sliders, 
  Save,
  Terminal,
  Code2
} from 'lucide-react';

export function SettingsPage() {
  const [quarantineThreshold, setQuarantineThreshold] = useState(80);
  const [slackWebhook, setSlackWebhook] = useState('https://hooks.slack.com/services/T00/B00/XXXX');
  const [alertCriticalOnly, setAlertCriticalOnly] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#030712] p-6 lg:p-8 space-y-6 font-mono">
      {/* Header */}
      <div className="pb-3 border-b border-[#1f2937]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          <span className="text-[11px] font-semibold text-[#38bdf8] tracking-wider uppercase">
            SecOps Daemon Configuration
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#f8fafc]">
          Platform Security Settings
        </h1>
        <p className="text-xs text-[#94a3b8] mt-1 font-sans">
          Tune algorithmic quarantine sensitivity, incident dispatch webhooks, and brand cryptographic assertions.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        {/* Automated Quarantine Threshold */}
        <div className="terminal-window p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#f8fafc] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#38bdf8]" />
            Automated Quarantine & Interception Sensitivity
          </h2>
          <p className="text-xs text-[#94a3b8] font-sans">
            Messages that receive a threat score exceeding this value will be automatically airgapped from reaching customer support agents.
          </p>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#94a3b8]">Threshold Trigger:</span>
              <span className="font-bold text-[#38bdf8] tnum">{quarantineThreshold}/100</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={quarantineThreshold}
              onChange={(e) => setQuarantineThreshold(Number(e.target.value))}
              className="w-full accent-[#38bdf8] cursor-pointer"
            />
          </div>
        </div>

        {/* Notifications & Dispatch */}
        <div className="terminal-window p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#f8fafc] flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#38bdf8]" />
            Incident Pager & Webhook Dispatch
          </h2>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-medium text-[#94a3b8] mb-1 block">Slack / Discord Webhook URL</label>
              <input
                type="text"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                className="w-full bg-[#111827] border border-[#1f2937] rounded-[6px] px-3 py-1.5 text-xs text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-[#94a3b8] cursor-pointer">
              <input
                type="checkbox"
                checked={alertCriticalOnly}
                onChange={(e) => setAlertCriticalOnly(e.target.checked)}
                className="rounded accent-[#38bdf8]"
              />
              Alert on Critical severity events only (Risk Score &gt; 90)
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition flex items-center gap-1.5 active:scale-97"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Settings Saved' : 'Save Configuration'}
        </button>
      </form>
    </div>
  );
}
