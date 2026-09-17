'use client';

import React, { useState } from 'react';
import {
  Activity,
  HeartPulse,
  Layers,
  Scan,
  Pill,
  Heart,
  Brain,
  Bone,
  Waves,
  Building2,
  CheckCircle2,
  Users,
  Clock,
  ArrowUpRight,
  Zap,
  Infinity as InfinityIcon,
  Sparkles,
  Radio,
  Cpu,
  Camera,
  Maximize2,
  Eye,
  ShieldCheck,
} from 'lucide-react';
import ThreeDCard from '@/components/ui/ThreeDCard';

interface Department {
  id: string;
  name: string;
  category: 'critical' | 'clinical' | 'diagnostics' | 'admin';
  icon: React.ElementType;
  activePatients: number;
  occupancy: string;
  status: 'Normal' | 'Peak' | 'Optimal';
  leadStaff: string;
  systemIntegrations: string[];
  description: string;
  interiorImage: string;
  interiorFacility: string;
  vitals: {
    hr: number;
    spo2: number;
    bp: string;
    flowRate: string;
  };
}

const DEPARTMENTS: Department[] = [
  {
    id: 'emergency',
    name: 'Emergency & Trauma',
    category: 'critical',
    icon: Activity,
    activePatients: 42,
    occupancy: '92%',
    status: 'Peak',
    leadStaff: 'Dr. Sarah Vance, MD',
    systemIntegrations: ['Ambulance GPS', 'Triage AI', 'Trauma Bay 4K'],
    description: 'Rapid triage engine with sub-90-second bed allocation and automatic trauma team dispatch.',
    interiorImage: '/hospital-trauma-bay.jpg',
    interiorFacility: 'Level-1 Trauma Resuscitation Bay 01',
    vitals: { hr: 98, spo2: 96, bp: '135/85', flowRate: '2.4 L/s' },
  },
  {
    id: 'ipd-opd',
    name: 'Inpatient / Outpatient',
    category: 'clinical',
    icon: Users,
    activePatients: 218,
    occupancy: '84%',
    status: 'Normal',
    leadStaff: 'Dr. Kevin Thorne',
    systemIntegrations: ['Smart Kiosks', 'EHR Sync', 'Digital Queue'],
    description: 'Unified outpatient appointments, digital queue display, and seamless inpatient ward admissions.',
    interiorImage: '/hospital-icu-room.jpg',
    interiorFacility: 'Smart Telemetric Inpatient Suite 4B',
    vitals: { hr: 72, spo2: 99, bp: '120/80', flowRate: '1.2 L/s' },
  },
  {
    id: 'icu',
    name: 'Intensive Care (ICU/NICU)',
    category: 'critical',
    icon: HeartPulse,
    activePatients: 28,
    occupancy: '89%',
    status: 'Optimal',
    leadStaff: 'Dr. Elena Rostova',
    systemIntegrations: ['Ventilator IoT', 'Arterial Line Stream', 'Alert Guard'],
    description: 'Continuous 250Hz patient vital telemetric monitoring with predictive septic shock alerts.',
    interiorImage: '/hospital-icu-room.jpg',
    interiorFacility: 'Critical Care Telemetry Pod A-03',
    vitals: { hr: 84, spo2: 98, bp: '118/75', flowRate: '3.1 L/s' },
  },
  {
    id: 'radiology',
    name: 'Radiology & Imaging',
    category: 'diagnostics',
    icon: Scan,
    activePatients: 64,
    occupancy: '74%',
    status: 'Normal',
    leadStaff: 'Dr. Chen Wei, FACR',
    systemIntegrations: ['DICOM PACS', 'Cloud AI CAD', 'Instant HL7'],
    description: 'Sub-second PACS rendering with AI-assisted lesion segmentation and automated urgent finding alerts.',
    interiorImage: '/hospital-radiology-mri.jpg',
    interiorFacility: '3T Ultra-High-Field MRI Imaging Suite',
    vitals: { hr: 68, spo2: 99, bp: '115/78', flowRate: '0.8 L/s' },
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy Management',
    category: 'diagnostics',
    icon: Pill,
    activePatients: 312,
    occupancy: '95%',
    status: 'Normal',
    leadStaff: 'PharmD David Miller',
    systemIntegrations: ['FEFO Inventory', 'Rx Barcode Check', 'Auto Restock'],
    description: 'Closed-loop medication verification preventing adverse drug interactions and expiry waste.',
    interiorImage: '/hospital-radiology-mri.jpg',
    interiorFacility: 'Automated Pneumatic Dispensing Center',
    vitals: { hr: 70, spo2: 99, bp: '122/81', flowRate: '1.5 L/s' },
  },
  {
    id: 'cardiology',
    name: 'Cardiology & Cath Lab',
    category: 'clinical',
    icon: Heart,
    activePatients: 38,
    occupancy: '85%',
    status: 'Optimal',
    leadStaff: 'Dr. Anthony Santos',
    systemIntegrations: ['12-Lead Holter Cloud', 'Cath Lab Telemetry', 'STEMI FastTrack'],
    description: 'STEMI rapid activation protocol cutting door-to-balloon time down to under 45 minutes.',
    interiorImage: '/hospital-operating-room.jpg',
    interiorFacility: 'Hybrid Cardiac Cath Lab & OR 03',
    vitals: { hr: 76, spo2: 99, bp: '124/82', flowRate: '2.0 L/s' },
  },
  {
    id: 'neurology',
    name: 'Neurology & Neuro ICU',
    category: 'clinical',
    icon: Brain,
    activePatients: 24,
    occupancy: '80%',
    status: 'Normal',
    leadStaff: 'Dr. Julian Thorne',
    systemIntegrations: ['Continuous EEG', 'Stroke Tele-consult', 'ICP Sensors'],
    description: 'Rapid code-stroke protocol with automated perfusion imaging interpretation and NIHSS scoring.',
    interiorImage: '/hospital-operating-room.jpg',
    interiorFacility: 'Micro-Neurosurgical Navigation Theater',
    vitals: { hr: 74, spo2: 98, bp: '121/79', flowRate: '1.1 L/s' },
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Rehab',
    category: 'clinical',
    icon: Bone,
    activePatients: 52,
    occupancy: '79%',
    status: 'Normal',
    leadStaff: 'Dr. Robert Stirling',
    systemIntegrations: ['Implant Trackers', 'Gait Lab Sensor', 'Physio Plan'],
    description: 'End-to-end joint replacement workflows from 3D templating to outpatient physical therapy tracking.',
    interiorImage: '/hospital-operating-room.jpg',
    interiorFacility: 'Orthopedic Robotics Suite 02',
    vitals: { hr: 69, spo2: 99, bp: '119/78', flowRate: '0.9 L/s' },
  },
  {
    id: 'nephrology',
    name: 'Nephrology & Dialysis',
    category: 'clinical',
    icon: Waves,
    activePatients: 29,
    occupancy: '90%',
    status: 'Normal',
    leadStaff: 'Dr. Alistair Finch',
    systemIntegrations: ['Dialysis Machine IoT', 'Kt/V Engine', 'Fluid Balance Log'],
    description: 'Dialysis station shift management, automated Kt/V clearance monitoring, and fistula health logs.',
    interiorImage: '/hospital-icu-room.jpg',
    interiorFacility: 'Hemodialysis Precision Station 08',
    vitals: { hr: 75, spo2: 97, bp: '128/84', flowRate: '1.8 L/s' },
  },
  {
    id: 'admin-finance',
    name: 'Hospital Admin & Finance',
    category: 'admin',
    icon: Building2,
    activePatients: 512,
    occupancy: '94%',
    status: 'Optimal',
    leadStaff: 'CFO Daniel Vance',
    systemIntegrations: ['Automated TPA Claims', 'Tariff Master', 'Payroll / ERP'],
    description: 'Automated claim adjudication, real-time revenue cycle management, and executive analytics.',
    interiorImage: '/hospital-operating-room.jpg',
    interiorFacility: 'Operations Executive Command Center',
    vitals: { hr: 71, spo2: 99, bp: '120/79', flowRate: '1.0 L/s' },
  },
];

