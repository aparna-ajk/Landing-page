'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building2,
  Stethoscope,
  Scan,
  Landmark,
} from 'lucide-react';

interface CtaSectionProps {
  onOpenDemo: () => void;
}

type FacilityType = 'enterprise' | 'clinics' | 'diagnostic' | 'government';

interface FacilityOption {
  id: FacilityType;
  name: string;
  scale: string;
  icon: React.ElementType;
  highlights: string[];
  gradient: string;
  glowShadow: string;
  ringColor: string;
  iconColor: string;
  badgeBg: string;
}

export default function CtaSection({ onOpenDemo }: CtaSectionProps) {
  const [selectedFacility, setSelectedFacility] = useState<FacilityType>('enterprise');
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);

  const facilityOptions: FacilityOption[] = [
    {
      id: 'enterprise',
      name: 'Enterprise Hospitals',
      scale: '250 - 2,000+ Beds',
      icon: Building2,
      highlights: ['Multi-Pavilion Synchronization', 'Smart OT Orchestration', 'Automated TPA Claims'],
      gradient: 'from-sky-600 via-blue-600 to-indigo-700',
      glowShadow: 'shadow-[0_20px_45px_-8px_rgba(14,165,233,0.55)]',
      ringColor: 'ring-2 ring-sky-400 border-sky-400/60',
      iconColor: 'text-sky-200',
      badgeBg: 'bg-sky-500/20 text-sky-200 border-sky-400/30',
    },
    {
      id: 'clinics',
      name: 'Multi-Specialty Clinics',
      scale: '10 - 150 Practitioners',
      icon: Stethoscope,
      highlights: ['Ambient Clinical Voice Scribing', 'Digital Mobile Patient Portal', 'Fast Telemedicine'],
      gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
      glowShadow: 'shadow-[0_20px_45px_-8px_rgba(16,185,129,0.55)]',
      ringColor: 'ring-2 ring-emerald-400 border-emerald-400/60',
      iconColor: 'text-emerald-200',
      badgeBg: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
    },
    {
      id: 'diagnostic',
      name: 'Diagnostic Centers',
      scale: 'Radiology & Pathology Networks',
      icon: Scan,
      highlights: ['Sub-600ms Web PACS DICOM', 'Bi-directional LIS Auto-Alerts', 'Barcode Specimen Tracking'],
      gradient: 'from-indigo-600 via-violet-600 to-purple-700',
      glowShadow: 'shadow-[0_20px_45px_-8px_rgba(139,92,246,0.55)]',
      ringColor: 'ring-2 ring-violet-400 border-violet-400/60',
      iconColor: 'text-violet-200',
      badgeBg: 'bg-violet-500/20 text-violet-200 border-violet-400/30',
    },
    {
      id: 'government',
      name: 'Government Health Networks',
      scale: 'State / National Healthcare Mesh',
      icon: Landmark,
      highlights: ['Sovereign In-Country Isolation', 'National Health ID Integration', 'Population Epidemiological CAD'],
      gradient: 'from-rose-600 via-orange-600 to-amber-700',
      glowShadow: 'shadow-[0_20px_45px_-8px_rgba(244,63,94,0.55)]',
      ringColor: 'ring-2 ring-rose-400 border-rose-400/60',
      iconColor: 'text-rose-200',
      badgeBg: 'bg-rose-500/20 text-rose-200 border-rose-400/30',
    },
  ];

  // Automatically cycle and blink through the 4 cards sequentially
  useEffect(() => {
    if (!isAutoCycling) return;

    const interval = setInterval(() => {
      setSelectedFacility((prev) => {
        const currentIndex = facilityOptions.findIndex((f) => f.id === prev);
        const nextIndex = (currentIndex + 1) % facilityOptions.length;
        return facilityOptions[nextIndex].id;
      });
    }, 2400); // 2.4 seconds per card for smooth automatic 3D blinking color transitions

    return () => clearInterval(interval);
  }, [isAutoCycling, facilityOptions]);

  const activeOption = facilityOptions.find((f) => f.id === selectedFacility) || facilityOptions[0];

  const handleSelectCard = (id: FacilityType) => {
    setSelectedFacility(id);
    // Pause auto-cycle briefly on manual click, then resume
    setIsAutoCycling(false);
    setTimeout(() => setIsAutoCycling(true), 6000);
  };

  return (
    <section id="pricing-cta" className="relative py-28 bg-white text-black transition-colors duration-300 overflow-hidden select-none">
      {/* Dynamic 3D ambient light background matching active card color */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-sky-400/10 via-emerald-400/10 to-violet-400/10 rounded-full blur-3xl pointer-events-none transition-all duration-700" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 border border-black/15 text-black text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          Ready to Build a Smarter Hospital?
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black mb-4 leading-tight">
          Modernize Your Healthcare <br />
          <span className="text-zinc-600">
            Ecosystem Today
          </span>
        </h2>

        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto mb-10 font-medium">
          Choose your facility archetype to preview customized deployment configurations and automated clinical workflows.
        </p>

        {/* 4 Facility Profile Selector Tabs with 3D Effect & Color Blink Animation */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-6 text-left"
          style={{ perspective: '1200px' }}
        >
          {facilityOptions.map((opt) => {
            const IconComp = opt.icon;
            const isSelected = selectedFacility === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectCard(opt.id)}
                className={`relative p-5 rounded-3xl border text-left transition-all duration-500 cursor-pointer overflow-hidden group ${
                  isSelected
                    ? `bg-gradient-to-br ${opt.gradient} text-white ${opt.glowShadow} ${opt.ringColor} -translate-y-2.5 scale-[1.04]`
                    : 'bg-white border-black/15 hover:border-black/40 text-zinc-800 shadow-md hover:-translate-y-1 hover:shadow-lg'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 3D Glass Sheen Highlight on Active Card */}
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-transparent pointer-events-none" />
                )}

                {/* Animated Blinking Live Beacon on Active Card */}
                {isSelected && (
                  <span className="absolute top-3.5 right-3.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white shadow-sm" />
                  </span>
                )}

                {/* Card Icon with dynamic color pulse */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                    isSelected
                      ? 'bg-white/20 backdrop-blur-md shadow-inner text-white scale-110'
                      : 'bg-black/5 text-black group-hover:scale-105'
                  }`}
                >
                  <IconComp className={`w-5 h-5 ${isSelected ? opt.iconColor : 'text-black'}`} />
                </div>

                <div
                  className={`font-black text-xs sm:text-sm tracking-tight transition-colors ${
                    isSelected ? 'text-white' : 'text-black'
                  }`}
                >
                  {opt.name}
                </div>

                <div
                  className={`text-[11px] mt-1 font-medium transition-colors ${
                    isSelected ? 'text-white/80' : 'text-zinc-500'
                  }`}
                >
                  {opt.scale}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Highlights of the Active 3D Colored Profile */}
        <div className="max-w-4xl mx-auto mb-10 p-4 rounded-2xl bg-black/[0.03] border border-black/10 flex flex-wrap items-center justify-center gap-3 transition-all duration-500">
          <span className="text-xs font-mono font-bold text-black uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            {activeOption.name} Inclusions:
          </span>
          {activeOption.highlights.map((h, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-black/15 shadow-sm text-zinc-800"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-black" />
              <span>{h}</span>
            </span>
          ))}
        </div>

        {/* Demonstration & Onboarding Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-sm sm:text-base shadow-xl shadow-black/15 transition-all transform hover:-translate-y-0.5 group"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Schedule Live Hospital Demo</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-white" />
          </button>
        </div>

        {/* Risk-free Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600 font-semibold">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-black" />
            <span>Zero IT Disruption Rollout</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-black" />
            <span>60-Day Clinical Pilot Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-black" />
            <span>Dedicated HL7/FHIR Onboarding Squad</span>
          </div>
        </div>
      </div>
    </section>
  );
}
