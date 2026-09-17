import React from 'react';

interface MediCareLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export const MediCareLogo: React.FC<MediCareLogoProps> = ({
  className = '',
  showSubtitle = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Minimal medical cross combined with circular digital/technology symbol */}
      <div className="relative w-10 h-10 rounded-[14px] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(20,121,255,0.35)] shadow-[0_4px_16px_rgba(11,31,51,0.14)] bg-gradient-to-tr from-[#0B1F33] via-[#123B63] to-[#1479FF] p-2">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          {/* Circular Digital Orbit Ring */}
          <circle
            cx="16"
            cy="16"
            r="14"
            stroke="#18C7C9"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            strokeOpacity="0.5"
          />

          {/* Connected Network Nodes */}
          <circle cx="16" cy="2" r="1.5" fill="#18C7C9" />
          <circle cx="30" cy="16" r="1.5" fill="#18C7C9" />
          <circle cx="16" cy="30" r="1.5" fill="#18C7C9" />
          <circle cx="2" cy="16" r="1.5" fill="#18C7C9" />

          {/* Minimal Modern Medical Cross */}
          <path
            d="M20 6H12C10.8954 6 10 6.89543 10 8V10H8C6.89543 10 6 10.8954 6 12V20C6 21.1046 6.89543 22 8 22H10V24C10 25.1046 10.8954 26 12 26H20C21.1046 26 22 25.1046 22 24V22H24C25.1046 22 26 21.1046 26 20V12C26 10.8954 25.1046 10 24 10H22V8C22 6.89543 21.1046 6 20 6Z"
            fill="currentColor"
          />

          {/* Central Technology Core Dot */}
          <circle cx="16" cy="16" r="2.5" fill="#18C7C9" />
          <circle cx="16" cy="16" r="1" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Wordmark & Subtitle */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#102A43] dark:text-[#F0F6FC] leading-none">
            Medi<span className="text-[#1479FF] dark:text-[#36A3FF]">Care</span>
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#20B26B] animate-pulse" />
        </div>
        {showSubtitle && (
          <span className="text-[11px] font-semibold text-[#627D98] dark:text-[#9FB3C8] tracking-wider uppercase mt-0.5">
            Hospital Management System
          </span>
        )}
      </div>
    </div>
  );
};
