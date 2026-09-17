'use client';

import React, { useState } from 'react';
import {
  Syringe,
  Activity,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Flame,
  Radio,
  Sparkles,
  Users,
  Airplay,
  Thermometer,
  Gauge,
} from 'lucide-react';
import ThreeDCard from '@/components/ui/ThreeDCard';

export default function OperationTheatre() {
  const [selectedSuite, setSelectedSuite] = useState('OT-1');

  const suites = [
    {
      id: 'OT-1',
      name: 'Cardiothoracic Suite 1',
      procedure: 'Minimally Invasive CABG (Off-Pump)',
      leadSurgeon: 'Dr. Marcus Brody, MD, FACS',
      anesthesiologist: 'Dr. Kimberly Adams',
      scrubNurse: 'Elena Rostova, RN',
      phase: 'Intra-Op (Minute 84)',
      status: 'Active Surgery',
      patient: 'Robert Vance (55, M)',
      temp: '19.4°C',
      humidity: '46%',
      pressure: '+28 Pa (Positive Cleanroom)',
      hepaStatus: 'Optimal (ISO Class 5)',
      checklist: {
        signIn: true,
        timeOut: true,
        signOut: false,
      },
      spongeCount: 'Accounted (32/32 RFID Tags)',
    },
    {
      id: 'OT-2',
      name: 'Robotic Neuro Suite',
      procedure: 'Da Vinci Assisted Glioblastoma Resection',
      leadSurgeon: 'Dr. Julian Thorne, PhD',
      anesthesiologist: 'Dr. Ryan Park',
      scrubNurse: 'Sarah Lin, RN',
      phase: 'Preparation / Time-Out',
      status: 'In Prep',
      patient: 'Claire Henderson (39, F)',
      temp: '20.1°C',
      humidity: '48%',
      pressure: '+26 Pa',
      hepaStatus: 'Optimal (ISO Class 5)',
      checklist: {
        signIn: true,
        timeOut: false,
        signOut: false,
      },
      spongeCount: 'Verified Initial (24/24)',
    },
    {
      id: 'OT-3',
      name: 'Orthopedic Trauma Suite',
      procedure: 'Total Hip Arthroplasty (Navigated)',
      leadSurgeon: 'Dr. Robert Stirling, MD',
      anesthesiologist: 'Dr. Sandra Bell',
      scrubNurse: 'Tanya Gomez, RN',
      phase: 'PACU Handover',
      status: 'Post-Op Transfer',
      patient: 'Arthur Pendelton (72, M)',
      temp: '21.0°C',
      humidity: '44%',
      pressure: '+24 Pa',
      hepaStatus: 'Optimal (ISO Class 5)',
      checklist: {
        signIn: true,
        timeOut: true,
        signOut: true,
      },
      spongeCount: '100% Reconciled (48/48)',
    },
  ];

  const currentSuite = suites.find((s) => s.id === selectedSuite) || suites[0];

  return (
    <section id="smart-ot" className="relative py-28 bg-white dark:bg-[#0B1F33] text-slate-900 dark:text-white overflow-hidden transition-colors">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(2,132,199,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0284C7]/10 dark:bg-[#18C7C9]/15 border border-[#0284C7]/25 dark:border-[#18C7C9]/30 text-[#0284C7] dark:text-[#18C7C9] text-xs font-semibold uppercase tracking-wider mb-4">
            <Syringe className="w-3.5 h-3.5" />
            Smart Surgical Theatres
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-5">
            Precision Surgical Orchestration & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#059669] dark:from-[#18C7C9] dark:via-[#1479FF] dark:to-[#20B26B]">
              Intelligent Intra-Op Guard
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Real-time telemetry uniting WHO safety protocols, RFID instrument reconciliation, environmental HEPA
            sensors, and live surgical status displays for surgical staff and waiting families.
          </p>
        </div>

        {/* OT Command Display with 3D Spatial Depth */}
        <ThreeDCard maxTilt={3.5} scale={1.01} glare={false}>
          <div className="rounded-3xl border border-slate-200/90 dark:border-white/15 bg-slate-50/90 dark:bg-[#071521]/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
          {/* Suite Selector Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-8 border-b border-slate-200 dark:border-white/10 pb-4">
            {suites.map((suite) => (
              <button
                key={suite.id}
                onClick={() => setSelectedSuite(suite.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedSuite === suite.id
                    ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/20 font-bold dark:bg-[#18C7C9] dark:text-[#071521]'
                    : 'bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 shadow-sm'
                }`}
              >
                <Radio className={`w-3.5 h-3.5 ${selectedSuite === suite.id ? 'animate-pulse text-white dark:text-[#071521]' : 'text-[#0284C7] dark:text-[#18C7C9]'}`} />
                <span>{suite.id}: {suite.name.split(' ')[0]} {suite.name.split(' ')[1]}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${selectedSuite === suite.id ? 'bg-white/20 text-white dark:bg-[#071521]/20 dark:text-[#071521]' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'}`}>
                  {suite.phase.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Suite Overview & Live Clinical Feed (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Active Case Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0B1F33] to-[#0A2640] border border-white/10 relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-mono font-bold text-[#18C7C9] uppercase tracking-wider">
                    {currentSuite.name} &bull; {currentSuite.status}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    LIVE TELEMETRY
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{currentSuite.procedure}</h3>
                <p className="text-xs text-slate-400">
                  Patient: <span className="text-white font-medium">{currentSuite.patient}</span> &bull; Active Phase: <span className="text-[#18C7C9] font-mono font-semibold">{currentSuite.phase}</span>
                </p>

                {/* Surgical Team */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Lead Surgeon</span>
                    <span className="font-semibold text-white">{currentSuite.leadSurgeon}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Anesthesiologist</span>
                    <span className="font-semibold text-white">{currentSuite.anesthesiologist}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Scrub Nurse</span>
                    <span className="font-semibold text-white">{currentSuite.scrubNurse}</span>
                  </div>
                </div>
              </div>

              {/* WHO Surgical Safety Checklist Progression */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white uppercase tracking-wider font-mono">
                    WHO Surgical Safety Verification Protocol
                  </span>
                  <span className="text-[#20B26B] font-mono text-[11px]">Audit Trailed & Bull; Tamper-Proof</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className={`p-3 rounded-xl border text-center ${currentSuite.checklist.signIn ? 'bg-[#20B26B]/15 border-[#20B26B]/40 text-[#20B26B]' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                    <div className="font-bold text-xs">Sign In</div>
                    <div className="text-[10px] mt-0.5">{currentSuite.checklist.signIn ? 'Completed (07:45)' : 'Pending'}</div>
                  </div>
                  <div className={`p-3 rounded-xl border text-center ${currentSuite.checklist.timeOut ? 'bg-[#20B26B]/15 border-[#20B26B]/40 text-[#20B26B]' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                    <div className="font-bold text-xs">Time Out</div>
                    <div className="text-[10px] mt-0.5">{currentSuite.checklist.timeOut ? 'Verified (08:12)' : 'In Progress'}</div>
                  </div>
                  <div className={`p-3 rounded-xl border text-center ${currentSuite.checklist.signOut ? 'bg-[#20B26B]/15 border-[#20B26B]/40 text-[#20B26B]' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                    <div className="font-bold text-xs">Sign Out</div>
                    <div className="text-[10px] mt-0.5">{currentSuite.checklist.signOut ? 'Finalized' : 'Awaiting Closure'}</div>
                  </div>
                </div>

                {/* RFID Sponge and Instrument Verification */}
                <div className="p-3 rounded-xl bg-[#071521] border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#20B26B]" />
                    <span className="text-slate-300">RFID Sponge & Laparotomy Sponge Sensor:</span>
                  </div>
                  <span className="font-mono font-bold text-[#20B26B]">{currentSuite.spongeCount}</span>
                </div>
              </div>
            </div>

            {/* Right Cleanroom Environment & Telemetry (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#18C7C9] flex items-center gap-1.5">
                  <Gauge className="w-4 h-4" />
                  Cleanroom HVAC & HEPA Telemetry
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#071521] border border-white/5">
                    <span className="text-slate-400 block text-[11px] mb-1">Room Temp</span>
                    <span className="text-xl font-bold font-mono text-white">{currentSuite.temp}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#071521] border border-white/5">
                    <span className="text-slate-400 block text-[11px] mb-1">Humidity</span>
                    <span className="text-xl font-bold font-mono text-white">{currentSuite.humidity}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#071521] border border-white/5">
                    <span className="text-slate-400 block text-[11px] mb-1">Differential Pressure</span>
                    <span className="text-xl font-bold font-mono text-[#20B26B]">{currentSuite.pressure}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#071521] border border-white/5">
                    <span className="text-slate-400 block text-[11px] mb-1">HEPA Filtration</span>
                    <span className="text-xs font-bold text-white mt-1 block">{currentSuite.hepaStatus}</span>
                  </div>
                </div>

                {/* Family Waiting Room Broadcast Notice */}
                <div className="p-3 rounded-xl bg-[#1479FF]/10 border border-[#1479FF]/20 text-xs text-slate-300">
                  <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
                    <Airplay className="w-3.5 h-3.5 text-[#1479FF]" />
                    Family Waiting Room Smart Display
                  </div>
                  Live status synced anonymously to Waiting Bay Monitor (Screen #03). Family notified: Stage 2 of 3.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#18C7C9]/10 to-[#1479FF]/10 border border-[#18C7C9]/30 text-xs">
                <div className="font-bold text-white mb-1">Sterilization & Autoclave Log</div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  All instrument trays verified with GS1 DataMatrix barcodes and biological indicator verification
                  prior to incision. Zero hospital-acquired surgical site infection rate across 1,840 procedures.
                </p>
              </div>
            </div>
          </div>
        </div>
        </ThreeDCard>
      </div>
    </section>
  );
}
