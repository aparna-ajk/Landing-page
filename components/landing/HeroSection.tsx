'use client';

import React from 'react';
import { ArrowRight, Calendar, ShieldCheck, Play } from 'lucide-react';
import Caduceus3DHeroCard from './Caduceus3DHeroCard';

interface HeroSectionProps {
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo }) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 bg-white text-black overflow-hidden select-none">
      {/* Subtle Tech Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Small Animated Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide text-black bg-black/5 border border-black/15 shadow-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span>● Hospital Core v4.8 — Online</span>
            </div>

            {/* Main Headline in Refined Small Letter Sizing */}
            <h1 className="text-sm sm:text-base lg:text-lg font-bold text-black tracking-tight leading-snug mb-4">
              connected healthcare.<br />
              <span className="text-zinc-600 font-semibold">
                smarter decisions.
              </span><br />
              <span className="text-zinc-500 font-medium">
                better outcomes.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl leading-relaxed mb-8 font-normal">
              An intelligent hospital management platform connecting doctors, patients, diagnostics, operations, billing and administration through one powerful digital ecosystem.
            </p>

            {/* CTA Buttons & Secondary Link */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#ecosystem"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-black hover:bg-zinc-800 shadow-lg shadow-black/10 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Explore Platform</span>
                <ArrowRight size={16} />
              </a>

              <button
                type="button"
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-black bg-white border-2 border-black/20 hover:border-black hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <Calendar size={16} className="text-black" />
                <span>Book a Demo</span>
              </button>
            </div>

            {/* Secondary Link: See how it works */}
            <div className="mt-6 flex items-center gap-6">
              <a
                href="#about"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-black hover:underline group"
              >
                <span className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={10} className="text-black ml-0.5" />
                </span>
                <span>See how it works &rarr;</span>
              </a>

              <span className="text-xs text-zinc-400">•</span>

              <span className="text-xs text-zinc-700 flex items-center gap-1 font-semibold">
                <ShieldCheck size={14} className="text-black" />
                <span>HIPAA &amp; SOC2 Certified</span>
              </span>
            </div>
          </div>

          {/* Right Hero Section: Ultra-Classy Borderless 3D Caduceus with Vibrant Spatial Telemetry */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <Caduceus3DHeroCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
