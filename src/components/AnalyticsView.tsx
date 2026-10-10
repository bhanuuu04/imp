'use client';

import React, { useState } from 'react';
import { SocialMessage, RogueAppListing, ConnectorCredential } from '@/types/threat';
import { 
  BarChart3, 
  ShieldAlert, 
  Smartphone, 
  UserX, 
  Activity, 
  TrendingUp, 
  Zap, 
  Globe,
  Terminal,
  Code2
} from 'lucide-react';

interface AnalyticsViewProps {
  messages: SocialMessage[];
  rogueApps: RogueAppListing[];
  connectors: ConnectorCredential[];
}

export function AnalyticsView({
  messages,
  rogueApps,
  connectors
}: AnalyticsViewProps) {
  const criticalThreats = messages.filter(m => m.analysis.severity === 'critical');
  const impersonators = messages.filter(m => m.analysis.impersonationScore >= 50);
  const phishingLinks = messages.filter(m => m.analysis.maliciousPayloadDetected);
  const rogueAppDms = messages.filter(m => m.analysis.fakeMobileAppDetected);

  const totalIngested = connectors.reduce((acc, c) => acc + c.metrics.messagesIngested, 0) + messages.length;

  return (
    <div className="flex-1 overflow-y-auto bg-[#030712] p-6 lg:p-8 space-y-6 font-mono">
      {/* Header */}
      <div className="pb-3 border-b border-[#1f2937]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          <span className="text-[11px] font-semibold text-[#38bdf8] tracking-wider uppercase">
            SecOps Telemetry & SOC Analytics
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#f8fafc]">
          Brand Attack Surface Telemetry
        </h1>
        <p className="text-xs text-[#94a3b8] mt-1 font-sans max-w-3xl">
          Aggregated risk indicators across all connected social channels, rogue APK distributions, and executive impersonation vectors.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="pulumi-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94a3b8] uppercase font-semibold">Total Scanned</span>
            <Activity className="w-4 h-4 text-[#38bdf8]" />
          </div>
          <div className="text-2xl font-black text-[#f8fafc] tnum">
            {totalIngested.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-bold tnum">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>100% Ingestion Rate</span>
          </div>
        </div>

        <div className="pulumi-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94a3b8] uppercase font-semibold">Critical Threat Intercepts</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400 tnum">
            {criticalThreats.length}
          </div>
          <div className="text-[11px] text-[#94a3b8]">Airgapped from team inboxes</div>
        </div>

        <div className="pulumi-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94a3b8] uppercase font-semibold">Impersonators Flagged</span>
            <UserX className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 tnum">
            {impersonators.length}
          </div>
          <div className="text-[11px] text-[#94a3b8]">Phonetic homoglyph match &gt; 50%</div>
        </div>

        <div className="pulumi-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94a3b8] uppercase font-semibold">Rogue APK Mirrors</span>
            <Smartphone className="w-4 h-4 text-[#38bdf8]" />
          </div>
          <div className="text-2xl font-black text-[#38bdf8] tnum">
            {rogueApps.length + rogueAppDms.length}
          </div>
          <div className="text-[11px] text-[#94a3b8]">SHA256 signature verified</div>
        </div>
      </div>
    </div>
  );
}
