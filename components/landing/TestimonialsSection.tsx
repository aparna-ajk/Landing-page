'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Quote,
  TrendingUp,
  Stethoscope,
  Brain,
  Activity,
  Award,
  Sparkles,
  Calendar,
  ArrowUpRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';

interface DoctorSpecialist {
  id: string;
  name: string;
  degree: string;
  specialtyShort: string;
  specialtyFull: string;
  unit: string;
  image: string;
  icon: React.ElementType;
  iconColor: string;
  status: string;
  ops: string;
  sla: string;
  exp: string;
  punchline: string;
  verifiedMetric: string;
}

const DOCTORS: DoctorSpecialist[] = [
  {
    id: 'victoria',
    name: 'Dr. Victoria Sterling',
    degree: 'MD, FACS',
    specialtyShort: 'Cardiothoracic Surgery',
    specialtyFull: 'CMO & Director of Cardiothoracic Surgery',
    unit: 'Heart & Vascular Institute',
    image: '/doctor-victoria-sterling.jpg',
    icon: Stethoscope,
    iconColor: 'text-sky-500 dark:text-[#18C7C9]',
    status: 'Available for Consult',
    ops: '1.4K+ Ops',
    sla: '99.6% SLA',
    exp: '18y Exp',
    punchline: 'Saves 2.5 hours of charting per surgeon shift, letting us focus entirely on precision surgery.',
    verifiedMetric: '2.5h Saved / Shift',
  },
  {
    id: 'jonathan',
    name: 'Dr. Jonathan Hayes',
    degree: 'MD, PhD',
    specialtyShort: 'Neurosurgery & Spine',
    specialtyFull: 'Chief of Neurosurgery & Brain Spine Institute',
    unit: 'Micro-Neurosurgical Suites',
    image: '/doctor-jonathan-hayes.jpg',
    icon: Brain,
    iconColor: 'text-indigo-500 dark:text-indigo-400',
    status: 'On Duty',
    ops: '1.1K+ Ops',
    sla: '99.2% SLA',
    exp: '16y Exp',
    punchline: 'Sub-second 3D cranial PACS rendering directly in the OT enables zero-latency navigation.',
    verifiedMetric: '0.4s 3D PACS Sync',
  },
  {
    id: 'sarah',
    name: 'Dr. Sarah Jenkins',
    degree: 'MD',
    specialtyShort: 'Trauma & Emergency',
    specialtyFull: 'Director of Emergency Medicine & Trauma',
    unit: 'Level-1 Emergency Resuscitation',
    image: '/doctor-sarah-jenkins.jpg',
    icon: Activity,
    iconColor: 'text-rose-500 dark:text-rose-400',
    status: 'Available for Consult',
    ops: '3.2K+ Ops',
    sla: '99.8% SLA',
    exp: '14y Exp',
    punchline: 'Automated paramedic telemetry and AI triage bed allocation slashed door-to-treatment time by 42%.',
    verifiedMetric: '42% Faster Triage',
  },
];

