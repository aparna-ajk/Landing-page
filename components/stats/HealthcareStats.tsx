'use client';

import React, { useEffect, useRef, useState } from 'react';

interface HealthcareStatsProps {
  className?: string;
}

export const HealthcareStats: React.FC<HealthcareStatsProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    doctors: 0,
    sla: 0,
    patients: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts({
              doctors: parseFloat((2.4 * easeOut).toFixed(1)),
              sla: parseFloat((99.98 * easeOut).toFixed(2)),
              patients: Math.floor(450 * easeOut),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({
                doctors: 2.4,
                sla: 99.98,
                patients: 450,
              });
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={containerRef}
      className={`w-full grid grid-cols-3 gap-2.5 sm:gap-3.5 select-none ${className}`}
    >
      {/* Card 1: 2.4k+ Doctors & Specialists */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white/70 dark:bg-[#0E2438]/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 hover:border-[#1479FF]/40 dark:hover:border-[#36A3FF]/40 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 group cursor-default flex flex-col items-center sm:items-start">
        <div className="w-7 h-7 rounded-lg bg-[#1479FF]/10 text-[#1479FF] dark:text-[#36A3FF] flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 duration-200">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 3.5-2 5.5h19c0-2-.5-4.24-2-5.5" />
            <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
            <path d="M8 17v-1a4 4 0 0 1 8 0v1" />
          </svg>
        </div>
        <div className="text-lg sm:text-2xl font-black text-[#102A43] dark:text-white font-mono tracking-tight leading-tight">
          {counts.doctors}k<span className="text-[#1479FF] dark:text-[#36A3FF]">+</span>
        </div>
        <span className="text-[10px] sm:text-xs font-semibold text-[#627D98] dark:text-[#9FB3C8] mt-0.5 leading-snug text-center sm:text-left">
          Doctors &amp; Specialists
        </span>
      </div>

      {/* Card 2: 99.98% Clinical SLA Uptime */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white/70 dark:bg-[#0E2438]/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 hover:border-[#20B26B]/40 dark:hover:border-[#20B26B]/40 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 group cursor-default flex flex-col items-center sm:items-start">
        <div className="w-7 h-7 rounded-lg bg-[#20B26B]/10 text-[#20B26B] flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 duration-200">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className="text-lg sm:text-2xl font-black text-[#102A43] dark:text-white font-mono tracking-tight leading-tight">
          {counts.sla}%
        </div>
        <span className="text-[10px] sm:text-xs font-semibold text-[#627D98] dark:text-[#9FB3C8] mt-0.5 leading-snug text-center sm:text-left">
          Clinical SLA Uptime
        </span>
      </div>

      {/* Card 3: 450k+ Patients Served */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white/70 dark:bg-[#0E2438]/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 hover:border-[#18C7C9]/40 dark:hover:border-[#18C7C9]/40 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 group cursor-default flex flex-col items-center sm:items-start">
        <div className="w-7 h-7 rounded-lg bg-[#18C7C9]/10 text-[#18C7C9] flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 duration-200">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="text-lg sm:text-2xl font-black text-[#102A43] dark:text-white font-mono tracking-tight leading-tight">
          {counts.patients}k<span className="text-[#18C7C9]">+</span>
        </div>
        <span className="text-[10px] sm:text-xs font-semibold text-[#627D98] dark:text-[#9FB3C8] mt-0.5 leading-snug text-center sm:text-left">
          Patients Served
        </span>
      </div>
    </div>
  );
};
