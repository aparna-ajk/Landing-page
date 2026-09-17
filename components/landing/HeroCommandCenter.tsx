'use client';

import React, { useState } from 'react';
import {
  Heart,
  Users,
  Calendar,
  FlaskConical,
  Bed,
  DollarSign,
  Pill,
  AlertOctagon,
  Sparkles,
  Play,
  Pause,
  Zap,
  Activity,
  Brain,
  X,
  ChevronRight,
  Radio,
  CheckCircle2,
} from 'lucide-react';

// Type definitions for Telemetry Pods
interface TelemetryNode {
  id: string;
  category: 'clinical' | 'operations' | 'diagnostics' | 'supply';
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  pos: string; // Tailwind coordinate
  svgCoords: { x: number; y: number };
  details: {
    status: string;
    confidence: string;
    aiRecommendation: string;
    actionLabel: string;
    metrics: { label: string; val: string }[];
  };
}

export const HeroCommandCenter: React.FC<{ className?: string }> = ({ className = '' }) => {
  // Active AI Mode: 'triage' | 'flow' | 'diagnostics'
  const [aiMode, setAiMode] = useState<'triage' | 'flow' | 'diagnostics'>('triage');
  
  // Interactive Simulation States
  const [isSurgeActive, setIsSurgeActive] = useState(false);
  const [isDeepScanning, setIsDeepScanning] = useState(false);
  const [bpmRate, setBpmRate] = useState<72 | 108 | 58>(72);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(true);
  
  // Selected Node for Deep HUD Inspection
  const [selectedNode, setSelectedNode] = useState<TelemetryNode | null>(null);
  const [protocolEngaged, setProtocolEngaged] = useState<Record<string, boolean>>({});
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Dynamic AI Status Message
  const [aiStatusMsg, setAiStatusMsg] = useState(
    'AI Core: Continuous neural monitoring active • 1,248 telemetry channels synchronized • 0 critical bottlenecks'
  );

  // Trigger Surge Simulation
  const handleToggleSurge = () => {
    if (isSurgeActive) {
      setIsSurgeActive(false);
      setBpmRate(72);
      setAiStatusMsg('AI Core: Surge resolved • Operating at baseline equilibrium • 99.2% SLA adherence');
    } else {
      setIsSurgeActive(true);
      setBpmRate(108);
      setAiStatusMsg('⚡ EMERGENCY SIMULATION: 4 Trauma alerts detected • Auto-reallocating 8 beds • ER queue bypassed');
    }
  };

  // Trigger Deep Scan Sweep
  const handleDeepScan = () => {
    setIsDeepScanning(true);
    setAiStatusMsg('🔍 DEEP SCAN: 360° Holographic diagnostic sweep across 8 clinical vectors...');
    setTimeout(() => {
      setIsDeepScanning(false);
      setAiStatusMsg('✓ DEEP SCAN COMPLETE: All neural nodes validated • Zero cross-department latency');
    }, 4000);
  };

  // Cycle Heart Rate BPM
  const handleCycleBpm = () => {
    if (bpmRate === 72) {
      setBpmRate(108);
      setAiStatusMsg('🩺 VITAL SYNC: Tachycardia drill initiated (108 BPM) • Real-time telemetry streaming');
    } else if (bpmRate === 108) {
      setBpmRate(58);
      setAiStatusMsg('🩺 VITAL SYNC: Resting athletic sinus rhythm (58 BPM) • Baseline stable');
    } else {
      setBpmRate(72);
      setAiStatusMsg('🩺 VITAL SYNC: Standard normocardia restored (72 BPM) • Sinus stable');
    }
  };

  // Switch Mode handler
  const handleModeChange = (mode: 'triage' | 'flow' | 'diagnostics') => {
    setAiMode(mode);
    if (mode === 'triage') {
      setAiStatusMsg('🧠 NEURAL TRIAGE MODE: Prioritizing real-time patient vitals, ECG waveforms & risk index');
    } else if (mode === 'flow') {
      setAiStatusMsg('⚡ AUTONOMOUS FLOW MODE: Real-time bed occupancy, ER logistics & ambulance dispatch');
    } else {
      setAiStatusMsg('🧬 DIAGNOSTIC LIS MODE: PACS imaging analysis, AI anomaly classification & pathology streams');
    }
  };

  // Telemetry Nodes data definition with dynamic values depending on mode/surge
  const nodes: TelemetryNode[] = [
    {
      id: 'doc',
      category: 'operations',
      title: 'Specialist Dispatch',
      value: isSurgeActive ? '98% Mobilized' : '94% On-Duty',
      sub: isSurgeActive ? '6 Trauma MDs Rerouted' : '48 Specialists Active',
      icon: <Users size={16} className="text-[#1479FF] dark:text-[#36A3FF]" />,
      pos: 'top-1 sm:top-2 left-3 sm:left-6',
      svgCoords: { x: 120, y: 70 },
      details: {
        status: isSurgeActive ? 'High Mobilization' : 'Optimal Roster',
        confidence: '99.4% AI Match',
        aiRecommendation: 'Auto-balanced 3 on-call cardiothoracic surgeons to Bay 2 based on predictive ER load.',
        actionLabel: 'Rebalance Shifts',
        metrics: [
          { label: 'Active Surgeons', val: '14/16' },
          { label: 'ER Physicians', val: '8/8' },
          { label: 'Avg Response', val: '2.4 mins' },
        ],
      },
    },
    {
      id: 'patient',
      category: 'clinical',
      title: 'Patient Telemetry',
      value: `${bpmRate} BPM ${bpmRate === 108 ? 'Elevated' : 'Sinus'}`,
      sub: isSurgeActive ? 'Alert: Code Yellow Triage' : 'Vitals Stable (98.9%)',
      icon: <Heart size={16} className={isSurgeActive ? 'text-[#EF4444] animate-pulse' : 'text-[#20B26B]'} />,
      pos: 'top-1 sm:top-2 right-3 sm:right-6',
      svgCoords: { x: 480, y: 70 },
      details: {
        status: bpmRate === 108 ? 'Tachycardia Drill' : 'Normal Sinus Rhythm',
        confidence: '99.8% AI ECG Lead II',
        aiRecommendation: 'Real-time QTc interval: 410ms. ST segment normal. Zero ischemic changes detected.',
        actionLabel: 'Export Holter Trace',
        metrics: [
          { label: 'SpO2 Saturation', val: '99%' },
          { label: 'Blood Pressure', val: '120/78' },
          { label: 'Arrhythmia Risk', val: '0.01 Low' },
        ],
      },
    },
    {
      id: 'appt',
      category: 'operations',
      title: 'Smart Queue SLA',
      value: isSurgeActive ? 'Fast-Track Active' : '1,248 Booked',
      sub: isSurgeActive ? 'Auto-Triage Active' : '18 in Queue • 99% SLA',
      icon: <Calendar size={16} className="text-[#18C7C9]" />,
      pos: 'top-1/3 -left-3 sm:-left-1',
      svgCoords: { x: 70, y: 220 },
      details: {
        status: 'Auto-Load Balancing',
        confidence: '97.8% Wait Time Precision',
        aiRecommendation: 'Average patient wait reduced from 42 mins to 9.4 mins via autonomous smart-staggering.',
        actionLabel: 'Deploy Overflow Bay',
        metrics: [
          { label: 'Check-in Delay', val: '1.2 mins' },
          { label: 'Next Available', val: '3 mins' },
          { label: 'No-Show Rate', val: '< 2.1%' },
        ],
      },
    },
    {
      id: 'lab',
      category: 'diagnostics',
      title: 'AI Diagnostics LIS',
      value: aiMode === 'diagnostics' ? 'AI CT Screen 99.8%' : 'PACS CT Ready',
      sub: isSurgeActive ? 'Priority Trauma Scans' : '34 Tests Processed',
      icon: <FlaskConical size={16} className="text-[#8B5CF6]" />,
      pos: 'top-1/3 -right-3 sm:-right-1',
      svgCoords: { x: 530, y: 220 },
      details: {
        status: 'AI Computer Vision Active',
        confidence: '99.8% Anomaly Clearance',
        aiRecommendation: 'Chest CT scan #8841 automatically segmented: Pneumothorax and pulmonary embolism ruled out.',
        actionLabel: 'Verify Diagnostic Slice',
        metrics: [
          { label: 'Model Confidence', val: '99.82%' },
          { label: 'Inference Latency', val: '140ms' },
          { label: 'PACS Protocol', val: 'DICOM v3.0' },
        ],
      },
    },
    {
      id: 'bed',
      category: 'operations',
      title: 'ICU & Bed Flow',
      value: isSurgeActive ? '94% Dynamic Flow' : '82% Occupancy',
      sub: isSurgeActive ? '8 Beds Auto-Reallocated' : '38 ICU / Ward Free',
      icon: <Bed size={16} className={isSurgeActive ? 'text-[#EF4444]' : 'text-[#F59E0B]'} />,
      pos: 'bottom-20 left-2 sm:left-4',
      svgCoords: { x: 110, y: 440 },
      details: {
        status: isSurgeActive ? 'Surge Contingency Engaged' : 'Equilibrium',
        confidence: '98.5% Occupancy Forecast',
        aiRecommendation: 'Predictive discharge model identified 14 step-down candidates to release critical ICU capacity.',
        actionLabel: 'Authorize Step-Down',
        metrics: [
          { label: 'ICU Utilization', val: isSurgeActive ? '92%' : '78%' },
          { label: 'Turnaround Time', val: '18 mins' },
          { label: 'Next Discharge', val: '4 in 1hr' },
        ],
      },
    },
    {
      id: 'rx',
      category: 'supply',
      title: 'Pharmacy Dispense',
      value: '428 Rx Processed',
      sub: 'Zero Stockouts • Drone Ready',
      icon: <Pill size={16} className="text-[#1479FF]" />,
      pos: 'bottom-20 right-2 sm:right-4',
      svgCoords: { x: 490, y: 440 },
      details: {
        status: 'Closed-Loop Dispensing',
        confidence: '100% Barcode Validation',
        aiRecommendation: 'Automated drug-drug interaction check completed for all 428 inpatient orders with 0 adverse flags.',
        actionLabel: 'Dispatch Autonomous Cart',
        metrics: [
          { label: 'Stockout Risk', val: '0.00%' },
          { label: 'Robot Accuracy', val: '99.99%' },
          { label: 'Controlled Rx Safe', val: 'Enforced' },
        ],
      },
    },
    {
      id: 'emergency',
      category: 'clinical',
      title: 'Emergency Triage',
      value: isSurgeActive ? 'CODE YELLOW' : 'Code Green',
      sub: isSurgeActive ? '6 En Route • GPS Tracked' : '3 Ambulances En Route',
      icon: <AlertOctagon size={16} className={isSurgeActive ? 'text-[#EF4444] animate-bounce' : 'text-[#20B26B]'} />,
      pos: '-bottom-3 left-1/4 -translate-x-1/2',
      svgCoords: { x: 200, y: 520 },
      details: {
        status: isSurgeActive ? 'Surge Inflow Protocol' : 'Normal Standby',
        confidence: '99.1% Triage Priority Accuracy',
        aiRecommendation: 'Ambulance #04 incoming in 4 mins (ETA accurate). Trauma Bay 1 pre-warmed & blood units ready.',
        actionLabel: 'Pre-Admit Inflow',
        metrics: [
          { label: 'Inbound ETAs', val: '3m, 7m, 12m' },
          { label: 'Triage Accuracy', val: '99.1%' },
          { label: 'Door-to-Doctor', val: '4.8 mins' },
        ],
      },
    },
    {
      id: 'revenue',
      category: 'operations',
      title: 'Clean Claim Engine',
      value: '$142.8k Settled',
      sub: '98.8% First-Pass Clean',
      icon: <DollarSign size={16} className="text-[#20B26B]" />,
      pos: '-bottom-3 right-1/4 translate-x-1/2',
      svgCoords: { x: 400, y: 520 },
      details: {
        status: 'Real-time FHIR Clearance',
        confidence: '99.6% Clean Claim Rate',
        aiRecommendation: 'AI rules engine pre-adjudicated 82 insurance claims prior to patient discharge with zero denials.',
        actionLabel: 'Auto-Batch Settlements',
        metrics: [
          { label: 'Pre-Auth Speed', val: '1.8 secs' },
          { label: 'First-Pass Rate', val: '98.8%' },
          { label: 'Zero-Claim Denial', val: 'Active' },
        ],
      },
    },
  ];

  return (
    <div className={`relative w-full max-w-[620px] mx-auto select-none font-sans ${className}`}>
      {/* ====================================================================
          TOP INTERACTIVE AI CONTROL DOCK
          ==================================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 mb-3 rounded-2xl bg-white/90 dark:bg-[#0E2438]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-sm">
        {/* Live AI Pulse Indicator */}
        <div className="flex items-center gap-2">
          <div className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isSurgeActive ? 'bg-[#EF4444]' : 'bg-[#18C7C9]'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isSurgeActive ? 'bg-[#EF4444]' : 'bg-[#18C7C9]'
              }`}
            />
          </div>
          <span className="text-[11px] font-mono font-bold tracking-tight text-slate-800 dark:text-slate-100 uppercase">
            {isSurgeActive ? 'Surge Active (Auto-Triage)' : 'Quantum AI Core v5.0'}
          </span>
        </div>

        {/* 3 Interactive AI Modes */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#071521] p-1 rounded-xl text-[10px] font-bold">
          <button
            type="button"
            onClick={() => handleModeChange('triage')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
              aiMode === 'triage'
                ? 'bg-[#1479FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Brain size={12} />
            <span>Triage</span>
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('flow')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
              aiMode === 'flow'
                ? 'bg-[#18C7C9] text-[#071521] shadow-sm font-black'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap size={12} />
            <span>ER Flow</span>
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('diagnostics')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
              aiMode === 'diagnostics'
                ? 'bg-[#8B5CF6] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FlaskConical size={12} />
            <span>LIS / Vision</span>
          </button>
        </div>

        {/* Animation Play/Pause & BPM Control */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCycleBpm}
            title="Cycle Heart Rate BPM"
            className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-100 dark:bg-[#071521] hover:bg-slate-200 dark:hover:bg-[#1479FF]/20 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/10 transition-colors flex items-center gap-1"
          >
            <Activity size={11} className="text-[#EF4444]" />
            <span>{bpmRate} BPM</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPlayingAnimation(!isPlayingAnimation)}
            title={isPlayingAnimation ? 'Pause Animations' : 'Play Animations'}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#071521] hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
          >
            {isPlayingAnimation ? <Pause size={12} /> : <Play size={12} />}
          </button>
        </div>
      </div>

      {/* ====================================================================
          MAIN HOLOGRAPHIC QUANTUM AI CANAL & ORBITS (Aspect-Square)
          ==================================================================== */}
      <div className="relative w-full aspect-square max-w-[580px] mx-auto">
        {/* Multi-layered Bioluminescent Radial Glows */}
        <div
          className={`absolute inset-0 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            isSurgeActive
              ? 'bg-gradient-to-tr from-[#EF4444]/25 via-[#F59E0B]/20 to-[#1479FF]/20'
              : 'bg-gradient-to-tr from-[#1479FF]/20 via-[#18C7C9]/25 to-[#8B5CF6]/15'
          }`}
        />

        {/* Dynamic Holographic SVG Layer */}
        <svg
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xl overflow-visible pointer-events-none"
        >
          <defs>
            {/* Core Neural Sphere Gradient */}
            <radialGradient id="aiCoreGrad" cx="0.5" cy="0.5" r="0.5" fx="0.35" fy="0.35">
              <stop offset="0%" stopColor={isSurgeActive ? '#F59E0B' : '#38BDF8'} />
              <stop offset="35%" stopColor={isSurgeActive ? '#EF4444' : '#1479FF'} />
              <stop offset="75%" stopColor="#0B1F33" />
              <stop offset="100%" stopColor="#071521" />
            </radialGradient>

            {/* Glowing Laser Scanner Beam Gradient */}
            <linearGradient id="scannerBeamGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#18C7C9" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#1479FF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1479FF" stopOpacity="0" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="hologramGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Coordinate Background Grid Circles */}
          <circle cx="300" cy="300" r="260" stroke="#1479FF" strokeWidth="0.8" strokeDasharray="3 9" strokeOpacity="0.2" />
          <circle cx="300" cy="300" r="200" stroke="#18C7C9" strokeWidth="1" strokeDasharray="5 7" strokeOpacity="0.25" />
          <circle cx="300" cy="300" r="140" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 4" strokeOpacity="0.3" />

          {/* ================================================================
              COUNTER-ROTATING HOLOGRAPHIC GYROSCOPE RINGS
              ================================================================ */}
          {/* Ring 1 (Outer Gyroscope - Clockwise) */}
          <g
            transform="translate(300, 300)"
            className={isPlayingAnimation ? 'animate-gyro-cw' : ''}
          >
            <circle cx="0" cy="0" r="230" stroke="#1479FF" strokeWidth="1.2" strokeDasharray="12 24" strokeOpacity="0.4" />
            {/* Small planetary quantum nodes on outer ring */}
            <circle cx="230" cy="0" r="3.5" fill="#18C7C9" filter="url(#hologramGlow)" />
            <circle cx="-230" cy="0" r="3" fill="#38BDF8" />
            <circle cx="0" cy="230" r="3" fill="#1479FF" />
            <circle cx="0" cy="-230" r="3.5" fill="#20B26B" />
          </g>

          {/* Ring 2 (Middle Segmented Scanner - Counter Clockwise) */}
          <g
            transform="translate(300, 300)"
            className={isPlayingAnimation ? 'animate-gyro-ccw' : ''}
          >
            <circle cx="0" cy="0" r="170" stroke="#18C7C9" strokeWidth="1.5" strokeDasharray="30 18" strokeOpacity="0.45" />
            {/* Tick notches */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1={162 * Math.cos((deg * Math.PI) / 180)}
                y1={162 * Math.sin((deg * Math.PI) / 180)}
                x2={178 * Math.cos((deg * Math.PI) / 180)}
                y2={178 * Math.sin((deg * Math.PI) / 180)}
                stroke="#18C7C9"
                strokeWidth="2"
                strokeOpacity="0.6"
              />
            ))}
          </g>

          {/* Ring 3 (Inner Gyro Hub - Clockwise Fast) */}
          <g
            transform="translate(300, 300)"
            className={isPlayingAnimation ? 'animate-gyro-fast' : ''}
          >
            <circle cx="0" cy="0" r="115" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="6 8" strokeOpacity="0.5" />
            <circle cx="115" cy="0" r="2.5" fill="#FFFFFF" />
            <circle cx="-115" cy="0" r="2.5" fill="#FFFFFF" />
          </g>

          {/* 360° Rotating Laser Radar Scanner Sweep (Active or Accelerated during Deep Scan) */}
          <g
            transform="translate(300, 300)"
            className={
              isDeepScanning
                ? 'animate-laser-scan'
                : isPlayingAnimation
                ? 'animate-scanner-orbit'
                : ''
            }
          >
            <path
              d="M 0 0 L 220 0 A 220 220 0 0 1 155 155 Z"
              fill="url(#scannerBeamGrad)"
              fillOpacity={isDeepScanning ? '0.45' : '0.22'}
            />
            <line
              x1="0"
              y1="0"
              x2="220"
              y2="0"
              stroke={isSurgeActive ? '#EF4444' : '#18C7C9'}
              strokeWidth="2.5"
              strokeOpacity="0.85"
            />
          </g>

          {/* ================================================================
              SYNAPTIC PHOTON CONDUITS (Lines to all 8 nodes with traveling packets)
              ================================================================ */}
          {nodes.map((node, idx) => {
            const isHovered = hoveredNodeId === node.id || selectedNode?.id === node.id;
            return (
              <g key={`conduit-${node.id}`}>
                {/* Connecting Ray */}
                <line
                  x1="300"
                  y1="300"
                  x2={node.svgCoords.x}
                  y2={node.svgCoords.y}
                  stroke={isHovered ? '#18C7C9' : isSurgeActive ? '#EF4444' : '#1479FF'}
                  strokeWidth={isHovered ? 2 : 1.2}
                  strokeDasharray="4 6"
                  strokeOpacity={isHovered ? 0.9 : 0.35}
                  className={isPlayingAnimation ? 'animate-conduit-flow' : ''}
                />

                {/* Traveling Synaptic Energy Packet */}
                <circle
                  cx={300 + (node.svgCoords.x - 300) * 0.55}
                  cy={300 + (node.svgCoords.y - 300) * 0.55}
                  r={isHovered ? 3.5 : 2.5}
                  fill={isHovered ? '#FFFFFF' : isSurgeActive ? '#F59E0B' : '#18C7C9'}
                  className={isPlayingAnimation ? 'animate-ping' : ''}
                  style={{ animationDuration: `${1.6 + (idx % 3) * 0.4}s` }}
                />
              </g>
            );
          })}

          {/* ================================================================
              CENTRAL QUANTUM AI NEURAL CORE & BIOMETRIC AVATAR
              ================================================================ */}
          <g transform="translate(300, 300)" className="cursor-pointer">
            {/* Outer Hologram Halo */}
            <circle
              cx="0"
              cy="0"
              r="85"
              fill={isSurgeActive ? '#EF4444' : '#1479FF'}
              fillOpacity={isSurgeActive ? '0.35' : '0.25'}
              filter="url(#hologramGlow)"
              className={isPlayingAnimation ? 'animate-pulse' : ''}
            />

            {/* Central Solid Neural Orb */}
            <circle
              cx="0"
              cy="0"
              r="68"
              fill="url(#aiCoreGrad)"
              stroke={isSurgeActive ? '#F59E0B' : '#18C7C9'}
              strokeWidth="2.5"
              filter="drop-shadow(0 0 15px rgba(24, 199, 201, 0.4))"
            />

            {/* Futuristic Medical Cross Emblem */}
            <path
              d="M 16 -34 H -16 C -18.2 -34 -20 -32.2 -20 -30 V -16 H -34 C -36.2 -16 -38 -14.2 -38 -12 V 12 C -38 14.2 -36.2 16 -34 16 H -20 V 30 C -20 32.2 -18.2 34 -16 34 H 16 C 18.2 34 20 32.2 20 30 V 16 H 34 C 36.2 16 38 14.2 38 12 V -12 C 38 -14.2 36.2 -16 34 -16 H 20 V -30 C 20 -32.2 18.2 -34 16 -34 Z"
              fill="#FFFFFF"
              fillOpacity="0.14"
              stroke={isSurgeActive ? '#F59E0B' : '#18C7C9'}
              strokeWidth="1.8"
            />

            {/* Stylized Human Telemetry Silhouette */}
            <circle cx="0" cy="-11" r="10.5" fill="#FFFFFF" />
            <path d="M -16 17 C -16 5 -8 1 0 1 C 8 1 16 5 16 17 Z" fill="#FFFFFF" />

            {/* Live Holographic ECG Heartbeat Ribbon */}
            <g transform="translate(-45, 23)">
              <rect x="0" y="0" width="90" height="22" rx="7" fill="#071521" stroke="#18C7C9" strokeWidth="1.2" />
              <path
                d={
                  bpmRate === 108
                    ? 'M 5 11 L 18 11 L 22 2 L 26 19 L 30 4 L 34 16 L 38 11 L 52 11 L 56 2 L 60 19 L 64 4 L 68 16 L 72 11 L 85 11'
                    : 'M 5 11 L 24 11 L 30 3 L 36 19 L 42 5 L 48 16 L 54 11 L 85 11'
                }
                stroke={isSurgeActive ? '#EF4444' : '#18C7C9'}
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isPlayingAnimation ? 'animate-ecg-trace' : ''}
                style={{ strokeDasharray: '160', animationDuration: bpmRate === 108 ? '1.5s' : '3s' }}
              />
            </g>

            {/* Interactive "Click Orb" Label hint */}
            <text
              x="0"
              y="-42"
              textAnchor="middle"
              fill={isSurgeActive ? '#F59E0B' : '#38BDF8'}
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="1"
            >
              {isSurgeActive ? 'SURGE STATE' : 'NEURAL CORE'}
            </text>
          </g>
        </svg>

        {/* ====================================================================
            8 FLOATING INTERACTIVE TELEMETRY PODS
            ==================================================================== */}
        {nodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          const isHovered = hoveredNodeId === node.id;

          return (
            <div
              key={node.id}
              className={`absolute ${node.pos} z-20 cursor-pointer group`}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              onClick={() => setSelectedNode(node)}
            >
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl backdrop-blur-xl border transition-all duration-300 select-none
                  ${
                    isSelected
                      ? 'bg-white dark:bg-[#0E2438] border-[#18C7C9] ring-2 ring-[#18C7C9]/40 shadow-glow scale-105'
                      : isHovered
                      ? 'bg-white dark:bg-[#0E2438] border-[#1479FF] shadow-glow scale-105'
                      : 'bg-white/85 dark:bg-[#0E2438]/85 border-slate-200/90 dark:border-white/10 shadow-soft hover:shadow-card'
                  }`}
              >
                {/* Icon Container */}
                <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-[#102A43] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  {node.icon}
                </div>

                {/* Text Content */}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#627D98] dark:text-[#9FB3C8] truncate">
                      {node.title}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18C7C9] opacity-75 group-hover:animate-ping" />
                  </div>
                  <span className="text-xs font-black text-[#102A43] dark:text-white font-mono leading-none mt-0.5">
                    {node.value}
                  </span>
                  <span className="text-[9px] font-semibold text-[#1479FF] dark:text-[#36A3FF] truncate mt-0.5">
                    {node.sub}
                  </span>
                </div>

                {/* Inspect Arrow Micro-Cue */}
                <ChevronRight
                  size={12}
                  className="text-slate-400 group-hover:text-[#18C7C9] group-hover:translate-x-0.5 transition-all ml-0.5 hidden sm:block"
                />
              </div>
            </div>
          );
        })}

        {/* ====================================================================
            HOLOGRAPHIC AI TELEMETRY INSPECTOR HUD (Overlay Drawer when node is clicked)
            ==================================================================== */}
        {selectedNode && (
          <div className="absolute inset-2 sm:inset-4 z-30 flex items-center justify-center p-2 sm:p-3 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto">
            <div className="w-full max-w-md rounded-3xl bg-white/95 dark:bg-[#071521]/95 backdrop-blur-2xl border-2 border-[#18C7C9]/50 shadow-2xl p-4 sm:p-5 relative overflow-hidden">
              {/* Top Shimmer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#1479FF]/10 dark:bg-[#18C7C9]/20 flex items-center justify-center text-[#1479FF] dark:text-[#18C7C9]">
                    {selectedNode.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {selectedNode.title}
                      <span className="px-2 py-0.5 rounded-full bg-[#18C7C9]/15 text-[#18C7C9] text-[9px] font-mono font-bold">
                        {selectedNode.details.status}
                      </span>
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      Neural Confidence: {selectedNode.details.confidence}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedNode(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-500 dark:text-white flex items-center justify-center transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Real-Time Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {selectedNode.details.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-[#0E2438] border border-slate-200/70 dark:border-white/5 text-center"
                  >
                    <div className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-semibold">
                      {m.label}
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                      {m.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Autonomous Recommendation Box */}
              <div className="p-3 rounded-2xl bg-[#1479FF]/5 dark:bg-[#1479FF]/15 border border-[#1479FF]/20 mb-3">
                <div className="flex items-center gap-1.5 text-[#1479FF] dark:text-[#36A3FF] text-[10px] font-bold mb-1">
                  <Sparkles size={12} />
                  <span>AI CLINICAL RECOMMENDATION</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                  {selectedNode.details.aiRecommendation}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setProtocolEngaged((prev) => ({
                      ...prev,
                      [selectedNode.id]: !prev[selectedNode.id],
                    }));
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    protocolEngaged[selectedNode.id]
                      ? 'bg-[#20B26B] text-white shadow-sm'
                      : 'bg-[#1479FF] hover:bg-[#0F6EE8] text-white shadow-md shadow-[#1479FF]/20'
                  }`}
                >
                  {protocolEngaged[selectedNode.id] ? (
                    <>
                      <CheckCircle2 size={13} />
                      <span>Protocol Engaged</span>
                    </>
                  ) : (
                    <>
                      <Zap size={13} />
                      <span>{selectedNode.details.actionLabel}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedNode(null)}
                  className="py-2 px-4 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ====================================================================
          BOTTOM INTERACTIVE ACTION TOOLBAR & AI LIVE COPILOT TICKER
          ==================================================================== */}
      <div className="mt-4 space-y-2.5">
        {/* Live AI Copilot Status Ticker */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/90 dark:bg-[#0E2438]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-sm text-xs">
          <div className="w-6 h-6 rounded-lg bg-[#1479FF]/10 dark:bg-[#18C7C9]/20 flex items-center justify-center text-[#1479FF] dark:text-[#18C7C9] flex-shrink-0">
            <Radio size={13} className="animate-pulse" />
          </div>
          <p className="text-slate-700 dark:text-slate-200 font-mono text-[11px] leading-tight truncate">
            {aiStatusMsg}
          </p>
        </div>

        {/* 3 Interactive Simulation Triggers */}
        <div className="grid grid-cols-3 gap-2">
          {/* Trigger 1: Simulate ER Surge */}
          <button
            type="button"
            onClick={handleToggleSurge}
            className={`py-2 px-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
              isSurgeActive
                ? 'bg-[#EF4444] text-white border-[#EF4444] shadow-md shadow-[#EF4444]/30 animate-pulse'
                : 'bg-white dark:bg-[#0E2438] text-slate-800 dark:text-white border-slate-200 dark:border-white/10 hover:border-[#EF4444] hover:text-[#EF4444]'
            }`}
          >
            <AlertOctagon size={13} />
            <span className="truncate">{isSurgeActive ? 'Reset Surge' : '⚡ Simulate Surge'}</span>
          </button>

          {/* Trigger 2: Deep 360° AI Scan */}
          <button
            type="button"
            onClick={handleDeepScan}
            disabled={isDeepScanning}
            className={`py-2 px-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
              isDeepScanning
                ? 'bg-[#18C7C9] text-[#071521] border-[#18C7C9] shadow-md shadow-[#18C7C9]/30'
                : 'bg-white dark:bg-[#0E2438] text-slate-800 dark:text-white border-slate-200 dark:border-white/10 hover:border-[#18C7C9] hover:text-[#18C7C9]'
            }`}
          >
            <Sparkles size={13} className={isDeepScanning ? 'animate-spin' : ''} />
            <span className="truncate">{isDeepScanning ? 'Scanning...' : '🔍 Deep Scan'}</span>
          </button>

          {/* Trigger 3: Sync Vitals */}
          <button
            type="button"
            onClick={handleCycleBpm}
            className="py-2 px-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 border bg-white dark:bg-[#0E2438] text-slate-800 dark:text-white border-slate-200 dark:border-white/10 hover:border-[#1479FF] hover:text-[#1479FF]"
          >
            <Activity size={13} className="text-[#1479FF]" />
            <span className="truncate">🩺 Vital Rhythm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCommandCenter;
