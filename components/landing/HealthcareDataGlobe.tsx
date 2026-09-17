'use client';

import React, { useState, useEffect } from 'react';
import {
  Globe,
  Activity,
  Server,
  Zap,
  ShieldCheck,
  Radio,
  Clock,
  ArrowUpRight,
  Sparkles,
  Play,
  Pause,
  Layers,
  Database,
} from 'lucide-react';

interface HospitalNode {
  id: string;
  name: string;
  city: string;
  region: string;
  beds: number;
  uptime: string;
  latency: string;
  bandwidth: string;
  activeSurgeries: number;
  teleConsults: number;
  cx: number;
  cy: number;
}

const GLOBAL_HUBS: HospitalNode[] = [
  {
    id: 'nyc',
    name: 'Mount Sinai Flagship Health Node',
    city: 'New York',
    region: 'North America',
    beds: 1150,
    uptime: '99.999%',
    latency: '12ms',
    bandwidth: '9.4 Gbps',
    activeSurgeries: 8,
    teleConsults: 42,
    cx: 260,
    cy: 210,
  },
  {
    id: 'ldn',
    name: 'Royal London Trauma & Surgical Hub',
    city: 'London',
    region: 'Western Europe',
    beds: 950,
    uptime: '99.998%',
    latency: '18ms',
    bandwidth: '8.2 Gbps',
    activeSurgeries: 6,
    teleConsults: 34,
    cx: 480,
    cy: 170,
  },
  {
    id: 'zrh',
    name: 'Swiss Federal Diagnostic Core',
    city: 'Zurich',
    region: 'Central Europe',
    beds: 620,
    uptime: '100.00%',
    latency: '15ms',
    bandwidth: '12.0 Gbps',
    activeSurgeries: 4,
    teleConsults: 28,
    cx: 510,
    cy: 200,
  },
  {
    id: 'dxb',
    name: 'Emirates Medical City Enclave',
    city: 'Dubai',
    region: 'Middle East',
    beds: 780,
    uptime: '99.999%',
    latency: '22ms',
    bandwidth: '7.6 Gbps',
    activeSurgeries: 5,
    teleConsults: 31,
    cx: 600,
    cy: 245,
  },
  {
    id: 'sin',
    name: 'National University Health Mesh',
    city: 'Singapore',
    region: 'Southeast Asia',
    beds: 1400,
    uptime: '99.999%',
    latency: '24ms',
    bandwidth: '10.5 Gbps',
    activeSurgeries: 11,
    teleConsults: 56,
    cx: 720,
    cy: 310,
  },
  {
    id: 'tky',
    name: 'Tokyo Advanced Robotic Institute',
    city: 'Tokyo',
    region: 'East Asia',
    beds: 890,
    uptime: '99.999%',
    latency: '26ms',
    bandwidth: '11.8 Gbps',
    activeSurgeries: 7,
    teleConsults: 48,
    cx: 790,
    cy: 220,
  },
  {
    id: 'syd',
    name: 'South Pacific Clinical Grid',
    city: 'Sydney',
    region: 'Oceania',
    beds: 720,
    uptime: '99.998%',
    latency: '31ms',
    bandwidth: '6.8 Gbps',
    activeSurgeries: 4,
    teleConsults: 22,
    cx: 820,
    cy: 410,
  },
  {
    id: 'sao',
    name: 'Latin America Diagnostic Core',
    city: 'São Paulo',
    region: 'South America',
    beds: 840,
    uptime: '99.997%',
    latency: '34ms',
    bandwidth: '5.9 Gbps',
    activeSurgeries: 5,
    teleConsults: 29,
    cx: 350,
    cy: 370,
  },
];

