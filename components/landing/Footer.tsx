'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  FileText,
  Building2,
  ExternalLink,
  Cpu,
  Stethoscope,
  Activity,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function Footer() {
  const [activeHeading, setActiveHeading] = useState<string | null>('clinical');
  const [bouncingId, setBouncingId] = useState<string | null>(null);

  const handleHeadingClick = (id: string) => {
    setActiveHeading((prev) => (prev === id ? null : id));
    setBouncingId(id);
    setTimeout(() => {
      setBouncingId(null);
    }, 700);
  };
  return (
    <footer className="relative bg-slate-50 text-black border-t border-black/10 transition-colors duration-300 overflow-hidden select-none">
      {/* Dynamic Animated ECG Heartbeat Scanner Line across top border */}
      <div className="w-full h-9 overflow-hidden relative opacity-90 border-b border-black/10 bg-white">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 36"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="ecg-red-glow" x="-20%" y="-40%" width="140%" height="180%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#ef4444" floodOpacity="0.85" />
            </filter>
          </defs>

          {/* Static Background Guideline Track */}
          <path
            d="M0 18 L180 18 L190 22 L195 6 L205 32 L215 4 L225 26 L230 18 L480 18 L490 22 L495 6 L505 32 L515 4 L525 26 L530 18 L780 18 L790 22 L795 6 L805 32 L815 4 L825 26 L830 18 L1080 18 L1090 22 L1095 6 L1105 32 L1115 4 L1125 26 L1130 18 L1200 18"
            fill="none"
            stroke="#000000"
            strokeWidth="1.2"
            strokeOpacity="0.15"
          />

          {/* Animated Glowing Laser Pulse Layer in Vibrant Red */}
          <path
            d="M0 18 L180 18 L190 22 L195 6 L205 32 L215 4 L225 26 L230 18 L480 18 L490 22 L495 6 L505 32 L515 4 L525 26 L530 18 L780 18 L790 22 L795 6 L805 32 L815 4 L825 26 L830 18 L1080 18 L1090 22 L1095 6 L1105 32 L1115 4 L1125 26 L1130 18 L1200 18"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ecg-red-glow)"
            strokeDasharray="200 1000"
            strokeDashoffset="0"
            className="animate-ecg-sweep"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 relative z-10">
        {/* Navigation Columns */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-14">
          {/* Clinical Systems */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => handleHeadingClick('clinical')}
              aria-label="Toggle Clinical Systems 3D View"
              className={`w-full text-left p-3 rounded-2xl transition-all duration-300 select-none relative group cursor-pointer ${
                bouncingId === 'clinical' ? 'animate-pop-3d' : ''
              } ${
                activeHeading === 'clinical'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-[0_6px_0_#065f46,0_14px_24px_rgba(16,185,129,0.45)] -translate-y-1 border border-emerald-300/50'
                  : 'bg-white hover:bg-slate-50 text-black border border-black/10 shadow-[0_4px_0_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_6px_0_#059669,0_12px_20px_rgba(16,185,129,0.25)] hover:border-emerald-500/40'
              } active:translate-y-1 active:shadow-[0_1px_0_rgba(0,0,0,0.2)]`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-500 shadow-sm ${
                      activeHeading === 'clinical'
                        ? 'bg-white/20 text-white backdrop-blur-md rotate-12 scale-110'
                        : 'bg-emerald-50 text-emerald-600 group-hover:scale-110 group-hover:rotate-6'
                    } ${bouncingId === 'clinical' ? 'animate-spin-3d' : ''}`}
                  >
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black font-mono uppercase tracking-wider block">
                      Clinical Systems
                    </span>
                    <span
                      className={`text-[10px] font-semibold block transition-colors ${
                        activeHeading === 'clinical' ? 'text-white/90' : 'text-zinc-500'
                      }`}
                    >
                      {activeHeading === 'clinical' ? '● 3D Telemetry Active' : 'Click for 3D view'}
                    </span>
                  </div>
                </div>
                <div
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase font-mono tracking-wider transition-all duration-300 ${
                    activeHeading === 'clinical'
                      ? 'bg-white text-emerald-700 shadow-sm scale-105'
                      : 'bg-emerald-100/70 text-emerald-700 opacity-80 group-hover:opacity-100'
                  }`}
                >
                  Live
                </div>
              </div>
            </button>
            <ul className="space-y-2.5 text-xs text-zinc-600 font-semibold px-1">
              {[
                { name: 'Hospital Ecosystem & SLA', href: '#stats' },
                { name: 'Clinical Specialties', href: '#specialization' },
                { name: 'Patient Recovery Outcomes', href: '#review' },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className={`group flex items-center gap-2 transition-all hover:translate-x-1 ${
                      activeHeading === 'clinical' ? 'text-emerald-950 font-bold hover:text-emerald-600' : 'hover:text-black'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        activeHeading === 'clinical'
                          ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] scale-125'
                          : 'bg-black/30 group-hover:bg-black'
                      }`}
                    />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Operations & AI */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => handleHeadingClick('operations')}
              aria-label="Toggle Operations & Admin 3D View"
              className={`w-full text-left p-3 rounded-2xl transition-all duration-300 select-none relative group cursor-pointer ${
                bouncingId === 'operations' ? 'animate-pop-3d' : ''
              } ${
                activeHeading === 'operations'
                  ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 text-white shadow-[0_6px_0_#312e81,0_14px_24px_rgba(99,102,241,0.45)] -translate-y-1 border border-indigo-300/50'
                  : 'bg-white hover:bg-slate-50 text-black border border-black/10 shadow-[0_4px_0_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_6px_0_#4f46e5,0_12px_20px_rgba(99,102,241,0.25)] hover:border-indigo-500/40'
              } active:translate-y-1 active:shadow-[0_1px_0_rgba(0,0,0,0.2)]`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-500 shadow-sm ${
                      activeHeading === 'operations'
                        ? 'bg-white/20 text-white backdrop-blur-md rotate-45 scale-110'
                        : 'bg-indigo-50 text-indigo-600 group-hover:scale-110 group-hover:rotate-12'
                    } ${bouncingId === 'operations' ? 'animate-spin-3d' : ''}`}
                  >
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black font-mono uppercase tracking-wider block">
                      Operations &amp; Admin
                    </span>
                    <span
                      className={`text-[10px] font-semibold block transition-colors ${
                        activeHeading === 'operations' ? 'text-white/90' : 'text-zinc-500'
                      }`}
                    >
                      {activeHeading === 'operations' ? '● 3D Neural Flow Active' : 'Click for 3D view'}
                    </span>
                  </div>
                </div>
                <div
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase font-mono tracking-wider transition-all duration-300 ${
                    activeHeading === 'operations'
                      ? 'bg-white text-indigo-700 shadow-sm scale-105'
                      : 'bg-indigo-100/70 text-indigo-700 opacity-80 group-hover:opacity-100'
                  }`}
                >
                  Core
                </div>
              </div>
            </button>
            <ul className="space-y-2.5 text-xs text-zinc-600 font-semibold px-1">
              {[
                { name: 'Our Specialist Doctors', href: '#doctors' },
                { name: 'Verified Clinical Reviews', href: '#review' },
                { name: 'Patient Recovery Reviews', href: '#patient-reviews' },
                { name: 'Hospital Impact & SLA', href: '#stats' },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className={`group flex items-center gap-2 transition-all hover:translate-x-1 ${
                      activeHeading === 'operations' ? 'text-indigo-950 font-bold hover:text-indigo-600' : 'hover:text-black'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        activeHeading === 'operations'
                          ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] scale-125'
                          : 'bg-black/30 group-hover:bg-black'
                      }`}
                    />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Security */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => handleHeadingClick('compliance')}
              aria-label="Toggle Compliance & Trust 3D View"
              className={`w-full text-left p-3 rounded-2xl transition-all duration-300 select-none relative group cursor-pointer ${
                bouncingId === 'compliance' ? 'animate-pop-3d' : ''
              } ${
                activeHeading === 'compliance'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-[0_6px_0_#9a3412,0_14px_24px_rgba(245,158,11,0.45)] -translate-y-1 border border-amber-300/50'
                  : 'bg-white hover:bg-slate-50 text-black border border-black/10 shadow-[0_4px_0_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_6px_0_#d97706,0_12px_20px_rgba(245,158,11,0.25)] hover:border-amber-500/40'
              } active:translate-y-1 active:shadow-[0_1px_0_rgba(0,0,0,0.2)]`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-500 shadow-sm ${
                      activeHeading === 'compliance'
                        ? 'bg-white/20 text-white backdrop-blur-md -rotate-12 scale-110'
                        : 'bg-amber-50 text-amber-600 group-hover:scale-110 group-hover:-rotate-6'
                    } ${bouncingId === 'compliance' ? 'animate-spin-3d' : ''}`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black font-mono uppercase tracking-wider block">
                      Compliance &amp; Trust
                    </span>
                    <span
                      className={`text-[10px] font-semibold block transition-colors ${
                        activeHeading === 'compliance' ? 'text-white/90' : 'text-zinc-500'
                      }`}
                    >
                      {activeHeading === 'compliance' ? '● 3D Zero-Trust Shield' : 'Click for 3D view'}
                    </span>
                  </div>
                </div>
                <div
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase font-mono tracking-wider transition-all duration-300 ${
                    activeHeading === 'compliance'
                      ? 'bg-white text-amber-700 shadow-sm scale-105'
                      : 'bg-amber-100/70 text-amber-700 opacity-80 group-hover:opacity-100'
                  }`}
                >
                  Secure
                </div>
              </div>
            </button>
            <ul className="space-y-2.5 text-xs text-zinc-600 font-semibold px-1">
              {[
                { name: 'HIPAA Title II Protocol', href: '#hero' },
                { name: 'SOC 2 Type II Certified', href: '#hero' },
                { name: 'ISO 27001 & ISO 27799', href: '#hero' },
                { name: 'GDPR Data Residency', href: '#hero' },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className={`group flex items-center gap-2 transition-all hover:translate-x-1 ${
                      activeHeading === 'compliance' ? 'text-amber-950 font-bold hover:text-amber-600' : 'hover:text-black'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        activeHeading === 'compliance'
                          ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] scale-125'
                          : 'bg-black/30 group-hover:bg-black'
                      }`}
                    />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href="/login"
                  className="inline-flex items-center gap-1.5 font-bold text-black hover:underline"
                >
                  <span>Staff Login Portal</span>
                  <ExternalLink className="w-3 h-3 text-black" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications Interactive Pills Bar */}
        <div className="py-6 border-t border-b border-black/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {[
              { label: 'HIPAA COMPLIANT', icon: ShieldCheck },
              { label: '256-BIT ENCRYPTED', icon: Lock },
              { label: 'HL7 / FHIR v4.3', icon: FileText },
              { label: 'ISO 27001', icon: Building2 },
            ].map((badge, idx) => {
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-black/15 shadow-sm text-black cursor-default group"
                >
                  <BadgeIcon className="w-3.5 h-3.5 text-black" />
                  <span className="text-black font-bold text-[11px]">{badge.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-zinc-600 font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-black" />
            <span>Version 4.8.2-Enterprise &bull; Build 2026.09</span>
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <p>
            &copy; {new Date().getFullYear()} MediCare Healthcare Cloud Technologies, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#" className="hover:text-black transition-colors">Privacy Statement</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Enterprise Service</a>
            <a href="#" className="hover:text-black transition-colors">Security Disclosures</a>
            <a href="#" className="hover:text-black transition-colors flex items-center gap-1 font-bold text-black">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              System Status: Operational
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
