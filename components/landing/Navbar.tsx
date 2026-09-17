'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  LogIn,
  PhoneCall,
  Menu,
  X,
  Sparkles,
  Stethoscope,
  Layers,
  Star,
  Cpu,
  Home as HomeIcon,
} from 'lucide-react';
import { MediCareLogo } from '@/components/branding/MediCareLogo';

interface NavbarProps {
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero', icon: HomeIcon },
    { name: 'About', href: '#about', id: 'about', icon: Layers },
    { name: 'Interiors & Tech', href: '#hospital-tech', id: 'hospital-tech', icon: Cpu },
    { name: 'Our Doctors', href: '#doctors', id: 'doctors', icon: Stethoscope },
    { name: 'Specialization', href: '#specialization', id: 'specialization', icon: Sparkles },
    { name: 'Review', href: '#review', id: 'review', icon: Star },
  ];

  // Track active section on scroll for dynamic active pill highlight
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const sections = ['hero', 'about', 'hospital-tech', 'specialization', 'doctors', 'review', 'emergency'];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    setActiveSection(id);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Frosted Glassmorphism Background with Ambient Top Glow */}
      <div className="absolute inset-0 bg-white/85 dark:bg-[#071521]/90 backdrop-blur-2xl border-b border-slate-200/70 dark:border-white/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.04)] dark:shadow-[0_6px_30px_rgba(0,0,0,0.35)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#0284C7]/50 dark:via-[#00f0ff]/50 to-transparent pointer-events-none" />

      {/* Main Navigation Bar */}
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href="/" className="flex items-center group">
            <MediCareLogo />
          </Link>
        </div>

        {/* Center Desktop Navigation Links (Attractive Floating Capsule) */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-white/[0.05] p-1.5 rounded-full border border-slate-200/60 dark:border-white/[0.08] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-2 rounded-full text-[13.5px] font-semibold tracking-[-0.01em] transition-all duration-200 flex items-center gap-1.5 group ${isActive
                    ? 'bg-white dark:bg-white/15 text-[#0284C7] dark:text-[#00f0ff] font-bold shadow-sm shadow-black/5'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10'
                  }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] dark:bg-[#00f0ff] animate-pulse" />
                )}
              </a>
            );
          })}

          {/* Emergency Button in Header Bar (Attractive Medical Jewel Pill) */}
          <a
            href="#emergency"
            onClick={() => handleNavClick('#emergency')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13.5px] font-bold tracking-wide transition-all duration-300 ml-1 group ${activeSection === 'emergency'
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-500/30 scale-[1.02]'
                : 'text-rose-600 dark:text-rose-400 bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/30 dark:border-rose-400/40 hover:bg-gradient-to-r hover:from-rose-600 hover:to-red-600 hover:text-white hover:shadow-md hover:shadow-rose-500/25 hover:-translate-y-0.5'
              }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600 group-hover:bg-white" />
            </span>
            <PhoneCall size={13} className="group-hover:rotate-12 transition-transform duration-200" />
            <span>Emergency</span>
          </a>
        </div>

        {/* Action CTAs: Sign In, Book Demo & Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          {/* Sign In CTA */}
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13.5px] font-semibold tracking-[-0.01em] text-slate-700 dark:text-slate-200 hover:text-[#0284C7] dark:hover:text-[#00f0ff] bg-slate-100/60 dark:bg-white/5 hover:bg-slate-200/60 dark:hover:bg-white/10 border border-slate-200/70 dark:border-white/10 shadow-sm transition-all duration-200"
          >
            <LogIn size={14} className="text-slate-500 dark:text-slate-400" />
            <span>Sign In</span>
          </Link>

          {/* Radiant Book Demo Button with Dynamic Shimmer & Lift */}
          <button
            type="button"
            onClick={onOpenDemo}
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13.5px] font-bold text-white dark:text-slate-950 bg-gradient-to-r from-[#0284C7] via-[#0ea5e9] to-[#10b981] dark:from-[#00f0ff] dark:via-[#38bdf8] dark:to-[#10b981] shadow-md shadow-[#0284C7]/20 hover:shadow-xl hover:shadow-[#0284C7]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group overflow-hidden"
          >
            {/* Specular shimmer sweep */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
            <Calendar size={14} className="relative z-10" />
            <span className="relative z-10 font-bold tracking-tight">Book Demo</span>
          </button>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Responsive Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden relative bg-white/95 dark:bg-[#071521]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-colors ${isActive
                      ? 'bg-sky-50 dark:bg-white/10 text-[#0284C7] dark:text-[#00f0ff] font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                >
                  <Icon size={17} className={isActive ? 'text-[#0284C7] dark:text-[#00f0ff]' : 'text-slate-400'} />
                  <span>{link.name}</span>
                </a>
              );
            })}

            {/* Mobile Emergency Button */}
            <a
              href="#emergency"
              onClick={() => handleNavClick('#emergency')}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 mt-1"
            >
              <div className="flex items-center gap-3">
                <PhoneCall size={17} className="text-rose-600 dark:text-rose-400" />
                <span>Emergency Module</span>
              </div>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600" />
              </span>
            </a>

            {/* Mobile Sign In */}
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 mt-1 border-t border-slate-100 dark:border-white/5 pt-3"
            >
              <LogIn size={17} className="text-slate-500" />
              <span>Sign In to Hospital Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
