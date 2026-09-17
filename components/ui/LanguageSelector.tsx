'use client';

import React, { useState, useRef, useEffect } from 'react';

export type SupportedLanguage = 'en' | 'hi' | 'te';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  native: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
];

interface LanguageSelectorProps {
  currentLanguage?: SupportedLanguage;
  onLanguageChange?: (code: SupportedLanguage) => void;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage = 'en',
  onLanguageChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<SupportedLanguage>(currentLanguage);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCode(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setSelectedCode(code);
    setIsOpen(false);
    onLanguageChange?.(code);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button: Displays 'EN ▾' with Globe Icon */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold
          bg-white/80 dark:bg-[#0E2438]/80 backdrop-blur-md
          border border-slate-200/80 dark:border-slate-700
          text-[#102A43] dark:text-[#F0F6FC]
          hover:border-[#1479FF]/50 hover:bg-white dark:hover:bg-[#102A43]
          focus:outline-none focus:ring-2 focus:ring-[#1479FF]/30
          transition-all duration-200 shadow-sm"
      >
        {/* Globe Icon */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1479FF] dark:text-[#36A3FF]">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>

        <span className="uppercase tracking-wider">{selectedCode}</span>

        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown Options: English, Hindi, Telugu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-1.5 w-36 rounded-2xl bg-white dark:bg-[#0E2438] border border-slate-200 dark:border-slate-700 shadow-card py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl"
        >
          {LANGUAGES.map((lang) => {
            const isSelected = selectedCode === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(lang.code)}
                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors
                  hover:bg-[#1479FF]/10 dark:hover:bg-[#36A3FF]/15
                  ${isSelected ? 'font-bold text-[#1479FF] dark:text-[#36A3FF] bg-[#1479FF]/5' : 'text-[#102A43] dark:text-[#F0F6FC]'}`}
              >
                <span>{lang.name}</span>
                <span className="text-[10px] text-[#627D98] dark:text-[#9FB3C8] font-normal">{lang.native}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
