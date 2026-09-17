'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ShieldCheck, Activity } from 'lucide-react';

interface Caduceus3DHeroCardProps {
  className?: string;
}

export const Caduceus3DHeroCard: React.FC<Caduceus3DHeroCardProps> = ({ className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Target tilt for smooth spring dampening interpolation
  const targetTilt = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: 0, y: 0 });

  const updatePhysics = useCallback(() => {
    // Spring dampening: smoothly interpolate current tilt towards target tilt
    const ease = isHovered ? 0.12 : 0.06;
    currentTilt.current.x += (targetTilt.current.x - currentTilt.current.x) * ease;
    currentTilt.current.y += (targetTilt.current.y - currentTilt.current.y) * ease;

    setTilt({
      x: parseFloat(currentTilt.current.x.toFixed(2)),
      y: parseFloat(currentTilt.current.y.toFixed(2)),
    });

    animationFrameRef.current = requestAnimationFrame(updatePhysics);
  }, [isHovered]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [updatePhysics]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative mouse position from -1 to 1
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Natural 3D tilt calculation (max 16 degrees)
    targetTilt.current = {
      x: -mouseY * 16,
      y: mouseX * 18,
    };

    // Update specular glare reflection
    setGlare({
      x: ((e.clientX - rect.left) / width) * 100,
      y: ((e.clientY - rect.top) / height) * 100,
      opacity: 0.55,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetTilt.current = { x: 0, y: 0 };
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[560px] aspect-[4/3] flex items-center justify-center select-none ${className}`}
      style={{
        perspective: '1400px',
      }}
    >
      {/* 1. Seamless Atmospheric Radial Aurora (Merges 100% with Screen - Zero Box Borders) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.2)_0%,rgba(16,185,129,0.15)_30%,rgba(99,102,241,0.08)_50%,transparent_72%)] blur-3xl pointer-events-none animate-aurora-mesh" />
      <div className="absolute w-3/4 h-3/4 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.25)_0%,rgba(16,185,129,0.12)_40%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* 2. Interactive 3D Spatial Canvas - No Card Box, Merged with Screen */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Layer A (Z: 25px): 3D Tilted Gyroscopic Telemetry Orbit Rings */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: 'translateZ(25px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Outer 3D Gyro Ring */}
          <div
            className="absolute top-[42%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]"
            style={{
              transform: 'translate(-50%, -50%) rotateX(68deg) rotateY(-18deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="w-full h-full animate-orbit-gimbal-cw">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <circle
                  cx="200"
                  cy="200"
                  r="186"
                  fill="none"
                  stroke="url(#ringGrad1)"
                  strokeWidth="1.8"
                  strokeDasharray="10 14"
                  className="filter drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]"
                />
                <path
                  d="M 200 14 A 186 186 0 0 1 345 80"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="filter drop-shadow-[0_0_10px_#00f0ff]"
                />
                <path
                  d="M 200 386 A 186 186 0 0 1 55 320"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="filter drop-shadow-[0_0_10px_#10b981]"
                />
                <circle cx="200" cy="14" r="4.5" fill="#00f0ff" className="filter drop-shadow-[0_0_10px_#00f0ff]" />
                <circle cx="345" cy="80" r="3" fill="#ffffff" className="filter drop-shadow-[0_0_6px_#ffffff]" />
                <circle cx="200" cy="386" r="4.5" fill="#10b981" className="filter drop-shadow-[0_0_10px_#10b981]" />
                <circle cx="55" cy="320" r="3" fill="#ffffff" className="filter drop-shadow-[0_0_6px_#ffffff]" />
              </svg>
            </div>
          </div>

          {/* Inner 3D Counter-Rotating Gyro Ring */}
          <div
            className="absolute top-[42%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px]"
            style={{
              transform: 'translate(-50%, -50%) rotateX(64deg) rotateY(22deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="w-full h-full animate-orbit-gimbal-ccw">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                <circle
                  cx="150"
                  cy="150"
                  r="138"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.4"
                  strokeDasharray="8 12"
                  strokeOpacity="0.75"
                  className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                />
                <circle cx="248" cy="60" r="4" fill="#00f0ff" className="filter drop-shadow-[0_0_8px_#00f0ff]" />
                <circle cx="52" cy="240" r="4" fill="#10b981" className="filter drop-shadow-[0_0_8px_#10b981]" />
              </svg>
            </div>
          </div>

          {/* Vertical 3D Gyro Ring */}
          <div
            className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[240px] h-[320px] pointer-events-none"
            style={{
              transform: 'translate(-50%, -50%)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="w-full h-full animate-orbit-gimbal-vert">
              <svg viewBox="0 0 260 340" className="w-full h-full">
                <ellipse
                  cx="130"
                  cy="170"
                  rx="115"
                  ry="155"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="1.2"
                  strokeDasharray="6 12"
                  strokeOpacity="0.55"
                  className="filter drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]"
                />
                <circle cx="130" cy="15" r="4" fill="#00f0ff" className="filter drop-shadow-[0_0_10px_#00f0ff]" />
                <circle cx="130" cy="325" r="4" fill="#10b981" className="filter drop-shadow-[0_0_10px_#10b981]" />
              </svg>
            </div>
          </div>
        </div>

        {/* Layer B (Z: 65px): 3D Floating Transparent Caduceus Figure */}
        <div
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            transform: 'translateZ(65px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center animate-caduceus-levitate-3d">
            <Image
              src="/caduceus-transparent.png"
              alt="3D Metallic Chrome Caduceus Emblem"
              width={1200}
              height={896}
              priority
              unoptimized
              className="w-full h-auto max-h-[92%] object-contain select-none block"
            />
            {/* Prismatic Specular Gleam across the Chrome Wings */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-[180%] h-full bg-gradient-to-r from-transparent via-cyan-300/35 via-white/50 to-transparent animate-caduceus-gleam mix-blend-overlay pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Layer C (Z: 85px): 3D Helix Orbiting Energy Particles Around Staff */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: 'translateZ(85px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* 3D Double Helix Spiraling Nodes */}
          <div
            className="absolute top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="animate-helix-orbit-1">
              <span className="relative flex h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-90" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-300 shadow-[0_0_16px_#00f0ff]" />
              </span>
            </div>
            <div className="animate-helix-orbit-2">
              <span className="relative flex h-3 w-3 -translate-x-1/2 -translate-y-1/2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300 shadow-[0_0_14px_#10b981]" />
              </span>
            </div>
          </div>

          {/* Photon Spark 1: Orbiting Upper Right Wing */}
          <div className="absolute top-[26%] right-[20%] animate-photon-orb">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-300 shadow-[0_0_12px_#00f0ff]" />
            </span>
          </div>

          {/* Photon Spark 2: Staff Serpent Coil */}
          <div
            className="absolute top-[58%] left-[48%] animate-photon-orb"
            style={{ animationDelay: '1.5s' }}
          >
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-85" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 shadow-[0_0_14px_#10b981]" />
            </span>
          </div>

          {/* Photon Spark 3: Orbiting Left Wing */}
          <div
            className="absolute top-[30%] left-[18%] animate-photon-orb"
            style={{ animationDelay: '2.8s' }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-[0_0_10px_#ffffff]" />
            </span>
          </div>
        </div>

        {/* Layer D (Z: 105px): Seamless Borderless HUD Telemetry Badges */}
        <div
          className="absolute inset-0 pointer-events-none select-none p-2 sm:p-4 flex flex-col justify-between"
          style={{
            transform: 'translateZ(105px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Top-Left Telemetry Badge (100% Borderless Glassmorphism) */}
          <div className="self-start flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-lg shadow-cyan-500/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-90" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
            </span>
            <span className="text-[11px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-700 dark:from-cyan-300 dark:via-teal-100 dark:to-white uppercase">
              CADUCEUS 3D PULSE
            </span>
            <span className="w-1 h-1 rounded-full bg-cyan-500/40" />
            <span className="flex items-center gap-1 text-[10px] font-bold text-cyan-600 dark:text-cyan-300">
              <Activity size={12} className="text-cyan-500 animate-pulse" />
              <span>72 BPM</span>
            </span>
          </div>

          {/* Bottom-Right Telemetry Badge (100% Borderless Glassmorphism) */}
          <div className="self-end flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-lg shadow-emerald-500/10">
            <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <ShieldCheck size={13} className="text-emerald-500 dark:text-emerald-400 filter drop-shadow-[0_0_6px_#10b981]" />
            </div>
            <span className="text-[11px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-300 dark:via-teal-100 dark:to-white uppercase">
              GLOBAL HEALTH MATRIX
            </span>
            <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded-full">
              LIVE
            </span>
          </div>
        </div>

        {/* Dynamic Specular Interactive Mouse Glare */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            transform: 'translateZ(115px)',
          }}
        >
          <div
            className="absolute w-[180%] h-[180%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.35)_0%,rgba(255,255,255,0.2)_25%,transparent_65%)] mix-blend-screen"
            style={{
              left: `${glare.x}%`,
              top: `${glare.y}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Caduceus3DHeroCard;
