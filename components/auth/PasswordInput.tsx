'use client';

import React, { useState } from 'react';

interface PasswordInputProps {
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
  className?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id = 'password',
  value,
  onChange,
  placeholder = 'Enter your password',
  required = true,
  hasError = false,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`relative group ${className}`}>
      {/* Left Lock Icon */}
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#627D98] dark:text-[#9FB3C8] group-focus-within:text-[#1479FF] dark:group-focus-within:text-[#36A3FF] transition-colors duration-200">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      {/* Input Field: Height 50-54px, 12px border radius, white background, smooth focus */}
      <input
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={hasError}
        className={`w-full h-[52px] pl-10 pr-11 rounded-[12px] text-sm font-medium transition-all duration-200
          bg-white dark:bg-[#102A43]
          text-[#102A43] dark:text-[#F0F6FC]
          placeholder:text-[#627D98]/60 dark:placeholder:text-[#9FB3C8]/60
          focus:outline-none focus:ring-4
          ${
            hasError
              ? 'border border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/15'
              : 'border border-slate-200 dark:border-slate-700 focus:border-[#1479FF] focus:ring-[#1479FF]/15 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
      />

      {/* Right Show/Hide Password Toggle Button */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#627D98] hover:text-[#1479FF] dark:hover:text-[#36A3FF] focus:outline-none focus:ring-2 focus:ring-[#1479FF]/30 transition-colors"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          {showPassword ? (
            // Open Eye Icon
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            // Eye Icon
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};
