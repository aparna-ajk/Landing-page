'use client';

import React, { useState, useRef } from 'react';
import {
  Building2,
  Bed,
  CalendarDays,
  Plus,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Activity,
  Gauge,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface BedPod {
  id: string;
  name: string;
  count: string;
  occupied: number;
  total: number;
  type: string;
  status: 'Full' | 'Available';
  pressure: string;
  hepa: string;
  nurseStation: string;
}

const BED_PODS: BedPod[] = [
  {
    id: 'icu-a',
    name: 'ICU Critical Pod A',
    count: '16/16 Occupied',
    occupied: 16,
    total: 16,
    type: 'Negative Pressure',
    status: 'Full',
    pressure: '-32 Pa (Iso)',
    hepa: 'ISO Class 5',
    nurseStation: 'Station 1-A',
  },
  {
    id: 'icu-b',
    name: 'ICU Critical Pod B',
    count: '12/16 Occupied',
    occupied: 12,
    total: 16,
    type: 'Isolation Capable',
    status: 'Available',
    pressure: '-28 Pa (Iso)',
    hepa: 'ISO Class 5',
    nurseStation: 'Station 1-B',
  },
  {
    id: 'exec-ward',
    name: 'Executive Ward (Level 4)',
    count: '28/32 Occupied',
    occupied: 28,
    total: 32,
    type: 'Single En-Suite',
    status: 'Available',
    pressure: '+12 Pa (Positive)',
    hepa: 'HEPA Standard',
    nurseStation: 'Concierge East',
  },
  {
    id: 'day-care',
    name: 'Day Care Surgery Unit',
    count: '18/24 Occupied',
    occupied: 18,
    total: 24,
    type: 'Short Stay',
    status: 'Available',
    pressure: '+15 Pa (Clean)',
    hepa: 'Rapid Turnover',
    nurseStation: 'Station 3-C',
  },
];

export default function HospitalAdminModule() {
  const [activeAdminTab, setActiveAdminTab] = useState<'beds' | 'shifts'>('beds');
  const [isAutoMoving, setIsAutoMoving] = useState<boolean>(true);
  const [isFastSpeed, setIsFastSpeed] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedPodId, setSelectedPodId] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Duplicate the 4 bed pods for seamless continuous infinite horizontal 3D movement
  const loopingBedPods = [...BED_PODS, ...BED_PODS];

  return (
    <section id="admin-module" className="relative py-28 bg-white text-black overflow-hidden select-none">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/15 text-black text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5 text-black" />
            Hospital Operations Back-Office
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black mb-5">
            Full-Spectrum Hospital <br />
            <span className="text-zinc-600">
              Administration &amp; Configuration
            </span>
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {[
            { id: 'beds', label: 'Room & Bed Management', icon: Bed },
            { id: 'shifts', label: 'Staff Shift Scheduling', icon: CalendarDays },
          ].map((tab) => {
            const IconC = tab.icon;
            const isCurrent = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white text-zinc-700 border border-black/20 hover:border-black'
                }`}
              >
                <IconC className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Admin Content Pane */}
        <div className="rounded-3xl border-2 border-black/10 bg-white p-6 sm:p-8 shadow-xl text-black">
          {activeAdminTab === 'beds' && (
            <div className="space-y-6">
              {/* Header with Title and 3D Motion Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/10 pb-4 gap-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <h3 className="text-lg font-black text-black">Ward &amp; Bed Capacity Master</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300/60 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                      <span className={`w-1.5 h-1.5 rounded-full bg-emerald-600 ${isAutoMoving ? 'animate-ping' : ''}`} />
                      3D Horizontal Motion {isAutoMoving ? 'Active' : 'Paused'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 font-medium">Total active census: 362 beds across 8 physical pavilions &bull; Live 3D telemetry ribbon</p>
                </div>

                {/* 3D Motion Interactive Controls */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {/* Manual Step Buttons */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-black/10">
                    <button
                      type="button"
                      onClick={() => handleManualScroll('left')}
                      title="Move Left"
                      aria-label="Move left"
                      className="p-1.5 rounded-lg hover:bg-white text-zinc-700 hover:text-black transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleManualScroll('right')}
                      title="Move Right"
                      aria-label="Move right"
                      className="p-1.5 rounded-lg hover:bg-white text-zinc-700 hover:text-black transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Play / Pause Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setIsAutoMoving(!isAutoMoving)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-black/10 text-xs font-bold text-zinc-800 transition-all"
                    title={isAutoMoving ? 'Pause horizontal movement' : 'Resume horizontal movement'}
                  >
                    {isAutoMoving ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Pause 3D</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span className="hidden md:inline">Resume 3D</span>
                      </>
                    )}
                  </button>

                  {/* Speed Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsFastSpeed(!isFastSpeed)}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                      isFastSpeed
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-zinc-600 border-black/15 hover:border-black'
                    }`}
                    title="Toggle motion velocity"
                  >
                    {isFastSpeed ? '2x Fast' : '1x Speed'}
                  </button>

                  {/* Add Bed Unit Button */}
                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm transition-all ml-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Add Bed</span>
                  </button>
                </div>
              </div>

              {/* 3D HORIZONTAL MOVING PERSPECTIVE VIEWPORT */}
              <div
                className="relative perspective-1200 py-3 overflow-hidden rounded-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Left & Right 3D Horizon Edge Fade Gradient Masks */}
                <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-20" />
                <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-20" />

                {/* 3D Horizontal Conveyor Track */}
                <div
                  ref={scrollContainerRef}
                  className="overflow-x-auto scrollbar-none py-4"
                  style={{
                    perspective: '1200px',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className={`flex items-stretch gap-5 w-max transform-style-3d ${
                      isAutoMoving ? (isFastSpeed ? 'animate-horizontal-move-3d-fast' : 'animate-horizontal-move-3d') : ''
                    }`}
                    style={{
                      animationPlayState: isAutoMoving ? (isHovered ? 'paused' : 'running') : 'paused',
                    }}
                  >
                    {loopingBedPods.map((bed, idx) => {
                      const isSelected = selectedPodId === `${bed.id}-${idx}`;
                      const occupancyRate = Math.round((bed.occupied / bed.total) * 100);

                      return (
                        <div
                          key={`${bed.id}-${idx}`}
                          onClick={() => setSelectedPodId(isSelected ? null : `${bed.id}-${idx}`)}
                          className={`w-[290px] sm:w-[320px] p-5 rounded-2xl bg-white border-2 transition-all duration-400 cursor-pointer card-3d-tilt relative group select-none flex-shrink-0 ${
                            isSelected
                              ? 'border-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35),0_0_0_2px_#000000] scale-[1.04] translate-y-[-8px]'
                              : 'border-black/10 hover:border-black/30 shadow-[0_12px_28px_-8px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.04)]'
                          }`}
                          style={{
                            transformStyle: 'preserve-3d',
                          }}
                        >
                          {/* Top Card Header: Name + Badge */}
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-xl bg-slate-100 border border-black/10 flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                                <Bed className="w-4 h-4" />
                              </div>
                              <span className="font-black text-black text-sm tracking-tight leading-snug">
                                {bed.name}
                              </span>
                            </div>

                            <span
                              className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold tracking-wider uppercase transition-all ${
                                bed.status === 'Full'
                                  ? 'bg-black text-white shadow-sm'
                                  : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                              }`}
                            >
                              {bed.status}
                            </span>
                          </div>

                          {/* Occupancy Big Metric */}
                          <div className="flex items-baseline justify-between mt-2 mb-1">
                            <div className="text-xl font-black font-mono text-black">
                              {bed.count}
                            </div>
                            <span className="text-xs font-mono font-bold text-zinc-500">
                              {occupancyRate}%
                            </span>
                          </div>

                          {/* 3D Occupancy Bar */}
                          <div className="w-full h-2 rounded-full bg-slate-100 border border-black/5 overflow-hidden mb-3">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${
                                bed.status === 'Full'
                                  ? 'bg-black'
                                  : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                              }`}
                              style={{ width: `${occupancyRate}%` }}
                            />
                          </div>

                          {/* Pod Subtitle / Air Pressure Spec */}
                          <div className="flex items-center justify-between text-[11px] text-zinc-600 font-semibold border-t border-black/5 pt-2.5">
                            <span className="flex items-center gap-1">
                              <Gauge className="w-3.5 h-3.5 text-zinc-500" />
                              {bed.type}
                            </span>
                            <span className="font-mono text-[10px] text-zinc-700 bg-slate-100 px-2 py-0.5 rounded">
                              {bed.pressure}
                            </span>
                          </div>

                          {/* Hover 3D Depth Layer */}
                          <div className="mt-2.5 pt-2 border-t border-dashed border-black/10 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                            <span>{bed.hepa}</span>
                            <span className="text-black font-bold group-hover:text-emerald-700 transition-colors">
                              {bed.nurseStation} &bull; Synced
                            </span>
                          </div>

                          {/* Subtle Glossy Bevel Accent Line */}
                          <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-black/15 to-transparent rounded-full pointer-events-none" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sub-bar hint */}
              <div className="flex items-center justify-between text-xs text-zinc-500 px-1 pt-1">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  Hover over any pod to inspect &bull; Drag or use arrows to navigate manually
                </span>
                <span className="font-mono text-[11px] text-zinc-400">
                  4 Core Pods &bull; Auto-Looping 3D Mesh
                </span>
              </div>
            </div>
          )}

          {activeAdminTab === 'shifts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div>
                  <h3 className="text-lg font-black text-black">Clinical Staff Rota &amp; Shift Roster</h3>
                  <p className="text-xs text-zinc-600 font-medium">Current active roster: Morning Shift (07:00 - 15:30)</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-black/5 border border-black/15 text-black text-xs font-mono font-bold">
                  100% Shift Compliance
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { role: 'Emergency Attending', doctor: 'Dr. Sarah Vance, MD', dept: 'Trauma Bay', phone: 'Ext 1004', status: 'On Duty' },
                  { role: 'Cardiology On-Call', doctor: 'Dr. Anthony Santos', dept: 'Cath Lab', phone: 'Ext 1422', status: 'On Duty' },
                  { role: 'Anesthesiology Lead', doctor: 'Dr. Kimberly Adams', dept: 'OT Suites 1-4', phone: 'Ext 2011', status: 'In Surgery' },
                  { role: 'Charge Nurse Supervisor', doctor: 'Elena Rostova, BSN', dept: 'ICU Pod A', phone: 'Ext 3099', status: 'On Duty' },
                ].map((s, idx) => (
                  <div key={idx} className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-black/10 text-xs">
                    <div>
                      <span className="font-bold text-black text-sm">{s.doctor}</span>
                      <div className="text-zinc-600 text-[11px] font-medium">{s.role} &bull; {s.dept}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-zinc-600 font-bold">{s.phone}</span>
                      <span className="px-2.5 py-0.5 rounded bg-black text-white font-mono text-[10px] font-bold">
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
