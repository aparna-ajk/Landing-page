'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Activity,
  Users,
  Bed,
  Clock,
  Play,
  Pause,
  Zap,
} from 'lucide-react';

interface KpiCard {
  id: string;
  title: string;
  icon: React.ElementType;
  value: string;
  badge: string;
  subtitle: string;
  colorTheme: {
    border: string;
    bg: string;
    topBar: string;
    iconBg: string;
    iconColor: string;
    badgeStyle: string;
    valueColor: string;
    shadow: string;
    dotColor: string;
  };
}

const KPI_CARDS: KpiCard[] = [
  {
    id: 'occupancy',
    title: 'Overall Bed Occupancy',
    icon: Bed,
    value: '79.8%',
    badge: '+2.1%',
    subtitle: '286 of 362 Active Beds',
    colorTheme: {
      border: 'border-sky-300 hover:border-sky-500',
      bg: 'bg-gradient-to-br from-sky-50/90 via-blue-50/40 to-white',
      topBar: 'bg-sky-500',
      iconBg: 'bg-sky-100 text-sky-600 border border-sky-200',
      iconColor: 'text-sky-600',
      badgeStyle: 'bg-sky-100 text-sky-800 border border-sky-200',
      valueColor: 'text-sky-950',
      shadow: 'shadow-lg hover:shadow-sky-200/60',
      dotColor: 'bg-sky-500',
    },
  },
  {
    id: 'wait-time',
    title: 'Average ER Wait Time',
    icon: Clock,
    value: '14m',
    badge: '-18m target',
    subtitle: 'National benchmark: 42m',
    colorTheme: {
      border: 'border-emerald-300 hover:border-emerald-500',
      bg: 'bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white',
      topBar: 'bg-emerald-500',
      iconBg: 'bg-emerald-100 text-emerald-600 border border-emerald-200',
      iconColor: 'text-emerald-600',
      badgeStyle: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      valueColor: 'text-emerald-950',
      shadow: 'shadow-lg hover:shadow-emerald-200/60',
      dotColor: 'bg-emerald-500',
    },
  },
  {
    id: 'utilization',
    title: 'OT Utilization Rate',
    icon: Activity,
    value: '84.2%',
    badge: 'High Efficiency',
    subtitle: '14 Suites Active • 0 Delay',
    colorTheme: {
      border: 'border-purple-300 hover:border-purple-500',
      bg: 'bg-gradient-to-br from-purple-50/90 via-violet-50/40 to-white',
      topBar: 'bg-purple-500',
      iconBg: 'bg-purple-100 text-purple-600 border border-purple-200',
      iconColor: 'text-purple-600',
      badgeStyle: 'bg-purple-100 text-purple-800 border border-purple-200',
      valueColor: 'text-purple-950',
      shadow: 'shadow-lg hover:shadow-purple-200/60',
      dotColor: 'bg-purple-500',
    },
  },
  {
    id: 'nurse-ratio',
    title: 'Nurse-to-Patient Ratio',
    icon: Users,
    value: '1:2.4',
    badge: 'Safe Harbor',
    subtitle: 'Shift Coverage: 100% Filled',
    colorTheme: {
      border: 'border-rose-300 hover:border-rose-500',
      bg: 'bg-gradient-to-br from-rose-50/90 via-amber-50/40 to-white',
      topBar: 'bg-rose-500',
      iconBg: 'bg-rose-100 text-rose-600 border border-rose-200',
      iconColor: 'text-rose-600',
      badgeStyle: 'bg-rose-100 text-rose-800 border border-rose-200',
      valueColor: 'text-rose-950',
      shadow: 'shadow-lg hover:shadow-rose-200/60',
      dotColor: 'bg-rose-500',
    },
  },
];

