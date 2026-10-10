'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  ChevronDown, 
  Bell, 
  ShieldCheck, 
  Terminal,
  Activity,
  Code2
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
    <header className="h-14 border-b border-[#1f2937] bg-[#030712]/95 backdrop-blur-md px-5 flex items-center justify-between gap-5 shrink-0 sticky top-0 z-30 font-sans">
      {/* CLI Search Input with Hairline Border */}
      <div className="flex-1 max-w-lg relative">
        <Search className="w-3.5 h-3.5 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Filter IOCs, SHA256 hashes, handles, or CVE vectors..."
          className="w-full bg-[#111827] hover:bg-[#111827]/80 focus:bg-[#111827] border border-[#1f2937] focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]/40 rounded-[6px] pl-9 pr-12 py-1.5 text-xs text-[#f8fafc] placeholder-[#94a3b8]/70 focus:outline-none transition-all font-mono"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#030712] border border-[#1f2937] text-[10px] text-[#94a3b8] font-mono pointer-events-none">
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Status Uptime Badge (Theme #132 Requirement) */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-[6px] bg-[#111827] border border-[#1f2937] text-[11px] font-mono text-[#94a3b8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
          <span className="text-[#f8fafc] font-semibold">SOC UPTIME</span>
          <span className="text-[#38bdf8] tnum">99.99%</span>
          <span className="text-[#1f2937]">|</span>
          <span className="tnum">14ms CLI</span>
        </div>

        {/* Date Range Dropdown Button */}
        <div className="relative">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#111827] hover:bg-[#1f2937] border border-[#1f2937] text-xs font-mono text-[#94a3b8] hover:text-[#f8fafc] transition active:scale-97">
            <Calendar className="w-3.5 h-3.5 text-[#94a3b8]" strokeWidth={1.5} />
            <span className="tnum">{selectedRange}</span>
            <ChevronDown className="w-3 h-3 text-[#94a3b8]" />
          </button>
        </div>

        {/* CLI Diagnostic Sandbox Launcher */}
        <button
          onClick={onOpenManualAnalyzer}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#111827] hover:bg-[#1f2937] border border-[#1f2937] text-xs font-mono text-[#38bdf8] transition active:scale-97"
          title="Run CLI Diagnostic Sandbox"
        >
          <Code2 className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span className="hidden sm:inline">astra sandbox</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenManualAnalyzer}
          className="relative w-8 h-8 rounded-[6px] bg-[#111827] hover:bg-[#1f2937] border border-[#1f2937] flex items-center justify-center text-[#94a3b8] hover:text-[#f8fafc] transition"
          title="Alerts"
        >
          <Bell className="w-3.5 h-3.5" strokeWidth={1.5} />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          )}
        </button>

        {/* Brand Profile Selector */}
        <button
          onClick={onOpenBrandRegistry}
          className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-[6px] bg-[#111827] hover:bg-[#1f2937] border border-[#1f2937] transition text-left"
        >
          <div className="w-5 h-5 rounded-[4px] bg-[#38bdf8]/15 border border-[#38bdf8]/40 flex items-center justify-center text-[10px] font-bold text-[#38bdf8] font-mono">
            {brand.brandName.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-xs font-mono text-[#f8fafc] max-w-[120px] truncate hidden md:inline">
            {brand.brandName}
          </span>
          <ChevronDown className="w-3 h-3 text-[#94a3b8]" />
        </button>
      </div>
    </header>
  );
}
