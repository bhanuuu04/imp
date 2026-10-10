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
  Save 
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
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
          <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase font-mono">
            System Preferences
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
          Platform Security Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Tune algorithmic quarantine sensitivity, incident dispatch webhooks, and brand cryptographic assertions.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        {/* Automated Quarantine Threshold */}
        <div className="mercury-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-600" />
            Automated Quarantine & Interception Sensitivity
          </h2>
          <p className="text-xs text-slate-500">
            Messages that receive a threat score exceeding this value will be automatically airgapped from reaching customer support agents.
          </p>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-600">Threshold Trigger:</span>
              <span className="font-bold text-sky-600 tnum">{quarantineThreshold}/100</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={quarantineThreshold}
              onChange={(e) => setQuarantineThreshold(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Notifications & Dispatch */}
        <div className="mercury-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-sky-600" />
            Incident Pager & Webhook Dispatch
          </h2>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-medium text-slate-500 mb-1 block">Slack / Discord Webhook URL</label>
              <input
                type="text"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={alertCriticalOnly}
                onChange={(e) => setAlertCriticalOnly(e.target.checked)}
                className="rounded accent-sky-600"
              />
              Alert on Critical severity events only (Risk Score &gt; 90)
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium mercury-transition flex items-center gap-1.5 mercury-btn-press"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Settings Saved' : 'Save Platform Configuration'}
        </button>
      </form>
    </div>
  );
}
