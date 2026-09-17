'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Activity,
  Heart,
  Brain,
  ShieldCheck,
  Zap,
  Rotate3d,
  Layers,
  Sparkles,
  Info,
  Radio,
  CheckCircle2,
} from 'lucide-react';

interface Hotspot {
  id: string;
  name: string;
  icon: React.ElementType;
  xPercent: number; // percentage from left
  yPercent: number; // percentage from top
  category: string;
  metricLabel: string;
  metricValue: string;
  status: 'Optimal' | 'Synchronized' | 'Active';
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'brain',
    name: 'Neural Cortex',
    icon: Brain,
    xPercent: 50,
    yPercent: 11,
    category: 'Neurology',
    metricLabel: 'Synaptic Stability',
    metricValue: '99.4%',
    status: 'Optimal',
    description: 'Bilateral alpha wave synchronization across cerebral hemispheres.',
  },
  {
    id: 'cardio',
    name: 'Cardiovascular Core',
    icon: Heart,
    xPercent: 52,
    yPercent: 27,
    category: 'Cardiology',
    metricLabel: 'Heart Rate',
    metricValue: '72 BPM',
    status: 'Synchronized',
    description: 'Normal sinus rhythm; stroke volume 78mL; troponin index <0.01 ng/mL.',
  },
  {
    id: 'lungs',
    name: 'Pulmonary / Lungs',
    icon: Activity,
    xPercent: 44,
    yPercent: 25,
    category: 'Pulmonology',
    metricLabel: 'Blood Oxygenation',
    metricValue: 'SpO2 99%',
    status: 'Optimal',
    description: 'Bilateral clear alveolar gas exchange; respiration rate 16 bpm.',
  },
  {
    id: 'digestive',
    name: 'Digestive / GI Tract',
    icon: Zap,
    xPercent: 50,
    yPercent: 43,
    category: 'Gastroenterology',
    metricLabel: 'Metabolic Balance',
    metricValue: 'Nominal',
    status: 'Active',
    description: 'Enteric peristalsis synchronized; baseline microbiota diversity index 8.9.',
  },
  {
    id: 'musculoskeletal',
    name: 'Spinal Alignment',
    icon: ShieldCheck,
    xPercent: 50,
    yPercent: 62,
    category: 'Orthopedics',
    metricLabel: 'Bone Density T-Score',
    metricValue: '+1.2',
    status: 'Optimal',
    description: 'Axial musculoskeletal alignment verified; zero intervertebral strain.',
  },
];

