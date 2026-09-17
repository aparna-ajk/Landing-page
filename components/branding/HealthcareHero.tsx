'use client';

import React from 'react';
import { HealthcareNetwork } from './HealthcareNetwork';

interface HealthcareHeroProps {
  className?: string;
}

export const HealthcareHero: React.FC<HealthcareHeroProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-2xl mx-auto select-none ${className}`}>
      {/* Background Soft Ambient Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] bg-gradient-to-tr from-[#1479FF]/12 via-[#18C7C9]/10 to-[#1479FF]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Command Center Orchestration Visual */}
      <HealthcareNetwork />

      {/* ====================================================================
          FLOATING HEALTHCARE CARDS (Appointment, Patient Stats, Monitoring)
          ==================================================================== */}

      {/* Card 1: Appointment Notification (Top-Left) */}
      <div className="absolute -top-3 -left-3 sm:left-1 animate-float-1 z-20">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-[#0E2438]/90 backdrop-blur-md border border-slate-200/80 dark:border-[#36A3FF]/25 shadow-soft hover:shadow-card transition-shadow">
          <div className="w-7 h-7 rounded-xl bg-[#1479FF]/10 dark:bg-[#36A3FF]/15 text-[#1479FF] dark:text-[#36A3FF] flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-[#627D98] dark:text-[#9FB3C8] leading-tight">
              Appointment Alert
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-bold text-[#102A43] dark:text-white leading-none">
                Dr. Jenkins • 10:30 AM
              </span>
              <span className="text-[9px] font-bold text-[#20B26B] bg-[#20B26B]/10 px-1 py-0.2 rounded">
                Confirmed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Patient Monitoring (Top-Right) */}
      <div className="absolute -top-2 -right-3 sm:right-1 animate-float-2 z-20">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-[#0E2438]/90 backdrop-blur-md border border-slate-200/80 dark:border-[#18C7C9]/25 shadow-soft hover:shadow-card transition-shadow">
          <div className="w-7 h-7 rounded-xl bg-[#18C7C9]/10 dark:bg-[#18C7C9]/20 text-[#18C7C9] flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-[#627D98] dark:text-[#9FB3C8] leading-tight">
              Patient Monitoring
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-black text-[#102A43] dark:text-white font-mono leading-none">
                98.7%
              </span>
              <span className="text-[10px] font-medium text-[#20B26B]">
                Stable
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Patient Statistics (Middle-Left) */}
      <div className="absolute top-1/2 -left-5 sm:-left-2 -translate-y-1/2 animate-float-2 z-20">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-[#0E2438]/95 backdrop-blur-md border border-[#1479FF]/20 dark:border-[#36A3FF]/30 shadow-soft hover:shadow-card transition-shadow">
          <div className="w-7 h-7 rounded-xl bg-[#1479FF]/10 text-[#1479FF] dark:text-[#36A3FF] flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-[#627D98] dark:text-[#9FB3C8] leading-tight">
              Patient Statistics
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-black text-[#102A43] dark:text-white font-mono leading-none">
                450k+
              </span>
              <span className="text-[10px] font-bold text-[#1479FF] dark:text-[#36A3FF]">
                Active Records
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 4: Emergency Response (Middle-Right) */}
      <div className="absolute top-1/2 -right-4 sm:-right-2 -translate-y-1/2 animate-float-1 z-20">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-[#0E2438]/90 backdrop-blur-md border border-slate-200/80 dark:border-[#18C7C9]/25 shadow-soft hover:shadow-card transition-shadow">
          <div className="w-7 h-7 rounded-xl bg-teal-500/10 text-[#18C7C9] flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-[#627D98] dark:text-[#9FB3C8] leading-tight">
              Emergency Triage
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-black text-[#102A43] dark:text-white font-mono leading-none">
                01:42
              </span>
              <span className="text-[10px] font-medium text-[#627D98] dark:text-[#9FB3C8]">
                Avg. response
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 5: Clinical Operations (Bottom-Left) */}
      <div className="absolute -bottom-3 left-4 sm:left-12 animate-float-1 z-20">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-[#0E2438]/90 backdrop-blur-md border border-slate-200/80 dark:border-[#20B26B]/25 shadow-soft hover:shadow-card transition-shadow">
          <div className="w-7 h-7 rounded-xl bg-[#20B26B]/10 text-[#20B26B] flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4" />
              <path d="m4.93 4.93 2.83 2.83" />
              <path d="M2 12h4" />
              <path d="m4.93 19.07 2.83-2.83" />
              <path d="M12 22v-4" />
              <path d="m19.07 19.07-2.83-2.83" />
              <path d="M22 12h-4" />
              <path d="m19.07 4.93-2.83 2.83" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-[#627D98] dark:text-[#9FB3C8] leading-tight">
              Hospital Operations
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#20B26B] animate-pulse" />
              <span className="text-xs font-bold text-[#20B26B] leading-none">
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
