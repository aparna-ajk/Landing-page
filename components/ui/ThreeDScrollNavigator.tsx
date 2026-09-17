'use client';

import React, { useEffect, useState } from 'react';
import { Layers, ChevronUp, ChevronDown, Compass } from 'lucide-react';

interface SectionInfo {
  id: string;
  num: string;
  name: string;
  tag: string;
}

const SECTIONS: SectionInfo[] = [
  { id: 'hero', num: '01', name: 'Core Command', tag: 'ORB' },
  { id: 'about', num: '02', name: 'Clinical Impact', tag: 'METRICS' },
  { id: 'hospital-tech', num: '03', name: 'Smart Interiors', tag: 'TECH' },
  { id: 'doctors', num: '04', name: 'Specialists', tag: 'DOCTOR' },
  { id: 'review', num: '05', name: 'Patient Reviews', tag: 'HOVER' },
  { id: 'prohealth', num: '06', name: 'Health Checks', tag: 'PLANS' },
  { id: 'pricing-cta', num: '07', name: 'Deployment', tag: 'PILOT' },
];

export const ThreeDScrollNavigator: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Detect which section is currently centered in viewport
      const viewportCenter = window.innerHeight / 2;
      let closestId = 'hero';
      let closestDistance = Infinity;

      SECTIONS.forEach((sec, idx) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top + rect.height / 2 - viewportCenter);
          if (dist < closestDistance) {
            closestDistance = dist;
            closestId = sec.id;
            setActiveIdx(idx);
          }
        }
      });

      setActiveSectionId(closestId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentSection = SECTIONS[activeIdx] || SECTIONS[0];
  const rotationY = (activeIdx / (SECTIONS.length - 1)) * 360;
  const tiltX = Math.sin((activeIdx / SECTIONS.length) * Math.PI) * 18;

  return (
    <aside
      aria-label="3D Hospital Level Navigation"
      className="hidden xl:block fixed right-3.5 top-1/2 -translate-y-1/2 z-40 select-none transition-all duration-300"
    >
      <div className="flex items-center gap-2">
        {/* Expanded Drawer (Flies out on hover or toggle) */}
        <div
          className={`overflow-hidden rounded-xl bg-white/90 dark:bg-[#071521]/90 backdrop-blur-2xl border border-slate-200 dark:border-white/15 shadow-xl transition-all duration-300 ${isExpanded ? 'w-48 opacity-100 p-2.5 scale-100' : 'w-0 opacity-0 p-0 pointer-events-none scale-95'
            }`}
        >
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-200 dark:border-white/10 text-[10px] font-mono">
            <span className="text-sky-600 dark:text-[#18C7C9] font-bold flex items-center gap-1">
              <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} />
              COMPASS
            </span>
            <span className="text-slate-400 font-bold">{Math.round(scrollProgress)}%</span>
          </div>

          <div className="max-h-[320px] overflow-y-auto no-scrollbar space-y-0.5 pr-1">
            {SECTIONS.map((sec, idx) => {
              const isActive = sec.id === activeSectionId;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-left text-[11px] transition-all ${isActive
                      ? 'bg-sky-500/15 dark:bg-[#18C7C9]/20 text-sky-600 dark:text-[#18C7C9] font-bold border border-sky-500/30 dark:border-[#18C7C9]/40 shadow-sm translate-x-0.5'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-mono text-[9px] opacity-70">{sec.num}</span>
                    <span className="truncate">{sec.name}</span>
                  </div>
                  <span className="text-[8px] font-mono px-1 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500">
                    {sec.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Isometric Mini HUD Pillar (Compact) */}
        <div
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className="flex flex-col items-center gap-1.5 p-1.5 rounded-xl bg-white/90 dark:bg-[#071521]/90 backdrop-blur-2xl border border-slate-200 dark:border-white/15 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
        >
          {/* Top 3D Cube / Compass */}
          <div
            className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500/20 via-teal-500/20 to-emerald-500/20 dark:from-[#18C7C9]/20 dark:via-[#1479FF]/20 dark:to-[#20B26B]/20 border border-slate-200 dark:border-white/10 flex items-center justify-center relative overflow-hidden"
            style={{
              perspective: '600px',
            }}
          >
            <div
              className="w-4 h-4 flex items-center justify-center transition-transform duration-300"
              style={{
                transform: `rotateX(${tiltX}deg) rotateY(${rotationY}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-[#18C7C9]" />
            </div>
            {/* Live active glow point */}
            <span className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full bg-emerald-500 dark:bg-[#20B26B] animate-ping" />
          </div>

          {/* Up arrow to previous section */}
          <button
            onClick={() => {
              const prevIdx = Math.max(0, activeIdx - 1);
              scrollToSection(SECTIONS[prevIdx].id);
            }}
            aria-label="Previous section"
            className="p-0.5 rounded text-slate-400 hover:text-sky-600 dark:hover:text-[#18C7C9] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            <ChevronUp className="w-3 h-3" />
          </button>

          {/* 3D Isometric Mini Stack Dots */}
          <div className="flex flex-col gap-1 py-0.5 items-center">
            {SECTIONS.map((sec, idx) => {
              const isActive = sec.id === activeSectionId;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  aria-label={`Jump to ${sec.name}`}
                  className="relative group/dot focus:outline-none"
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${isActive
                        ? 'w-2 h-3.5 bg-gradient-to-b from-sky-500 to-emerald-500 dark:from-[#18C7C9] dark:to-[#20B26B] shadow-[0_0_6px_rgba(2,132,199,0.8)] scale-110'
                        : 'w-1 h-1 bg-slate-300 dark:bg-white/20 hover:bg-sky-400 dark:hover:bg-white/50 hover:scale-125'
                      }`}
                  />
                  {/* Floating tooltip on dot hover */}
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[9px] font-mono whitespace-nowrap opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none shadow-md">
                    {sec.num}. {sec.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Down arrow to next section */}
          <button
            onClick={() => {
              const nextIdx = Math.min(SECTIONS.length - 1, activeIdx + 1);
              scrollToSection(SECTIONS[nextIdx].id);
            }}
            aria-label="Next section"
            className="p-0.5 rounded text-slate-400 hover:text-sky-600 dark:hover:text-[#18C7C9] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Current Floor Ticker */}
          <div className="pt-1 border-t border-slate-200 dark:border-white/10 text-center w-full">
            <span className="font-mono text-[9px] font-bold text-sky-600 dark:text-[#18C7C9] block">
              {currentSection.num}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ThreeDScrollNavigator;
