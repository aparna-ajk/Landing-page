'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Activity,
  Brain,
  Syringe,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface HoverboardZone {
  id: string;
  code: string;
  name: string;
  tagline: string;
  icon: React.ElementType;
  themeName: 'cyan' | 'violet' | 'emerald' | 'rose';
  image: string;
  statBadge: string;
  specPill: string;
  altitude: string;
  techPills: string[];
  hotspots: {
    x: number;
    y: number;
    title: string;
    metric: string;
  }[];
  thrusterTheme: {
    plasma: string;
    ringBorder: string;
    glow: string;
    accentHex: string;
    neonBorder: string;
  };
}

const HOVERBOARDS: HoverboardZone[] = [
  {
    id: 'robotic-or',
    code: 'ZONE-01',
    name: 'Robotic Surgery Suite',
    tagline: 'Da Vinci Xi 4-Arm Telemanipulation',
    icon: Syringe,
    themeName: 'cyan',
    image: '/hospital-operating-room.jpg',
    statBadge: 'ISO Class 5',
    specPill: '0.24 ms • 19.2°C',
    altitude: '48 cm',
    techPills: ['Da Vinci Xi 4-Arm', 'AR Holo-Visor', 'ISO-5 Laminar'],
    hotspots: [
      { x: 38, y: 46, title: 'Da Vinci Robotic Arm', metric: '0.1 mm' },
      { x: 68, y: 32, title: 'AR Surgical HUD', metric: '< 12 ms' },
      { x: 82, y: 64, title: 'Laminar Air Canopy', metric: 'ISO-5' },
    ],
    thrusterTheme: {
      plasma: 'from-cyan-400 via-sky-500 to-blue-600',
      ringBorder: 'border-cyan-400/80 shadow-[0_0_16px_rgba(6,182,212,0.8)]',
      glow: 'rgba(6, 182, 212, 0.75)',
      accentHex: '#18C7C9',
      neonBorder: 'group-hover:border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.25)]',
    },
  },
  {
    id: 'quantum-mri',
    code: 'ZONE-02',
    name: '7-Tesla Quantum MRI',
    tagline: 'Sub-3 Min High-Field Neuro-Scans',
    icon: Brain,
    themeName: 'violet',
    image: '/hospital-radiology-mri.jpg',
    statBadge: '7.0 Tesla Bore',
    specPill: '0.15 mm • 4.2 K',
    altitude: '52 cm',
    techPills: ['7T Cryo-Magnet', 'DL-Recon (3m)', '64-Ch Array'],
    hotspots: [
      { x: 50, y: 50, title: '7T Superconducting Bore', metric: '7.0 Tesla' },
      { x: 74, y: 62, title: '64-Ch Head Matrix', metric: 'Parallel Array' },
      { x: 28, y: 36, title: 'Zero-Boil Cryostat', metric: '4.2 Kelvin' },
    ],
    thrusterTheme: {
      plasma: 'from-purple-400 via-violet-500 to-indigo-600',
      ringBorder: 'border-purple-400/80 shadow-[0_0_16px_rgba(168,85,247,0.8)]',
      glow: 'rgba(168, 85, 247, 0.75)',
      accentHex: '#A855F7',
      neonBorder: 'group-hover:border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.25)]',
    },
  },
  {
    id: 'smart-icu',
    code: 'ZONE-03',
    name: 'Autonomous Neuro-ICU',
    tagline: 'Predictive Sepsis AI & Auto-Infusion',
    icon: Activity,
    themeName: 'emerald',
    image: '/hospital-icu-room.jpg',
    statBadge: '1,000 Hz Vitals',
    specPill: '4.5h Warning • -12 Pa',
    altitude: '45 cm',
    techPills: ['Sepsis AI Sentinel', 'Closed-Loop Infusion', '60GHz Radar'],
    hotspots: [
      { x: 48, y: 52, title: 'Kinetic ICU Bed', metric: '0% Ulcers' },
      { x: 76, y: 40, title: 'Smart Infusion Tower', metric: 'Auto-Titrate' },
      { x: 24, y: 38, title: 'Contactless Radar', metric: '60 GHz' },
    ],
    thrusterTheme: {
      plasma: 'from-emerald-400 via-teal-500 to-green-600',
      ringBorder: 'border-emerald-400/80 shadow-[0_0_16px_rgba(16,185,129,0.8)]',
      glow: 'rgba(16, 185, 129, 0.75)',
      accentHex: '#10B981',
      neonBorder: 'group-hover:border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.25)]',
    },
  },
  {
    id: 'trauma-bay',
    code: 'ZONE-04',
    name: 'Level-1 Trauma Bay',
    tagline: 'Rapid Blood Infusion & Sliding CT',
    icon: ShieldAlert,
    themeName: 'rose',
    image: '/hospital-trauma-bay.jpg',
    statBadge: '1,000 mL/min',
    specPill: '< 10 ms 5G • 22°C',
    altitude: '50 cm',
    techPills: ['Belmont Rapid Infuser', 'Sliding Gantry CT', '5G Telemetry'],
    hotspots: [
      { x: 50, y: 56, title: 'Carbon-Fiber Gurney', metric: 'Zero Transfer' },
      { x: 28, y: 48, title: 'Rapid Blood Infuser', metric: '1,000 mL/min' },
      { x: 84, y: 52, title: 'Pre-Hospital 5G Desk', metric: '< 10 ms' },
    ],
    thrusterTheme: {
      plasma: 'from-rose-400 via-red-500 to-amber-500',
      ringBorder: 'border-rose-400/80 shadow-[0_0_16px_rgba(244,63,94,0.8)]',
      glow: 'rgba(244, 63, 94, 0.75)',
      accentHex: '#F43F5E',
      neonBorder: 'group-hover:border-rose-400/60 shadow-[0_0_20px_rgba(244,63,94,0.25)]',
    },
  },
];

