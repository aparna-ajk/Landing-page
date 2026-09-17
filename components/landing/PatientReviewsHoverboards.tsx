'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Star,
  CheckCircle2,
  Flame,
  Stethoscope,
  Brain,
  Activity,
  Heart,
  Sparkles,
} from 'lucide-react';

interface PatientReview {
  id: string;
  patientName: string;
  condition: string;
  department: string;
  attendingDoctor: string;
  avatar: string;
  rating: number;
  recoveryBadge: string;
  quote: string;
  thrusterColor: 'cyan' | 'violet' | 'rose';
}

const PATIENT_REVIEWS: PatientReview[] = [
  {
    id: 'marcus-chen',
    patientName: 'Marcus Chen',
    condition: 'Coronary Bypass',
    department: 'Cardiology',
    attendingDoctor: 'Dr. Victoria Sterling',
    avatar: '/patient-marcus-chen.jpg',
    rating: 5,
    recoveryBadge: 'Full recovery in 6 weeks',
    quote:
      'Dr. Sterling gave me my life back. From bypass surgery to normal life with zero pain was astonishingly fast.',
    thrusterColor: 'cyan',
  },
  {
    id: 'elena-vasquez',
    patientName: 'Elena Vasquez',
    condition: 'Spine Decompression',
    department: 'Neurosurgery',
    attendingDoctor: 'Dr. Jonathan Hayes',
    avatar: '/patient-elena-vasquez.jpg',
    rating: 5,
    recoveryBadge: 'Pain-free in 48 hours',
    quote:
      'Three years of agonizing back pain ended in one morning. I was up and walking pain-free that same evening.',
    thrusterColor: 'violet',
  },
  {
    id: 'david-miller',
    patientName: 'David Miller',
    condition: 'Trauma Resuscitation',
    department: 'Emergency',
    attendingDoctor: 'Dr. Sarah Jenkins',
    avatar: '/patient-david-miller.jpg',
    rating: 5,
    recoveryBadge: 'Stabilized in 18 mins',
    quote:
      'The trauma team was waiting the second my ambulance pulled up. Dr. Jenkins and her team saved my life.',
    thrusterColor: 'rose',
  },
];

