'use client';

import React from 'react';
import { 
  Home, 
  Bell, 
  CheckCircle, 
  Grid, 
  Compass, 
  Share2, 
  Globe, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Users, 
  Settings, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Smartphone,
  Link as LinkIcon
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
    { id: 'impersonation' as MainNavTab, label: 'Impersonation', icon: CheckCircle },
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
    <aside className="w-64 border-r border-slate-200/80 bg-white flex flex-col justify-between shrink-0 h-full overflow-y-auto select-none">
      <div className="p-4 space-y-6">
        {/* Logo Section */}
        <div className="px-2 py-1 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-xs">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L3 20H8.5L12 12.5L15.5 20H21L12 3Z" fill="white" />
            </svg>
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">
            Astra
          </span>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition group ${
                  isActive
                    ? 'bg-[#EEF2FF] text-[#4F46E5] font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition ${isActive ? 'text-[#4F46E5]' : 'text-slate-500 group-hover:text-slate-700'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Astra Pro Upgrade Card */}
      <div className="p-4">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-indigo-50/70 to-purple-50/50 border border-indigo-100/80 space-y-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-900">Astra Pro</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Unlock advanced monitoring and faster takedowns.
          </p>
          <button
            onClick={() => onSelectTab('settings')}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
          >
            <span>Upgrade</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
