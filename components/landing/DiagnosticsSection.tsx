'use client';

import React, { useState } from 'react';
import {
  Scan,
  FlaskConical,
  Activity,
  Maximize2,
  ZoomIn,
  Sun,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Layers,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import ThreeDCard from '@/components/ui/ThreeDCard';

export default function DiagnosticsSection() {
  const [activeTab, setActiveTab] = useState<'radiology' | 'pathology'>('radiology');
  const [contrastMode, setContrastMode] = useState<'soft' | 'bone' | 'lung'>('soft');
  const [showAiOverlay, setShowAiOverlay] = useState(true);

  return (
    <section id="specialization" className="relative py-28 bg-[#F8FAFC] dark:bg-[#071521] text-slate-900 dark:text-white overflow-hidden transition-colors">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(2,132,199,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0284C7]/10 dark:bg-[#18C7C9]/15 border border-[#0284C7]/25 dark:border-[#18C7C9]/30 text-[#0284C7] dark:text-[#18C7C9] text-xs font-semibold uppercase tracking-wider mb-4">
              <Scan className="w-3.5 h-3.5" />
              Next-Gen Diagnostics
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Precision Radiology & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#059669] dark:from-[#18C7C9] dark:via-[#1479FF] dark:to-[#20B26B]">
                High-Throughput Pathology
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Cloud-native DICOM PACS rendering in sub-second speeds, paired with automated lab analyzers
              and instant clinical panic-value escalation.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 self-start md:self-auto shadow-sm">
            <button
              onClick={() => setActiveTab('radiology')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'radiology'
                  ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/20 font-bold dark:bg-[#18C7C9] dark:text-[#071521]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Scan className="w-4 h-4" />
              Radiology & PACS
            </button>
            <button
              onClick={() => setActiveTab('pathology')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'pathology'
                  ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/20 font-bold dark:bg-[#18C7C9] dark:text-[#071521]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              Pathology & LIS
            </button>
          </div>
        </div>

        {/* Dynamic Display with 3D Spatial Depth */}
        <ThreeDCard maxTilt={4} scale={1.01} glare={false}>
          {activeTab === 'radiology' ? (
            <div className="rounded-3xl border border-white/15 bg-[#0B1F33]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left PACS Visualizer */}
                <div className="lg:col-span-7 bg-[#050D15] rounded-2xl border border-white/15 p-4 sm:p-5 relative overflow-hidden">
                {/* DICOM viewer header */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[#18C7C9] font-bold">DICOM v3.0 &bull; CT CHEST WITH CONTRAST</span>
                    <span className="hidden sm:inline text-slate-500">Slice 42/128</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">1024x1024 16-bit</span>
                    <Maximize2 className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-white" />
                  </div>
                </div>

                {/* Scan Image Container with Scanlines & AI Bounding Box */}
                <div className="relative h-72 sm:h-96 rounded-xl bg-[#04080F] border border-white/10 flex items-center justify-center overflow-hidden">
                  {/* Subtle CT Simulation concentric rings and chest contours */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <div className="w-64 h-64 rounded-full border-2 border-slate-700/60 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full border border-slate-600/50 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border border-slate-500/40" />
                      </div>
                    </div>
                  </div>

                  {/* Radiopaque lung silhouette shapes */}
                  <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-60">
                    <div className="w-20 h-44 rounded-full bg-slate-800/80 border border-slate-600/40 blur-sm" />
                    <div className="w-20 h-44 rounded-full bg-slate-800/80 border border-slate-600/40 blur-sm" />
                  </div>

                  {/* Animated Scanline */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#18C7C9] to-transparent animate-scanline opacity-75 shadow-[0_0_15px_#18C7C9]" />

                  {/* AI Detection Overlay Bounding Box */}
                  {showAiOverlay && (
                    <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-dashed border-[#18C7C9] rounded-lg p-1.5 flex flex-col justify-between bg-[#18C7C9]/10 animate-pulse-glow">
                      <span className="text-[9px] font-mono text-[#18C7C9] font-bold bg-[#071521]/90 px-1 py-0.5 rounded w-fit">
                        Nodule 8.4mm
                      </span>
                      <span className="text-[9px] font-mono text-[#20B26B] font-bold bg-[#071521]/90 px-1 py-0.5 rounded w-fit">
                        Benign: 94.2%
                      </span>
                    </div>
                  )}

                  {/* Corner Metadata Overlays */}
                  <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-400 space-y-0.5 bg-[#071521]/70 p-2 rounded backdrop-blur">
                    <div>WL: 40 / WW: 400 ({contrastMode.toUpperCase()})</div>
                    <div>Thickness: 1.25mm &bull; FOV: 350mm</div>
                  </div>
                </div>

                {/* DICOM Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 mr-2 text-[11px]">Window Presets:</span>
                    {(['soft', 'bone', 'lung'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setContrastMode(mode)}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase transition-colors ${
                          contrastMode === mode ? 'bg-[#18C7C9] text-[#071521] font-bold' : 'bg-white/5 hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowAiOverlay(!showAiOverlay)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-colors ${
                      showAiOverlay
                        ? 'bg-[#18C7C9]/20 text-[#18C7C9] border border-[#18C7C9]/40'
                        : 'bg-white/5 text-slate-400 border border-white/10'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    AI Annotations {showAiOverlay ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              {/* Right Telemetry & AI Diagnostic Summary */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#18C7C9] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    AUTOMATED RADIOLOGY CAD ENGINE
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Sub-Second PACS Streaming with AI Pre-Read
                  </h3>
                  <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                    Zero-footprint HTML5 WebGL viewer loads gigabyte-scale multi-slice scans on standard
                    workstations in less than 600ms, pre-annotated with FDA-cleared diagnostic AI.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">AI Detection Confidence</span>
                      <span className="font-mono text-[#20B26B]">99.1% Negative Predictive</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#18C7C9] to-[#20B26B] w-[92%]" />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">Direct HL7 / DICOM Bridge</div>
                      <div className="text-slate-400 text-[11px]">Instant radiologist speech-to-text dictation</div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#20B26B]" />
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#login"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#18C7C9] to-[#1479FF] text-[#071521] font-semibold text-xs hover:shadow-lg transition-all"
                  >
                    Launch PACS Workstation Simulator
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Pathology & LIS Tab */
          <div className="rounded-3xl border border-white/15 bg-[#0B1F33]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Live Laboratory Analyzer Queue (Cobas 8000 & Sysmex XN-9000)
                </div>

                {/* Sample Rows */}
                {[
                  { id: 'SMP-84920', test: 'High-Sensitivity Troponin I', patient: 'Elena Rostova', result: '0.082 ng/mL', ref: '< 0.014', flag: 'CRITICAL HIGH', time: '1m ago' },
                  { id: 'SMP-84921', test: 'Complete Blood Count (CBC)', patient: 'Marcus Sterling', result: 'WBC 7.4 x10^3', ref: '4.5 - 11.0', flag: 'NORMAL', time: '4m ago' },
                  { id: 'SMP-84922', test: 'Comprehensive Metabolic Panel', patient: 'Aaliyah Chen', result: 'eGFR > 90', ref: '> 60 mL/min', flag: 'NORMAL', time: '8m ago' },
                  { id: 'SMP-84923', test: 'D-Dimer Quantitative', patient: 'David Harrison', result: '240 ng/mL', ref: '< 500 ng/mL', flag: 'NORMAL', time: '12m ago' },
                ].map((sample, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                      sample.flag === 'CRITICAL HIGH'
                        ? 'bg-red-500/10 border-red-500/40 text-red-200'
                        : 'bg-white/5 border-white/5 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{sample.test}</span>
                        <span className="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                          {sample.id}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        Patient: {sample.patient} &bull; Ref: {sample.ref}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-mono font-bold text-white text-sm">{sample.result}</div>
                        <div className="text-[10px] text-slate-400">{sample.time}</div>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded font-mono text-[10px] font-bold ${
                          sample.flag === 'CRITICAL HIGH'
                            ? 'bg-red-500 text-white animate-pulse'
                            : 'bg-[#20B26B]/20 text-[#20B26B]'
                        }`}
                      >
                        {sample.flag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-red-400 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4" />
                    Automated Panic Value Escalation
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    When an analyzer detects a life-threatening out-of-range parameter, MediCare HMS automatically
                    initiates emergency physician push alerts and logs read-back confirmation.
                  </p>
                  <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-[11px] text-red-300 flex items-center justify-between">
                    <span>Active Alert Sent to Dr. Vance</span>
                    <span className="font-mono font-bold">ACKNOWLEDGED in 18s</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="font-semibold text-white">Bi-Directional LIS Interfacing</div>
                  <p className="text-slate-400">
                    Supports ASTM 1394, HL7 v2.5.1, and FHIR DiagnosticReport standards with zero middleware fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </ThreeDCard>
    </div>
  </section>
  );
}
