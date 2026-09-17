'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Layers,
  Activity,
  HeartPulse,
  Syringe,
  Scan,
  FlaskConical,
  Pill,
  Bed,
  Users,
  ShieldAlert,
  Wind,
  Gauge,
  Radio,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import ThreeDCard from '@/components/ui/ThreeDCard';

interface DepartmentZone {
  id: string;
  name: string;
  floor: string;
  category: 'emergency' | 'icu' | 'lab' | 'radiology' | 'pharmacy' | 'ot' | 'wards';
  occupancy: string;
  occupiedBeds: number;
  totalBeds: number;
  activeStaff: string[];
  equipment: string[];
  environment: { temp: string; humidity: string; pressure: string };
  codeStatus: string;
  lead: string;
  desc: string;
  coords: { x: number; y: number; width: number; height: number; labelX: number; labelY: number };
}

const ZONES: DepartmentZone[] = [
  {
    id: 'emergency',
    name: 'Emergency & Level 1 Trauma Center',
    floor: 'Ground Floor (Wing A)',
    category: 'emergency',
    occupancy: '92%',
    occupiedBeds: 23,
    totalBeds: 25,
    activeStaff: ['Dr. Sarah Vance (Attending)', '4 Trauma Nurses', '2 Paramedics'],
    equipment: ['Resuscitation Bay 1-4', 'Rapid Infuser', 'Mobile Ultrasound'],
    environment: { temp: '21.0°C', humidity: '45%', pressure: 'Neutral' },
    codeStatus: 'Code Yellow (Trauma Staged)',
    lead: 'Dr. Sarah Vance, MD',
    desc: 'Direct ambulance ramp access with zero-latency pre-hospital telemetry and automated triage staging.',
    coords: { x: 30, y: 160, width: 220, height: 160, labelX: 140, labelY: 240 },
  },
  {
    id: 'pharmacy',
    name: 'Central Inpatient Pharmacy',
    floor: 'Ground Floor (Wing B)',
    category: 'pharmacy',
    occupancy: '98%',
    occupiedBeds: 0,
    totalBeds: 0,
    activeStaff: ['PharmD David Miller', '3 Technicians'],
    equipment: ['Robotic Dispenser', 'Cold Chain Unit #1-4', 'Narcotics Vault'],
    environment: { temp: '19.5°C', humidity: '42%', pressure: 'Neutral' },
    codeStatus: 'Optimal Flow',
    lead: 'David Miller, PharmD',
    desc: 'FEFO predictive inventory, automated barcode repackaging, and closed-loop pneumatic delivery.',
    coords: { x: 270, y: 160, width: 170, height: 160, labelX: 355, labelY: 240 },
  },
  {
    id: 'lab',
    name: 'Automated Pathology & Hematology Lab',
    floor: '1st Floor (Wing C)',
    category: 'lab',
    occupancy: '84%',
    occupiedBeds: 0,
    totalBeds: 0,
    activeStaff: ['Dr. Rachel Adams', '4 Lab Specialists'],
    equipment: ['Cobas 8000 Analyzers', 'Sysmex XN-9000', 'Automated Centrifuge'],
    environment: { temp: '20.2°C', humidity: '48%', pressure: 'Class 10k Cleanroom' },
    codeStatus: 'Standard Operation',
    lead: 'Dr. Rachel Adams, PhD',
    desc: 'Bi-directional LIS integration with sub-18-minute cardiac marker turnaround and instant panic alerts.',
    coords: { x: 460, y: 160, width: 220, height: 160, labelX: 570, labelY: 240 },
  },
  {
    id: 'radiology',
    name: 'Advanced Radiology & PACS Suite',
    floor: '1st Floor (Wing D)',
    category: 'radiology',
    occupancy: '78%',
    occupiedBeds: 0,
    totalBeds: 0,
    activeStaff: ['Dr. Chen Wei, FACR', '3 Rad Techs'],
    equipment: ['Siemens 3T MRI', 'SOMATOM 128-Slice CT', 'Digital Flat-Panel X-Ray'],
    environment: { temp: '18.5°C', humidity: '40%', pressure: 'RF Shielded' },
    codeStatus: 'Active Imaging',
    lead: 'Dr. Chen Wei, MD, FACR',
    desc: 'Zero-footprint HTML5 DICOM viewer streaming gigabyte volumes in <600ms with CAD pre-analysis.',
    coords: { x: 700, y: 160, width: 230, height: 160, labelX: 815, labelY: 240 },
  },
  {
    id: 'ot',
    name: 'Smart Surgical Operation Theatres',
    floor: '2nd Floor (Wing E)',
    category: 'ot',
    occupancy: '86%',
    occupiedBeds: 6,
    totalBeds: 7,
    activeStaff: ['Dr. Marcus Brody (Lead)', 'Dr. Adams (Anesthesia)', '5 Scrub Nurses'],
    equipment: ['Da Vinci Xi Robotic Console', 'Stryker 4K Laparoscopy', 'HEPA Laminar Flow'],
    environment: { temp: '19.0°C', humidity: '46%', pressure: '+28 Pa (Positive Cleanroom)' },
    codeStatus: '3 Surgeries In-Progress',
    lead: 'Dr. Marcus Brody, MD, FACS',
    desc: 'ISO Class 5 ultra-clean air environments with RFID instrument reconciliation and live surgical broadcasts.',
    coords: { x: 120, y: 350, width: 330, height: 160, labelX: 285, labelY: 430 },
  },
  {
    id: 'icu',
    name: 'Intensive Care Unit (ICU & NICU)',
    floor: '2nd Floor (Wing F)',
    category: 'icu',
    occupancy: '89%',
    occupiedBeds: 25,
    totalBeds: 28,
    activeStaff: ['Dr. Elena Rostova (Intensivist)', '8 Critical Care Nurses'],
    equipment: ['Hamilton-C6 Ventilators', 'Philips IntelliVue MX800', 'Continuous Dialysis'],
    environment: { temp: '21.5°C', humidity: '50%', pressure: '-15 Pa (Isolation Pods)' },
    codeStatus: 'High Vigilance',
    lead: 'Dr. Elena Rostova, MD',
    desc: 'Continuous 250Hz vitals ingestion with predictive septic shock and cardiac decompensation alerts.',
    coords: { x: 480, y: 350, width: 220, height: 160, labelX: 590, labelY: 430 },
  },
  {
    id: 'wards',
    name: 'Inpatient Medical & Executive Wards',
    floor: '3rd Floor (Wing G & H)',
    category: 'wards',
    occupancy: '74%',
    occupiedBeds: 133,
    totalBeds: 180,
    activeStaff: ['Dr. Kevin Thorne (Hospitalist)', '18 Ward Nurses', 'Physical Therapists'],
    equipment: ['Smart Infusion Pumps', 'Wireless Telemetry Patches', 'Nurse Call Console'],
    environment: { temp: '22.0°C', humidity: '45%', pressure: 'Standard' },
    codeStatus: 'Stable Census',
    lead: 'Dr. Kevin Thorne, MD',
    desc: 'Smart patient rooms with digital bedside tablets, contactless nurse call, and automated discharge tracking.',
    coords: { x: 720, y: 350, width: 220, height: 160, labelX: 830, labelY: 430 },
  },
];

