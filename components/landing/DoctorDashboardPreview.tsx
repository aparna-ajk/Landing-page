'use client';

import React, { useState } from 'react';
import {
  Stethoscope,
  Activity,
  Heart,
  FileText,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Bot,
  Pill,
  Send,
  User,
  Clock,
  Mic,
  ShieldCheck,
  ChevronRight,
  TrendingDown,
} from 'lucide-react';

export default function DoctorDashboardPreview() {
  const [selectedPatient, setSelectedPatient] = useState('Elena Rostova');
  const [aiAnalysisRunning, setAiAnalysisRunning] = useState(false);
  const [aiVerified, setAiVerified] = useState(true);

  const patients = [
    { id: 'PT-1049', name: 'Elena Rostova', age: 48, gender: 'F', bed: 'ICU-B04', triage: 'Critical', time: '10m ago', heartRate: 118, bp: '138/88', spo2: '94%' },
    { id: 'PT-1050', name: 'Marcus Sterling', age: 62, gender: 'M', bed: 'Ward-201', triage: 'Moderate', time: '22m ago', heartRate: 76, bp: '122/78', spo2: '98%' },
    { id: 'PT-1051', name: 'Aaliyah Chen', age: 31, gender: 'F', bed: 'OPD-12', triage: 'Standard', time: '35m ago', heartRate: 82, bp: '118/74', spo2: '99%' },
    { id: 'PT-1052', name: 'Robert Vance', age: 55, gender: 'M', bed: 'Ward-108', triage: 'Moderate', time: '48m ago', heartRate: 89, bp: '132/84', spo2: '97%' },
  ];

  const currentPatientData = patients.find(p => p.name === selectedPatient) || patients[0];

  const runAiVerification = () => {
    setAiAnalysisRunning(true);
    setTimeout(() => {
      setAiAnalysisRunning(false);
      setAiVerified(true);
    }, 1200);
  };

  return (
    <section id="doctors" className="relative py-28 bg-[#F8FAFC] dark:bg-[#071521] text-slate-900 dark:text-white overflow-hidden transition-colors">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(2,132,199,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0284C7]/10 dark:bg-[#18C7C9]/15 border border-[#0284C7]/25 dark:border-[#18C7C9]/30 text-[#0284C7] dark:text-[#18C7C9] text-xs font-semibold uppercase tracking-wider mb-4">
            <Stethoscope className="w-3.5 h-3.5" />
            Physician Experience
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-5">
            Designed for Clinicians.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#059669] dark:from-[#18C7C9] dark:via-[#1479FF] dark:to-[#20B26B]">
              Powered by Clinical AI.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            A high-velocity workstation that synthesizes multi-parameter telemetry, ambient voice clinical documentation,
            and real-time contraindication guards into a zero-clutter interface.
          </p>
        </div>

        {/* Workstation Container */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-300/80 dark:border-white/15 bg-[#0B1F33] text-white shadow-2xl overflow-hidden ring-1 ring-slate-900/10">
          {/* Top Window Bar */}
          <div className="px-5 py-3.5 bg-[#071521]/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-slate-400 border-l border-white/10 pl-3">
                MediCare Clinician Station v4.2 &bull; Dr. Sarah Vance, MD (Cardiothoracic)
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="flex items-center gap-1 text-[#20B26B]">
                <span className="w-2 h-2 rounded-full bg-[#20B26B] animate-pulse" />
                Ambient EHR Scribe: Active
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300">
                ICD-11 Auto-Assisted
              </span>
            </div>
          </div>

          {/* Workstation Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Column 1: Patient Queue (3 cols) */}
            <div className="lg:col-span-3 p-4 bg-[#071521]/40">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Active Ward Queue (4)
                </span>
                <span className="text-[10px] text-[#18C7C9] bg-[#18C7C9]/10 px-2 py-0.5 rounded">
                  Live Sync
                </span>
              </div>

              <div className="space-y-2">
                {patients.map((p) => {
                  const isSelected = p.name === selectedPatient;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPatient(p.name)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#1479FF]/15 border-[#1479FF] shadow-md shadow-[#1479FF]/20'
                          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{p.name}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                            p.triage === 'Critical'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : p.triage === 'Moderate'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-[#20B26B]/20 text-[#20B26B]'
                          }`}
                        >
                          {p.triage}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{p.gender}, {p.age}y &bull; {p.bed}</span>
                        <span className="font-mono text-[10px]">{p.time}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Shift Handover Note */}
              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-400">
                <div className="font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#18C7C9]" />
                  Shift Handover Telemetry
                </div>
                12 beds occupied, 3 step-down ready, 1 pending surgical clearance.
              </div>
            </div>

            {/* Column 2: Clinical Telemetry & Vital Monitor (6 cols) */}
            <div className="lg:col-span-6 p-5 sm:p-6 space-y-6">
              {/* Selected Patient Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#18C7C9] to-[#1479FF] flex items-center justify-center font-bold text-[#071521] text-sm">
                    {currentPatientData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">{currentPatientData.name}</h4>
                      <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-slate-300">
                        {currentPatientData.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Admitted: 14h ago &bull; Primary Dx: Acute Myocardial Infarction (NSTEMI)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300">
                    <Mic className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                    Record Note
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18C7C9] hover:bg-[#18C7C9]/90 text-[#071521] font-semibold text-xs">
                    <FileText className="w-3.5 h-3.5" />
                    Full Chart
                  </button>
                </div>
              </div>

              {/* 4-Channel Real-time Vitals Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#071521]/60 border border-white/5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Heart Rate</span>
                    <Heart className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {currentPatientData.heartRate}{' '}
                    <span className="text-[11px] font-normal text-slate-400">BPM</span>
                  </div>
                  <div className="text-[10px] text-red-400 mt-1 font-mono">Sinus Tach</div>
                </div>

                <div className="p-3 rounded-xl bg-[#071521]/60 border border-white/5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Blood Pressure</span>
                    <Activity className="w-3.5 h-3.5 text-[#18C7C9]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {currentPatientData.bp}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">MAP: 104 mmHg</div>
                </div>

                <div className="p-3 rounded-xl bg-[#071521]/60 border border-white/5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>SpO2</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#20B26B]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {currentPatientData.spo2}
                  </div>
                  <div className="text-[10px] text-[#20B26B] mt-1 font-mono">2L O2 Nasal</div>
                </div>

                <div className="p-3 rounded-xl bg-[#071521]/60 border border-white/5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Resp Rate</span>
                    <TrendingDown className="w-3.5 h-3.5 text-[#1479FF]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    18 <span className="text-[11px] font-normal text-slate-400">/min</span>
                  </div>
                  <div className="text-[10px] text-[#20B26B] mt-1 font-mono">Eupneic</div>
                </div>
              </div>

              {/* Dynamic Live ECG Strip Preview */}
              <div className="p-3.5 rounded-xl bg-[#071521] border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span className="font-mono text-[11px] text-[#18C7C9]">Lead II Continuous Waveform (25mm/s)</span>
                  <span className="text-[10px] font-mono text-[#20B26B]">ST elevation: +1.2mm</span>
                </div>
                <div className="h-14 w-full relative flex items-center">
                  <svg className="w-full h-12 text-[#18C7C9]" viewBox="0 0 500 50" preserveAspectRatio="none">
                    <path
                      d="M0 25 L80 25 L90 28 L95 10 L105 45 L115 5 L125 35 L130 25 L210 25 L220 28 L225 10 L235 45 L245 5 L255 35 L260 25 L340 25 L350 28 L355 10 L365 45 L375 5 L385 35 L390 25 L470 25 L480 28 L485 10 L495 45 L500 25"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>

              {/* Order Entry & Active Prescriptions */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-[#1479FF]" />
                    Active Orders & Medications
                  </span>
                  <span className="text-[11px] font-mono text-[#20B26B]">3 Administered</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#071521]/60">
                    <div>
                      <span className="font-semibold text-white">Aspirin 81 mg PO Daily</span>
                      <span className="text-slate-400 text-[11px] block">Antiplatelet &bull; Last given 08:00</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#20B26B]/15 text-[#20B26B] font-mono text-[10px]">Verified</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#071521]/60">
                    <div>
                      <span className="font-semibold text-white">Atorvastatin 80 mg PO Nightly</span>
                      <span className="text-slate-400 text-[11px] block">Lipid lowering &bull; Due 21:00</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#18C7C9]/15 text-[#18C7C9] font-mono text-[10px]">Scheduled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: AI Clinical Assistant (3 cols) */}
            <div className="lg:col-span-3 p-4 sm:p-5 bg-[#071521]/60 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-[#18C7C9] to-[#1479FF] flex items-center justify-center text-[#071521]">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">MediCare AI Copilot</div>
                      <div className="text-[10px] text-[#20B26B] font-mono">Clinical Guard Active</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#18C7C9]/15 text-[#18C7C9] text-[10px] font-mono">
                    GPT-Med
                  </span>
                </div>

                {/* AI Insights Card */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-3 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#18C7C9]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Real-time Contraindication Check
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Patient has documented mild shellfish allergy. No iodine contrast contraindication detected for planned coronary angiography.
                  </p>
                  <div className="p-2 rounded-lg bg-[#20B26B]/10 border border-[#20B26B]/20 text-[10px] text-[#20B26B] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    Zero drug-drug interactions detected.
                  </div>
                </div>

                {/* Suggested Clinical Actions */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Recommended Orders
                  </div>
                  <button
                    onClick={runAiVerification}
                    className="w-full text-left p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-slate-200 transition-colors flex items-center justify-between"
                  >
                    <span>Repeat Troponin I at 14:00</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button
                    onClick={runAiVerification}
                    className="w-full text-left p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-slate-200 transition-colors flex items-center justify-between"
                  >
                    <span>Transthoracic Echo order</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Instant Verification CTA */}
              <button
                onClick={runAiVerification}
                disabled={aiAnalysisRunning}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#18C7C9] to-[#1479FF] hover:opacity-95 text-[#071521] font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                {aiAnalysisRunning ? (
                  <>
                    <span className="w-3 h-3 rounded-full border-2 border-[#071521] border-t-transparent animate-spin" />
                    Analyzing Medical Graph...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Re-Verify Patient Safety Graph
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
