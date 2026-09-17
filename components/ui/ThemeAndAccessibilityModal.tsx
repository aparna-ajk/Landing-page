'use client';

import React, { useState, useEffect } from 'react';
import {
  Palette,
  Sun,
  Moon,
  Eye,
  Type,
  Sliders,
  Check,
  X,
  Sparkles,
  ZapOff,
  Accessibility,
  Keyboard,
} from 'lucide-react';

export type ColorTheme =
  | 'theme-navy-cyan' // Theme 1: Default
  | 'theme-teal-mint' // Theme 2
  | 'theme-indigo-violet' // Theme 3
  | 'theme-dark-purple' // Theme 4
  | 'theme-softblue-emerald'; // Theme 5

export type LightingMode = 'dark' | 'light' | 'high-contrast';
export type FontSize = 'normal' | 'large' | 'xl';

export default function ThemeAndAccessibilityModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<ColorTheme>('theme-navy-cyan');
  const [mode, setMode] = useState<LightingMode>('light');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [keyboardFocusVisible, setKeyboardFocusVisible] = useState(false);

  // Load initial settings
  useEffect(() => {
    const savedTheme = localStorage.getItem('medicare-theme') as ColorTheme | null;
    const savedMode = localStorage.getItem('medicare-mode') as LightingMode | null;
    const savedFontSize = localStorage.getItem('medicare-fontsize') as FontSize | null;
    const savedReducedMotion = localStorage.getItem('medicare-reducedmotion') === 'true';

    if (savedTheme) setTheme(savedTheme);
    if (savedMode) setMode(savedMode);
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedReducedMotion) setReducedMotion(true);
  }, []);

  // Apply settings to document root
  useEffect(() => {
    const root = document.documentElement;

    // Reset previous theme classes
    root.classList.remove(
      'theme-navy-cyan',
      'theme-teal-mint',
      'theme-indigo-violet',
      'theme-dark-purple',
      'theme-softblue-emerald'
    );
    root.classList.add(theme);
    localStorage.setItem('medicare-theme', theme);

    // Mode classes
    root.classList.remove('dark', 'light', 'high-contrast');
    if (mode === 'dark') {
      root.classList.add('dark');
    } else if (mode === 'light') {
      root.classList.add('light');
    } else if (mode === 'high-contrast') {
      root.classList.add('dark', 'high-contrast');
    }
    localStorage.setItem('medicare-mode', mode);

    // Font size attribute
    root.setAttribute('data-font-size', fontSize);
    localStorage.setItem('medicare-fontsize', fontSize);

    // Reduced motion
    if (reducedMotion) {
      root.classList.add('reduced-motion');
      localStorage.setItem('medicare-reducedmotion', 'true');
    } else {
      root.classList.remove('reduced-motion');
      localStorage.setItem('medicare-reducedmotion', 'false');
    }

    // Keyboard navigation outline
    if (keyboardFocusVisible) {
      root.classList.add('keyboard-nav-active');
    } else {
      root.classList.remove('keyboard-nav-active');
    }
  }, [theme, mode, fontSize, reducedMotion, keyboardFocusVisible]);

  const colorThemes = [
    {
      id: 'theme-navy-cyan' as ColorTheme,
      name: 'Theme 1: Deep Navy + Cyan + White',
      desc: 'Default: Midnight Navy + Medical Cyan + Electric Blue + White',
      colors: ['#071521', '#18C7C9', '#1479FF', '#FFFFFF'],
    },
    {
      id: 'theme-teal-mint' as ColorTheme,
      name: 'Theme 2: Teal + Mint + White',
      desc: 'Nordic Clinical: Deep Teal + Refreshing Mint + Crisp White',
      colors: ['#042022', '#14B8A6', '#20B26B', '#FFFFFF'],
    },
    {
      id: 'theme-indigo-violet' as ColorTheme,
      name: 'Theme 3: Indigo + Violet + Cyan',
      desc: 'Bio-Intelligence: Deep Indigo + Electric Violet + Cyan Glow',
      colors: ['#0B0E28', '#8B5CF6', '#18C7C9', '#F0F6FC'],
    },
    {
      id: 'theme-dark-purple' as ColorTheme,
      name: 'Theme 4: Dark Navy + Electric Blue + Purple',
      desc: 'Precision Cybernetic: Deep Space Navy + Cyber Blue + Purple',
      colors: ['#050816', '#3B82F6', '#A855F7', '#E2E8F0'],
    },
    {
      id: 'theme-softblue-emerald' as ColorTheme,
      name: 'Theme 5: White + Soft Blue + Emerald',
      desc: 'Ambulatory Wellness: Crisp Slate + Soft Blue + Vibrant Emerald',
      colors: ['#0F243A', '#38BDF8', '#10B981', '#FFFFFF'],
    },
  ];

  return (
    <>
      {/* Floating Theme & Accessibility Dock Trigger (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#18C7C9] hover:bg-[#14B8A6] text-[#071521] font-bold text-xs shadow-2xl shadow-[#18C7C9]/40 hover:scale-105 active:scale-95 transition-all border border-white/20 group"
          title="Color Themes & Accessibility Controls"
        >
          <Palette className="w-4 h-4 transition-transform group-hover:rotate-45" />
          <span className="hidden sm:inline">Theme &amp; Accessibility</span>
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#071521] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#18C7C9] to-[#1479FF] flex items-center justify-center text-[#071521]">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Visual Themes &amp; Accessibility</h3>
                  <p className="text-xs text-slate-400">
                    Customize your healthcare clinical workstation interface
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-sm">
              {/* 1. Clinical Contrast / Lighting Mode (Section 23) */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#18C7C9] block mb-3 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5" /> 1. Lighting &amp; Contrast Mode
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'dark', label: 'Dark Clinical', icon: Moon, desc: 'Recommended OLED night mode' },
                    { id: 'light', label: 'Light Medical', icon: Sun, desc: 'High ambient light rooms' },
                    { id: 'high-contrast', label: 'High-Contrast', icon: Eye, desc: 'Max legibility & sharp lines' },
                  ].map((m) => {
                    const IconComp = m.icon;
                    const isActive = mode === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setMode(m.id as LightingMode)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${isActive
                            ? 'bg-[#1479FF]/20 border-[#18C7C9] text-white shadow-lg ring-2 ring-[#18C7C9]/30'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <IconComp className={`w-4 h-4 ${isActive ? 'text-[#18C7C9]' : 'text-slate-400'}`} />
                          {isActive && <Check className="w-3.5 h-3.5 text-[#18C7C9]" />}
                        </div>
                        <div className="font-bold text-xs text-white">{m.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{m.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Color Themes (Section 24) */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#18C7C9] block mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 2. Color Palette (5 Curated Themes)
                </label>
                <div className="space-y-2.5">
                  {colorThemes.map((t) => {
                    const isActive = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${isActive
                            ? 'bg-[#18C7C9]/15 border-[#18C7C9] text-white ring-1 ring-[#18C7C9]/40'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Color palette preview circles */}
                          <div className="flex -space-x-1.5">
                            {t.colors.map((c, idx) => (
                              <span
                                key={idx}
                                className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-white">{t.name}</div>
                            <div className="text-[11px] text-slate-400">{t.desc}</div>
                          </div>
                        </div>

                        {isActive && (
                          <div className="w-6 h-6 rounded-full bg-[#18C7C9] text-[#071521] flex items-center justify-center font-bold">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Accessibility Controls (Section 23) */}
              <div className="border-t border-white/10 pt-5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#18C7C9] block mb-3 flex items-center gap-1.5">
                  <Accessibility className="w-3.5 h-3.5" /> 3. Accessibility &amp; Ergonomics
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Font Size */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                      <Type className="w-4 h-4 text-[#18C7C9]" />
                      <span>Typography Scaling</span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-1">
                      {[
                        { id: 'normal', label: 'Standard 100%' },
                        { id: 'large', label: 'Large 110%' },
                        { id: 'xl', label: 'XL 120%' },
                      ].map((fs) => (
                        <button
                          key={fs.id}
                          onClick={() => setFontSize(fs.id as FontSize)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${fontSize === fs.id
                              ? 'bg-[#18C7C9] text-[#071521] font-bold'
                              : 'bg-white/5 text-slate-400 hover:text-white'
                            }`}
                        >
                          {fs.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reduced Motion Toggle */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                        <ZapOff className="w-4 h-4 text-amber-400" />
                        <span>Reduced Motion</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Disable orbital &amp; radar animations
                      </div>
                    </div>
                    <button
                      onClick={() => setReducedMotion(!reducedMotion)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${reducedMotion ? 'bg-[#20B26B]' : 'bg-white/20'
                        }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${reducedMotion ? 'left-6' : 'left-1'
                          }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Keyboard Navigation Helper */}
                <div className="mt-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                      <Keyboard className="w-4 h-4 text-[#1479FF]" />
                      <span>High-Visibility Keyboard Focus Rings</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Adds bold cyan rings for keyboard Tab/Shift-Tab navigation
                    </div>
                  </div>
                  <button
                    onClick={() => setKeyboardFocusVisible(!keyboardFocusVisible)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${keyboardFocusVisible ? 'bg-[#18C7C9]' : 'bg-white/20'
                      }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${keyboardFocusVisible ? 'left-6' : 'left-1'
                        }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 pt-4 mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#18C7C9] to-[#1479FF] hover:opacity-95 text-[#071521] font-bold text-xs shadow-lg transition-all"
              >
                Apply &amp; Close Controls
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
