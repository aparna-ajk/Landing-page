'use client';

import React from 'react';
import { AnimatedIcon } from '../ui/AnimatedIcon';

interface HeroIllustrationProps {
  className?: string;
}

export const HeroIllustration: React.FC<HeroIllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-2xl mx-auto select-none ${className}`}>
      {/* Ambient glowing backdrop mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-tr from-medicare-blue/15 via-medicare-teal/15 to-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main SVG Medical Environment Illustration */}
      <div className="relative z-10 w-full aspect-[16/11] flex items-center justify-center">
        <svg
          viewBox="0 0 740 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="hospitalGrad" x1="160" y1="60" x2="360" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#123B78" />
              <stop offset="45%" stopColor="#1687F5" />
              <stop offset="100%" stopColor="#0B1E3B" />
            </linearGradient>
            <linearGradient id="hospitalWingGrad" x1="80" y1="180" x2="200" y2="420" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f2b57" />
              <stop offset="100%" stopColor="#071426" />
            </linearGradient>
            <linearGradient id="tabletGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1687F5" />
              <stop offset="100%" stopColor="#12B8A6" />
            </linearGradient>
            <linearGradient id="ambulanceGrad" x1="90" y1="380" x2="230" y2="430" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="monitorGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0c1e38" />
              <stop offset="100%" stopColor="#071426" />
            </linearGradient>

            {/* Glowing filter for neon lights */}
            <filter id="neonPulse" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid Accent */}
          <g opacity="0.18" stroke="#1687F5" strokeWidth="1" strokeDasharray="3 3">
            <line x1="60" y1="100" x2="680" y2="100" />
            <line x1="60" y1="200" x2="680" y2="200" />
            <line x1="60" y1="300" x2="680" y2="300" />
            <line x1="60" y1="400" x2="680" y2="400" />
            <line x1="160" y1="40" x2="160" y2="460" />
            <line x1="360" y1="40" x2="360" y2="460" />
            <line x1="560" y1="40" x2="560" y2="460" />
          </g>

          {/* 1. Modern Hospital Building Architectural Facade */}
          <g className="transition-all duration-700">
            {/* Main Center Hospital Tower */}
            <rect x="180" y="80" width="190" height="340" rx="16" fill="url(#hospitalGrad)" opacity="0.95" />
            <rect x="195" y="95" width="160" height="42" rx="8" fill="#ffffff" fillOpacity="0.08" />

            {/* Hospital Rooftop Heli-Pad & Glowing Beacon */}
            <ellipse cx="275" cy="80" rx="35" ry="12" fill="#0f2b57" stroke="#1687F5" strokeWidth="1.5" />
            <circle cx="275" cy="74" r="5" fill="#ef4444" className="animate-ping" style={{ animationDuration: '2s' }} />
            <circle cx="275" cy="74" r="3" fill="#ef4444" />

            {/* Modern Hospital Cross Emblem on Tower Front */}
            <circle cx="275" cy="116" r="15" fill="#12B8A6" filter="url(#neonPulse)" />
            <path d="M272 108H278V124H272Z" fill="#ffffff" />
            <path d="M267 113H283V119H267Z" fill="#ffffff" />

            {/* Glowing Window Matrix with Soft Pulse */}
            {[0, 1, 2, 3, 4].map((row) => (
              <g key={row}>
                <rect x="205" y={160 + row * 45} width="35" height="24" rx="4" fill="#67e8f9" fillOpacity="0.45" />
                <rect
                  x="255"
                  y={160 + row * 45}
                  width="40"
                  height="24"
                  rx="4"
                  fill="#67e8f9"
                  fillOpacity={row % 2 === 0 ? "0.85" : "0.35"}
                  className="transition-opacity duration-1000"
                />
                <rect x="310" y={160 + row * 45} width="35" height="24" rx="4" fill="#67e8f9" fillOpacity="0.5" />
              </g>
            ))}

            {/* Secondary West Hospital Wing */}
            <rect x="95" y="190" width="100" height="230" rx="12" fill="url(#hospitalWingGrad)" opacity="0.9" />
            {[0, 1, 2].map((row) => (
              <g key={`wing-${row}`}>
                <rect x="110" y={220 + row * 55} width="30" height="28" rx="4" fill="#38bdf8" fillOpacity="0.4" />
                <rect x="150" y={220 + row * 55} width="30" height="28" rx="4" fill="#38bdf8" fillOpacity="0.65" />
              </g>
            ))}
          </g>

          {/* 2. Ambulance & Emergency Bay */}
          <g transform="translate(30, 20)">
            <rect x="90" y="380" width="140" height="50" rx="10" fill="url(#ambulanceGrad)" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="180" y="385" width="40" height="22" rx="4" fill="#38bdf8" fillOpacity="0.4" />
            {/* Red Cross on Ambulance */}
            <circle cx="130" cy="405" r="9" fill="#fee2e2" />
            <path d="M128 400H132V410H128Z" fill="#ef4444" />
            <path d="M125 403H135V407H125Z" fill="#ef4444" />
            {/* Wheels */}
            <circle cx="120" cy="430" r="12" fill="#1e293b" />
            <circle cx="120" cy="430" r="5" fill="#94a3b8" />
            <circle cx="200" cy="430" r="12" fill="#1e293b" />
            <circle cx="200" cy="430" r="5" fill="#94a3b8" />
            {/* Emergency Siren Flash */}
            <circle cx="140" cy="374" r="6" fill="#ef4444" className="animate-ping" style={{ animationDuration: '1.2s' }} />
            <rect x="137" y="375" width="6" height="5" rx="2" fill="#ef4444" />
          </g>

          {/* 3. Patient Monitoring Telemetry Display Backdrop */}
          <g transform="translate(350, 110)">
            {/* Large Futuristic Telemetry Monitor */}
            <rect x="65" y="25" width="240" height="165" rx="18" fill="url(#monitorGrad)" stroke="#1687F5" strokeWidth="1.8" />
            <rect x="85" y="42" width="110" height="8" rx="4" fill="#38bdf8" fillOpacity="0.8" />
            <circle cx="285" cy="46" r="4.5" fill="#12B8A6" className="animate-pulse" />

            {/* Continuous Heartbeat ECG Waveform */}
            <path
              d="M85 92H130L140 65L150 125L160 75L170 105L180 92H285"
              stroke="#12B8A6"
              strokeWidth="2.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-ecg-draw"
              style={{ strokeDasharray: '300' }}
            />

            {/* Clinical Analytics Volume Bars */}
            <g transform="translate(85, 125)">
              <rect x="0" y="25" width="22" height="25" rx="4" fill="#1687F5" fillOpacity="0.45" />
              <rect x="30" y="10" width="22" height="40" rx="4" fill="#1687F5" fillOpacity="0.8" />
              <rect x="60" y="20" width="22" height="30" rx="4" fill="#12B8A6" fillOpacity="0.75" />
              <rect x="90" y="0" width="22" height="50" rx="4" fill="#22d3ee" />
              <rect x="120" y="15" width="22" height="35" rx="4" fill="#3b82f6" fillOpacity="0.9" />
              <rect x="150" y="5" width="22" height="45" rx="4" fill="#12B8A6" />
            </g>
          </g>

          {/* 4. Medical Staff: Nurse Character */}
          <g transform="translate(380, 180)">
            {/* Nurse Body / Teal Scrubs */}
            <path d="M30 200C30 160 50 145 75 145C100 145 120 160 120 200V250H30V200Z" fill="#12B8A6" />
            <path d="M60 145L75 170L90 145Z" fill="#ffffff" />
            <circle cx="75" cy="115" r="24" fill="#fed7aa" />
            {/* Nurse Cap with Cross */}
            <path d="M55 105C55 90 65 85 75 85C85 85 95 90 95 105Z" fill="#ffffff" />
            <path d="M73 92H77V98H73Z" fill="#12B8A6" />
            <path d="M70 94H80V96H70Z" fill="#12B8A6" />
            {/* Medical Clipboard in Hand */}
            <rect x="25" y="180" width="30" height="42" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="32" y="177" width="16" height="6" rx="2" fill="#64748b" />
            <line x1="30" y1="190" x2="50" y2="190" stroke="#12B8A6" strokeWidth="1.5" />
            <line x1="30" y1="197" x2="48" y2="197" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="30" y1="204" x2="44" y2="204" stroke="#94a3b8" strokeWidth="1.5" />
          </g>

          {/* 5. Lead Doctor Character (Using Digital Tablet) */}
          <g transform="translate(470, 130)">
            {/* Doctor Body & White Lab Coat */}
            <path
              d="M30 210C30 150 60 130 110 130C160 130 190 150 190 210V300H30V210Z"
              fill="#ffffff"
              stroke="#e2e8f0"
              strokeWidth="2.5"
            />
            {/* Inner Medical Scrub & Tie */}
            <path d="M95 130L110 170L125 130Z" fill="#1687F5" />
            <line x1="110" y1="170" x2="110" y2="230" stroke="#cbd5e1" strokeWidth="2" />

            {/* Modern Stethoscope */}
            <path
              d="M85 135C85 170 95 195 110 195C125 195 135 170 135 135"
              stroke="#123B78"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="110" cy="205" r="7" fill="#1687F5" stroke="#ffffff" strokeWidth="2" />

            {/* Doctor Head & Hair */}
            <circle cx="110" cy="85" r="34" fill="#fed7aa" />
            <path d="M76 80C76 55 88 45 110 45C132 45 144 55 144 80C132 70 90 70 76 80Z" fill="#1e293b" />
            {/* Eyeglasses / Eyes */}
            <circle cx="98" cy="80" r="5" fill="none" stroke="#1e293b" strokeWidth="1.8" />
            <circle cx="122" cy="80" r="5" fill="none" stroke="#1e293b" strokeWidth="1.8" />
            <line x1="103" y1="80" x2="117" y2="80" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="98" cy="80" r="2" fill="#1e293b" />
            <circle cx="122" cy="80" r="2" fill="#1e293b" />
            <path d="M102 96Q110 103 118 96" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Digital Healthcare Tablet in Hands */}
            <g transform="translate(65, 175)" className="animate-bounce" style={{ animationDuration: '4.5s' }}>
              <rect x="0" y="0" width="90" height="62" rx="10" fill="url(#tabletGlow)" stroke="#ffffff" strokeWidth="2.5" />
              <rect x="6" y="6" width="78" height="50" rx="6" fill="#071426" />
              {/* Vitals Telemetry graph on tablet screen */}
              <path d="M12 32H28L34 20L40 44L46 26L52 38H78" stroke="#22d3ee" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="76" cy="14" r="3" fill="#12B8A6" className="animate-ping" />
            </g>
          </g>

          {/* 6. Glowing Telemetry Line Connecting Tower to Clinicians */}
          <path
            d="M370 200 C430 160 450 240 520 200"
            stroke="#1687F5"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            fill="none"
            opacity="0.75"
          />
          <circle cx="520" cy="200" r="4.5" fill="#12B8A6" className="animate-ping" />
        </svg>
      </div>

      {/* ====================================================================
          5 FLOATING GLASS CARDS (CSS Micro-Animations)
          ==================================================================== */}

      {/* Card 1: Digital Health Records (Top-Left) */}
      <div className="absolute -top-3 -left-4 sm:left-2 animate-float-slow z-20">
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/40 dark:border-cyan-500/25 shadow-[0_8px_25px_rgba(18,59,120,0.14)]">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-medicare-blue flex items-center justify-center">
            <AnimatedIcon type="records" size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight">Digital Health Records</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">99.8% Synced</span>
          </div>
        </div>
      </div>

      {/* Card 2: Smart Appointments (Top-Right) */}
      <div className="absolute top-2 -right-4 sm:right-0 animate-float-reverse z-20">
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/40 dark:border-teal-500/25 shadow-[0_8px_25px_rgba(18,59,120,0.14)]">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-medicare-teal flex items-center justify-center">
            <AnimatedIcon type="cross" size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight">Smart Appointments</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Auto-Triage Active</span>
          </div>
        </div>
      </div>

      {/* Card 3: AI Assisted Care (Middle-Left) */}
      <div className="absolute top-1/2 -left-6 sm:left-0 -translate-y-1/2 animate-float-reverse z-20">
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 shadow-[0_8px_25px_rgba(22,135,245,0.2)]">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
            <AnimatedIcon type="orbit" size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight">AI Assisted Care</span>
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">Decision Support ON</span>
          </div>
        </div>
      </div>

      {/* Card 4: Patient Monitoring (Bottom-Right) */}
      <div className="absolute bottom-12 -right-2 sm:right-4 animate-float-slow z-20">
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/40 dark:border-blue-500/25 shadow-[0_8px_25px_rgba(18,59,120,0.14)]">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <AnimatedIcon type="doctor" size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight">Patient Monitoring</span>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Vitals: Normal</span>
          </div>
        </div>
      </div>

      {/* Card 5: Secure & Connected (Bottom-Left) */}
      <div className="absolute -bottom-4 left-6 sm:left-14 animate-float-reverse z-20">
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/40 dark:border-emerald-500/25 shadow-[0_8px_25px_rgba(18,59,120,0.14)]">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <AnimatedIcon type="secure" size={15} />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight">Secure &amp; Connected</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