// Interactive 3D Card with mouse tilt and multi-layered Z-depth
function Doctor3DCard({
  doctor,
  index,
  isSpotlighted,
  onSelect,
  waveClass,
}: {
  doctor: DoctorSpecialist;
  index: number;
  isSpotlighted: boolean;
  onSelect: () => void;
  waveClass: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = doctor.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: parseFloat((mouseX * 16).toFixed(2)),
      y: parseFloat((-mouseY * 16).toFixed(2)),
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const baseRotateY = index === 0 ? 4 : index === 2 ? -4 : 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
      className={`w-full min-w-[320px] sm:min-w-[350px] lg:min-w-0 flex-1 snap-center cursor-pointer select-none transition-all duration-300 ${waveClass}`}
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${tilt.y}deg) rotateY(${tilt.x + baseRotateY}deg) translateZ(28px) scale(1.03)`
            : isSpotlighted
            ? `rotateX(0deg) rotateY(${baseRotateY}deg) translateZ(20px) scale(1.02)`
            : `rotateX(0deg) rotateY(${baseRotateY}deg) translateZ(0px)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`relative h-full flex flex-col justify-between rounded-3xl p-4 sm:p-5 border backdrop-blur-2xl transition-shadow duration-500 overflow-hidden ${
          isSpotlighted
            ? 'bg-white/95 dark:bg-[#0B1F33]/95 border-[#0284C7] dark:border-[#18C7C9] shadow-2xl shadow-sky-500/25 ring-2 ring-[#0284C7]/30 dark:ring-[#18C7C9]/40'
            : 'bg-white/85 dark:bg-[#071521]/85 hover:bg-white dark:hover:bg-[#0B1F33] border-slate-200/90 dark:border-white/10 hover:border-sky-500/40 shadow-xl'
        }`}
      >
        {/* Specular Glare Reflection on 3D Hover */}
        {isHovered && (
          <div
            style={{
              transform: `translate(${tilt.x * 6}px, ${-tilt.y * 6}px)`,
              transformStyle: 'preserve-3d',
            }}
            className="pointer-events-none absolute -inset-20 bg-radial-gradient from-white/20 dark:from-white/10 to-transparent opacity-60 blur-xl"
          />
        )}

        {/* Top Active Laser Stripe */}
        {isSpotlighted && (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0284C7] via-[#0D9488] via-[#10B981] to-[#1479FF] animate-text-gradient-flow" />
        )}

        {/* =========================================================================
            BIG DOCTOR PICTURE (HERO PORTRAIT BANNER)
           ========================================================================= */}
        <div
          style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
          className="relative w-full aspect-[4/3] sm:h-56 rounded-2xl overflow-hidden mb-3.5 shadow-xl group/docImg"
        >
          {/* Doctor Portrait Image */}
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/docImg:scale-105"
          />

          {/* Vignette Gradients for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/35 pointer-events-none" />

          {/* Top Overlays: Status Pill & Spotlight Badge */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            {isSpotlighted ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-sky-400/40 text-[10px] font-mono font-bold text-[#18C7C9]">
                <Sparkles className="w-3 h-3 text-[#18C7C9]" />
                Spotlight
              </span>
            ) : (
              <span />
            )}

            {/* Live Duty Status Pill */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-emerald-300 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {doctor.status}
            </span>
          </div>

          {/* Bottom Overlays: Specialty Icon & Department Tag */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
            {/* Specialty Icon Jewel */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg bg-black/65 backdrop-blur-md border border-white/25 ${doctor.iconColor}`}>
              <IconComponent className="w-4 h-4" />
            </div>

            <span className="text-[10px] font-mono font-semibold text-white/90 bg-black/55 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/15 truncate max-w-[190px]">
              {doctor.unit}
            </span>
          </div>
        </div>

        {/* =========================================================================
            COMPACT & REFINED MATTER (SMALLER SIZES)
           ========================================================================= */}
        <div style={{ transform: 'translateZ(24px)', transformStyle: 'preserve-3d' }} className="flex-1 flex flex-col justify-between">
          <div>
            {/* Doctor Name & Specialty */}
            <div className="mb-2">
              <div className="flex items-baseline justify-between gap-1">
                <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                  {doctor.name}
                </h3>
                <span className="text-[10px] font-bold text-[#0284C7] dark:text-[#18C7C9] font-mono">
                  {doctor.degree}
                </span>
              </div>
              <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                {doctor.specialtyShort}
              </div>
            </div>

            {/* 3 Compact Metric Pills */}
            <div className="grid grid-cols-3 gap-1 py-1 px-2 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 mb-2 text-center">
              <div>
                <div className="text-[8px] text-slate-400 uppercase font-mono">Vol</div>
                <div className="text-[11px] font-black text-slate-900 dark:text-white font-mono">
                  {doctor.ops}
                </div>
              </div>
              <div className="border-x border-slate-200 dark:border-white/10">
                <div className="text-[8px] text-slate-400 uppercase font-mono">SLA</div>
                <div className="text-[11px] font-black text-[#10B981] font-mono">
                  {doctor.sla}
                </div>
              </div>
              <div>
                <div className="text-[8px] text-slate-400 uppercase font-mono">Exp</div>
                <div className="text-[11px] font-black text-[#0284C7] dark:text-[#18C7C9] font-mono">
                  {doctor.exp}
                </div>
              </div>
            </div>

            {/* Concise 1-Sentence Punchline Quote */}
            <p className="text-[10.5px] text-slate-600 dark:text-slate-300 italic leading-snug pl-2 border-l-2 border-sky-500/40 dark:border-[#18C7C9]/50 line-clamp-2 mb-2.5">
              &ldquo;{doctor.punchline}&rdquo;
            </p>
          </div>

          {/* Bottom Compact Action & Metric Row */}
          <div className="pt-2 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20 truncate">
              <TrendingUp className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{doctor.verifiedMetric}</span>
            </div>

            <a
              href="#about"
              className={`inline-flex items-center gap-1 py-1 px-2.5 rounded-lg text-[10.5px] font-bold transition-all flex-shrink-0 ${
                isSpotlighted
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#10B981] dark:from-[#18C7C9] dark:to-[#20B26B] text-white dark:text-[#071521] shadow-md shadow-sky-500/20 hover:scale-105'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/20'
              }`}
            >
              <span>Consult</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeDoctorIdx, setActiveDoctorIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const scrollRailRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to a specific doctor card in the rail
  const scrollToDoctor = (index: number) => {
    setActiveDoctorIdx(index);
    if (scrollRailRef.current) {
      const container = scrollRailRef.current;
      const cards = container.children;
      if (cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  // Automated Phased Oscillation Spotlight Cycling (every 4.5 seconds)
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 4500;
    const timer = setInterval(() => {
      setActiveDoctorIdx((prev) => {
        const nextIdx = (prev + 1) % DOCTORS.length;
        if (scrollRailRef.current && window.innerWidth < 1024) {
          const container = scrollRailRef.current;
          const cards = container.children;
          if (cards[nextIdx]) {
            (cards[nextIdx] as HTMLElement).scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center',
            });
          }
        }
        return nextIdx;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    const nextIdx = (activeDoctorIdx - 1 + DOCTORS.length) % DOCTORS.length;
    scrollToDoctor(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeDoctorIdx + 1) % DOCTORS.length;
    scrollToDoctor(nextIdx);
  };

  return (
    <section
      id="doctors"
      className="relative py-28 bg-[#F8FAFC] dark:bg-[#071521] text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden select-none"
    >
      {/* Target Anchor for Header Button "Our Doctors" & "Specialization" */}
      <div id="specialists" className="scroll-mt-24" />
      <div id="specialization" className="scroll-mt-24" />
      <div id="emergency" className="scroll-mt-24" />

      {/* Atmospheric Background Gradients & Holographic Rings */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(2,132,199,0.08)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-slate-200/80 dark:border-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1050px] h-[1050px] rounded-full border border-dashed border-sky-500/10 dark:border-white/5 pointer-events-none animate-[spin_100s_linear_infinite]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            1. SECTION HEADER (SHORTENED & HIGH-PUNCH)
           ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 dark:bg-[#18C7C9]/15 border border-sky-500/25 dark:border-[#18C7C9]/30 text-sky-600 dark:text-[#18C7C9] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Specialization Chiefs
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            Elite Clinical Specialists. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#10B981] dark:from-[#18C7C9] dark:via-[#1479FF] dark:to-[#20B26B] animate-text-gradient-flow">
              Driving Hospital Excellence.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Board-certified department directors leading precision surgery, neuro-trauma, and zero-latency care.
          </p>

          {/* =========================================================================
              2. CONTINUOUS SCROLLING TELEMETRY TICKER BAR (MARQUEE SCROLL)
             ========================================================================= */}
          <div className="mt-6 max-w-3xl mx-auto overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 p-2 shadow-inner">
            <div className="animate-marquee-scroll flex items-center gap-8 text-xs font-bold text-slate-600 dark:text-slate-300 select-none">
              <span className="flex items-center gap-2 text-[#0284C7] dark:text-[#18C7C9]">
                <Stethoscope className="w-3.5 h-3.5" />
                Dr. Victoria Sterling • Cardiothoracic CMO • 99.6% SLA
              </span>
              <span className="text-slate-300 dark:text-white/20">•</span>
              <span className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400">
                <Brain className="w-3.5 h-3.5" />
                Dr. Jonathan Hayes • Neurosurgery &amp; Spine • 99.2% SLA
              </span>
              <span className="text-slate-300 dark:text-white/20">•</span>
              <span className="flex items-center gap-2 text-rose-500 dark:text-rose-400">
                <Activity className="w-3.5 h-3.5" />
                Dr. Sarah Jenkins • Trauma Resuscitation • 99.8% SLA
              </span>
              <span className="text-slate-300 dark:text-white/20">•</span>
              <span className="flex items-center gap-2 text-[#10B981]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero-Latency Clinical Intelligence &amp; 3D PACS
              </span>
              <span className="text-slate-300 dark:text-white/20">•</span>

              {/* Duplicate for Seamless Infinite Scrolling Loop */}
              <span className="flex items-center gap-2 text-[#0284C7] dark:text-[#18C7C9]">
                <Stethoscope className="w-3.5 h-3.5" />
                Dr. Victoria Sterling • Cardiothoracic CMO • 99.6% SLA
              </span>
              <span className="text-slate-300 dark:text-white/20">•</span>
              <span className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400">
                <Brain className="w-3.5 h-3.5" />
                Dr. Jonathan Hayes • Neurosurgery &amp; Spine • 99.2% SLA
              </span>
              <span className="text-slate-300 dark:text-white/20">•</span>
              <span className="flex items-center gap-2 text-rose-500 dark:text-rose-400">
                <Activity className="w-3.5 h-3.5" />
                Dr. Sarah Jenkins • Trauma Resuscitation • 99.8% SLA
              </span>
              <span className="text-slate-300 dark:text-white/20">•</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. 3D HORIZONTAL SCROLLING DOCTORS RAIL
           ========================================================================= */}
        <div
          ref={scrollRailRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch overflow-x-auto scrollbar-none snap-x snap-mandatory pt-4 pb-2 px-1"
        >
          {DOCTORS.map((doctor, idx) => {
            const isSpotlighted = activeDoctorIdx === idx;
            const waveAnimationClass =
              idx === 0
                ? 'animate-doctor-wave-1'
                : idx === 1
                ? 'animate-doctor-wave-2'
                : 'animate-doctor-wave-3';

            return (
              <Doctor3DCard
                key={doctor.id}
                doctor={doctor}
                index={idx}
                isSpotlighted={isSpotlighted}
                onSelect={() => scrollToDoctor(idx)}
                waveClass={waveAnimationClass}
              />
            );
          })}
        </div>

        {/* =========================================================================
            4. INTERACTIVE 3D SCROLLING BAR & TELEMETRY CONTROLS (COMPACT)
           ========================================================================= */}
        <div className="mt-6 max-w-xs sm:max-w-sm mx-auto">
          {/* Status Telemetry Text */}
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 mb-1.5 px-0.5">
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-200 truncate">
              <SlidersHorizontal className="w-3 h-3 text-[#0284C7] dark:text-[#18C7C9] shrink-0" />
              {activeDoctorIdx + 1}/{DOCTORS.length}: {DOCTORS[activeDoctorIdx].name.split(' ').slice(1).join(' ')}
            </span>
            <span className="text-[#0284C7] dark:text-[#18C7C9] flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              SCROLL
            </span>
          </div>

          {/* Interactive 3D Scrolling Track */}
          <div className="relative flex items-center gap-2">
            {/* Scroll Left Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Specialist"
              className="p-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[#0284C7] text-slate-700 dark:text-slate-200 hover:scale-105 shadow-sm transition-all flex-shrink-0"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Glowing 3D Scrolling Bar Track */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                const targetIdx = Math.min(Math.floor(ratio * DOCTORS.length), DOCTORS.length - 1);
                scrollToDoctor(targetIdx);
              }}
              className="relative flex-1 h-2.5 bg-slate-200/90 dark:bg-white/10 rounded-full overflow-hidden cursor-pointer p-0.5 border border-slate-300/80 dark:border-white/15 shadow-inner"
            >
              {/* Dynamic Scrolling Thumb that slides continuously */}
              <div
                style={{
                  width: `${100 / DOCTORS.length}%`,
                  transform: `translateX(${activeDoctorIdx * 100}%)`,
                  transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="h-full rounded-full bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#10B981] dark:from-[#18C7C9] dark:via-[#1479FF] dark:to-[#20B26B] shadow-md shadow-sky-500/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse" />
              </div>
            </div>

            {/* Scroll Right Button */}
            <button
              onClick={handleNext}
              aria-label="Next Specialist"
              className="p-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[#0284C7] text-slate-700 dark:text-slate-200 hover:scale-105 shadow-sm transition-all flex-shrink-0"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Doctor Pills Navigation */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {DOCTORS.map((doc, idx) => (
              <button
                key={doc.id}
                onClick={() => scrollToDoctor(idx)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                  activeDoctorIdx === idx
                    ? 'bg-[#0284C7] text-white dark:bg-[#18C7C9] dark:text-[#071521] shadow-sm shadow-sky-500/20'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                {doc.specialtyShort.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Verified Protocol Banner */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] font-medium text-slate-600 dark:text-slate-400 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>JCAHO Board-Certified Chiefs • HIPAA Compliant Telemetry</span>
          </div>
        </div>
      </div>
    </section>
  );
}