export default function HospitalMapSection() {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('emergency');
  const [activeFloorFilter, setActiveFloorFilter] = useState<'all' | 'ground' | '1st' | '2nd' | '3rd'>('all');
  const [viewMode, setViewMode] = useState<'zones' | 'occupancy' | 'hvac'>('zones');

  const selectedZone = ZONES.find((z) => z.id === selectedDeptId) || ZONES[0];

  const filteredZones = ZONES.filter((z) => {
    if (activeFloorFilter === 'all') return true;
    if (activeFloorFilter === 'ground') return z.floor.includes('Ground');
    if (activeFloorFilter === '1st') return z.floor.includes('1st');
    if (activeFloorFilter === '2nd') return z.floor.includes('2nd');
    if (activeFloorFilter === '3rd') return z.floor.includes('3rd');
    return true;
  });

  return (
    <section id="hospital-map" className="relative py-28 bg-[#F8FAFC] dark:bg-[#071521] text-slate-900 dark:text-white overflow-hidden transition-colors">
      {/* Subtle Blueprint Ambient Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284C70A_1px,transparent_1px),linear-gradient(to_bottom,#0284C70A_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(2,132,199,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0284C7]/10 dark:bg-[#18C7C9]/15 border border-[#0284C7]/25 dark:border-[#18C7C9]/30 text-[#0284C7] dark:text-[#18C7C9] text-xs font-semibold uppercase tracking-wider mb-4">
              <MapPin className="w-3.5 h-3.5 animate-pulse" />
              Interactive Architectural Command
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Interactive Digital Twin & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#059669] dark:from-[#18C7C9] dark:via-[#1479FF] dark:to-[#20B26B]">
                Hospital Facility Floor Plan
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              Explore the hospital campus in real-time. Inspect clinical zones, bed utilization, cleanroom
              pressure telemetry, and active medical personnel across all pavilions.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center shadow-sm">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Active Campus Census</span>
              <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">286 / 362 Beds</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center shadow-sm">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Critical Alarms</span>
              <span className="text-xl font-bold font-mono text-[#059669] dark:text-[#20B26B]">0 Unresolved</span>
            </div>
          </div>
        </div>

        {/* Floor Filter & Visualization Layer Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white/90 dark:bg-[#0B1F33]/80 p-3 rounded-2xl border border-slate-200/90 dark:border-white/10 backdrop-blur-md shadow-sm">
          {/* Floor Switcher */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mr-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Floor Level:
            </span>
            {[
              { id: 'all', label: 'All Levels' },
              { id: 'ground', label: 'Ground (ER & Rx)' },
              { id: '1st', label: 'L1 (Lab & Imaging)' },
              { id: '2nd', label: 'L2 (OT & ICU)' },
              { id: '3rd', label: 'L3 (Inpatient Wards)' },
            ].map((fl) => (
              <button
                key={fl.id}
                onClick={() => setActiveFloorFilter(fl.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeFloorFilter === fl.id
                    ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/20 font-bold dark:bg-[#18C7C9] dark:text-[#071521]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {fl.label}
              </button>
            ))}
          </div>

          {/* Layer View Mode */}
          <div className="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-white/10 pt-2 sm:pt-0 sm:pl-3">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mr-1">Overlay Mode:</span>
            {[
              { id: 'zones', label: 'Department Zones' },
              { id: 'occupancy', label: 'Bed Heatmap' },
              { id: 'hvac', label: 'HVAC / Cleanroom' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setViewMode(v.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === v.id
                    ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Map Workstation: Left Blueprint Map (7 cols) + Right Inspection HUD (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive SVG Blueprint Diagram with 3D Spatial Depth */}
          <ThreeDCard maxTilt={4} scale={1.01} glare={false} className="lg:col-span-7">
            <div className="bg-[#0B1F33] rounded-3xl border border-white/15 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            {/* Blueprint Header Ticker */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#18C7C9]">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>BUILDING CAD MODEL: METROPOLITAN MAIN PAVILION</span>
              </div>
              <span className="text-slate-400">Click any zone to inspect</span>
            </div>

            {/* SVG Floorplan Canvas Container */}
            <div className="relative w-full aspect-[980/540] bg-[#050D15] rounded-2xl border border-white/10 overflow-hidden shadow-inner">
              <svg viewBox="0 0 980 540" className="w-full h-full select-none">
                {/* Structural Outer Grid Guidelines */}
                <defs>
                  <pattern id="blueprintGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(24,199,201,0.06)" strokeWidth="0.8" />
                  </pattern>
                  <linearGradient id="corridorGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1479FF" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#18C7C9" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#1479FF" stopOpacity="0.3" />
                  </linearGradient>
                </defs>

                <rect width="980" height="540" fill="url(#blueprintGrid)" />

                {/* Central Corridor & Transit Spine */}
                <rect x="20" y="325" width="940" height="20" fill="url(#corridorGlow)" rx="4" />
                <text x="490" y="339" fill="#18C7C9" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  MAIN ARTERIAL CLINICAL TRANSIT CONCOURSE (RFID GEOFENCED)
                </text>

                {/* Draw Each Department Zone */}
                {ZONES.map((zone) => {
                  const isSelected = zone.id === selectedDeptId;
                  const isDimmed = activeFloorFilter !== 'all' && !filteredZones.some((f) => f.id === zone.id);

                  // Compute colors based on viewMode
                  let fillColor = isSelected ? 'rgba(24,199,201,0.22)' : 'rgba(11,31,51,0.7)';
                  let strokeColor = isSelected ? '#18C7C9' : 'rgba(255,255,255,0.2)';
                  let strokeWidth = isSelected ? 2.5 : 1.2;

                  if (viewMode === 'occupancy') {
                    const occNum = parseInt(zone.occupancy);
                    if (occNum > 90) fillColor = 'rgba(239,68,68,0.25)';
                    else if (occNum > 80) fillColor = 'rgba(245,158,11,0.25)';
                    else fillColor = 'rgba(32,178,107,0.25)';
                  } else if (viewMode === 'hvac') {
                    if (zone.environment.pressure.includes('Positive')) fillColor = 'rgba(20,121,255,0.25)';
                    else if (zone.environment.pressure.includes('Negative')) fillColor = 'rgba(168,85,247,0.25)';
                    else fillColor = 'rgba(32,178,107,0.2)';
                  }

                  return (
                    <g
                      key={zone.id}
                      onClick={() => setSelectedDeptId(zone.id)}
                      className={`cursor-pointer transition-all duration-300 ${isDimmed ? 'opacity-20' : 'opacity-100'}`}
                    >
                      {/* Room Boundary Rect */}
                      <rect
                        x={zone.coords.x}
                        y={zone.coords.y}
                        width={zone.coords.width}
                        height={zone.coords.height}
                        rx="12"
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={isSelected ? 'none' : '4 2'}
                        className="transition-all hover:stroke-[#18C7C9] hover:fill-[#18C7C9]/20"
                      />

                      {/* Animated Radar Pulse Node on Selected Room */}
                      {isSelected && (
                        <circle
                          cx={zone.coords.x + 20}
                          cy={zone.coords.y + 20}
                          r="6"
                          fill="#18C7C9"
                          className="animate-ping"
                        />
                      )}
                      <circle
                        cx={zone.coords.x + 20}
                        cy={zone.coords.y + 20}
                        r="4"
                        fill={isSelected ? '#18C7C9' : '#20B26B'}
                      />

                      {/* Department Title */}
                      <text
                        x={zone.coords.x + 34}
                        y={zone.coords.y + 24}
                        fill="#FFFFFF"
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        {zone.name.split(' ')[0]} {zone.name.split(' ')[1]}
                      </text>

                      {/* Floor Indicator Subtitle */}
                      <text
                        x={zone.coords.x + 34}
                        y={zone.coords.y + 40}
                        fill="#94A3B8"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        {zone.floor.split('(')[0]}
                      </text>

                      {/* Center Badge with Key Telemetry */}
                      <rect
                        x={zone.coords.x + 16}
                        y={zone.coords.y + 60}
                        width={zone.coords.width - 32}
                        height="30"
                        rx="6"
                        fill="rgba(0,0,0,0.4)"
                        stroke="rgba(255,255,255,0.08)"
                      />
                      <text
                        x={zone.coords.x + 24}
                        y={zone.coords.y + 80}
                        fill="#18C7C9"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        Occ: {zone.occupancy} &bull; {zone.codeStatus.split(' ')[0]}
                      </text>

                      {/* Ambient Room Status Pill */}
                      <text
                        x={zone.coords.x + 16}
                        y={zone.coords.y + 115}
                        fill="#CBD5E1"
                        fontSize="9"
                        fontFamily="sans-serif"
                      >
                        Lead: {zone.lead.split(',')[0]}
                      </text>
                      <text
                        x={zone.coords.x + 16}
                        y={zone.coords.y + 132}
                        fill="#64748B"
                        fontSize="8.5"
                        fontFamily="monospace"
                      >
                        Air: {zone.environment.temp} &bull; {zone.environment.pressure.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#18C7C9]" /> Selected Wing
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#20B26B]" /> Normal Status
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> High Census (&gt;80%)
                </span>
              </div>
              <span className="text-[11px] text-[#18C7C9]">Spatial Telemetry Sensor Grid: Online</span>
            </div>
            </div>
          </ThreeDCard>

          {/* Right Inspection HUD Drawer with 3D Spatial Depth (5 cols) */}
          <ThreeDCard maxTilt={4} scale={1.01} glare={false} className="lg:col-span-5">
            <div className="bg-white dark:bg-[#0B1F33] rounded-3xl border border-slate-200/90 dark:border-white/15 p-6 sm:p-7 shadow-xl space-y-6 text-slate-900 dark:text-white">
            {/* Header info */}
            <div className="border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#0284C7] dark:text-[#18C7C9] flex items-center gap-1.5 font-semibold">
                  <Activity className="w-4 h-4" />
                  {selectedZone.floor}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#059669]/15 text-[#059669] dark:bg-[#20B26B]/20 dark:text-[#20B26B] font-mono text-xs font-bold">
                  {selectedZone.codeStatus}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedZone.name}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{selectedZone.desc}</p>
            </div>

            {/* Bed Occupancy Meter */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#071521] border border-slate-200/80 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-[#0284C7] dark:text-[#18C7C9]" />
                  Active Bed Census
                </span>
                <span className="font-mono text-slate-900 dark:text-white font-bold">
                  {selectedZone.occupiedBeds} / {selectedZone.totalBeds || 'N/A'} ({selectedZone.occupancy})
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0284C7] to-[#059669] dark:from-[#18C7C9] dark:to-[#20B26B] rounded-full transition-all duration-500"
                  style={{ width: `${selectedZone.occupancy}` }}
                />
              </div>
            </div>

            {/* Environmental Cleanroom Telemetry */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 text-center">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">Temperature</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">{selectedZone.environment.temp}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 text-center">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">Humidity</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">{selectedZone.environment.humidity}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 text-center">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">Air Pressure</span>
                <span className="font-mono font-bold text-[#059669] dark:text-[#20B26B] text-[11px] truncate block">
                  {selectedZone.environment.pressure.split(' ')[0]}
                </span>
              </div>
            </div>

            {/* Active Staff On Duty */}
            <div className="space-y-2 text-xs">
              <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px] block flex items-center gap-1.5 font-medium">
                <Users className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#18C7C9]" /> Active Clinical Roster
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedZone.activeStaff.map((staff, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-medium">
                    {staff}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Clinical Equipment */}
            <div className="space-y-2 text-xs">
              <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px] block flex items-center gap-1.5 font-medium">
                <Gauge className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#1479FF]" /> Online Diagnostic Equipment
              </span>
              <div className="space-y-1.5">
                {selectedZone.equipment.map((eq, i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-between text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-transparent">
                    <span>{eq}</span>
                    <span className="text-[#059669] dark:text-[#20B26B] font-mono text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Operational
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Trigger */}
            <div className="pt-2">
              <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0D9488] text-white font-bold text-xs transition-all shadow-md shadow-[#0284C7]/20 hover:shadow-lg flex items-center justify-center gap-2">
                <PhoneCall className="w-4 h-4" />
                Intercom Department Attending ({selectedZone.lead.split(' ')[1]})
              </button>
            </div>
          </div>
        </ThreeDCard>
      </div>
    </div>
  </section>
  );
}
