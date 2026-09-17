'use client';

import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  QrCode,
  HeartCrack,
  Stethoscope,
  FlaskRound as Flask,
  Syringe,
  Pill,
  Receipt,
  UserCheck,
  Play,
  RotateCcw,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  TrendingUp,
} from 'lucide-react';

interface Stage {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  timeEstimate: string;
  automatedPercent: string;
  details: string;
  systemAction: string;
  metric: string;
}

const STAGES: Stage[] = [
  {
    id: 1,
    title: 'Appointment Booking',
    subtitle: 'Omnichannel Smart Scheduling',
    icon: CalendarCheck,
    timeEstimate: '45 seconds',
    automatedPercent: '100% Automated',
    details: 'Patient reserves consultation via Mobile App, WhatsApp AI bot, or Web Portal with auto-doctor matching.',
    systemAction: 'Auto-syncs slot with Dr. Thorne’s calendar & sends calendar invite with directions.',
    metric: '92% reduction in call center load',
  },
  {
    id: 2,
    title: 'Digital Check-in',
    subtitle: 'Zero-Queue Kiosk / Mobile QR',
    icon: QrCode,
    timeEstimate: '20 seconds',
    automatedPercent: 'Self-Service',
    details: 'Geofenced contactless check-in or QR kiosk scan. Face-ID or national healthcare ID verification.',
    systemAction: 'Issues digital token #A-42 and pushes real-time queue position to patient smartphone.',
    metric: 'Zero waiting room paper forms',
  },
  {
    id: 3,
    title: 'Triage Assessment',
    subtitle: 'AI Emergency Severity Index',
    icon: HeartCrack,
    timeEstimate: '3 minutes',
    automatedPercent: 'AI Assisted',
    details: 'Vital signs auto-ingested from Bluetooth monitors: SpO2, BP, Temp, ECG. AI assigns ESI score.',
    systemAction: 'Flags acute sinus tachycardia to nurse station with priority audio chime.',
    metric: 'Sub-90s critical case escalation',
  },
  {
    id: 4,
    title: 'Consultation',
    subtitle: 'Doctor Clinical Workstation',
    icon: Stethoscope,
    timeEstimate: '15 minutes',
    automatedPercent: 'Ambient Scribe',
    details: 'Doctor examines patient with ambient voice AI transcription generating structured SOAP notes in real time.',
    systemAction: 'Ambient microphone generates ICD-11 codes and drafts e-Prescription in background.',
    metric: '2.5 hrs saved per doctor/shift',
  },
  {
    id: 5,
    title: 'Diagnostics & Lab',
    subtitle: 'Direct Barcoded Orders',
    icon: Flask,
    timeEstimate: '18 minutes',
    automatedPercent: 'Automated Track',
    details: 'Automated pneumatic tube sample delivery to central lab. Robotic analyzer feeds results into EHR.',
    systemAction: 'Biochemical panel auto-verified by analyzer; abnormal Troponin trigger alerts cardiologist.',
    metric: '70% faster turnaround time',
  },
  {
    id: 6,
    title: 'Treatment / OT',
    subtitle: 'Precision Surgical Workflow',
    icon: Syringe,
    timeEstimate: 'Scheduled',
    automatedPercent: 'IoT Guarded',
    details: 'Smart OT integration with biometric surgical team verification, sponge RFID count, and anesthesia feed.',
    systemAction: 'Live surgical progress dashboard broadcast to authorized family waiting area displays.',
    metric: '100% WHO safety checklist compliance',
  },
  {
    id: 7,
    title: 'Pharmacy Dispensing',
    subtitle: 'Closed-Loop Barcode Match',
    icon: Pill,
    timeEstimate: '3 minutes',
    automatedPercent: 'Robotic Pick',
    details: 'Digital prescription lands directly on robotic dispenser. Pharmacist scans patient wristband to release.',
    systemAction: 'Automated drug-drug interaction screening verifies zero contraindications with existing Rx.',
    metric: '0.00% medication dispense error',
  },
  {
    id: 8,
    title: 'Automated Billing',
    subtitle: 'Instant TPA Cashless Settlement',
    icon: Receipt,
    timeEstimate: 'Instant',
    automatedPercent: 'AI Adjudicated',
    details: 'Pre-auth policy verification and itemized claim package compiled automatically from medical events.',
    systemAction: 'FHIR claims bridge submits bill directly to insurer API; claim clearance approved in 8 seconds.',
    metric: '$0 disputed or delayed claims',
  },
  {
    id: 9,
    title: 'Post-Care Follow-up',
    subtitle: 'Remote Recovery Monitoring',
    icon: UserCheck,
    timeEstimate: 'Ongoing (14 Days)',
    automatedPercent: 'Continuous AI',
    details: 'Automated medication adherence reminders, symptom check chatbot, and scheduled tele-follow-up.',
    systemAction: 'Wearable smartwatch syncs daily heart rate variability; alerts clinic if patient relapses.',
    metric: '41% lower 30-day readmission',
  },
];

