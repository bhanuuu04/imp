'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  ChevronDown, 
  Bell, 
  Terminal,
  ShieldAlert
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
    <header className="h-16 border-b border-slate-200/80 bg-white px-6 flex items-center justify-between gap-6 shrink-0">
      {/* Center/Left Search Bar */}
      <div className="flex-1 max-w-2xl relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search profiles, domains, keywords, or incidents..."
          className="w-full bg-[#F8FAFC] hover:bg-slate-100/70 focus:bg-white border border-slate-200/80 focus:border-indigo-500 rounded-xl pl-10 pr-12 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition shadow-2xs font-sans"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-400 font-mono font-medium shadow-2xs pointer-events-none">
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Date Range Dropdown Button */}
        <div className="relative">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 transition shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{selectedRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>
        </div>

        {/* Notification Bell with Red Dot */}
        <button
          onClick={onOpenManualAnalyzer}
          className="relative w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-600 transition"
          title="Threat Notifications & Quick Scanner"
        >
          <Bell className="w-4 h-4" />
          {notificationCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </button>

        {/* Brand User Avatar Dropdown */}
        <button
          onClick={onOpenBrandRegistry}
          className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
          title="Switch or Configure Brand Assets"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {brand.brandName.charAt(0) || 'A'}
          </div>
          <span className="text-xs font-bold text-slate-800 hidden sm:inline">
            {brand.brandName || 'Acme Brand'}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
