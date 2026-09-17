import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', showTagline = true }) => {
  return (
    <div className={`inline-flex items-center gap-3.5 group cursor-pointer ${className}`}>
      {/* Modern MediCare Icon: Cross + Digital Node */}
      <div className="relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-[0_4px_16px_rgba(22,135,245,0.25)] bg-gradient-to-tr from-medicare-navy via-medicare-blue to-medicare-teal">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white drop-shadow"
        >
          {/* Central Digital Health Cross */}
          <path
            d="M19 10.5H13.5V5C13.5 4.17 12.83 3.5 12 3.5C11.17 3.5 10.5 4.17 10.5 5V10.5H5C4.17 10.5 3.5 11.17 3.5 12C3.5 12.83 4.17 13.5 5 13.5H10.5V19C10.5 19.83 11.17 20.5 12 20.5C12.83 20.5 13.5 19.83 13.5 19V13.5H19C19.83 13.5 20.5 12.83 20.5 12C20.5 11.17 19.83 10.5 19 10.5Z"
            fill="currentColor"
          />
          {/* Subtle Digital Interconnect Nodes */}
          <circle cx="5" cy="5" r="1.5" fill="#5eead4" />
          <circle cx="19" cy="19" r="1.5" fill="#5eead4" />
          <path d="M5 5L8 8" stroke="#5eead4" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
          <path d="M19 19L16 16" stroke="#5eead4" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-2xl font-black tracking-tight text-medicare-navy dark:text-white leading-none">
            Medi<span className="text-medicare-blue">Care</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-medicare-teal animate-pulse" />
        </div>
        {showTagline && (
          <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 tracking-wider mt-1 uppercase">
            Connected Care. Smarter Hospitals.
          </span>
        )}
      </div>
    </div>
  );
};
