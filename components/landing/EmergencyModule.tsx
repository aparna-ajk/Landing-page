'use client';

import React, { useState } from 'react';
import {
  Ambulance,
  AlertOctagon,
  PhoneCall,
  Radio,
  Droplets,
  CheckCircle2,
} from 'lucide-react';
import ThreeDCard from '@/components/ui/ThreeDCard';

export default function EmergencyModule() {
  const [activeAmbulanceId, setActiveAmbulanceId] = useState('AMB-102');

  const ambulances = [
    {
      id: 'AMB-102',
      unitName: 'Critical Care Unit 102 (ALS)',
      eta: '03m 42s',
      distance: '1.8 km away',
      location: 'Interstate 95 Northbound',
      patient: 'Unknown Male (~35y) • MVA Polytrauma',
      vitals: { hr: '124 BPM', bp: '84/52', spo2: '91%', gcs: '9 (E2 V3 M4)' },
      priority: 'Level 1 Immediate Resuscitation',
      preAlerts: ['Massive Transfusion Protocol (MTP) Staged', 'Trauma Bay 1 Reserved', 'Code STEMI/Trauma Team Paged'],
    },
    {
      id: 'AMB-108',
      unitName: 'Stroke FastTrack 108 (Mobile CT)',
      eta: '07m 15s',
      distance: '4.2 km away',
      location: 'West Grand Avenue',
      patient: 'Maria Gomez (67y, F) • Acute Hemiparesis',
      vitals: { hr: '88 BPM', bp: '168/94', spo2: '97%', gcs: '14' },
      priority: 'Level 2 Emergent (Code Stroke)',
      preAlerts: ['Perfusion CT Scanner Cleared', 'Neurology Telestroke Engaged', 'tPA / Tenecteplase Pre-Dosed'],
    },
  ];

  const currentAmb = ambulances.find((a) => a.id === activeAmbulanceId) || ambulances[0];

  return (
    <section id="emergency" className="relative py-28 bg-white text-black overflow-hidden select-none">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/15 text-black text-xs font-semibold uppercase tracking-wider mb-4">
              <AlertOctagon className="w-3.5 h-3.5 text-black animate-pulse" />
              Trauma &amp; Resuscitation Center
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black mb-4">
              Zero-Latency Emergency <br />
              <span className="text-zinc-600">
                Dispatch &amp; Trauma Orchestration
              </span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 max-w-2xl font-medium">
              Streaming real-time telemetry from incoming emergency ambulances directly to trauma bays.
              Prepare operating theatres, cross-match blood reserves, and mobilize surgical specialists before wheels touch the ramp.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-white border border-black/10 text-center shadow-sm">
              <div className="text-2xl font-black font-mono text-black">&lt; 90s</div>
              <div className="text-[11px] text-zinc-600 font-bold">Door-to-Bay Triage</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-black/10 text-center shadow-sm">
              <div className="text-2xl font-black font-mono text-black">100%</div>
              <div className="text-[11px] text-zinc-600 font-bold">Pre-Hospital Sync</div>
            </div>
          </div>
        </div>

        {/* Emergency Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Interactive GPS Map & Incoming Fleet (7 cols) */}
          <ThreeDCard maxTilt={4} scale={1.01} glare={false} className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-black/10 p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-black">
                  <Radio className="w-4 h-4 text-black animate-ping" />
                  <span>INBOUND AMBULANCE TELEMETRY RADAR</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-black bg-black/5 px-2.5 py-1 rounded-full border border-black/10">
                  2 Active Units En Route
                </span>
              </div>

              {/* Ambulance Selector Tabs */}
              <div className="flex gap-3">
                {ambulances.map((amb) => (
                  <button
                    key={amb.id}
                    onClick={() => setActiveAmbulanceId(amb.id)}
                    className={`flex-1 p-3.5 rounded-2xl border text-left transition-all ${
                      activeAmbulanceId === amb.id
                        ? 'bg-black text-white border-black shadow-md'
                        : 'bg-white border-black/15 text-zinc-700 hover:border-black'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="flex items-center gap-1.5">
                        <Ambulance className="w-3.5 h-3.5" />
                        {amb.id}
                      </span>
                      <span className="font-mono font-bold">{amb.eta}</span>
                    </div>
                    <div className={`text-[11px] truncate ${activeAmbulanceId === amb.id ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {amb.location}
                    </div>
                  </button>
                ))}
              </div>

              {/* Simulated Hospital Navigation Radar Map */}
              <div className="relative h-64 sm:h-72 rounded-2xl bg-slate-50 border border-black/10 overflow-hidden flex items-center justify-center">
                {/* Radar Grid Lines */}
                <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:32px_32px]" />

                {/* Radar Lines */}
                <div className="w-80 h-80 rounded-full border border-black/10 flex items-center justify-center">
                  <div className="w-56 h-56 rounded-full border border-black/15 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-black/20 flex items-center justify-center">
                      {/* Hospital Command Center Base Marker */}
                      <div className="relative flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-black text-white font-black flex items-center justify-center shadow-lg">
                          H
                        </div>
                        <span className="text-[10px] font-mono font-bold text-black mt-1 bg-white border border-black/15 px-2 py-0.5 rounded shadow-sm">
                          Trauma Center
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Moving Ambulance Marker with Ping */}
                <div className="absolute top-12 left-16 flex flex-col items-center animate-bounce">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-md">
                      <Ambulance className="w-4 h-4" />
                    </div>
                    <span className="absolute -inset-1 rounded-full bg-black/20 animate-ping" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-white bg-black border border-black px-2 py-0.5 rounded mt-1">
                    {currentAmb.id} &bull; {currentAmb.eta}
                  </span>
                </div>

                {/* Waypoint Route Vector */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-black/40">
                  <line x1="90" y1="80" x2="50%" y2="50%" strokeWidth="2" strokeDasharray="6" />
                </svg>
              </div>

              {/* In-Transit Patient Vitals */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-black/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-black">Live Cellular Telemetry (Pre-Hospital)</span>
                  <span className="text-black font-mono font-bold px-2 py-0.5 rounded bg-white border border-black/10">
                    {currentAmb.priority}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-black/10">
                    <div className="text-[10px] text-zinc-500 font-bold">Heart Rate</div>
                    <div className="font-mono font-black text-black mt-0.5">{currentAmb.vitals.hr}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-black/10">
                    <div className="text-[10px] text-zinc-500 font-bold">Blood Pressure</div>
                    <div className="font-mono font-black text-black mt-0.5">{currentAmb.vitals.bp}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-black/10">
                    <div className="text-[10px] text-zinc-500 font-bold">SpO2</div>
                    <div className="font-mono font-black text-black mt-0.5">{currentAmb.vitals.spo2}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-black/10">
                    <div className="text-[10px] text-zinc-500 font-bold">Glasgow Coma</div>
                    <div className="font-mono font-black text-black mt-0.5">{currentAmb.vitals.gcs}</div>
                  </div>
                </div>
              </div>
            </div>
          </ThreeDCard>

          {/* Right: Hospital Trauma Bay Readiness (5 cols) */}
          <ThreeDCard maxTilt={4} scale={1.01} glare={false} className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <span className="text-xs font-mono font-black uppercase tracking-wider text-black">
                  Trauma Bay Resuscitation Checklist
                </span>
                <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-mono font-bold">
                  Code Red Active
                </span>
              </div>

              <div className="space-y-3">
                {currentAmb.preAlerts.map((alert, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-black/10 flex items-start gap-3 text-xs">
                    <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">
                      ✓
                    </div>
                    <div>
                      <div className="font-bold text-black">{alert}</div>
                      <div className="text-[11px] text-zinc-600 mt-0.5">Automated protocol clearance ready upon arrival</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Blood Bank Staging */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-black/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-black font-bold">
                    <Droplets className="w-4 h-4 text-black" />
                    Emergency Blood Reserve Match
                  </span>
                  <span className="text-black font-mono font-black px-2 py-0.5 rounded bg-white border border-black/10">
                    4 Units O-Neg
                  </span>
                </div>
                <p className="text-[11px] text-zinc-600 font-medium">
                  Transfusion cooler dispatched to Trauma Bay 1. RFID cross-match release verified.
                </p>
              </div>

              {/* Trauma Attending Contact */}
              <div className="pt-2">
                <button className="w-full py-3.5 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2">
                  <PhoneCall className="w-4 h-4" />
                  Direct Intercom: Ambulance Unit Paramedic
                </button>
              </div>
            </div>
          </ThreeDCard>
        </div>
      </div>
    </section>
  );
}
