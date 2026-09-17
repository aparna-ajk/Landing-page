'use client';

import React, { useState, useEffect } from 'react';
import {
  Layers,
  RefreshCw,
  Activity,
  Scan,
  Pill,
  CreditCard,
  MessageSquare,
  CheckCircle2,
  Zap,
  Play,
  Pause,
} from 'lucide-react';

interface IntegrationItem {
  category: string;
  name: string;
  desc: string;
  icon: React.ElementType;
  protocol: string;
  latency: string;
  badgeColor: string;
  colorTheme: {
    activeBorder: string;
    activeBg: string;
    activeShadow: string;
    topBar: string;
    iconActive: string;
    beacon: string;
    ringColor: string;
  };
}

export default function IntegrationsSection() {
  const [activeBlinkIndex, setActiveBlinkIndex] = useState<number>(0);
  const [isAutoBlinking, setIsAutoBlinking] = useState<boolean>(true);

  const integrations: IntegrationItem[] = [
    {
      category: 'Legacy EMR & EHR Bridges',
      name: 'Epic & Cerner HL7 / FHIR Bridge',
      desc: 'Bidirectional sync of clinical charts, encounter notes, and diagnostic orders with legacy systems.',
      icon: Layers,
      protocol: 'HL7 v2.x / FHIR R4',
      latency: '<45ms',
      badgeColor: 'text-sky-700 bg-sky-50 border-sky-200',
      colorTheme: {
        activeBorder: 'border-sky-400',
        activeBg: 'bg-gradient-to-br from-sky-50/90 via-blue-50/40 to-white',
        activeShadow: 'shadow-[0_16px_36px_-8px_rgba(14,165,233,0.38)]',
        topBar: 'bg-sky-500',
        iconActive: 'bg-sky-500 text-white shadow-sky-400/50',
        beacon: 'bg-sky-500',
        ringColor: 'ring-2 ring-sky-400/50',
      },
    },
    {
      category: 'Bedside Patient Monitors',
      name: 'Philips IntelliVue & GE CARESCAPE',
      desc: 'Native IoT telemetry ingestion capturing continuous 12-lead ECG, SpO2, and invasive arterial lines.',
      icon: Activity,
      protocol: 'IEEE 11073 IoT',
      latency: 'Real-time',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      colorTheme: {
        activeBorder: 'border-emerald-400',
        activeBg: 'bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white',
        activeShadow: 'shadow-[0_16px_36px_-8px_rgba(16,185,129,0.38)]',
        topBar: 'bg-emerald-500',
        iconActive: 'bg-emerald-500 text-white shadow-emerald-400/50',
        beacon: 'bg-emerald-500',
        ringColor: 'ring-2 ring-emerald-400/50',
      },
    },
    {
      category: 'Medical Imaging & PACS',
      name: 'Siemens Healthineers & Canon DICOM',
      desc: 'DICOM 3.0 standard C-STORE and WADO-RS endpoints for seamless CT, MRI, and X-ray streaming.',
      icon: Scan,
      protocol: 'DICOM 3.0 / PACS',
      latency: '<600ms',
      badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
      colorTheme: {
        activeBorder: 'border-purple-400',
        activeBg: 'bg-gradient-to-br from-purple-50/90 via-violet-50/40 to-white',
        activeShadow: 'shadow-[0_16px_36px_-8px_rgba(168,85,247,0.38)]',
        topBar: 'bg-purple-500',
        iconActive: 'bg-purple-500 text-white shadow-purple-400/50',
        beacon: 'bg-purple-500',
        ringColor: 'ring-2 ring-purple-400/50',
      },
    },
    {
      category: 'Pharmacy & Robotics',
      name: 'Omnicell & BD Pyxis Cabinets',
      desc: 'Automated medication dispensing cabinet replenishment and real-time narcotic diversion control.',
      icon: Pill,
      protocol: 'ADC Cabinet API',
      latency: 'Sub-second',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
      colorTheme: {
        activeBorder: 'border-amber-400',
        activeBg: 'bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white',
        activeShadow: 'shadow-[0_16px_36px_-8px_rgba(245,158,11,0.38)]',
        topBar: 'bg-amber-500',
        iconActive: 'bg-amber-500 text-white shadow-amber-400/50',
        beacon: 'bg-amber-500',
        ringColor: 'ring-2 ring-amber-400/50',
      },
    },
    {
      category: 'Clearinghouse & Billing',
      name: 'Direct EDI 837 / 835 Payer Gateway',
      desc: 'Automated insurance submission, ANSI ASC X12 standard claims, and real-time eligibility inquiry.',
      icon: CreditCard,
      protocol: 'ANSI X12 EDI',
      latency: 'Instant Pre-auth',
      badgeColor: 'text-teal-700 bg-teal-50 border-teal-200',
      colorTheme: {
        activeBorder: 'border-teal-400',
        activeBg: 'bg-gradient-to-br from-teal-50/90 via-cyan-50/40 to-white',
        activeShadow: 'shadow-[0_16px_36px_-8px_rgba(20,184,166,0.38)]',
        topBar: 'bg-teal-500',
        iconActive: 'bg-teal-500 text-white shadow-teal-400/50',
        beacon: 'bg-teal-500',
        ringColor: 'ring-2 ring-teal-400/50',
      },
    },
    {
      category: 'Patient Communications',
      name: 'Twilio & WhatsApp Business Health API',
      desc: 'HIPAA-compliant appointment confirmations, digital queue alerts, and encrypted lab report links.',
      icon: MessageSquare,
      protocol: 'TLS Webhooks',
      latency: '<120ms',
      badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
      colorTheme: {
        activeBorder: 'border-rose-400',
        activeBg: 'bg-gradient-to-br from-rose-50/90 via-pink-50/40 to-white',
        activeShadow: 'shadow-[0_16px_36px_-8px_rgba(244,63,94,0.38)]',
        topBar: 'bg-rose-500',
        iconActive: 'bg-rose-500 text-white shadow-rose-400/50',
        beacon: 'bg-rose-500',
        ringColor: 'ring-2 ring-rose-400/50',
      },
    },
  ];

  // 2X Speed Sequential Auto-Blinking Loop (1200ms per card)
  useEffect(() => {
    if (!isAutoBlinking) return;

    const interval = setInterval(() => {
      setActiveBlinkIndex((prev) => (prev + 1) % integrations.length);
    }, 1200); // 1.2s per box (2X speed motion)

    return () => clearInterval(interval);
  }, [isAutoBlinking, integrations.length]);

  return (
    <section id="integrations" className="relative py-20 bg-white text-black transition-colors duration-300 overflow-hidden select-none">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/15 text-black text-xs font-semibold uppercase tracking-wider mb-3">
            <RefreshCw className="w-3.5 h-3.5 text-black" />
            Universal Healthcare Interoperability
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-black mb-2">
            Connects With Your Existing <br />
            <span className="text-zinc-600">
              Hospital Technology Stack
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto font-medium">
            Pre-certified connectors for leading hospital EHRs, telemetry monitors, PACS imaging systems, and billing clearinghouses.
          </p>
        </div>

        {/* 2X Speed Sequential Blinking Control Bar */}
        <div className="max-w-6xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-black/[0.03] border border-black/10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              {isAutoBlinking && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isAutoBlinking ? 'bg-emerald-600' : 'bg-zinc-400'
                }`}
              />
            </span>
            <span className="text-xs font-bold text-black flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>
                {isAutoBlinking
                  ? `Sequential 2X Auto-Blink Active — Connector 0${activeBlinkIndex + 1} of 06`
                  : 'Blink Motion Paused (Click any box to inspect)'}
              </span>
            </span>
            <span className="text-[11px] text-zinc-500 font-medium hidden md:inline">
              ({integrations[activeBlinkIndex]?.name.split(' ')[0]} Active)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoBlinking((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-black/15 text-black hover:bg-zinc-100 text-xs font-bold font-mono transition-colors shadow-xs"
            >
              {isAutoBlinking ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-black" />
                  <span>Resume 2X Motion</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Compact, Professional & Unique Integration Cards Grid with 2X Auto-Blink Color Effect */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 max-w-6xl mx-auto"
          onMouseEnter={() => setIsAutoBlinking(false)}
          onMouseLeave={() => setIsAutoBlinking(true)}
        >
          {integrations.map((item, idx) => {
            const IconComp = item.icon;
            const isBlinking = activeBlinkIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveBlinkIndex(idx)}
                className={`p-4 sm:p-4.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
                  isBlinking
                    ? `${item.colorTheme.activeBg} ${item.colorTheme.activeBorder} ${item.colorTheme.activeShadow} ${item.colorTheme.ringColor} -translate-y-2 scale-[1.03] z-10`
                    : 'bg-white border-black/15 hover:border-black/50 text-zinc-800 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {/* Top 2D Colored Accent Line (Always visible, illuminates with color when blinking) */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
                    isBlinking ? `${item.colorTheme.topBar} opacity-100` : 'bg-black/0 group-hover:bg-black/20'
                  }`}
                />

                <div>
                  {/* Top Bar: Compact Icon, Blinking Beacon & Unique Protocol Badge */}
                  <div className="flex items-center justify-between mb-3 pt-0.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 shadow-xs ${
                          isBlinking
                            ? `${item.colorTheme.iconActive} scale-110`
                            : 'bg-slate-50 border border-black/10 text-black group-hover:bg-black group-hover:text-white'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>

                      {/* Animated Blinking Beacon on Active Card */}
                      {isBlinking && (
                        <span className="flex h-2.5 w-2.5 relative">
                          <span
                            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${item.colorTheme.beacon} opacity-80`}
                          />
                          <span
                            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${item.colorTheme.beacon} shadow-xs`}
                          />
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border transition-all ${
                        isBlinking ? `${item.badgeColor} shadow-xs font-extrabold scale-105` : item.badgeColor
                      }`}
                    >
                      {item.protocol}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold block mb-0.5">
                      {item.category}
                    </span>
                    <h4
                      className={`text-xs sm:text-sm font-bold tracking-tight leading-snug transition-colors ${
                        isBlinking ? 'text-black font-extrabold' : 'text-black'
                      }`}
                    >
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-zinc-600 font-normal leading-relaxed mt-1.5 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Micro Telemetry Footer */}
                <div className="pt-2.5 mt-3 border-t border-black/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5 text-zinc-600 font-semibold">
                    <span
                      className={`w-1.5 h-1.5 rounded-full inline-block ${
                        isBlinking ? `${item.colorTheme.beacon} animate-ping` : 'bg-emerald-500'
                      }`}
                    />
                    Sync: {item.latency}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400 font-medium">
                    <CheckCircle2 className={`w-3 h-3 ${isBlinking ? 'text-emerald-600' : 'text-zinc-400'}`} />
                    {isBlinking ? 'Active Stream' : 'Plug & Play'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
