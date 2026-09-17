import React from 'react';

interface HospitalStatusBadgeProps {
  version?: string;
  statusText?: string;
  className?: string;
}

export const HospitalStatusBadge: React.FC<HospitalStatusBadgeProps> = ({
  version = 'Hospital Core v4.8',
  statusText = 'Online',
  className = '',
}) => {
  return (
    <div
      tabIndex={0}
      role="status"
      aria-label={`${version} is currently ${statusText}`}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-tight select-none
        bg-[#102A43]/5 dark:bg-[#0E2438]/80 backdrop-blur-md
        border border-slate-200/80 dark:border-[#36A3FF]/20 text-[#102A43] dark:text-[#F0F6FC]
        hover:border-[#20B26B]/50 transition-all duration-300 group cursor-default shadow-sm ${className}`}
    >
      {/* Green status dot with very subtle glow */}
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#20B26B] opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#20B26B] shadow-[0_0_8px_#20B26B]" />
      </span>

      <span className="font-mono text-[11px] text-[#627D98] dark:text-[#9FB3C8]">
        {version}
      </span>
      <span className="text-[#627D98] dark:text-[#9FB3C8]">•</span>
      <span className="text-[#20B26B] font-bold">
        {statusText}
      </span>
    </div>
  );
};
