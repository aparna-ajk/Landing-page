'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Users, Activity, Heart, Building } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [stats, setStats] = useState({
    doctors: 0,
    sla: 0,
    patients: 0,
    depts: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setStats({
              doctors: parseFloat((2.4 * easeOut).toFixed(1)),
              sla: parseFloat((99.98 * easeOut).toFixed(2)),
              patients: Math.floor(450 * easeOut),
              depts: Math.floor(120 * easeOut),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setStats({
                doctors: 2.4,
                sla: 99.98,
                patients: 450,
                depts: 120,
              });
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const statItems = [
    {
      id: 'doc',
      value: `${stats.doctors}K+`,
      label: 'Doctors & Specialists',
      desc: 'Multidisciplinary physician network',
      icon: <Users size={22} className="text-[#1479FF]" />,
      glow: 'rgba(20, 121, 255, 0.15)',
    },
    {
      id: 'sla',
      value: `${stats.sla}%`,
      label: 'Clinical SLA Uptime',
      desc: 'Zero-interruption healthcare core',
      icon: <Activity size={22} className="text-[#20B26B]" />,
      glow: 'rgba(32, 178, 107, 0.15)',
    },
    {
      id: 'patients',
      value: `${stats.patients}K+`,
      label: 'Patients Served',
      desc: 'Seamless end-to-end patient journeys',
      icon: <Heart size={22} className="text-[#18C7C9]" />,
      glow: 'rgba(24, 199, 201, 0.15)',
    },
    {
      id: 'depts',
      value: `${stats.depts}+`,
      label: 'Hospital Departments',
      desc: 'Single unified enterprise database',
      icon: <Building size={22} className="text-[#8B5CF6]" />,
      glow: 'rgba(139, 92, 246, 0.15)',
    },
  ];

  return (
    <section id="stats" ref={containerRef} className="py-12 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-white/70 dark:bg-[#0E2438]/70 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          {/* Animated Continuous ECG Waveform Graphic Behind Stats */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20 pointer-events-none">
            <svg viewBox="0 0 1200 160" fill="none" className="w-full h-auto">
              <path
                d="M 0 80 L 250 80 L 270 40 L 290 130 L 310 30 L 330 110 L 350 80 L 550 80 L 570 40 L 590 130 L 610 30 L 630 110 L 650 80 L 850 80 L 870 40 L 890 130 L 910 30 L 930 110 L 950 80 L 1200 80"
                stroke="#1479FF"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-ecg-trace"
                style={{ strokeDasharray: '400' }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {statItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center group cursor-default hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Icon with soft glow */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 duration-200"
                  style={{ backgroundColor: item.glow }}
                >
                  {item.icon}
                </div>

                {/* Big Animated Number Counter */}
                <div className="text-2xl sm:text-4xl lg:text-[2.75rem] font-black text-[#102A43] dark:text-white font-mono tracking-tight leading-none">
                  {item.value}
                </div>

                {/* Main Label */}
                <span className="text-xs sm:text-sm font-bold text-[#102A43] dark:text-slate-100 mt-2">
                  {item.label}
                </span>

                {/* Secondary description */}
                <span className="text-[11px] text-[#627D98] dark:text-[#9FB3C8] mt-1 max-w-[180px] leading-snug">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