// Individual Interactive 3D Hoverboard Card
function HoverboardCard({
  review,
  index,
  isThrusterBoosted,
}: {
  review: PatientReview;
  index: number;
  isThrusterBoosted: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tilt tracking for hoverboard balance feel
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 18,
      y: x * 22,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const animationWaveClass =
    index === 0
      ? 'animate-hoverboard-1'
      : index === 1
      ? 'animate-hoverboard-2'
      : 'animate-hoverboard-3';

  // Thruster themes
  const themes = {
    cyan: {
      plasma: 'from-cyan-400 via-sky-500 to-teal-300',
      ringBorder: 'border-cyan-400/80 shadow-[0_0_18px_rgba(6,182,212,0.8)]',
      glow: 'rgba(6, 182, 212, 0.7)',
      badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      icon: Stethoscope,
    },
    violet: {
      plasma: 'from-indigo-400 via-purple-500 to-fuchsia-400',
      ringBorder: 'border-purple-400/80 shadow-[0_0_18px_rgba(168,85,247,0.8)]',
      glow: 'rgba(168, 85, 247, 0.7)',
      badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      icon: Brain,
    },
    rose: {
      plasma: 'from-rose-400 via-orange-500 to-amber-300',
      ringBorder: 'border-rose-400/80 shadow-[0_0_18px_rgba(244,63,94,0.8)]',
      glow: 'rgba(244, 63, 94, 0.7)',
      badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      icon: Activity,
    },
  };

  const theme = themes[review.thrusterColor];
  const DeptIcon = theme.icon;

  return (
    <div
      className="relative group perspective-1200 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D TILT & FLOATING WRAPPER */}
      <div
        ref={cardRef}
        style={{
          transform: isHovered
            ? `perspective(1000px) translateY(-18px) translateZ(35px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
            : undefined,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`relative ${!isHovered ? animationWaveClass : ''} transform-style-3d`}
      >
        {/* UNDERCARRIAGE: DUAL THRUSTERS */}
        <div className="absolute -bottom-8 inset-x-6 flex justify-between items-center pointer-events-none z-0 px-4">
          {/* Left Engine */}
          <div className="relative flex flex-col items-center">
            <div
              className={`w-12 h-3.5 rounded-full bg-slate-900 border-2 ${theme.ringBorder} flex items-center justify-center`}
            >
              <div
                className={`w-8 h-1.5 rounded-full bg-gradient-to-r ${theme.plasma} animate-pulse`}
              />
            </div>
            <div
              className={`w-16 h-20 bg-gradient-to-b ${theme.plasma} to-transparent rounded-full opacity-70 filter blur-md ${
                isThrusterBoosted || isHovered ? 'scale-125 opacity-95 blur-lg' : 'animate-thruster-pulse'
              } transition-all duration-300`}
              style={{ boxShadow: `0 12px 30px ${theme.glow}` }}
            />
          </div>

          {/* Center Altitude Tag */}
          <span className="text-[9px] font-mono tracking-wider font-semibold text-black/40 dark:text-white/40 uppercase">
            Anti-Gravity
          </span>

          {/* Right Engine */}
          <div className="relative flex flex-col items-center">
            <div
              className={`w-12 h-3.5 rounded-full bg-slate-900 border-2 ${theme.ringBorder} flex items-center justify-center`}
            >
              <div
                className={`w-8 h-1.5 rounded-full bg-gradient-to-r ${theme.plasma} animate-pulse`}
              />
            </div>
            <div
              className={`w-16 h-20 bg-gradient-to-b ${theme.plasma} to-transparent rounded-full opacity-70 filter blur-md ${
                isThrusterBoosted || isHovered ? 'scale-125 opacity-95 blur-lg' : 'animate-thruster-pulse'
              } transition-all duration-300`}
              style={{ boxShadow: `0 12px 30px ${theme.glow}` }}
            />
          </div>
        </div>

        {/* Ground Energy Cushion Reflection */}
        <div
          className={`absolute -bottom-14 inset-x-4 h-12 rounded-full filter blur-xl transition-all duration-400 pointer-events-none -z-10 ${
            isHovered ? 'opacity-90 scale-105' : 'opacity-40 scale-95'
          }`}
          style={{
            background: `radial-gradient(ellipse at center, ${theme.glow} 0%, transparent 70%)`,
          }}
        />

        {/* HOVERBOARD TOP DECK (AERODYNAMIC & COMPACT) */}
        <div className="relative z-10 rounded-3xl p-0.5 bg-gradient-to-b from-black/10 via-transparent to-black/20 dark:from-white/20 dark:via-white/5 dark:to-white/10 shadow-xl">
          <div className="relative rounded-[1.4rem] overflow-hidden bg-white/95 dark:bg-[#070D18]/95 backdrop-blur-xl border border-black/10 dark:border-white/15 p-5 sm:p-6 flex flex-col justify-between min-h-[380px] shadow-lg">
            
            {/* Top Grip Accents */}
            <div className="absolute top-0 inset-x-10 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            <div className="absolute top-3.5 right-4 flex items-center gap-1 opacity-40">
              <span className="w-1 h-2.5 bg-black dark:bg-white rounded-full" />
              <span className="w-1 h-1.5 bg-black dark:bg-white rounded-full" />
              <span className="w-1 h-3 bg-black dark:bg-white rounded-full" />
            </div>

            {/* HEADER: DEPARTMENT & STARS */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${theme.badge} border`}>
                    <DeptIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-black/75 dark:text-white/75">
                    {review.department}
                  </span>
                </div>

                {/* 5 Stars */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              {/* PATIENT PROFILE: AVATAR + NAME + PROCEDURE */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-black/10 dark:ring-white/20 shrink-0 shadow-sm">
                  <Image
                    src={review.avatar}
                    alt={review.patientName}
                    fill
                    className="object-cover object-center"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-sm text-black dark:text-white tracking-tight truncate">
                      {review.patientName}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <p className="text-xs text-black/55 dark:text-white/55 font-medium truncate">
                    {review.condition}
                  </p>
                </div>
              </div>

              {/* SHORT & PUNCHY REVIEW */}
              <p className="text-xs sm:text-[13px] leading-relaxed text-black/80 dark:text-white/80 font-normal italic mb-3">
                &ldquo;{review.quote}&rdquo;
              </p>
            </div>

            {/* FOOTER: MILESTONE & ATTENDING DOCTOR */}
            <div className="pt-3 border-t border-black/10 dark:border-white/10 flex flex-col gap-2">
              {/* Recovery Milestone Tag */}
              <div className="flex items-center justify-between text-[11px]">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                  <Sparkles className="w-3 h-3" />
                  {review.recoveryBadge}
                </span>

                <span className="text-black/50 dark:text-white/50 text-[11px]">
                  Treated by <strong className="text-black dark:text-white font-medium">{review.attendingDoctor.replace('Dr. ', '')}</strong>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function PatientReviewsHoverboards() {
  const [thrusterBoost, setThrusterBoost] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'cardio' | 'neuro' | 'trauma'>('all');

  const filteredReviews = PATIENT_REVIEWS.filter((r) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'cardio') return r.department === 'Cardiology';
    if (activeFilter === 'neuro') return r.department === 'Neurosurgery';
    if (activeFilter === 'trauma') return r.department === 'Emergency';
    return true;
  });

  return (
    <section
      id="review"
      className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-b from-transparent via-black/[0.02] to-transparent dark:via-white/[0.01]"
      aria-label="Patient Reviews"
    >
      {/* Anchor for direct review link */}
      <div id="patient-reviews" className="scroll-mt-24" />

      {/* Subtle Spatial Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SIMPLE & SHORT HEADER */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 fill-cyan-500/20 text-cyan-500" />
            <span>Patient Reviews</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black dark:text-white">
            Real Patients, Real Recoveries
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-black/60 dark:text-white/60 max-w-lg">
            Hover over any board to balance it with 3D animation.
          </p>

          {/* SIMPLE CONTROLS: FILTERS & BOOST */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/15">
              {[
                { label: 'All', value: 'all' },
                { label: 'Cardiology', value: 'cardio' },
                { label: 'Neurosurgery', value: 'neuro' },
                { label: 'Emergency', value: 'trauma' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveFilter(tab.value as typeof activeFilter)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeFilter === tab.value
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                      : 'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Thruster Boost Button */}
            <button
              type="button"
              onClick={() => setThrusterBoost(!thrusterBoost)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                thrusterBoost
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.5)]'
                  : 'bg-black/5 dark:bg-white/5 text-black/75 dark:text-white/75 border-black/10 dark:border-white/15 hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${thrusterBoost ? 'text-amber-300 fill-amber-300' : 'text-cyan-500'}`} />
              <span>{thrusterBoost ? 'Boost: Max' : 'Boost: Normal'}</span>
            </button>
          </div>
        </div>

        {/* 3D HOVERBOARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 pb-6">
          {filteredReviews.map((review, idx) => (
            <HoverboardCard
              key={review.id}
              review={review}
              index={idx}
              isThrusterBoosted={thrusterBoost}
            />
          ))}
        </div>

        {/* CLEAN 1-LINE TRUST BAR */}
        <div className="mt-4 py-3 px-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-black/60 dark:text-white/60 text-center">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-black dark:text-white">⭐ 5.0 Rating</span>
            <span>from verified discharges</span>
          </div>
          <span className="hidden sm:inline opacity-30">•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Verified Clinical Outcomes</span>
          </div>
        </div>

      </div>
    </section>
  );
}
