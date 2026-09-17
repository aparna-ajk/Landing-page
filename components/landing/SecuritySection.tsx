'use client';

import React from 'react';
import {
  Shield,
  Lock,
  Key,
  FileCheck,
  Server,
  EyeOff,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  Fingerprint,
  Cpu,
} from 'lucide-react';

export default function SecuritySection() {
  const certifications = [
    { title: 'HIPAA Title II', desc: 'Full business associate agreement with audit logs and PHI pseudonymization.' },
    { title: 'SOC 2 Type II', desc: 'Independently audited controls across security, availability, and confidentiality.' },
    { title: 'ISO 27001 & 27799', desc: 'Gold standard global information security management in health informatics.' },
    { title: 'GDPR Compliant', desc: 'Right to erasure, data portability, and strict EU patient data residency.' },
    { title: 'HL7 & FHIR v4.3', desc: 'Standardized encrypted endpoints for fast interoperable health exchanges.' },
    { title: 'FIDO2 / WebAuthn', desc: 'Hardware-backed biometric multi-factor authentication for medical personnel.' },
  ];

  return (
    <section id="security" className="relative py-28 bg-[#F8FAFC] dark:bg-[#071521] text-slate-900 dark:text-white overflow-hidden transition-colors">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(5,150,105,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#059669]/10 border border-[#059669]/20 text-[#059669] dark:bg-[#20B26B]/15 dark:border-[#20B26B]/30 dark:text-[#20B26B] text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Fortress-Grade Healthcare Security
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-5">
            Zero Trust Architecture. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#0284C7] to-[#0D9488] dark:from-[#20B26B] dark:via-[#18C7C9] dark:to-[#1479FF]">
              Absolute Clinical Privacy.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Engineered from ground zero for healthcare data sovereignty. Cryptographically isolated patient
            vaults, hardware security modules, and strict role-based access protocols.
          </p>
        </div>

        {/* Central Shield Visual with Orbiting Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Column: Shield Centerpiece (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Outer Pulsing Rings */}
              <div className="absolute inset-0 rounded-full border border-[#059669]/20 dark:border-[#20B26B]/20 animate-ping opacity-25" />
              <div className="absolute inset-4 rounded-full border border-dashed border-[#0284C7]/40 dark:border-[#18C7C9]/40 animate-scanner-orbit" />
              <div className="absolute inset-10 rounded-full border border-[#0284C7]/30 dark:border-[#1479FF]/30" />

              {/* Central Glowing Shield */}
              <div className="relative w-36 h-36 rounded-3xl bg-gradient-to-br from-[#0B1F33] to-[#071521] border-2 border-[#059669] dark:border-[#20B26B] shadow-[0_0_50px_rgba(5,150,105,0.25)] flex flex-col items-center justify-center text-[#059669] dark:text-[#20B26B]">
                <ShieldCheck className="w-16 h-16" />
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white mt-1">
                  ZERO TRUST
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Security Pillars (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-[#0B1F33]/80 border border-slate-200/90 dark:border-white/10 hover:border-sky-500/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 space-y-2 group shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#059669]/10 text-[#059669] dark:bg-[#20B26B]/15 dark:text-[#20B26B] flex items-center justify-center font-bold text-xs group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0284C7] dark:group-hover:text-[#18C7C9] transition-colors">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Technical Guarantee Bar */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50/90 via-teal-50/90 to-blue-50/90 dark:from-[#0B1F33] dark:via-[#0A2640] dark:to-[#0B1F33] border border-blue-200/80 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0284C7]/15 dark:bg-[#18C7C9]/20 border border-[#0284C7]/30 dark:border-[#18C7C9]/40 flex items-center justify-center text-[#0284C7] dark:text-[#18C7C9] flex-shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Dedicated Sovereign Cloud Tenant Available</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Option for on-premise air-gapped deployment or dedicated AWS/Azure/GCP healthcare enclaves.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-mono font-semibold border border-slate-200 dark:border-transparent">
              BAA Signed Instantly
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
