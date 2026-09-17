'use client';

import React, { useState } from 'react';

export const HealthcareNetwork: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeDepartment, setActiveDepartment] = useState<string | null>(null);

  // Clinical Command Hub Departments
  const departments = [
    { id: 'doctor', name: 'Clinical Care', role: 'Doctor Specialist', x: 200, y: 110, icon: 'stethoscope', status: 'Active' },
    { id: 'patient', name: 'Patient Vitals', role: 'Telemetry Monitor', x: 170, y: 240, icon: 'heart', status: 'Stable' },
    { id: 'radiology', name: 'Radiology', role: 'PACS Imaging', x: 230, y: 370, icon: 'scan', status: 'Online' },
    { id: 'pharmacy', name: 'Pharmacy', role: 'Smart Dispensing', x: 510, y: 370, icon: 'pill', status: 'Synced' },
    { id: 'lab', name: 'Laboratory', role: 'Pathology Diagnostics', x: 570, y: 240, icon: 'lab', status: 'Ready' },
    { id: 'ops', name: 'Hospital Ops', role: 'Admin & Bed Mgmt', x: 540, y: 110, icon: 'building', status: '98% Cap' },
  ];

  const hubX = 370;
  const hubY = 240;

  return (
    <div className={`relative w-full aspect-[16/11] max-w-2xl mx-auto select-none ${className}`}>
      {/* Background Subtle Digital Medical Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1479FF12_1px,transparent_1px)] [background-size:22px_22px] rounded-3xl pointer-events-none" />

      {/* Decorative Medical Cross Watermark Pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor" className="text-[#1479FF]">
          <path d="M19 10.5H13.5V5C13.5 4.17 12.83 3.5 12 3.5C11.17 3.5 10.5 4.17 10.5 5V10.5H5C4.17 10.5 3.5 11.17 3.5 12C3.5 12.83 4.17 13.5 5 13.5H10.5V19C10.5 19.83 11.17 20.5 12 20.5C12.83 20.5 13.5 19.83 13.5 19V13.5H19C19.83 13.5 20.5 12.83 20.5 12C20.5 11.17 19.83 10.5 19 10.5Z" />
        </svg>
      </div>

      {/* Main SVG Composition */}
      <svg
        viewBox="0 0 740 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        <defs>
          {/* Radial Command Center Gradient */}
          <radialGradient id="cmdHubGrad" cx="0.5" cy="0.5" r="0.5" fx="0.35" fy="0.35">
            <stop offset="0%" stopColor="#123B63" />
            <stop offset="65%" stopColor="#0B1F33" />
            <stop offset="100%" stopColor="#071521" />
          </radialGradient>

          {/* Scanner Cone Sweep Gradient */}
          <linearGradient id="scannerSweepCone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#18C7C9" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#1479FF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>

          {/* Glowing Filter */}
          <filter id="medGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ------------------------------------------------------------------
            1. CIRCULAR ORBIT LINES & ROTATING SCANNER
            ------------------------------------------------------------------ */}
        {/* Outer Orbit Line */}
        <circle
          cx={hubX}
          cy={hubY}
          r="195"
          stroke="#1479FF"
          strokeWidth="1"
          strokeDasharray="4 8"
          strokeOpacity="0.22"
        />

        {/* Mid Orbit Line */}
        <circle
          cx={hubX}
          cy={hubY}
          r="140"
          stroke="#18C7C9"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          strokeOpacity="0.28"
        />

        {/* Inner Hub Orbit Line */}
        <circle
          cx={hubX}
          cy={hubY}
          r="84"
          stroke="#1479FF"
          strokeWidth="1.5"
          strokeOpacity="0.35"
        />

        {/* Rotating Circular Medical Scanner Sweep */}
        <g transform={`translate(${hubX}, ${hubY})`} className="animate-scanner-orbit pointer-events-none">
          <path
            d="M 0 0 L 140 0 A 140 140 0 0 1 98 98 Z"
            fill="url(#scannerSweepCone)"
          />
          <line x1="0" y1="0" x2="140" y2="0" stroke="#18C7C9" strokeWidth="1.8" strokeOpacity="0.8" />
        </g>

        {/* ------------------------------------------------------------------
            2. CONNECTED NODES & DATA STREAM ARTERIES
            ------------------------------------------------------------------ */}
        {departments.map((dept) => {
          const isActive = activeDepartment === dept.id;
          return (
            <g key={`artery-${dept.id}`}>
              {/* Static Arteries */}
              <line
                x1={hubX}
                y1={hubY}
                x2={dept.x}
                y2={dept.y}
                stroke={isActive ? '#18C7C9' : '#1479FF'}
                strokeWidth={isActive ? '2' : '1.2'}
                strokeOpacity={isActive ? '0.85' : '0.22'}
                strokeDasharray="4 4"
                className="transition-all duration-300"
              />

              {/* Glowing Pulse Packet Streaming to Node */}
              <line
                x1={hubX}
                y1={hubY}
                x2={dept.x}
                y2={dept.y}
                stroke="#18C7C9"
                strokeWidth="2.2"
                strokeDasharray="16 110"
                strokeLinecap="round"
                className="animate-pulse-glow"
                style={{
                  animationDuration: `${2.2 + (dept.x % 3) * 0.4}s`,
                }}
              />
            </g>
          );
        })}

        {/* Flow rays extending toward right login panel */}
        <g opacity="0.4">
          <path
            d="M 570 240 C 630 240 670 230 730 230"
            stroke="#18C7C9"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />
          <circle cx="730" cy="230" r="3" fill="#18C7C9" className="animate-ping" style={{ animationDuration: '3s' }} />
          <path
            d="M 540 110 C 610 130 660 160 720 170"
            stroke="#1479FF"
            strokeWidth="1.2"
            strokeDasharray="3 6"
            fill="none"
          />
        </g>

        {/* ------------------------------------------------------------------
            3. CENTRAL HOSPITAL COMMAND DASHBOARD & DOCTOR SILHOUETTE
            ------------------------------------------------------------------ */}
        <g transform={`translate(${hubX}, ${hubY})`} className="cursor-default select-none">
          {/* Ambient Glow */}
          <circle cx="0" cy="0" r="75" fill="#1479FF" fillOpacity="0.12" filter="url(#medGlow)" />

          {/* Central Command Base */}
          <circle
            cx="0"
            cy="0"
            r="65"
            fill="url(#cmdHubGrad)"
            stroke="#18C7C9"
            strokeWidth="1.8"
            strokeOpacity="0.6"
            className="drop-shadow-lg"
          />

          {/* Inner Telemetry Dial */}
          <circle cx="0" cy="0" r="56" fill="#071521" fillOpacity="0.8" stroke="#1479FF" strokeWidth="1" strokeDasharray="3 3" />

          {/* Doctor Silhouette Avatar & Digital Cross Badge */}
          <g transform="translate(-24, -34)">
            {/* Doctor Silhouette (Head & Lab Coat) */}
            <circle cx="24" cy="14" r="8.5" fill="#EAF4FF" fillOpacity="0.9" />
            <path
              d="M10 36 C10 26 16 23 24 23 C32 23 38 26 38 36 Z"
              fill="#EAF4FF"
              fillOpacity="0.9"
            />
            {/* Inner Scrub / Stethoscope Accent */}
            <path d="M20 23 L24 29 L28 23 Z" fill="#1479FF" />
            <path d="M19 25 C19 31 22 33 24 33 C26 33 29 31 29 25" stroke="#123B63" strokeWidth="1.5" fill="none" />
            <circle cx="24" cy="34" r="2" fill="#18C7C9" />

            {/* Glowing Cross on Corner */}
            <rect x="36" y="2" width="3" height="10" rx="1" fill="#20B26B" />
            <rect x="32.5" y="5.5" width="10" height="3" rx="1" fill="#20B26B" />
          </g>

          {/* Patient Monitoring Panel: Live Continuous ECG Waveform */}
          <g transform="translate(-45, 18)">
            <rect x="0" y="0" width="90" height="26" rx="7" fill="#040C16" stroke="#1479FF" strokeWidth="0.9" strokeOpacity="0.6" />
            {/* ECG Line */}
            <path
              d="M 6 13 L 24 13 L 30 5 L 36 21 L 42 7 L 48 18 L 54 13 L 84 13"
              stroke="#18C7C9"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-ecg-trace"
              style={{ strokeDasharray: '140' }}
            />
            {/* Vitals Telemetry Micro Label */}
            <text x="6" y="22" fill="#36A3FF" fontSize="6.5" fontFamily="monospace" fontWeight="bold">
              72 BPM • Sinus Rhythm
            </text>
            <circle cx="82" cy="7" r="2" fill="#20B26B" className="animate-pulse" />
          </g>
        </g>

        {/* ------------------------------------------------------------------
            4. 6 CLINICAL DEPARTMENT SATELLITE NODES
            ------------------------------------------------------------------ */}
        {departments.map((dept) => {
          const isSelected = activeDepartment === dept.id;
          return (
            <g
              key={dept.id}
              transform={`translate(${dept.x}, ${dept.y})`}
              className="cursor-pointer group"
              onMouseEnter={() => setActiveDepartment(dept.id)}
              onMouseLeave={() => setActiveDepartment(null)}
              tabIndex={0}
              role="button"
              aria-label={`${dept.name}: ${dept.role} - ${dept.status}`}
            >
              {/* Outer Pulse Area */}
              <circle
                cx="0"
                cy="0"
                r="28"
                fill="#18C7C9"
                fillOpacity={isSelected ? '0.22' : '0.05'}
                className="transition-all duration-300"
              />

              {/* Node Card Core */}
              <circle
                cx="0"
                cy="0"
                r="22"
                fill="#0B1F33"
                stroke={isSelected ? '#18C7C9' : '#1479FF'}
                strokeWidth={isSelected ? '2' : '1.2'}
                strokeOpacity={isSelected ? '1' : '0.45'}
                className="transition-all duration-300 drop-shadow-md"
              />

              {/* Status Indicator Dot */}
              <circle
                cx="14"
                cy="-14"
                r="3.5"
                fill="#20B26B"
                className="animate-pulse"
              />

              {/* Icon Vector */}
              <g transform="translate(-8, -8)" className="text-white group-hover:scale-110 transition-transform duration-200">
                {dept.icon === 'stethoscope' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#18C7C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 3.5-2 5.5h19c0-2-.5-4.24-2-5.5" />
                    <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                    <path d="M8 17v-1a4 4 0 0 1 8 0v1" />
                  </svg>
                )}
                {dept.icon === 'heart' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#20B26B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                )}
                {dept.icon === 'scan' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#36A3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                )}
                {dept.icon === 'pill' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                  </svg>
                )}
                {dept.icon === 'lab' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 2v7.31M14 2v7.31" />
                    <path d="M8.5 2h7" />
                    <path d="M14 9.3a6.5 6.5 0 1 1-4 0V2" />
                  </svg>
                )}
                {dept.icon === 'building' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1479FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <path d="M9 22v-4h6v4" />
                  </svg>
                )}
              </g>

              {/* Node Title */}
              <text
                x="0"
                y="32"
                textAnchor="middle"
                fill="#F7FAFC"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="sans-serif"
                className="select-none drop-shadow"
              >
                {dept.name}
              </text>

              {/* Node Subtitle */}
              <text
                x="0"
                y="43"
                textAnchor="middle"
                fill="#18C7C9"
                fontSize="8"
                fontFamily="monospace"
                fontWeight="600"
                className="select-none opacity-90"
              >
                {dept.status}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
