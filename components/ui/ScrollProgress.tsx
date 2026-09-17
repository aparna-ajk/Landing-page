'use client';

import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollPercentage(progress);
        setIsVisible(scrollTop > 40);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Clinical Precision Scroll Progress Bar */}
      <div
        className={`fixed top-0 left-0 right-0 h-[3px] z-[60] transition-opacity duration-300 pointer-events-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="h-full bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#10B981] dark:from-[#1479FF] dark:via-[#18C7C9] dark:to-[#20B26B] shadow-[0_0_10px_rgba(2,132,199,0.7)] transition-all duration-75 ease-out"
          style={{ width: `${scrollPercentage}%` }}
        />
      </div>

      {/* Floating Scroll-to-Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-white/90 dark:bg-[#071521]/90 backdrop-blur-xl border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <svg
          className="w-5 h-5 text-sky-600 dark:text-[#18C7C9]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </>
  );
};

export default ScrollProgress;