const HOSPITAL_FACILITIES = [
  {
    id: 'or',
    title: 'Hybrid Robotic Surgical Suites',
    category: 'Surgical Robotics & Sterile OR',
    image: '/hospital-operating-room.jpg',
    tag: 'ISO Class 5 Cleanroom',
    metrics: '4K Telemetry • 0.2mm Robotic Precision',
    description: 'Sub-millimeter robotic precision surgical theater integrated with real-time multi-planar telemetry and shadowless LED lighting.',
  },
  {
    id: 'trauma',
    title: 'Level-1 Trauma Resuscitation Bays',
    category: 'Emergency & Acute Care',
    image: '/hospital-trauma-bay.jpg',
    tag: 'Sub-90s Bed Dispatch',
    metrics: 'Direct EMS Stream • Dual Surgical Pendants',
    description: 'Rapid-entry emergency trauma suites with direct ambulance telemetry ingestion, crash carts, and automated multi-lead monitoring.',
  },
  {
    id: 'icu',
    title: 'Continuous ICU Critical Care Pods',
    category: 'Intensive Care & Monitoring',
    image: '/hospital-icu-room.jpg',
    tag: '250Hz Vital Telemetry',
    metrics: 'Arterial Ingestion • Sepsis AI Alert',
    description: 'Acoustically isolated digital ICU suites equipped with continuous multiparameter life-support monitoring and natural circadian lighting.',
  },
  {
    id: 'mri',
    title: 'Sub-Second 3T MRI & Imaging Pavilion',
    category: 'Radiology & Molecular Imaging',
    image: '/hospital-radiology-mri.jpg',
    tag: 'Zero-Latency PACS',
    metrics: '0.4s 3D Rendering • Ambient Lumens',
    description: 'State-of-the-art 3T magnetic resonance suite designed for instantaneous volumetric PACS streaming and calming patient ergonomics.',
  },
];

