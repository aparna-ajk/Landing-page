'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function AnimatedLandingBackground() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Subtle interactive mouse parallax (subtle 3D depth effect on desktop)
    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        // Calculate normalized offset from center [-1, 1]
        const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
        const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;

        setMouseOffset({
          x: Math.round(normalizedX * 18), // max 18px shift
          y: Math.round(normalizedY * 18),
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none w-full h-full"
      style={{
        transform: prefersReducedMotion
          ? 'none'
          : `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* -------------------------------------------------------------
          LAYER 1: LIVING CLINICAL AURORA MESH (GPU-ACCELERATED)
          ------------------------------------------------------------- */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blob 1: Vibrant Cyan / Clinical Teal (Top-Left / Center) */}
        <div
          className="absolute -top-[15%] -left-[10%] w-[580px] sm:w-[720px] lg:w-[850px] h-[580px] sm:h-[720px] lg:h-[850px] rounded-full bg-gradient-to-br from-[#18C7C9]/25 via-[#1479FF]/20 to-transparent blur-[110px] sm:blur-[135px] dark:from-[#18C7C9]/35 dark:via-[#1479FF]/25 dark:to-transparent animate-aurora-blob-1 will-change-transform"
          style={{
            transform: prefersReducedMotion
              ? 'none'
              : `translate3d(${mouseOffset.x * 0.6}px, ${mouseOffset.y * 0.6}px, 0)`,
          }}
        />

        {/* Blob 2: Electric Azure / High-Tech Blue (Top-Right) */}
        <div
          className="absolute top-[5%] -right-[12%] w-[550px] sm:w-[680px] lg:w-[800px] h-[550px] sm:h-[680px] lg:h-[800px] rounded-full bg-gradient-to-bl from-[#1479FF]/25 via-[#0284C7]/20 to-transparent blur-[120px] sm:blur-[140px] dark:from-[#1479FF]/30 dark:via-[#0284C7]/20 dark:to-transparent animate-aurora-blob-2 will-change-transform"
          style={{
            transform: prefersReducedMotion
              ? 'none'
              : `translate3d(${-mouseOffset.x * 0.5}px, ${-mouseOffset.y * 0.5}px, 0)`,
          }}
        />

        {/* Blob 3: Vital Signs Emerald / Mint (Mid-Left / Bottom-Center) */}
        <div
          className="absolute top-[48%] -left-[8%] w-[500px] sm:w-[620px] lg:w-[750px] h-[500px] sm:h-[620px] lg:h-[750px] rounded-full bg-gradient-to-tr from-[#20B26B]/20 via-[#10B981]/15 to-transparent blur-[110px] sm:blur-[130px] dark:from-[#20B26B]/25 dark:via-[#10B981]/15 dark:to-transparent animate-aurora-blob-3 will-change-transform"
          style={{
            transform: prefersReducedMotion
              ? 'none'
              : `translate3d(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px, 0)`,
          }}
        />

        {/* Blob 4: Deep Indigo / Royal Navy Energy (Bottom-Right) */}
        <div
          className="absolute -bottom-[15%] right-[5%] w-[600px] sm:w-[750px] lg:w-[880px] h-[600px] sm:h-[750px] lg:h-[880px] rounded-full bg-gradient-to-tl from-[#6366F1]/20 via-[#1479FF]/18 to-transparent blur-[130px] sm:blur-[150px] dark:from-[#3B82F6]/25 dark:via-[#18C7C9]/15 dark:to-transparent animate-aurora-blob-4 will-change-transform"
          style={{
            transform: prefersReducedMotion
              ? 'none'
              : `translate3d(${-mouseOffset.x * 0.7}px, ${-mouseOffset.y * 0.7}px, 0)`,
          }}
        />

        {/* Blob 5: Central Ambient Breathing Core (Hospital Life Pulse) */}
        <div className="absolute top-[35%] left-[30%] w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full bg-gradient-to-r from-[#18C7C9]/15 via-[#1479FF]/15 to-[#20B26B]/15 blur-[100px] animate-aurora-pulse opacity-70 dark:opacity-85 pointer-events-none" />
      </div>

      {/* -------------------------------------------------------------
          LAYER 2: PRECISION MEDICAL TELEMETRY GRID & CROSSHAIRS
          ------------------------------------------------------------- */}
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.075] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Fine 40px Minor Grid */}
            <pattern id="bg-minor-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-[#1479FF] dark:text-[#18C7C9]"
              />
            </pattern>
            {/* 160px Major Coordinate Grid with Medical Crosshair Nodes */}
            <pattern id="bg-major-grid" width="160" height="160" patternUnits="userSpaceOnUse">
              <rect width="160" height="160" fill="none" />
              {/* Center Crosshairs (+) */}
              <path
                d="M 80 73 L 80 87 M 73 80 L 87 80"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[#18C7C9] dark:text-[#20B26B]"
              />
              <circle cx="80" cy="80" r="2" fill="currentColor" className="text-[#18C7C9]" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-minor-grid)" />
          <rect width="100%" height="100%" fill="url(#bg-major-grid)" />
        </svg>
      </div>

      {/* -------------------------------------------------------------
          LAYER 3: SCANNING TELEMETRY BEAM (HOSPITAL DIAGNOSTIC SWEEP)
          ------------------------------------------------------------- */}
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none overflow-hidden opacity-30 dark:opacity-45 animate-telemetry-scan">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#18C7C9] to-transparent shadow-[0_0_15px_#18C7C9]" />
        <div className="w-full h-full bg-gradient-to-b from-[#18C7C9]/10 via-[#1479FF]/05 to-transparent" />
      </div>

      {/* -------------------------------------------------------------
          LAYER 4: FLOATING MEDICAL TELEMETRY NODES (BIO-PARTICLES)
          ------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Node 1 */}
        <div
          className="absolute top-[12%] left-[18%] w-2 h-2 rounded-full bg-[#18C7C9] shadow-[0_0_10px_#18C7C9] animate-pulse-particle"
          style={{ animationDuration: '7s', animationDelay: '0s' }}
        />
        {/* Node 2 */}
        <div
          className="absolute top-[28%] right-[22%] w-2.5 h-2.5 rounded-full bg-[#1479FF] shadow-[0_0_12px_#1479FF] animate-pulse-particle"
          style={{ animationDuration: '9s', animationDelay: '2.5s' }}
        />
        {/* Node 3 */}
        <div
          className="absolute top-[44%] left-[12%] w-1.5 h-1.5 rounded-full bg-[#20B26B] shadow-[0_0_8px_#20B26B] animate-pulse-particle"
          style={{ animationDuration: '6.5s', animationDelay: '1.2s' }}
        />
        {/* Node 4 */}
        <div
          className="absolute top-[62%] right-[14%] w-2 h-2 rounded-full bg-[#18C7C9] shadow-[0_0_10px_#18C7C9] animate-pulse-particle"
          style={{ animationDuration: '8.5s', animationDelay: '3.8s' }}
        />
        {/* Node 5 */}
        <div
          className="absolute top-[75%] left-[25%] w-2 h-2 rounded-full bg-[#6366F1] shadow-[0_0_10px_#6366F1] animate-pulse-particle"
          style={{ animationDuration: '10s', animationDelay: '0.8s' }}
        />
        {/* Node 6 */}
        <div
          className="absolute top-[86%] right-[32%] w-1.5 h-1.5 rounded-full bg-[#20B26B] shadow-[0_0_8px_#20B26B] animate-pulse-particle"
          style={{ animationDuration: '7.8s', animationDelay: '4.2s' }}
        />
        {/* Node 7 */}
        <div
          className="absolute top-[20%] left-[65%] w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8] animate-pulse-particle"
          style={{ animationDuration: '11s', animationDelay: '1.9s' }}
        />
        {/* Node 8 */}
        <div
          className="absolute top-[55%] left-[45%] w-1.5 h-1.5 rounded-full bg-[#1479FF] shadow-[0_0_8px_#1479FF] animate-pulse-particle"
          style={{ animationDuration: '8s', animationDelay: '5s' }}
        />
      </div>

      {/* -------------------------------------------------------------
          LAYER 5: VIGNETTE & CONTRAST GOVERNOR
          ------------------------------------------------------------- */}
      {/* Soft radial vignette keeping the center text extremely legible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_85%)] opacity-40 dark:opacity-60 pointer-events-none" />
    </div>
  );
}
