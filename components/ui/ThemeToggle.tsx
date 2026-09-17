'use client';

import React, { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('medicare-theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'light';

    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('medicare-theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white/40 dark:bg-slate-800/40 ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      className={`relative inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
        bg-white/80 dark:bg-[#0E2438]/80 backdrop-blur-md
        border border-slate-200/80 dark:border-slate-700
        text-[#102A43] dark:text-[#36A3FF]
        hover:scale-105 active:scale-95 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1479FF]/30 ${className}`}
    >
      <span className="text-sm font-medium leading-none select-none transition-transform duration-300">
        {isDark ? '☀' : '☾'}
      </span>
    </button>
  );
};