export default function HolographicHumanModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[1]); // Default cardio
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);
  const [activeViewMode, setActiveViewMode] = useState<'all' | 'cardio' | 'neural' | 'gi'>('all');
  const [bpm, setBpm] = useState<number>(72);

  // Dynamic heartbeat simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setBpm((prev) => 70 + Math.floor(Math.random() * 5));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Continuous auto orbit when enabled
  useEffect(() => {
    if (!isAutoRotate) return;
    let angle = 0;
    const interval = setInterval(() => {
      angle = (angle + 1) % 360;
      setRotateY(Math.sin((angle * Math.PI) / 180) * 16);
      setRotateX(Math.cos((angle * Math.PI) / 180) * 5);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoRotate]);

  // Interactive 3D mouse parallax tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAutoRotate || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Smooth tilt angles
    const degX = -(y / (rect.height / 2)) * 12;
    const degY = (x / (rect.width / 2)) * 16;
    setRotateX(degX);
    setRotateY(degY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isAutoRotate) {
      setRotateX(0);
      setRotateY(0);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[560px] mx-auto select-none group"
      style={{ perspective: '1200px' }}
    >
      {/* Outer Card Shell with Crisp White Background and Black Accents */}
      <div
        className="relative rounded-3xl bg-white border border-black/10 shadow-2xl p-4 sm:p-6 transition-transform duration-200 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* Top Header Telemetry Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black" />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-black">
              Patient Digital Twin &bull; 3D Model
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-black/5 text-black border border-black/15">
              Live FHIR v4.3
            </span>
            <button
              type="button"
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              title="Toggle 360° Rotation"
              className={`p-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 ${
                isAutoRotate
                  ? 'bg-black text-white border-black shadow-sm'
                  : 'bg-white text-black border-black/20 hover:border-black'
              }`}
            >
              <Rotate3d size={13} />
              <span className="hidden sm:inline text-[10px]">Orbit</span>
            </button>
          </div>
        </div>

        {/* Center Stage: The Floating 3D Human Body Model */}
        <div className="relative h-[480px] sm:h-[540px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 border border-black/5">
          {/* Subtle Precision Grid Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

          {/* Floating Body Stage with Levitation Animation */}
          <div
            className="relative w-[240px] sm:w-[270px] h-[440px] sm:h-[490px] flex items-center justify-center transition-all duration-300"
            style={{
              transform: 'translateZ(30px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* The High-Resolution Holographic Human Digital Twin Body */}
            <div className="relative w-full h-full flex items-center justify-center animate-human-body-float">
              <Image
                src="/digital-twin-model-clean.png"
                alt="3D Holographic Patient Anatomy Digital Twin"
                fill
                priority
                className="object-contain object-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
              />

              {/* Real-time Horizontal Laser Scanning Beam (Up & Down Sweep) */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(24,199,201,0.9)] animate-laser-sweep pointer-events-none z-20" />

              {/* Pulsing Thoracic Heartbeat Glow Core */}
              <div
                className="absolute top-[27%] left-[51%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-red-500/20 blur-md pointer-events-none animate-pulse"
                style={{ animationDuration: '0.85s' }}
              />

              {/* Interactive Anatomical Hotspots on Body */}
              {HOTSPOTS.map((spot) => {
                const isActive = activeHotspot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspot(spot)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group/hotspot focus:outline-none"
                    style={{
                      left: `${spot.xPercent}%`,
                      top: `${spot.yPercent}%`,
                    }}
                    title={`${spot.name}: ${spot.metricValue}`}
                  >
                    {/* Targeting Reticle Ping */}
                    <span className="relative flex items-center justify-center w-6 h-6">
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                          isActive ? 'bg-black' : 'bg-cyan-500'
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full w-3 h-3 border-2 shadow-sm transition-transform duration-200 group-hover/hotspot:scale-125 ${
                          isActive
                            ? 'bg-black border-white scale-125 ring-2 ring-black/40'
                            : 'bg-white border-black/80'
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* =================================================================
              4 FLOATING HOLOGRAPHIC 3D TELEMETRY CARDS (WHITE GLASS & BLACK TEXT)
              ================================================================= */}

          {/* 1. Top Left: Neural / Cognitive Synapse */}
          <div
            className="absolute top-4 left-3 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-lg max-w-[150px] sm:max-w-[170px] transition-all hover:scale-105"
            style={{ transform: 'translateZ(45px)' }}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
              <Brain size={12} className="text-black" />
              <span>Neural State</span>
            </div>
            <div className="text-xs sm:text-sm font-black text-black font-mono">
              99.4% Sync
            </div>
            <div className="text-[10px] text-zinc-600 font-medium">Alpha Wave Rhythms</div>
          </div>

          {/* 2. Middle Left: Cardiovascular & Live Heart Rate */}
          <div
            className="absolute top-28 sm:top-32 left-3 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-lg max-w-[150px] sm:max-w-[170px] transition-all hover:scale-105"
            style={{ transform: 'translateZ(50px)' }}
          >
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
              <span className="flex items-center gap-1">
                <Heart size={12} className="text-red-500 animate-pulse" />
                <span className="text-black font-bold">Cardio</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-black text-white font-mono">
                {bpm} BPM
              </span>
            </div>

            {/* Live Mini ECG Trace */}
            <svg className="w-full h-5 text-black overflow-visible my-0.5" viewBox="0 0 100 20">
              <path
                d="M 0 10 L 20 10 L 25 3 L 30 18 L 35 5 L 40 15 L 45 10 L 70 10 L 75 3 L 80 18 L 85 5 L 90 14 L 95 10 L 100 10"
                fill="none"
                stroke="#000000"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-ecg-trace"
                style={{ strokeDasharray: '120' }}
              />
            </svg>
            <div className="text-[9px] text-zinc-600 font-medium">Sinus Rhythm Normal</div>
          </div>

          {/* 3. Top Right: Oxygenation & Pulmonary Status */}
          <div
            className="absolute top-4 right-3 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-lg max-w-[150px] sm:max-w-[170px] transition-all hover:scale-105"
            style={{ transform: 'translateZ(45px)' }}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
              <Activity size={12} className="text-black" />
              <span>Oxygenation</span>
            </div>
            <div className="text-xs sm:text-sm font-black text-black font-mono">
              SpO2 99%
            </div>
            <div className="text-[10px] text-zinc-600 font-medium">16 Breaths / Min</div>
          </div>

          {/* 4. Bottom Right: Active Selected Hotspot Card */}
          <div
            className="absolute bottom-4 right-3 z-30 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-xl max-w-[170px] sm:max-w-[195px] transition-all"
            style={{ transform: 'translateZ(55px)' }}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-black mb-1">
              {React.createElement(activeHotspot.icon, { size: 12, className: 'text-black' })}
              <span className="truncate">{activeHotspot.name}</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs sm:text-sm font-black text-black font-mono">
                {activeHotspot.metricValue}
              </span>
              <span className="text-[9px] font-semibold text-zinc-500">
                {activeHotspot.metricLabel}
              </span>
            </div>
            <div className="text-[9px] text-zinc-600 line-clamp-2 mt-0.5 leading-snug">
              {activeHotspot.description}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Anatomy Switcher Pills */}
        <div className="mt-4 pt-3 border-t border-black/10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-black uppercase tracking-wider">
              Focus:
            </span>
            {HOTSPOTS.map((spot) => {
              const isSelected = activeHotspot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setActiveHotspot(spot)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-black text-white shadow-sm scale-105'
                      : 'bg-slate-100 text-zinc-700 hover:bg-zinc-200 hover:text-black'
                  }`}
                >
                  {spot.name.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-black">Scan Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