// Compact 3D Hoverboard Suite Card with Highlighted Interior Image
function HoverboardSuiteCard({
  board,
  index,
  isThrusterBoosted,
  onOpenDemo,
}: {
  board: HoverboardZone;
  index: number;
  isThrusterBoosted: boolean;
  onOpenDemo?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  const IconComponent = board.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 14,
      y: x * 18,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setHoveredHotspot(null);
  };

  const animationWaveClass =
    index === 0
      ? 'animate-hoverboard-1'
      : index === 1
      ? 'animate-hoverboard-2'
      : index === 2
      ? 'animate-hoverboard-3'
      : 'animate-hoverboard-1';

  return (
    <div
      className="relative shrink-0 w-[285px] sm:w-[310px] md:w-[325px] perspective-1200 select-none snap-start py-6 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D FLOATING & TILTING HOVERBOARD WRAPPER */}
      <div
        ref={cardRef}
        style={{
          transform: isHovered
            ? `perspective(1000px) translateY(-14px) translateZ(32px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
            : undefined,
          transition: isHovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`relative ${!isHovered ? animationWaveClass : ''} transform-style-3d`}
      >
        {/* UNDERCARRIAGE: DUAL HIGH-OUTPUT PLASMA THRUSTERS */}
        <div className="absolute -bottom-6 inset-x-6 flex justify-between items-center pointer-events-none z-0 px-4">
          {/* Left Thruster */}
          <div className="relative flex flex-col items-center">
            <div
              className={`w-11 h-3 rounded-full bg-slate-950 border-2 ${board.thrusterTheme.ringBorder} flex items-center justify-center`}
            >
              <div
                className={`w-6 h-1 rounded-full bg-gradient-to-r ${board.thrusterTheme.plasma} animate-pulse`}
              />
            </div>
            <div
              className={`w-12 h-16 bg-gradient-to-b ${board.thrusterTheme.plasma} to-transparent rounded-full opacity-70 filter blur-md transition-all duration-300 ${
                isThrusterBoosted || isHovered
                  ? 'scale-125 opacity-95 blur-lg'
                  : 'animate-thruster-pulse'
              }`}
              style={{ boxShadow: `0 10px 25px ${board.thrusterTheme.glow}` }}
            />
          </div>

          {/* Altitude Tag */}
          <span className="text-[8px] font-mono tracking-wider font-semibold text-white/50 uppercase bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
            {isHovered || isThrusterBoosted ? '60 cm' : board.altitude}
          </span>

          {/* Right Thruster */}
          <div className="relative flex flex-col items-center">
            <div
              className={`w-11 h-3 rounded-full bg-slate-950 border-2 ${board.thrusterTheme.ringBorder} flex items-center justify-center`}
            >
              <div
                className={`w-6 h-1 rounded-full bg-gradient-to-r ${board.thrusterTheme.plasma} animate-pulse`}
              />
            </div>
            <div
              className={`w-12 h-16 bg-gradient-to-b ${board.thrusterTheme.plasma} to-transparent rounded-full opacity-70 filter blur-md transition-all duration-300 ${
                isThrusterBoosted || isHovered
                  ? 'scale-125 opacity-95 blur-lg'
                  : 'animate-thruster-pulse'
              }`}
              style={{ boxShadow: `0 10px 25px ${board.thrusterTheme.glow}` }}
            />
          </div>
        </div>

        {/* Ground Energy Cushion Reflection */}
        <div
          className={`absolute -bottom-10 inset-x-4 h-8 rounded-full filter blur-xl transition-all duration-400 pointer-events-none -z-10 ${
            isHovered || isThrusterBoosted ? 'opacity-95 scale-105' : 'opacity-40 scale-95'
          }`}
          style={{
            background: `radial-gradient(ellipse at center, ${board.thrusterTheme.glow} 0%, transparent 70%)`,
          }}
        />

        {/* HOVERBOARD BODY SURFACE */}
        <div
          style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
          className={`relative rounded-2xl overflow-hidden bg-[#0A1624]/95 backdrop-blur-xl border border-white/20 transition-all duration-300 ${board.thrusterTheme.neonBorder} shadow-[0_12px_40px_rgba(0,0,0,0.8)]`}
        >
          {/* =========================================================================
              HIGHLIGHTED HERO INTERIOR IMAGE (DOMINANT VISUAL)
             ========================================================================= */}
          <div
            style={{ transform: 'translateZ(15px)' }}
            className="relative aspect-[16/11] w-full overflow-hidden bg-black select-none"
          >
            <img
              src={board.image}
              alt={board.name}
              className="w-full h-full object-cover brightness-[1.03] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
            />

            {/* Subtle Vignette & Holographic Cyber Grid */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1624] via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(24,199,201,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(24,199,201,0.06)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Continuous Futuristic Laser Scanning Beam */}
            <div className="absolute inset-y-0 w-1 bg-gradient-to-b from-transparent via-[#18C7C9] to-transparent shadow-[0_0_16px_#18C7C9,0_0_28px_#1479FF] pointer-events-none animate-scanline-sweep">
              <div className="absolute top-1/2 -left-1 w-2.5 h-2.5 rounded-full bg-[#18C7C9] blur-[2px] animate-pulse" />
            </div>

            {/* Top Left Code Badge */}
            <div
              style={{ transform: 'translateZ(24px)' }}
              className="absolute top-2.5 left-2.5 z-10"
            >
              <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-mono font-bold text-[#18C7C9] flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#18C7C9] animate-pulse" />
                {board.code}
              </span>
            </div>

            {/* Top Right Spec Badge */}
            <div
              style={{ transform: 'translateZ(24px)' }}
              className="absolute top-2.5 right-2.5 z-10"
            >
              <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-emerald-500/40 text-[9px] font-mono font-bold text-emerald-400 shadow-md">
                {board.statBadge}
              </span>
            </div>

            {/* Pulsing Hotspot Pins on the Equipment */}
            {board.hotspots.map((h, hIdx) => {
              const isItemHovered = hoveredHotspot === h.title;
              return (
                <div
                  key={h.title}
                  style={{
                    left: `${h.x}%`,
                    top: `${h.y}%`,
                    transform: 'translateZ(28px)',
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  onMouseEnter={() => setHoveredHotspot(h.title)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                >
                  <div className="relative flex items-center justify-center p-1.5 cursor-pointer">
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-cyan-400 opacity-60 pointer-events-none" />
                    <span className="relative inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#18C7C9] text-slate-950 text-[7px] font-mono font-black shadow-[0_0_8px_#18C7C9]">
                      0{hIdx + 1}
                    </span>

                    {/* Tooltip */}
                    <div
                      className={`absolute left-5 whitespace-nowrap px-2 py-0.5 rounded-md bg-black/95 backdrop-blur-md border border-cyan-400/50 text-[9px] font-mono text-white shadow-xl transition-all pointer-events-none ${
                        isItemHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                    >
                      <div className="font-bold text-[#18C7C9]">{h.title}</div>
                      <div className="text-[8px] text-slate-300">{h.metric}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bottom Spec Strip on Image */}
            <div
              style={{ transform: 'translateZ(20px)' }}
              className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-between text-[9px] font-mono text-slate-300 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10"
            >
              <span>{board.tagline}</span>
              <span className="text-[#18C7C9] font-bold">{board.specPill.split(' • ')[0]}</span>
            </div>
          </div>

          {/* =========================================================================
              COMPACT LOWER DECK (MINIMAL TEXT & CLEAN TECH PILLS)
             ========================================================================= */}
          <div
            style={{ transform: 'translateZ(18px)' }}
            className="p-3.5 bg-[#091522] space-y-2"
          >
            {/* Title with Icon */}
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <IconComponent className="w-3 h-3" />
                </div>
                <h3 className="text-xs font-bold text-white tracking-tight truncate">
                  {board.name}
                </h3>
              </div>
            </div>

            {/* Minimal Tech Pills (Compact Horizontal Chips) */}
            <div className="flex flex-wrap gap-1">
              {board.techPills.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[9px] font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Compact Action Bar */}
            <div className="pt-1.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-400">
                {board.specPill}
              </span>

              <button
                onClick={onOpenDemo}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] flex items-center gap-1 transition-all border border-white/15"
              >
                Inspect
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  onOpenDemo?: () => void;
}

export default function HospitalInteriorTechnologies({ onOpenDemo }: Props) {
  const [thrusterBoost, setThrusterBoost] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Track scroll position to update arrow buttons and progress bar
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  const scrollByAmount = (amount: number) => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section
      id="hospital-tech"
      className="relative py-12 sm:py-14 bg-[#08111C] text-slate-100 transition-colors duration-300 overflow-hidden select-none border-t border-b border-white/10"
    >
      {/* Anchor targets */}
      <div id="interior-tech" className="scroll-mt-24" />
      <div id="infrastructure" className="scroll-mt-24" />
      <div id="facility-tech" className="scroll-mt-24" />

      {/* Cybernetic Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(20,121,255,0.14)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* =========================================================================
            HEADER WITH SCROLL CONTROLS & BOOST
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#18C7C9] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#18C7C9]" />
              </span>
              <Sparkles className="w-3 h-3 text-[#18C7C9]" />
              Hospital Interiors • 3D Hoverboards
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Clinical Interiors.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#18C7C9] to-[#34D399]">
                Interactive 3D Hoverboards.
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Scroll through hospital suites. Hover over any board to balance it in 3D.
            </p>
          </div>

          {/* Glide & Boost Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Turbo Boost Toggle */}
            <button
              onClick={() => setThrusterBoost(!thrusterBoost)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all border ${
                thrusterBoost
                  ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                  : 'bg-white/5 border-white/15 text-slate-400 hover:text-white'
              }`}
              title="Toggle Thruster Turbo Boost"
            >
              <Flame className={`w-3 h-3 ${thrusterBoost ? 'text-rose-400 animate-bounce' : 'text-slate-400'}`} />
              Boost: {thrusterBoost ? 'MAX' : 'NORMAL'}
            </button>

            {/* Scroll Left Button */}
            <button
              onClick={() => scrollByAmount(-320)}
              disabled={!canScrollLeft}
              className={`p-1.5 rounded-lg border transition-all ${
                canScrollLeft
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-md'
                  : 'bg-white/5 text-slate-600 border-white/5 cursor-not-allowed'
              }`}
              title="Scroll Left"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Scroll Right Button */}
            <button
              onClick={() => scrollByAmount(320)}
              disabled={!canScrollRight}
              className={`p-1.5 rounded-lg border transition-all ${
                canScrollRight
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-md'
                  : 'bg-white/5 text-slate-600 border-white/5 cursor-not-allowed'
              }`}
              title="Scroll Right"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            SIDE-BY-SIDE HORIZONTAL SCROLLING HOVERBOARDS TRACK
           ========================================================================= */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {HOVERBOARDS.map((board, idx) => (
            <HoverboardSuiteCard
              key={board.id}
              board={board}
              index={idx}
              isThrusterBoosted={thrusterBoost}
              onOpenDemo={onOpenDemo}
            />
          ))}
        </div>

        {/* =========================================================================
            MINIMAL SCROLLBAR PROGRESS TRACK
           ========================================================================= */}
        <div className="mt-2 flex items-center justify-between gap-3 px-1 text-[10px] font-mono text-slate-400">
          <div className="w-48 sm:w-64 h-1 rounded-full bg-white/10 overflow-hidden relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 via-[#18C7C9] to-teal-400 transition-all duration-150 shadow-[0_0_6px_#18C7C9]"
              style={{
                width: '40%',
                transform: `translateX(${(scrollProgress * 1.5).toFixed(1)}%)`,
              }}
            />
          </div>

          <div className="flex items-center gap-2 text-[9px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>4 SUITES • 3D MOUSE BALANCE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