export default function EcosystemSection() {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('emergency');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [headerTilt, setHeaderTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHeaderHovered, setIsHeaderHovered] = useState<boolean>(false);

  const selectedDept = DEPARTMENTS.find((d) => d.id === selectedDeptId) || DEPARTMENTS[0];
  const filteredDepartments =
    filterCategory === 'all'
      ? DEPARTMENTS
      : DEPARTMENTS.filter((d) => d.category === filterCategory);

  // Mouse tilt handler for the 3D header stage
  const handleHeaderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    setHeaderTilt({
      x: parseFloat((mouseX * 12).toFixed(2)),
      y: parseFloat((-mouseY * 12).toFixed(2)),
    });
  };

  const handleHeaderMouseEnter = () => setIsHeaderHovered(true);
  const handleHeaderMouseLeave = () => {
    setIsHeaderHovered(false);
    setHeaderTilt({ x: 0, y: 0 });
  };

  return (
    <section id="about" className="relative py-28 bg-transparent text-slate-900 dark:text-white overflow-hidden transition-colors">
      <div id="specialization" className="scroll-mt-20" />
      <div id="emergency" className="scroll-mt-24" />

      {/* 3D Atmospheric Depth & Radial Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(2,132,199,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-sky-400/5 via-teal-400/5 to-emerald-400/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Subtle 3D Depth Isometric Floor Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#0284C7 1px, transparent 1px), linear-gradient(90deg, #0284C7 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            1. 3D SPATIAL PERSPECTIVE HEADER STAGE
           ========================================================================= */}
        <div
          onMouseMove={handleHeaderMouseMove}
          onMouseEnter={handleHeaderMouseEnter}
          onMouseLeave={handleHeaderMouseLeave}
          style={{ perspective: '1200px' }}
          className="text-center max-w-4xl mx-auto mb-16 cursor-default select-none"
        >
          <div
            style={{
              transform: `rotateX(${headerTilt.y}deg) rotateY(${headerTilt.x}deg)`,
              transformStyle: 'preserve-3d',
              transition: isHeaderHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="relative"
          >
            {/* Holographic Pill Badge with 3D Depth */}
            <div
              style={{ transform: 'translateZ(32px)', transformStyle: 'preserve-3d' }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-white/[0.08] backdrop-blur-xl border border-sky-500/30 dark:border-white/15 text-[#0284C7] dark:text-[#18C7C9] text-xs font-bold uppercase tracking-wider mb-5 shadow-lg shadow-sky-500/10 transition-transform duration-300 hover:scale-105"
            >
              <div className="relative flex items-center justify-center">
                <Radio className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#18C7C9] animate-pulse" />
                <span className="absolute -inset-1 rounded-full bg-sky-400/20 dark:bg-[#18C7C9]/20 animate-ping-slow" />
              </div>
              <span className="font-mono text-[11px] tracking-widest text-slate-800 dark:text-white">
                LIVE 10-NODE CLINICAL MESH • 250Hz SYNAPSE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            </div>

            {/* 3D Kinetic Title: "Infinite Clinical Workflows. One Unified Hospital Pulse." */}
            <h2
              style={{ transform: 'translateZ(48px)', transformStyle: 'preserve-3d' }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            >
              <span className="inline-flex items-center justify-center gap-3 text-slate-900 dark:text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_4px_24px_rgba(255,255,255,0.04)]">
                Infinite Clinical Workflows.
                {/* 3D Glowing Infinity Symbol Badge */}
                <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0284C7]/15 via-teal-500/10 to-[#10B981]/15 dark:from-[#18C7C9]/20 dark:to-[#1479FF]/20 border border-[#0284C7]/30 dark:border-[#18C7C9]/40 shadow-inner group">
                  <InfinityIcon className="w-5 h-5 text-[#0284C7] dark:text-[#18C7C9] animate-pulse transition-transform duration-500 group-hover:rotate-180" />
                  <span className="absolute inset-0 rounded-2xl bg-[#0284C7]/10 dark:bg-[#18C7C9]/15 blur-sm animate-ping-slow" />
                </span>
              </span>
              <br />
              <span
                style={{ transform: 'translateZ(64px)', display: 'inline-block' }}
                className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] via-[#10B981] to-[#1479FF] dark:from-[#18C7C9] dark:via-[#1479FF] dark:to-[#20B26B] animate-text-gradient-flow animate-heartbeat-clinical"
              >
                One Unified Hospital Pulse.
              </span>
            </h2>

            {/* Animated 3D ECG Waveform Line Traveling Across the Hospital Pulse */}
            <div
              style={{ transform: 'translateZ(40px)' }}
              className="relative max-w-xl mx-auto h-8 mt-2 overflow-hidden pointer-events-none"
            >
              {/* Ambient Glow behind ECG Wave */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0284C7]/20 dark:via-[#18C7C9]/25 to-transparent blur-md" />

              <svg viewBox="0 0 600 40" fill="none" className="w-full h-full">
                {/* Faint Background Rhythm Guide */}
                <path
                  d="M 0 20 L 160 20 L 180 20 L 190 6 L 200 34 L 210 12 L 220 26 L 230 20 L 360 20 L 380 20 L 390 6 L 400 34 L 410 12 L 420 26 L 430 20 L 600 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-slate-300/40 dark:text-white/10"
                />

                {/* Active Luminous Telemetry ECG Pulse Line */}
                <path
                  d="M 0 20 L 160 20 L 180 20 L 190 6 L 200 34 L 210 12 L 220 26 L 230 20 L 360 20 L 380 20 L 390 6 L 400 34 L 410 12 L 420 26 L 430 20 L 600 20"
                  stroke="url(#pulse-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-ecg-travel"
                />

                <defs>
                  <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284C7" stopOpacity="0.1" />
                    <stop offset="25%" stopColor="#0284C7" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#18C7C9" stopOpacity="1" />
                    <stop offset="75%" stopColor="#10B981" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Filter Pills with 3D Elevation */}
            <div
              style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
              className="flex flex-wrap items-center justify-center gap-2 mt-8"
            >
              {[
                { id: 'all', label: 'All 10 Core Departments' },
                { id: 'critical', label: 'Critical Care (2)' },
                { id: 'clinical', label: 'Clinical Specialties (5)' },
                { id: 'diagnostics', label: 'Diagnostics & Pharma (2)' },
                { id: 'admin', label: 'Admin & Finance (1)' },
              ].map((cat) => {
                const isActive = filterCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white shadow-lg shadow-sky-500/25 scale-105 border border-sky-400/40 dark:from-[#18C7C9] dark:to-[#1479FF] dark:text-[#071521]'
                        : 'bg-white/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/90 dark:border-white/10 shadow-sm hover:-translate-y-0.5'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. CENTRAL 3D INTERACTIVE WORKFLOW STAGE & TELEMETRY HUD
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Grid: 3D Department Workflow Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {filteredDepartments.map((dept) => {
                const IconComponent = dept.icon;
                const isSelected = selectedDept.id === dept.id;

                return (
                  <div
                    key={dept.id}
                    style={{ perspective: '900px' }}
                    className="w-full"
                  >
                    <button
                      onClick={() => setSelectedDeptId(dept.id)}
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                      className={`w-full relative text-left p-4 rounded-2xl border transition-all duration-300 group overflow-hidden ${
                        isSelected
                          ? 'bg-gradient-to-b from-sky-500/15 via-teal-500/10 to-transparent dark:from-[#18C7C9]/20 dark:via-[#1479FF]/15 dark:to-transparent border-[#0284C7] dark:border-[#18C7C9] shadow-xl shadow-sky-500/20 -translate-y-1.5'
                          : 'bg-white/90 dark:bg-[#0B1F33]/70 hover:bg-slate-50 dark:hover:bg-[#0E2438] border-slate-200/90 dark:border-white/10 hover:border-sky-500/40 hover:-translate-y-1 shadow-sm'
                      }`}
                    >
                      {/* Interactive Specular Glint Sheen on Hover */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Top Row: 3D Elevated Icon Cube & Status Beacon */}
                      <div className="flex items-center justify-between mb-3">
                        <div
                          style={{ transform: 'translateZ(18px)' }}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                            isSelected
                              ? 'bg-[#0284C7] text-white dark:bg-[#18C7C9] dark:text-[#071521] shadow-md shadow-sky-500/30 scale-105'
                              : 'bg-slate-100 dark:bg-white/5 text-[#0284C7] dark:text-[#18C7C9] group-hover:bg-[#0284C7]/15 group-hover:scale-105'
                          }`}
                        >
                          <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" />
                        </div>

                        {/* Status Beacon with Ripple */}
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              dept.status === 'Peak'
                                ? 'bg-amber-500 animate-ping'
                                : dept.status === 'Optimal'
                                ? 'bg-[#10B981] animate-pulse'
                                : 'bg-[#0284C7]'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Department Name */}
                      <div
                        style={{ transform: 'translateZ(14px)' }}
                        className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#18C7C9] transition-colors line-clamp-1"
                      >
                        {dept.name}
                      </div>

                      {/* Metrics: Patients and Occupancy */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
                        <span>{dept.activePatients} pts</span>
                        <span className="font-mono font-bold text-[#0284C7] dark:text-[#18C7C9]">
                          {dept.occupancy}
                        </span>
                      </div>

                      {/* Micro ECG Sparkline at Bottom of Card */}
                      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${
                            isSelected
                              ? 'w-full bg-gradient-to-r from-[#0284C7] via-[#18C7C9] to-[#10B981] animate-text-gradient-flow'
                              : 'w-2/3 bg-slate-300 dark:bg-white/20 group-hover:w-full group-hover:bg-[#0284C7]/60'
                          }`}
                        />
                      </div>

                      {/* Active Indicator Underline */}
                      {isSelected && (
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#0284C7] via-[#18C7C9] to-[#10B981]" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* 3D Hospital Synapse Bus (HL7 / FHIR v4.3) Banner */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-sky-500/10 via-teal-500/10 to-emerald-500/10 dark:from-[#0B1F33] dark:to-[#0A2640] border border-sky-500/30 dark:border-white/10 flex items-center justify-between shadow-lg shadow-sky-500/5 relative overflow-hidden">
              {/* Traveling Packet Glow Stream */}
              <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-sky-400/20 via-transparent to-transparent" />

              <div className="flex items-center gap-3.5 relative z-10">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0284C7]/20 to-[#10B981]/20 border border-sky-500/40 flex items-center justify-center text-[#0284C7] dark:text-[#18C7C9] shadow-sm">
                  <Layers className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    MediCare Core Synapse Bus
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#0284C7]/15 text-[#0284C7] dark:text-[#18C7C9] border border-[#0284C7]/30">
                      HL7 / FHIR v4.3
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Continuous 10-node bidirectional state exchange • 0.04ms latency
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-mono font-bold shadow-sm relative z-10">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                99.999% Synced
              </div>
            </div>
          </div>

          {/* Right Column: 3D Holographic Telemetry HUD Card with LIVE HOSPITAL INTERIOR FEED */}
          <div className="lg:col-span-5">
            <ThreeDCard maxTilt={8} glare={true} scale={1.01} className="w-full">
              <div className="sticky top-24 rounded-3xl bg-white/95 dark:bg-[#071521]/95 backdrop-blur-2xl border border-sky-500/30 dark:border-white/15 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
                {/* Cybernetic Holographic Scanline Sweep */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-sky-400/50 to-transparent animate-holographic-scan" />
                </div>

                {/* Top Accent Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0284C7] via-[#0D9488] via-[#10B981] to-[#1479FF]" />

                {/* HUD Header */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0284C7]/20 to-[#10B981]/20 border border-[#0284C7]/40 flex items-center justify-center text-[#0284C7] dark:text-[#18C7C9] shadow-lg shadow-sky-500/10">
                      <selectedDept.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0284C7] dark:text-[#18C7C9] flex items-center gap-1.5">
                        <Cpu className="w-3 h-3" />
                        Live Facility &amp; Telemetry
                      </span>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                        {selectedDept.name}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                      selectedDept.status === 'Peak'
                        ? 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
                        : selectedDept.status === 'Optimal'
                        ? 'bg-[#10B981]/15 border-[#10B981]/30 text-[#10B981]'
                        : 'bg-sky-500/15 border-sky-500/30 text-[#0284C7] dark:text-[#18C7C9]'
                    }`}
                  >
                    {selectedDept.status}
                  </span>
                </div>

                {/* =========================================================================
                    LIVE HOSPITAL INTERIOR CAMERA FEED WINDOW
                   ========================================================================= */}
                <div className="relative mb-5 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/15 shadow-xl group/facility">
                  <div className="aspect-[16/9] w-full overflow-hidden relative">
                    <img
                      src={selectedDept.interiorImage}
                      alt={selectedDept.interiorFacility}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/facility:scale-105"
                    />

                    {/* Dark gradient vignette over photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 pointer-events-none" />

                    {/* Live Camera Feed Telemetry Overlays */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-white pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        CAM 04 • LIVE FACILITY STREAM
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/15 font-semibold">
                        4K 60FPS • ISO 5
                      </span>
                    </div>

                    {/* Facility Caption & Cleanroom Specs at Bottom of Photo */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-white pointer-events-none">
                      <div className="text-xs font-bold flex items-center gap-1.5 drop-shadow-md">
                        <Camera className="w-3.5 h-3.5 text-sky-400" />
                        {selectedDept.interiorFacility}
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono mt-0.5 drop-shadow">
                        HEPA 99.97% • Temp: 19.5°C • Cleanroom Class 1000
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 relative z-10">
                  {selectedDept.description}
                </p>

                {/* Real-Time Live Vital Waveform Display */}
                <div className="p-3 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-inner mb-4 relative z-10">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <HeartPulse className="w-3.5 h-3.5 animate-pulse" />
                      SINUS RHYTHM • {selectedDept.vitals.hr} BPM
                    </div>
                    <span>SpO2: {selectedDept.vitals.spo2}% | BP: {selectedDept.vitals.bp}</span>
                  </div>

                  {/* Live SVG Rhythm Wave */}
                  <div className="h-8 w-full overflow-hidden">
                    <svg viewBox="0 0 400 35" fill="none" className="w-full h-full">
                      <path
                        d="M 0 18 L 80 18 L 90 18 L 95 5 L 100 30 L 105 8 L 110 24 L 115 18 L 220 18 L 225 18 L 230 5 L 235 30 L 240 8 L 245 24 L 250 18 L 400 18"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-ecg-travel"
                        style={{ strokeDasharray: '400' }}
                      />
                    </svg>
                  </div>
                </div>

                {/* 3D Department Key Metric Pods */}
                <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
                  <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-sm transition-transform hover:-translate-y-0.5">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-0.5 font-medium">
                      <Users className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#18C7C9]" />
                      Active Patients
                    </div>
                    <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                      {selectedDept.activePatients}
                      <span className="text-xs text-[#10B981] font-semibold ml-2">+4%</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-sm transition-transform hover:-translate-y-0.5">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-0.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#1479FF]" />
                      Bed Occupancy
                    </div>
                    <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                      {selectedDept.occupancy}
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-normal ml-2">Cap</span>
                    </div>
                  </div>
                </div>

                {/* Inspect Department CTA */}
                <div className="pt-1 relative z-10">
                  <a
                    href="#analytics"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#10B981] dark:from-[#18C7C9] dark:via-[#1479FF] dark:to-[#20B26B] text-white dark:text-[#071521] font-bold text-xs shadow-xl shadow-sky-500/25 hover:shadow-2xl hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all group"
                  >
                    <span>Inspect Department Telemetry &amp; Facility</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </ThreeDCard>
          </div>
        </div>

        {/* =========================================================================
            3. HOSPITAL ARCHITECTURAL INTERIOR & CLINICAL FACILITIES GALLERY
           ========================================================================= */}
        <div className="mt-8 pt-10 border-t border-slate-200/80 dark:border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-[#10B981] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Physical Hospital Facility Architecture
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
              Next-Generation Clinical Interiors.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              Engineered for sterile perfection, sub-millimeter surgical robotics, and zero-latency emergency resuscitation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOSPITAL_FACILITIES.map((facility) => (
              <div
                key={facility.id}
                style={{ perspective: '1000px' }}
                className="group"
              >
                <div className="relative h-full flex flex-col justify-between rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#071521] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Photo with Overlay */}
                  <div className="aspect-[16/10] w-full overflow-hidden relative">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Facility Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold">
                        {facility.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 text-white pointer-events-none">
                      <div className="text-[10px] font-mono text-teal-300 font-bold uppercase tracking-wider">
                        {facility.category}
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight mb-1.5">
                        {facility.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {facility.description}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] font-mono font-semibold text-[#0284C7] dark:text-[#18C7C9]">
                      <span>{facility.metrics}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
