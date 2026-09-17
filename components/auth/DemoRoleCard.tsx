'use client';

import React from 'react';

export type DemoRoleType = 'doctor' | 'nurse' | 'admin' | 'staff';

interface DemoRoleCardProps {
  id: DemoRoleType;
  title: string;
  description: string;
  isSelected: boolean;
  isLoading?: boolean;
  onClick: () => void;
  className?: string;
}

export const DemoRoleCard: React.FC<DemoRoleCardProps> = ({
  id,
  title,
  description,
  isSelected,
  isLoading = false,
  onClick,
  className = '',
}) => {
  const renderIcon = () => {
    switch (id) {
      case 'doctor':
        // Stethoscope Icon
        return (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 3.5-2 5.5h19c0-2-.5-4.24-2-5.5" />
            <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
            <path d="M8 17v-1a4 4 0 0 1 8 0v1" />
            <path d="M12 14v4" />
            <path d="M10 16h4" />
          </svg>
        );
      case 'nurse':
        // Heart / Nurse Icon
        return (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        );
      case 'admin':
        // Shield / Settings Icon
        return (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        );
      case 'staff':
        // Users Icon
        return (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`relative w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-all duration-200 select-none
        border focus:outline-none focus:ring-2 focus:ring-[#1479FF]/40
        hover:-translate-y-[3px] hover:border-[#1479FF] dark:hover:border-[#36A3FF] hover:bg-[#EAF4FF]/40 dark:hover:bg-[#102A43]/60 group
        ${
          isSelected
            ? 'bg-[#EAF4FF] dark:bg-[#102A43] border-[#1479FF] dark:border-[#36A3FF] shadow-sm'
            : 'bg-white/80 dark:bg-[#0E2438]/80 border-slate-200 dark:border-slate-800'
        } ${className}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Role Icon */}
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110 flex-shrink-0
            ${
              isSelected
                ? 'bg-[#1479FF] text-white'
                : 'bg-[#1479FF]/10 dark:bg-[#36A3FF]/15 text-[#1479FF] dark:text-[#36A3FF] group-hover:bg-[#1479FF] group-hover:text-white'
            }`}
        >
          {isLoading ? (
            <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            renderIcon()
          )}
        </div>

        {/* Role Name & Description */}
        <div className="flex flex-col min-w-0">
          <span
            className={`text-xs font-bold leading-tight truncate ${
              isSelected ? 'text-[#1479FF] dark:text-[#36A3FF]' : 'text-[#102A43] dark:text-white'
            }`}
          >
            {title}
          </span>
          <span className="text-[10px] text-[#627D98] dark:text-[#9FB3C8] truncate leading-tight mt-0.5">
            {description}
          </span>
        </div>
      </div>

      {/* Active Dot / Arrow indicator */}
      {isSelected ? (
        <span className="w-1.5 h-1.5 rounded-full bg-[#20B26B] animate-pulse flex-shrink-0" />
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-300 dark:text-slate-600 group-hover:text-[#1479FF] dark:group-hover:text-[#36A3FF] transition-colors flex-shrink-0">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  );
};
