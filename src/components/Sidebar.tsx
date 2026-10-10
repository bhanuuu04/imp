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
  ArrowRight,
  Shield,
  Lock
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
    { id: 'threats' as MainNavTab, label: 'Threats', icon: Bell, badge: `${threatsCount}` },
    { id: 'impersonation' as MainNavTab, label: 'Impersonation', icon: CheckCircle2 },
    { id: 'fake_apps' as MainNavTab, label: 'Fake Apps', icon: Grid },
    { id: 'scam_links' as MainNavTab, label: 'Scam Links', icon: Compass },
    { id: 'social_monitoring' as MainNavTab, label: 'Social Monitoring', icon: Share2 },
    { id: 'domains' as MainNavTab, label: 'Domains', icon: Globe },
    { id: 'takedowns' as MainNavTab, label: 'Takedowns', icon: ShieldCheck },
    { id: 'reports' as MainNavTab, label: 'Reports', icon: FileText },
    { id: 'brand_assets' as MainNavTab, label: 'Brand Assets', icon: Layers },
    { id: 'team' as MainNavTab, label: 'Team', icon: Users },
    { id: 'settings' as MainNavTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-60 border-r border-slate-200/90 bg-white flex flex-col justify-between shrink-0 h-full overflow-y-auto select-none">
      <div className="p-4 space-y-6">
        {/* Minimal Astra Brand Logo */}
        <div className="px-2 py-1 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0284c7] flex items-center justify-center text-white shadow-xs">
            <Shield className="w-4 h-4 fill-white/20 text-white" strokeWidth={2} />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900 tracking-tight leading-none">
              Astra
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mt-0.5">
              Brand Defense
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
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-[#e0f2fe]/60 text-[#0284c7] font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon 
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#0284c7]' : 'text-slate-400 group-hover:text-slate-600'
                    }`} 
                    strokeWidth={1.5}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded-full bg-red-50 text-red-600 border border-red-200/80 text-[10px] font-bold font-mono tnum">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Virtual Card / Enterprise Protection Module */}
      <div className="p-4">
        <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#0284c7]" strokeWidth={1.5} />
              Enterprise Tier
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              ACTIVE
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Automated platform takedowns & 24/7 darknet brand surveillance.
          </p>
          <button
            onClick={() => onSelectTab('settings')}
            className="w-full py-1.5 px-3 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition duration-150 active:scale-97 shadow-2xs"
          >
            <span>Manage Defense</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