const STAGE_TELEMETRY: Record<
  number,
  {
    patientStatus: string;
    chiefComplaint: string;
    telemetryLog: string;
    assignedDoctor: string;
    alertLevel: string;
  }
> = {
  1: {
    patientStatus: 'Self-Booking Confirmed',
    chiefComplaint: 'Acute retrosternal chest pain (onset 45m ago)',
    telemetryLog: 'Slot matched with Dr. Vance | SMS & QR Pass sent',
    assignedDoctor: 'Dr. Sarah Vance, MD (Cardiology)',
    alertLevel: 'Standard Schedule',
  },
  2: {
    patientStatus: 'Kiosk QR Check-in Complete',
    chiefComplaint: 'Acute chest tightness, radiating to left arm',
    telemetryLog: 'Token #A-42 issued | Face-ID verified | Queue pos: #1',
    assignedDoctor: 'Triage Nurse J. Miller, RN',
    alertLevel: 'Fast-Track Priority',
  },
  3: {
    patientStatus: 'Triage ESI Level 2 Critical',
    chiefComplaint: 'HR 114 bpm, BP 148/92, SpO2 96%, ECG Sinus Tach',
    telemetryLog: 'Bluetooth vitals ingested | Emergency team alerted',
    assignedDoctor: 'Dr. Sarah Vance, MD & Trauma Team',
    alertLevel: 'Urgent Stat Alert',
  },
  4: {
    patientStatus: 'In-Person Consultation Active',
    chiefComplaint: 'Substernal pressure, diaphoresis noted',
    telemetryLog: 'Ambient voice AI capturing SOAP note & ICD-11 codes',
    assignedDoctor: 'Dr. Sarah Vance, MD (Cardiology)',
    alertLevel: 'Clinical Evaluation',
  },
  5: {
    patientStatus: 'Stat Lab Panel in Progress',
    chiefComplaint: 'Troponin I, CK-MB, CBC, D-Dimer ordered',
    telemetryLog: 'Pneumatic tube dispatched | Barcode #LAB-8819 verified',
    assignedDoctor: 'Pathology Lab Auto-Analyzer #04',
    alertLevel: 'Stat Lab Tracking',
  },
  6: {
    patientStatus: 'Cath Lab Procedure Prepared',
    chiefComplaint: 'Ischemic ST elevation confirmed on follow-up ECG',
    telemetryLog: 'RFID sponge check active | OT surgical dashboard live',
    assignedDoctor: 'Dr. Sarah Vance, MD & Surgical Crew',
    alertLevel: 'OT Protocol Active',
  },
  7: {
    patientStatus: 'Stat Medication Dispensing',
    chiefComplaint: 'Aspirin 325mg + Ticagrelor 180mg loading dose',
    telemetryLog: 'Robotic carousel picked #B-14 | Zero contraindications',
    assignedDoctor: 'Central Pharmacy System',
    alertLevel: 'Closed-Loop Dispense',
  },
  8: {
    patientStatus: 'Automated Claims Adjudication',
    chiefComplaint: 'Emergency cardiac intervention claim compiled',
    telemetryLog: 'FHIR claims bridge approved $4,850 in 1.8s ($0 co-pay)',
    assignedDoctor: 'MediCare Automated Billing Engine',
    alertLevel: 'Instant Cashless OK',
  },
  9: {
    patientStatus: 'Discharged to Remote Recovery',
    chiefComplaint: 'Post-intervention recovery stable | 14-day protocol',
    telemetryLog: 'Smartwatch synced | Daily HRV & AI symptom bot active',
    assignedDoctor: 'Dr. Sarah Vance, MD (Tele-Care)',
    alertLevel: 'Continuous RPM',
  },
};