export default function AnalyticsCommandCenter() {
  const [timeRange, setTimeRange] = useState<'1H' | '24H' | '7D' | '30D'>('24H');
  const [speedMode, setSpeedMode] = useState<'2X' | '1X' | 'PAUSED'>('2X');

  // Multiplied carousel cards for continuous, seamless infinite loop
  const carouselTrack = [...KPI_CARDS, ...KPI_CARDS, ...KPI_CARDS];

  // Dynamic animation style based on speedMode
  const getCarouselStyle = () => {
    if (speedMode === 'PAUSED') {
      return { animationPlayState: 'paused' };
    }
    if (speedMode === '1X') {
      return { animationDuration: '24s' };
    }
    // 2X Speed Mode (10s continuous infinite rotation)
    return { animationDuration: '10s' };
  };

  return (
    <section id="analytics" className="relative py-24 bg-white text-black overflow-hidden select-none">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/15 text-black text-xs font-semibold uppercase tracking-wider mb-4">
              <BarChart3 className="w-3.5 h-3.5 text-black" />
              Executive Operations &amp; KPIs
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-tight">
              Hospital Executive <br />
              <span className="text-zinc-600">
                Command &amp; Telemetry Center
              </span>
            </h2>
          </div>

          {/* Time range selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-black/15 self-start md:self-auto text-xs shadow-sm">
            {(['1H', '24H', '7D', '30D'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3.5 py-1.5 rounded-lg font-mono font-bold transition-all ${
                  timeRange === range
                    ? 'bg-black text-white shadow-md'
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* 2X Speed Moving Carousel Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-4 py-2.5 rounded-2xl bg-black/[0.03] border border-black/10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              {speedMode !== 'PAUSED' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  speedMode !== 'PAUSED' ? 'bg-sky-600' : 'bg-zinc-400'
                }`}
              />
            </span>
            <span className="text-xs font-bold text-black flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Moving Carousel — {speedMode === '2X' ? '2X Speed Active' : speedMode === '1X' ? '1X Normal Speed' : 'Paused'}</span>
            </span>
            <span className="text-[11px] text-zinc-500 font-medium hidden sm:inline">
              (Hover any box to pause &amp; inspect)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSpeedMode('2X')}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                speedMode === '2X'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white border border-black/15 text-zinc-600 hover:text-black'
              }`}
            >
              2X Speed
            </button>
            <button
              onClick={() => setSpeedMode('1X')}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                speedMode === '1X'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white border border-black/15 text-zinc-600 hover:text-black'
              }`}
            >
              1X Speed
            </button>
            <button
              onClick={() => setSpeedMode((prev) => (prev === 'PAUSED' ? '2X' : 'PAUSED'))}
              className="p-1.5 rounded-lg bg-white border border-black/15 text-black hover:bg-zinc-100 transition-colors"
              title={speedMode === 'PAUSED' ? 'Resume moving carousel' : 'Pause moving carousel'}
            >
              {speedMode === 'PAUSED' ? <Play className="w-3.5 h-3.5 fill-black" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 4 Moving Boxes in 2X Speed Carousel with 2D Color Effects */}
        <div className="relative w-full overflow-hidden group py-2">
          {/* Left and Right Smooth Gradient Fade Portals */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Continuous Moving Track at 2X Speed */}
          <div
            className="flex gap-5 w-max animate-carousel-2x group-hover:[animation-play-state:paused]"
            style={getCarouselStyle()}
          >
            {carouselTrack.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={`${card.id}-${idx}`}
                  className={`w-[290px] sm:w-[330px] shrink-0 p-6 rounded-3xl ${card.colorTheme.bg} border-2 ${card.colorTheme.border} ${card.colorTheme.shadow} transition-all duration-300 relative overflow-hidden flex flex-col justify-between select-none group/card hover:-translate-y-1.5`}
                >
                  {/* Top 2D Colored Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${card.colorTheme.topBar}`} />

                  {/* Header: Title & 2D Colored Icon */}
                  <div className="flex items-center justify-between text-xs text-zinc-600 mb-4 pt-1">
                    <span className="font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${card.colorTheme.dotColor} animate-pulse`} />
                      {card.title}
                    </span>
                    <div className={`p-2 rounded-xl ${card.colorTheme.iconBg} shadow-sm group-hover/card:scale-110 transition-transform`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Metric Value & 2D Colored Sub-Badge */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${card.colorTheme.valueColor}`}>
                      {card.value}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold font-mono ${card.colorTheme.badgeStyle}`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Subtitle / Benchmark */}
                  <div className="text-[11px] text-zinc-600 font-mono font-bold mt-2 flex items-center justify-between border-t border-black/5 pt-2">
                    <span>{card.subtitle}</span>
                    <span className="text-[10px] text-zinc-400 font-semibold uppercase">Live Telemetry</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
