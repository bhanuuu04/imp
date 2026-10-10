'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  ChevronDown, 
  Bell, 
  ShieldCheck, 
  Terminal,
  Activity
} from 'lucide-react';
import { BrandAssetRegistry } from '@/types/threat';

interface NavbarProps {
  brand: BrandAssetRegistry;
  onOpenBrandRegistry: () => void;
  onOpenManualAnalyzer: () => void;
  onSearchChange?: (val: string) => void;
  notificationCount?: number;
}

export function Navbar({
  brand,
  onOpenBrandRegistry,
  onOpenManualAnalyzer,
  onSearchChange,
  notificationCount = 1
}: NavbarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRange, setSelectedRange] = useState('Last 30 days');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onSearchChange) onSearchChange(e.target.value);
  };

  return (
    <header className="h-16 border-b border-slate-200/90 bg-white/90 backdrop-blur-md px-6 flex items-center justify-between gap-6 shrink-0 sticky top-0 z-30">
      {/* Search Input (Mercury signature hairline field) */}
      <div className="flex-1 max-w-xl relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search handles, domains, rogue APKs, or threats..."
          className="w-full bg-[#f8fafc] hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/15 rounded-lg pl-9 pr-12 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-all duration-150"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-400 font-mono font-medium pointer-events-none">
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Live Protection Status Ticker */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-mono font-medium text-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>SOC Armed</span>
          <span className="text-emerald-400">•</span>
          <span className="tnum">0ms latency</span>
        </div>

        {/* Date Range Dropdown Button */}
        <div className="relative">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 transition duration-150 active:scale-97">
            <Calendar className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.5} />
            <span className="tnum">{selectedRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Diagnostic Sandbox Launcher */}
        <button
          onClick={onOpenManualAnalyzer}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium transition duration-150 active:scale-97"
          title="Run Forensic Analyzer"
        >
          <Terminal className="w-3.5 h-3.5 text-[#0284c7]" strokeWidth={1.5} />
          <span className="hidden sm:inline">Diagnostic Lab</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenManualAnalyzer}
          className="relative w-8 h-8 rounded-lg hover:bg-slate-100/80 flex items-center justify-center text-slate-600 transition duration-150"
          title="Alerts"
        >
          <Bell className="w-4 h-4" strokeWidth={1.5} />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </button>

        {/* Brand Profile Selector */}
        <button
          onClick={onOpenBrandRegistry}
          className="flex items-center gap-2.5 pl-2 pr-1.5 py-1 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
          title="Manage Brand Assets"
        >
          <div className="w-7 h-7 rounded-md bg-[#0284c7] text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {brand.brandName.charAt(0) || 'A'}
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-slate-900 leading-tight">
              {brand.brandName || 'Acme Brand'}
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