export default function PatientJourney() {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];
  const telemetry = STAGE_TELEMETRY[activeStageId] || STAGE_TELEMETRY[1];

  // Automatic continuous simulation loop
  useEffect(() => {
    if (!isSimulating) return;

    const intervalTime = 3400; // 3.4 seconds per stage for comfortable viewing
    const stepTime = 50;
    const totalSteps = intervalTime / stepTime;
    let currentStep = 0;
    setProgress(0);

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, (currentStep / totalSteps) * 100));

      if (currentStep >= totalSteps) {
        currentStep = 0;
        setProgress(0);
        setActiveStageId((prev) => (prev >= STAGES.length ? 1 : prev + 1));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isSimulating, activeStageId]);

  const handleToggleSimulation = () => {
    setIsSimulating((prev) => !prev);
  };

  const handleSelectStage = (stageId: number) => {
    setActiveStageId(stageId);
    setProgress(0);
  };

  const handleAdvance = () => {
    setActiveStageId((prev) => (prev >= STAGES.length ? 1 : prev + 1));
    setProgress(0);
  };

  const handlePrevious = () => {
    setActiveStageId((prev) => (prev <= 1 ? STAGES.length : prev - 1));
    setProgress(0);
  };

  return (
    <section id="patient-journey" className="relative py-28 bg-white text-black overflow-hidden select-none">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/15 text-black text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              End-to-End Clinical Experience
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black mb-3">
              The 9-Stage Connected <br />
              <span className="text-zinc-600">
                Patient Healthcare Journey
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl font-medium">
              Watch how our autonomous digital ecosystem connects each clinical phase in real time, from pre-hospital check-in to continuous post-care recovery.
            </p>
          </div>

          {/* Interactive Simulation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleSimulation}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                isSimulating
                  ? 'bg-black text-white hover:bg-zinc-800 ring-2 ring-black/20'
                  : 'bg-white border-2 border-black text-black hover:bg-zinc-100 shadow-sm'
              }`}
            >
              {isSimulating ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Auto-Playing (Pause)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current text-black" />
                  <span>Resume Auto-Simulator</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                setActiveStageId(1);
                setProgress(0);
                setIsSimulating(true);
              }}
              title="Restart from Stage 1"
              className="p-2.5 rounded-xl bg-white border border-black/20 text-black hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Auto-Connection Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 px-4 py-3 rounded-2xl bg-black/[0.03] border border-black/10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              {isSimulating && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSimulating ? 'bg-emerald-600' : 'bg-zinc-400'}`} />
            </span>
            <span className="text-xs font-bold text-black">
              {isSimulating ? 'Connected Simulator Live — Auto-Advancing' : 'Simulator Paused (Click below to explore)'}
            </span>
            <span className="text-xs text-zinc-500 font-medium hidden md:inline">
              • Stage {activeStageId} of {STAGES.length}: {activeStage.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Real-time Stage Countdown Bar */}
            {isSimulating && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-500 font-semibold hidden sm:inline">
                  Next phase:
                </span>
                <div className="w-24 sm:w-32 h-1.5 bg-black/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            <button
              onClick={handleToggleSimulation}
              className="text-xs font-bold text-black hover:underline cursor-pointer"
            >
              {isSimulating ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>

        {/* 9-Stage Progress Steps Bar with Auto-Connecting Animation */}
        <div className="relative mb-12 overflow-x-auto pb-6 pt-3 scrollbar-none">
          <div className="min-w-[880px] flex items-center justify-between relative px-6">
            {/* Background Track Line */}
            <div className="absolute top-[22px] left-12 right-12 h-1 bg-black/10 -translate-y-1/2 z-0 rounded-full" />

            {/* Active Auto-Connecting Fill Line */}
            <div
              className="absolute top-[22px] left-12 h-1 bg-black -translate-y-1/2 z-0 rounded-full transition-all duration-700 ease-out"
              style={{
                width: `calc(${((activeStageId - 1) / (STAGES.length - 1))} * (100% - 96px))`,
              }}
            >
              {/* Glowing Traveling Pulse at the connection head */}
              {isSimulating && (
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-black rounded-full ring-4 ring-black/20 animate-ping pointer-events-none" />
              )}
            </div>

            {STAGES.map((stage) => {
              const IconComp = stage.icon;
              const isActive = activeStageId === stage.id;
              const isPassed = activeStageId > stage.id;

              return (
                <button
                  key={stage.id}
                  onClick={() => handleSelectStage(stage.id)}
                  className="relative z-10 flex flex-col items-center group focus:outline-none cursor-pointer"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-black text-white shadow-xl scale-110 ring-4 ring-black/15'
                        : isPassed
                        ? 'bg-zinc-800 text-white shadow-sm'
                        : 'bg-white border-2 border-black/20 text-zinc-600 group-hover:border-black group-hover:text-black'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <IconComp className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-bold mt-2.5 whitespace-nowrap transition-colors ${
                      isActive ? 'text-black font-extrabold' : 'text-zinc-500 group-hover:text-black'
                    }`}
                  >
                    {stage.id}. {stage.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-black/10 p-6 sm:p-10 shadow-xl relative overflow-hidden transition-all duration-500">
          {/* Left Info Column */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-black/5 text-black border border-black/15 text-xs font-mono font-bold">
                Stage 0{activeStage.id} of 09
              </span>
              <span className="px-3 py-1 rounded-full bg-black text-white text-xs font-mono font-semibold">
                {activeStage.automatedPercent}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hidden sm:inline">
                {telemetry.alertLevel}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-black mb-2 transition-all">
              {activeStage.title}
            </h3>
            <p className="text-base text-zinc-600 font-bold mb-4">
              {activeStage.subtitle}
            </p>

            <p className="text-zinc-700 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              {activeStage.details}
            </p>

            {/* Telemetry Callout */}
            <div className="p-4 rounded-xl bg-slate-50 border border-black/10 mb-6 shadow-sm">
              <div className="text-xs font-mono text-black flex items-center gap-1.5 uppercase tracking-wider mb-1 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                MediCare Autonomous Action
              </div>
              <div className="text-sm text-zinc-800 font-medium">
                {activeStage.systemAction}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-black/5 border border-black/10 text-black flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 font-bold">Average Elapsed Time</div>
                  <div className="text-sm font-black text-black font-mono">{activeStage.timeEstimate}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-black/5 border border-black/10 text-black flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 font-bold">Clinical Impact</div>
                  <div className="text-sm font-black text-black font-mono">{activeStage.metric}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Simulated Live Interactive Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-white border-2 border-black/15 shadow-xl text-black">
              <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-black uppercase tracking-wider">
                    Live Telemetry Terminal
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-600">ID: #MC-88294</span>
              </div>

              {/* Simulated Patient Info - Dynamic with Active Stage */}
              <div className="space-y-3 text-xs mb-5">
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-black/10">
                  <span className="text-zinc-500 font-semibold">Patient:</span>
                  <span className="font-bold text-black">David Harrison (44, M)</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-black/10">
                  <span className="text-zinc-500 font-semibold">Chief Complaint / Vitals:</span>
                  <span className="text-black font-bold text-right truncate max-w-[200px]">
                    {telemetry.chiefComplaint}
                  </span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-black/10">
                  <span className="text-zinc-500 font-semibold">Active Workflow Phase:</span>
                  <span className="text-black font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                    {activeStage.title}
                  </span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-black/10">
                  <span className="text-zinc-500 font-semibold">Real-time Telemetry:</span>
                  <span className="text-black font-bold text-right truncate max-w-[200px]">
                    {telemetry.telemetryLog}
                  </span>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-slate-50 border border-black/10">
                  <span className="text-zinc-500 font-semibold">Assigned Specialist:</span>
                  <span className="text-black font-bold">{telemetry.assignedDoctor}</span>
                </div>
              </div>

              {/* Real-time Stage Stepper Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handlePrevious}
                  className="flex-1 py-2.5 rounded-xl bg-white border border-black/20 hover:border-black text-xs font-bold text-black transition-colors"
                >
                  &larr; Previous Stage
                </button>
                <button
                  onClick={handleAdvance}
                  className="flex-1 py-2.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-1"
                >
                  Advance Stage
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
