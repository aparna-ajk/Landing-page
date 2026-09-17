'use client';

import React, { useState } from 'react';
import {
  Smartphone,
  Calendar,
  Pill,
  FileCheck,
  CreditCard,
  Bell,
  CheckCircle2,
  Clock,
  Download,
  QrCode,
  Shield,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  User,
} from 'lucide-react';
import ThreeDCard from '@/components/ui/ThreeDCard';

export default function PatientExperience() {
  const [activeTab, setActiveTab] = useState<'appointments' | 'prescriptions' | 'labs' | 'bills'>('appointments');

  return (
    <section id="patient-app" className="relative py-28 bg-[#F8FAFC] dark:bg-[#0B1F33] text-slate-900 dark:text-white overflow-hidden transition-colors">
      {/* Background radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(2,132,199,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Descriptive text and feature benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#059669]/10 text-[#059669] dark:bg-[#20B26B]/15 dark:border-[#20B26B]/30 dark:text-[#20B26B] border border-[#059669]/20 text-xs font-semibold uppercase tracking-wider">
              <Smartphone className="w-3.5 h-3.5" />
              Patient-First Digital Health
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Hospital Care in the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#059669] dark:from-[#18C7C9] dark:via-[#1479FF] dark:to-[#20B26B]">
                Palm of Their Hand.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Empower patients with total visibility into their healthcare journey. Instant self-service
              scheduling, live waiting room queue tracking, cryptographically secure lab results, and one-click
              cashless insurance settlement.
            </p>

            {/* Feature Bullets */}
            <div className="space-y-4 pt-2">
              {[
                {
                  title: 'Zero-Waiting Room Queues',
                  desc: 'Patients receive live SMS & push notifications with estimated consultation wait times and parking navigation.',
                },
                {
                  title: 'Cryptographic Health Records',
                  desc: 'FHIR v4.3 and ABHA compliant personal health records shareable across hospitals in seconds.',
                },
                {
                  title: 'Smart Medication Reminders',
                  desc: 'Interactive compliance tracking with automated pharmacy refill requests and drug advisory push alerts.',
                },
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0284C7]/10 dark:bg-[#18C7C9]/15 text-[#0284C7] dark:text-[#18C7C9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{feat.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Rating and Adoption Stats */}
            <div className="flex items-center gap-6 pt-4 border-t border-slate-200 dark:border-white/10">
              <div>
                <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">4.9 / 5.0</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">iOS & Android Patient Rating</div>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
              <div>
                <div className="text-2xl font-bold font-mono text-[#0284C7] dark:text-[#18C7C9]">88%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Adoption Rate across 450K+ Patients</div>
              </div>
            </div>
          </div>

          {/* Right Column: Smartphone Mockup with 3D Spatial Depth */}
          <div className="lg:col-span-6 flex justify-center relative">
            <ThreeDCard maxTilt={7} scale={1.02} glare={true} className="relative">
              {/* Floating Notification Bubbles around Smartphone */}
              <div className="hidden sm:block absolute -left-8 top-16 z-20 p-3 rounded-xl bg-white/95 dark:bg-[#071521]/95 backdrop-blur-md border border-slate-200/90 dark:border-white/15 shadow-xl max-w-[210px] animate-float-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                <span className="text-[10px] font-mono font-semibold text-[#0284C7] dark:text-[#18C7C9]">SMART QUEUE ALERT</span>
              </div>
              <p className="text-[11px] text-slate-800 dark:text-slate-200 leading-tight">
                Your queue position is #2 with Dr. Sarah Vance. Consultation in ~6 mins.
              </p>
            </div>

            <div className="hidden sm:block absolute -right-6 bottom-24 z-20 p-3 rounded-xl bg-white/95 dark:bg-[#071521]/95 backdrop-blur-md border border-slate-200/90 dark:border-white/15 shadow-xl max-w-[210px] animate-float-2">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                <span className="text-[10px] font-mono font-semibold text-[#059669]">INSURANCE APPROVED</span>
              </div>
              <p className="text-[11px] text-slate-800 dark:text-slate-200 leading-tight">
                Cashless pre-auth claim approved for $1,450.00 via Aetna Global.
              </p>
            </div>

            {/* Smartphone Outer Shell */}
            <div className="w-[310px] sm:w-[340px] h-[640px] rounded-[48px] bg-[#071521] border-[8px] border-slate-700/80 shadow-2xl p-4 flex flex-col relative overflow-hidden ring-1 ring-white/20">
              {/* Dynamic Island / Speaker Notch */}
              <div className="w-28 h-5 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
                <div className="w-2 h-2 rounded-full bg-blue-900/60" />
              </div>

              {/* Patient App Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#18C7C9] to-[#1479FF] flex items-center justify-center text-[#071521] font-bold text-xs">
                    DH
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">David Harrison</div>
                    <div className="text-[9px] text-slate-400 font-mono">Patient ID: #MC-88294</div>
                  </div>
                </div>
                <div className="relative">
                  <Bell className="w-4 h-4 text-slate-300" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#18C7C9]" />
                </div>
              </div>

              {/* Patient App Interactive Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-white/5 mb-3 text-[10px] font-medium text-slate-400">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`py-1.5 rounded-lg transition-all text-center ${
                    activeTab === 'appointments' ? 'bg-[#18C7C9] text-[#071521] font-bold' : 'hover:text-white'
                  }`}
                >
                  Appts
                </button>
                <button
                  onClick={() => setActiveTab('prescriptions')}
                  className={`py-1.5 rounded-lg transition-all text-center ${
                    activeTab === 'prescriptions' ? 'bg-[#18C7C9] text-[#071521] font-bold' : 'hover:text-white'
                  }`}
                >
                  Rx
                </button>
                <button
                  onClick={() => setActiveTab('labs')}
                  className={`py-1.5 rounded-lg transition-all text-center ${
                    activeTab === 'labs' ? 'bg-[#18C7C9] text-[#071521] font-bold' : 'hover:text-white'
                  }`}
                >
                  Labs
                </button>
                <button
                  onClick={() => setActiveTab('bills')}
                  className={`py-1.5 rounded-lg transition-all text-center ${
                    activeTab === 'bills' ? 'bg-[#18C7C9] text-[#071521] font-bold' : 'hover:text-white'
                  }`}
                >
                  Bills
                </button>
              </div>

              {/* Dynamic Tab Body */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                {activeTab === 'appointments' && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#1479FF]/20 to-[#18C7C9]/20 border border-[#18C7C9]/30">
                      <div className="flex items-center justify-between text-[10px] text-[#18C7C9] font-mono mb-1">
                        <span>LIVE QUEUE PASS</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#20B26B]/20 text-[#20B26B]">Token #A-14</span>
                      </div>
                      <div className="text-sm font-bold text-white mb-0.5">Cardiology Follow-Up</div>
                      <div className="text-[11px] text-slate-300">Dr. Sarah Vance &bull; Room 302</div>
                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Est. Wait: ~6 mins</span>
                        <span className="text-[#18C7C9] font-semibold">2 Ahead of You</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white text-[11px]">Book New Follow-up</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <span className="text-[10px] text-slate-400">Select physician, tele-consult or in-person.</span>
                    </div>
                  </div>
                )}

                {activeTab === 'prescriptions' && (
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-[#0B1F33] border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-[11px]">Atorvastatin 20mg</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#20B26B]/20 text-[#20B26B]">Active</span>
                      </div>
                      <p className="text-[10px] text-slate-400">1 tablet oral &bull; Once daily at bedtime &bull; 30 Days</p>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-[#18C7C9]">
                        <span>Refills: 2 Remaining</span>
                        <button className="underline">Order Refill</button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0B1F33] border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-[11px]">Aspirin Cardio 81mg</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#20B26B]/20 text-[#20B26B]">Active</span>
                      </div>
                      <p className="text-[10px] text-slate-400">1 tablet oral &bull; Morning after breakfast</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#18C7C9]/10 border border-[#18C7C9]/20 flex items-center gap-2 text-[10px] text-[#18C7C9]">
                      <QrCode className="w-4 h-4 flex-shrink-0" />
                      <span>Show QR to Hospital Pharmacy for Express Pick-up</span>
                    </div>
                  </div>
                )}

                {activeTab === 'labs' && (
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-[#0B1F33] border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-[11px]">Lipid Panel + Troponin</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#20B26B]/20 text-[#20B26B]">Normal</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mb-2">Processed by Central Lab &bull; 09:30 AM</div>
                      <button className="flex items-center gap-1 text-[10px] text-[#18C7C9] hover:underline">
                        <Download className="w-3 h-3" /> Download Verified PDF
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0B1F33] border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-[11px]">12-Lead ECG Report</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1479FF]/20 text-[#1479FF]">Reviewed</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mb-2">Signed off by Dr. Vance</div>
                      <button className="flex items-center gap-1 text-[10px] text-[#18C7C9] hover:underline">
                        <Download className="w-3 h-3" /> View Trace
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'bills' && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#20B26B]/20 to-[#18C7C9]/10 border border-[#20B26B]/30">
                      <div className="text-[10px] font-mono text-[#20B26B] mb-1">CASHLESS PRE-APPROVAL</div>
                      <div className="text-base font-bold text-white">$1,840.00 Covered</div>
                      <div className="text-[10px] text-slate-300 mt-1">BlueCross Silver &bull; Patient Copay: $0.00</div>
                    </div>

                    <div className="space-y-1 text-[11px] p-3 rounded-xl bg-white/5">
                      <div className="flex justify-between text-slate-400">
                        <span>Cardiology Consult</span>
                        <span>$240.00</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>ECG Diagnostics</span>
                        <span>$160.00</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Biochemical Screen</span>
                        <span>$320.00</span>
                      </div>
                      <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-white">
                        <span>Total Adjudicated</span>
                        <span className="text-[#20B26B]">$720.00 (100% Settled)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Phone Home Indicator */}
              <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mt-2" />
            </div>
          </ThreeDCard>
        </div>
      </div>
    </div>
  </section>
);
}