export default function HealthcareDataGlobe() {
  const [selectedHubId, setSelectedHubId] = useState<string>('nyc');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [trafficFilter, setTrafficFilter] = useState<'all' | 'teleicu' | 'dicom' | 'ai'>('all');

  // Continual orbital rotation loop
  useEffect(() => {
    let frameId: number;
    if (isRotating) {
      const step = () => {
        setRotationAngle((prev) => (prev + 0.25) % 360);
        frameId = requestAnimationFrame(step);
      };
      frameId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(frameId);
  }, [isRotating]);

  const activeHub = GLOBAL_HUBS.find((h) => h.id === selectedHubId) || GLOBAL_HUBS[0];

  return (
    <section id="healthcare-globe" className="relative py-28 bg-[#F8FAFC] dark:bg-[#0B1F33] text-slate-900 dark:text-white overflow-hidden transition-colors">
      {/* Planetary Atmosphere Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(2,132,199,0.06)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0284C7]/10 dark:bg-[#18C7C9]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0284C7]/10 dark:bg-[#18C7C9]/15 border border-[#0284C7]/25 dark:border-[#18C7C9]/30 text-[#0284C7] dark:text-[#18C7C9] text-xs font-semibold uppercase tracking-wider mb-4">
            <Globe className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '18s' }} />
            Planetary Health Telemetry Mesh
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Global Healthcare Data Globe & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#059669] dark:from-[#18C7C9] dark:via-[#1479FF] dark:to-[#20B26B]">
              Inter-Hospital Cloud Telemetry
            </span>
          </h2>
        </div>

        {/* Global Overview KPI Ticker */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#071521] border border-slate-200/90 dark:border-white/10 text-center shadow-sm">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">CONNECTED BED CAPACITY</span>
            <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">7,450 Beds</span>
            <span className="text-[10px] text-[#059669] dark:text-[#20B26B] font-mono block mt-1 font-medium">Across 8 Flagship Centers</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#071521] border border-slate-200/90 dark:border-white/10 text-center shadow-sm">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">GLOBAL MESH THROUGHPUT</span>
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#0284C7] dark:text-[#18C7C9]">72.2 Gbps</span>
            <span className="text-[10px] text-[#0284C7] dark:text-[#18C7C9] font-mono block mt-1 font-medium">End-to-End TLS 1.3 / AES-256</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#071521] border border-slate-200/90 dark:border-white/10 text-center shadow-sm">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">ACTIVE TELE-CONSULTS</span>
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#0284C7] dark:text-[#1479FF]">297 Streams</span>
            <span className="text-[10px] text-[#059669] dark:text-[#20B26B] font-mono block mt-1 font-medium">Zero-Loss WebRTC Grid</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#071521] border border-slate-200/90 dark:border-white/10 text-center shadow-sm">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">MEAN CONSENSUS LATENCY</span>
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#059669] dark:text-[#20B26B]">21.4 ms</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block mt-1 font-medium">Active-Active Raft Replication</span>
          </div>
        </div>

        {/* Main Workstation Card */}
        <div className="rounded-3xl border border-white/15 bg-[#071521]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">
          {/* Top Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRotating(!isRotating)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-colors"
              >
                {isRotating ? <Pause className="w-3.5 h-3.5 text-[#18C7C9]" /> : <Play className="w-3.5 h-3.5 text-[#20B26B]" />}
                <span>{isRotating ? 'Pause Rotation' : 'Resume Orbit'}</span>
              </button>

              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                Bearing: {rotationAngle.toFixed(0)}° East &bull; Orbit Velocity: 0.25 deg/frame
              </span>
            </div>

            {/* Traffic Stream Mode */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-mono text-slate-400 mr-1 hidden md:inline">Data Traffic Layer:</span>
              {[
                { id: 'all', label: 'All Mesh' },
                { id: 'teleicu', label: 'Tele-ICU Vitals' },
                { id: 'dicom', label: 'PACS Imaging' },
                { id: 'ai', label: 'Federated AI' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTrafficFilter(t.id as any)}
                  className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-all ${
                    trafficFilter === t.id
                      ? 'bg-[#18C7C9] text-[#071521] font-bold shadow-md shadow-[#18C7C9]/20'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Globe Hologram Interactive SVG (7 cols) */}
            <div className="lg:col-span-7 relative aspect-[16/10] bg-[#050D15] rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-4">
              {/* Globe Outer Atmosphere Rings */}
              <div className="absolute w-[440px] h-[440px] rounded-full border border-[#1479FF]/20 animate-pulse pointer-events-none" />
              <div className="absolute w-[480px] h-[480px] rounded-full border border-dashed border-[#18C7C9]/20 pointer-events-none" />

              <svg viewBox="0 0 960 520" className="w-full h-full select-none">
                <defs>
                  {/* Glowing Arc Gradient */}
                  <linearGradient id="arcPulseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1479FF" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#18C7C9" stopOpacity="1" />
                    <stop offset="100%" stopColor="#20B26B" stopOpacity="0.8" />
                  </linearGradient>

                  {/* Node Glow Filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Simulated Holographic Latitude and Longitude Lines */}
                <g opacity="0.3" stroke="#1479FF" strokeWidth="0.75" fill="none">
                  {/* Parallels (Latitudes) */}
                  <ellipse cx="480" cy="260" rx="380" ry="190" />
                  <ellipse cx="480" cy="260" rx="360" ry="120" />
                  <ellipse cx="480" cy="260" rx="320" ry="50" />
                  <ellipse cx="480" cy="260" rx="360" ry="240" />

                  {/* Meridians (Longitudes) */}
                  <line x1="100" y1="260" x2="860" y2="260" strokeDasharray="4 4" />
                  <line x1="480" y1="20" x2="480" y2="500" strokeDasharray="4 4" />
                  <ellipse cx="480" cy="260" rx="140" ry="240" />
                  <ellipse cx="480" cy="260" rx="270" ry="240" />
                </g>

                {/* Animated Data Arcs Between Nodes */}
                <g stroke="url(#arcPulseGrad)" strokeWidth="1.5" fill="none" opacity="0.7">
                  {/* NYC to London */}
                  <path d="M 260 210 Q 370 140 480 170" strokeDasharray="6 4" className="animate-ecg-trace" />
                  {/* London to Zurich */}
                  <path d="M 480 170 Q 495 180 510 200" strokeDasharray="4 2" />
                  {/* Zurich to Dubai */}
                  <path d="M 510 200 Q 560 190 600 245" strokeDasharray="6 4" className="animate-ecg-trace" />
                  {/* Dubai to Singapore */}
                  <path d="M 600 245 Q 660 250 720 310" strokeDasharray="6 4" className="animate-ecg-trace" />
                  {/* Singapore to Tokyo */}
                  <path d="M 720 310 Q 770 250 790 220" strokeDasharray="6 4" />
                  {/* Singapore to Sydney */}
                  <path d="M 720 310 Q 780 370 820 410" strokeDasharray="6 4" className="animate-ecg-trace" />
                  {/* NYC to Sao Paulo */}
                  <path d="M 260 210 Q 310 300 350 370" strokeDasharray="6 4" />
                  {/* London to Tokyo Trans-polar backbone */}
                  <path d="M 480 170 Q 640 80 790 220" strokeDasharray="8 4" stroke="#18C7C9" opacity="0.4" />
                </g>

                {/* Render Global Nodes */}
                {GLOBAL_HUBS.map((hub) => {
                  const isSelected = hub.id === selectedHubId;
                  return (
                    <g
                      key={hub.id}
                      onClick={() => setSelectedHubId(hub.id)}
                      className="cursor-pointer transition-transform hover:scale-125"
                    >
                      {/* Pulse beacon for active node */}
                      {isSelected && (
                        <circle
                          cx={hub.cx}
                          cy={hub.cy}
                          r="14"
                          fill="#18C7C9"
                          opacity="0.3"
                          className="animate-ping"
                        />
                      )}

                      <circle
                        cx={hub.cx}
                        cy={hub.cy}
                        r={isSelected ? '8' : '5.5'}
                        fill={isSelected ? '#18C7C9' : '#1479FF'}
                        stroke="#FFFFFF"
                        strokeWidth={isSelected ? '2.5' : '1.5'}
                        filter="url(#glow)"
                      />

                      {/* City Label */}
                      <text
                        x={hub.cx}
                        y={hub.cy - 12}
                        fill={isSelected ? '#18C7C9' : '#E2E8F0'}
                        fontSize={isSelected ? '11' : '9.5'}
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="pointer-events-none"
                      >
                        {hub.city}
                      </text>

                      <text
                        x={hub.cx}
                        y={hub.cy + 18}
                        fill="#64748B"
                        fontSize="8"
                        fontFamily="monospace"
                        textAnchor="middle"
                        className="pointer-events-none"
                      >
                        {hub.latency}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Orbiting Telemetry HUD overlay in bottom-left */}
              <div className="absolute bottom-3 left-3 bg-[#071521]/80 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-[10px] font-mono text-slate-400 space-y-0.5">
                <div>Mesh Encryption: Quantum-Resistant Kyber-1024</div>
                <div className="text-[#20B26B]">Global Synced Records: 450,000+ Enrolled Patients</div>
              </div>
            </div>

            {/* Right Selected Node Live Telemetry (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-6 rounded-2xl bg-[#071521] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#18C7C9]">
                      {activeHub.region} Node
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">{activeHub.city} Regional Hub</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#20B26B]/20 text-[#20B26B] text-xs font-mono font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#20B26B] animate-pulse" />
                    {activeHub.uptime}
                  </span>
                </div>

                <div className="text-xs text-slate-300 font-medium">{activeHub.name}</div>

                {/* Technical Node Telemetry Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5">
                    <span className="text-slate-400 text-[10px] block">Active Bed Capacity</span>
                    <span className="font-mono font-bold text-white text-base">{activeHub.beds} Beds</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5">
                    <span className="text-slate-400 text-[10px] block">Backbone Bandwidth</span>
                    <span className="font-mono font-bold text-[#18C7C9] text-base">{activeHub.bandwidth}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5">
                    <span className="text-slate-400 text-[10px] block">P99 Transit Latency</span>
                    <span className="font-mono font-bold text-[#20B26B] text-base">{activeHub.latency}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5">
                    <span className="text-slate-400 text-[10px] block">Active Surgeries</span>
                    <span className="font-mono font-bold text-white text-base">{activeHub.activeSurgeries} Suites</span>
                  </div>
                </div>

                {/* Active Global Services Running */}
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#18C7C9]" />
                      Real-time Tele-ICU Sessions:
                    </span>
                    <span className="font-mono text-white font-bold">{activeHub.teleConsults} active</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#20B26B]" />
                      Data Residency Compliance:
                    </span>
                    <span className="font-mono text-[#20B26B]">Strict In-Country Isolation</span>
                  </div>
                </div>
              </div>

              {/* Hub Quick Selector Carousel */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 block">Switch Sovereign Regional Hub:</span>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {GLOBAL_HUBS.map((hub) => (
                    <button
                      key={hub.id}
                      onClick={() => setSelectedHubId(hub.id)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        selectedHubId === hub.id
                          ? 'bg-[#18C7C9] text-[#071521] font-bold border-[#18C7C9] shadow-md shadow-[#18C7C9]/20'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="truncate font-mono text-[11px]">{hub.city}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
