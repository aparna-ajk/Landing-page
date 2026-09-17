'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MediCareLogo } from '@/components/branding/MediCareLogo';
import { HospitalStatusBadge } from '@/components/ui/HospitalStatusBadge';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSelector, SupportedLanguage } from '@/components/ui/LanguageSelector';
import { HealthcareHero } from '@/components/branding/HealthcareHero';
import { HealthcareStats } from '@/components/stats/HealthcareStats';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col justify-between relative bg-[#F7FAFC] dark:bg-[#071521] text-[#102A43] dark:text-[#F0F6FC] transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-[#1479FF]/8 dark:bg-[#36A3FF]/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[450px] h-[450px] bg-[#18C7C9]/8 dark:bg-[#18C7C9]/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1479FF10_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60 dark:opacity-30" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between z-30 flex-shrink-0">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <Link href="/">
            <MediCareLogo />
          </Link>
          <div className="hidden sm:block pl-3 border-l border-slate-200 dark:border-slate-800">
            <HospitalStatusBadge />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="text-xs font-bold text-[#1479FF] dark:text-[#36A3FF] hover:underline flex items-center gap-1"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 bg-white/70 dark:bg-[#0E2438]/80 p-1 rounded-full border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-sm">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Split-Screen Gateway */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex-1 flex items-center z-20 overflow-y-auto lg:overflow-visible">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider text-[#1479FF] dark:text-[#36A3FF] bg-[#EAF4FF] dark:bg-[#1479FF]/15 border border-[#1479FF]/25 w-fit mb-2 uppercase select-none">
              <span className="w-2 h-2 rounded-full bg-[#20B26B] animate-pulse" />
              Connected Hospital Command
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[2.65rem] xl:text-[2.9rem] font-black text-[#102A43] dark:text-white tracking-tight leading-[1.14] mb-2">
              One Connected Platform for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1479FF] via-[#18C7C9] to-[#20B26B]">
                Smarter Healthcare.
              </span>
            </h1>

            <p className="text-xs sm:text-sm lg:text-[14px] text-[#627D98] dark:text-[#9FB3C8] max-w-xl leading-relaxed mb-3 font-medium">
              Empowering hospitals, clinicians, and care teams with intelligent tools to manage patients, workflows, and clinical operations — all from one secure platform.
            </p>

            <div className="my-1">
              <HealthcareHero />
            </div>

            <div className="mt-3.5 hidden sm:block">
              <HealthcareStats />
            </div>
          </div>

          {/* Right Column (Login Form) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
            <LoginForm language={currentLanguage} />

            <div className="w-full mt-5 sm:hidden">
              <HealthcareStats />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-[11px] text-[#627D98] dark:text-[#9FB3C8] z-20 border-t border-slate-200/60 dark:border-slate-800/60 flex-wrap gap-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} MediCare Health Systems. All rights reserved.</span>
          <span className="opacity-40">•</span>
          <span className="text-[#20B26B] font-semibold">Core v4.8 Active</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-semibold">
          <a href="/admin-portal.html" className="hover:text-[#1479FF] dark:hover:text-[#36A3FF] transition-colors">
            Clinical Portal
          </a>
          <a href="/super-admin-portal.html" className="hover:text-[#1479FF] dark:hover:text-[#36A3FF] transition-colors">
            Hospital Admin
          </a>
          <a href="/patient-portal.html" className="hover:text-[#1479FF] dark:hover:text-[#36A3FF] transition-colors">
            Patient Portal
          </a>
          <a href="/pharmacist-portal.html" className="hover:text-[#1479FF] dark:hover:text-[#36A3FF] transition-colors">
            Pharmacy POS
          </a>
        </div>
      </footer>
    </div>
  );
}
