'use client';

import React from 'react';
import { Activity, AlertTriangle, ShieldCheck, HeartPulse, Clock, Sparkles } from 'lucide-react';

export const LiveHospitalPulse: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`w-full overflow-x-auto no-scrollbar py-2 px-4 select-none border-b border-slate-200/70 dark:border-slate-800/80 bg-white/70 dark:bg-[#071521]/90 backdrop-blur-md z-40 text-xs ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 min-w-max">
        {/* Title Tag */}
        <div className="flex items-center gap-2 font-bold text-[#102A43] dark:text-white">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#18C7C9] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#18C7C9]" />
          </span>
          <span className="text-[11px] uppercase tracking-wider text-[#1479FF] dark:text-[#36A3FF]">
            Live Hospital Pulse
          </span>
        </div>

        {/* Pulse Telemetry Tickers */}
        <div className="flex items-center gap-6 text-[11px] font-medium text-[#627D98] dark:text-[#9FB3C8]">
          <div className="flex items-center gap-1.5 hover:text-[#102A43] dark:hover:text-white transition-colors cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#20B26B]" />
            <span className="font-semibold text-[#102A43] dark:text-white">Emergency:</span>
            <span className="text-[#20B26B] font-mono font-bold">Stable (14 min avg)</span>
          </div>

          <div className="flex items-center gap-1.5 hover:text-[#102A43] dark:hover:text-white transition-colors cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            <span className="font-semibold text-[#102A43] dark:text-white">ICU:</span>
            <span className="text-[#F59E0B] font-mono font-bold">82% Occupancy (9 Beds Open)</span>
          </div>

          <div className="flex items-center gap-1.5 hover:text-[#102A43] dark:hover:text-white transition-colors cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1479FF]" />
            <span className="font-semibold text-[#102A43] dark:text-white">Laboratory:</span>
            <span className="text-[#1479FF] dark:text-[#36A3FF] font-mono font-bold">24 Tests Processing</span>
          </div>

          <div className="flex items-center gap-1.5 hover:text-[#102A43] dark:hover:text-white transition-colors cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            <span className="font-semibold text-[#102A43] dark:text-white">Smart OT:</span>
            <span className="text-[#8B5CF6] font-mono font-bold">3 Procedures Active</span>
          </div>

          <div className="flex items-center gap-1.5 hover:text-[#102A43] dark:hover:text-white transition-colors cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#20B26B]" />
            <span className="font-semibold text-[#102A43] dark:text-white">Pharmacy:</span>
            <span className="text-[#20B26B] font-mono font-bold">Operational • 100% Synced</span>
          </div>
        </div>

        {/* Global SLA */}
        <div className="hidden md:flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
          <ShieldCheck size={13} />
          <span>99.98% System Health</span>
        </div>
      </div>
    </div>
  );
};
