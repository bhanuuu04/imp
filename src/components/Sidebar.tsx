'use client';

import React from 'react';
import { 
  Home, 
  Bell, 
  CheckCircle2, 
  Grid, 
  Compass, 
  Share2, 
  Globe, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Users, 
  Settings, 
  Terminal,
  Code2,
  Lock,
  ChevronRight
} from 'lucide-react';

export type MainNavTab = 
  | 'overview'
  | 'threats'
  | 'impersonation'
  | 'fake_apps'
  | 'scam_links'
  | 'social_monitoring'
  | 'domains'
  | 'takedowns'
  | 'reports'
  | 'brand_assets'
  | 'team'
  | 'settings';

interface SidebarProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  threatsCount?: number;
}

export function Sidebar({
  activeTab,
  onSelectTab,
  threatsCount = 12
}: SidebarProps) {
  const menuItems = [
    { id: 'overview' as MainNavTab, label: 'Overview', icon: Home },
    { id: 'threats' as MainNavTab, label: 'Active Threats', icon: Bell, badge: `${threatsCount}` },
    { id: 'impersonation' as MainNavTab, label: 'Impersonation', icon: CheckCircle2 },
    { id: 'fake_apps' as MainNavTab, label: 'Rogue APK Radar', icon: Grid },
    { id: 'scam_links' as MainNavTab, label: 'Scam Links', icon: Compass },
    { id: 'social_monitoring' as MainNavTab, label: 'DM Stream', icon: Share2 },
    { id: 'domains' as MainNavTab, label: 'Domains & DNS', icon: Globe },
    { id: 'takedowns' as MainNavTab, label: 'Takedowns & DMCA', icon: ShieldCheck },
    { id: 'reports' as MainNavTab, label: 'SOC Reports', icon: FileText },
    { id: 'brand_assets' as MainNavTab, label: 'Brand Registry', icon: Layers },
    { id: 'team' as MainNavTab, label: 'Team & RBAC', icon: Users },
    { id: 'settings' as MainNavTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-60 border-r border-[#1f2937] bg-[#030712] flex flex-col justify-between shrink-0 h-full overflow-y-auto select-none font-mono">
      <div className="p-4 space-y-6">
        {/* Monospace Minimalist Hub Logo (Theme #132 DNA) */}
        <div className="px-2 py-1 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[6px] bg-[#111827] border border-[#1f2937] flex items-center justify-center text-[#38bdf8]">
            <Terminal className="w-4 h-4" strokeWidth={1.75} />
          </div>
          <div>
            <div className="text-sm font-bold text-[#f8fafc] tracking-tight leading-none flex items-center gap-1.5">
              <span>ASTRA</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 font-normal">v3.2</span>
            </div>
            <div className="text-[10px] text-[#94a3b8] font-normal tracking-wide mt-1">
              SecOps Platform
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-xs transition duration-150 group ${
                  isActive
                    ? 'bg-[#111827] text-[#38bdf8] font-semibold border border-[#1f2937]'
                    : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#111827]/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon 
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#38bdf8]' : 'text-[#94a3b8] group-hover:text-[#f8fafc]'
                    }`} 
                    strokeWidth={1.5}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border tnum ${
                    isActive
                      ? 'bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]/40'
                      : 'bg-[#111827] text-[#94a3b8] border-[#1f2937]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Terminal CLI Snippet Status Card */}
      <div className="p-4 border-t border-[#1f2937] bg-[#030712]">
        <div className="p-3 rounded-[6px] bg-[#111827] border border-[#1f2937] text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#94a3b8]">
            <span className="flex items-center gap-1.5 text-[#f8fafc]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              astra-cli
            </span>
            <span className="text-[10px] text-[#38bdf8]">armed</span>
          </div>

          <div className="p-2 rounded bg-[#030712] border border-[#1f2937] text-[10px] text-[#94a3b8] font-mono select-all">
            $ astra intercept --live
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#94a3b8] pt-1">
            <span>248 handles live</span>
            <span className="text-[#38bdf8] hover:underline cursor-pointer flex items-center">
              docs <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
