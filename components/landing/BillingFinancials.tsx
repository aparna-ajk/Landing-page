'use client';

import React, { useState } from 'react';
import {
  Receipt,
  CreditCard,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Building,
  Zap,
  Clock,
} from 'lucide-react';
import ThreeDCard from '@/components/ui/ThreeDCard';

export default function BillingFinancials() {
  const [selectedClaim, setSelectedClaim] = useState('CLM-99120');

  const claims = [
    {
      id: 'CLM-99120',
      patient: 'David Harrison (44, M)',
      payer: 'BlueCross BlueShield Enterprise',
      billedAmount: '$6,450.00',
      adjudicatedAmount: '$6,450.00',
      copay: '$0.00',
      status: 'Adjudicated Instantly',
      speed: '7.2 seconds',
      drg: 'DRG-287: Circulatory Disorders w/o CC',
      breakdown: [
        { item: 'ICU & Inpatient Ward (2 Days)', cost: '$2,800.00' },
        { item: 'Coronary Angiography Procedure', cost: '$2,100.00' },
        { item: 'Diagnostic Cardiac Biomarkers', cost: '$650.00' },
        { item: 'Cardiovascular Pharmacy & Infusion', cost: '$900.00' },
      ],
    },
    {
      id: 'CLM-99121',
      patient: 'Claire Henderson (39, F)',
      payer: 'Aetna Global Health',
      billedAmount: '$12,800.00',
      adjudicatedAmount: '$12,800.00',
      copay: '$150.00',
      status: 'Pre-Authorized Cashless',
      speed: '12.4 seconds',
      drg: 'DRG-024: Craniotomy Procedures',
      breakdown: [
        { item: 'Smart OT Suite & Da Vinci Console', cost: '$7,200.00' },
        { item: 'Neuro ICU Monitoring (3 Days)', cost: '$3,900.00' },
        { item: 'Stereotactic Navigation Consumables', cost: '$1,200.00' },
        { item: 'Post-Op Histopathology', cost: '$500.00' },
      ],
    },
    {
      id: 'CLM-99122',
      patient: 'Arthur Pendelton (72, M)',
      payer: 'Medicare Part A / Advantage',
      billedAmount: '$8,920.00',
      adjudicatedAmount: '$8,920.00',
      copay: '$0.00',
      status: 'Adjudicated Instantly',
      speed: '5.8 seconds',
      drg: 'DRG-470: Major Joint Replacement',
      breakdown: [
        { item: 'Orthopedic Titanium Implant Kit', cost: '$4,600.00' },
        { item: 'Surgical Suite & Anesthesia', cost: '$2,800.00' },
        { item: 'Physical Therapy & Recovery Bed', cost: '$1,120.00' },
        { item: 'Pre-Op Digital Templating CT', cost: '$400.00' },
      ],
    },
  ];

  const currentClaim = claims.find((c) => c.id === selectedClaim) || claims[0];

  return (
    <section id="billing" className="relative py-28 bg-white dark:bg-[#071521] text-slate-900 dark:text-white overflow-hidden transition-colors">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(2,132,199,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0284C7]/10 dark:bg-[#1479FF]/15 border border-[#0284C7]/25 dark:border-[#1479FF]/30 text-[#0284C7] dark:text-[#1479FF] text-xs font-semibold uppercase tracking-wider mb-4">
            <Receipt className="w-3.5 h-3.5" />
            Revenue Cycle Management (RCM)
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-5">
            Instant Cashless Adjudication & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#059669] dark:from-[#18C7C9] dark:via-[#1479FF] dark:to-[#20B26B]">
              Transparent Automated Billing
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Eliminate claim rejection headaches and delayed patient discharges. MediCare HMS compiles DRG
            and ICD-11 medical documentation into pre-authorized FHIR claim packages in seconds.
          </p>
        </div>

        {/* Financial KPI Highlights with 3D Spatial Tilt */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <ThreeDCard maxTilt={8} scale={1.03}>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0B1F33] border border-slate-200/90 dark:border-white/10 shadow-sm h-full">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span>First-Pass Clean Claim Rate</span>
                <TrendingUp className="w-4 h-4 text-[#059669] dark:text-[#20B26B]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">99.4%</div>
              <div className="text-[11px] text-[#059669] dark:text-[#20B26B] mt-1 font-mono font-medium">Industry Avg: 78%</div>
            </div>
          </ThreeDCard>

          <ThreeDCard maxTilt={8} scale={1.03}>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0B1F33] border border-slate-200/90 dark:border-white/10 shadow-sm h-full">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span>Cashless Pre-Auth Speed</span>
                <Zap className="w-4 h-4 text-[#0284C7] dark:text-[#18C7C9]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">&lt; 15 Sec</div>
              <div className="text-[11px] text-[#0284C7] dark:text-[#18C7C9] mt-1 font-mono font-medium">API Linked Payers</div>
            </div>
          </ThreeDCard>

          <ThreeDCard maxTilt={8} scale={1.03}>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0B1F33] border border-slate-200/90 dark:border-white/10 shadow-sm h-full">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span>Average AR Days</span>
                <Clock className="w-4 h-4 text-[#0284C7] dark:text-[#1479FF]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">14.2 Days</div>
              <div className="text-[11px] text-[#059669] dark:text-[#20B26B] mt-1 font-mono font-medium">Reduced from 45 Days</div>
            </div>
          </ThreeDCard>

          <ThreeDCard maxTilt={8} scale={1.03}>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0B1F33] border border-slate-200/90 dark:border-white/10 shadow-sm h-full">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span>Discharge Wait Time</span>
                <CheckCircle2 className="w-4 h-4 text-[#059669] dark:text-[#20B26B]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 dark:text-white">12 Minutes</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">Instant digital receipt & Rx</div>
            </div>
          </ThreeDCard>
        </div>

        {/* Claim Inspector Workbench with 3D Depth */}
        <ThreeDCard maxTilt={4} scale={1.01} glare={false}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-50/90 dark:bg-[#0B1F33]/90 rounded-3xl border border-slate-200/90 dark:border-white/15 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
          {/* Claims Queue Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-2">
              <span>AUTOMATED CLAIM ADJUDICATION QUEUE</span>
              <span className="text-[#059669] dark:text-[#20B26B]">Live Payer Bridge</span>
            </div>

            {claims.map((c) => {
              const isSelected = c.id === selectedClaim;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedClaim(c.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0284C7]/15 to-[#0D9488]/10 dark:from-[#18C7C9]/15 dark:to-[#1479FF]/10 border-[#0284C7] dark:border-[#18C7C9] shadow-md shadow-[#0284C7]/15'
                      : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900 dark:text-white">{c.patient}</span>
                    <span className="font-mono text-[#059669] dark:text-[#20B26B] font-bold">{c.billedAmount}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>{c.payer}</span>
                    <span className="font-mono text-[10px] text-[#0284C7] dark:text-[#18C7C9]">{c.speed}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Claim Itemized Bill View (7 cols) */}
          <div className="lg:col-span-7 bg-[#071521] rounded-2xl border border-white/10 p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="text-xs font-mono text-[#18C7C9]">{currentClaim.drg}</div>
                <h4 className="text-lg font-bold text-white mt-0.5">{currentClaim.patient}</h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#20B26B]/20 border border-[#20B26B]/40 text-[#20B26B] text-xs font-mono font-bold">
                {currentClaim.status}
              </span>
            </div>

            {/* Line Items Table */}
            <div className="space-y-2 text-xs">
              <span className="text-slate-400 font-mono text-[11px] block mb-2">Itemized Medical Breakdown</span>
              {currentClaim.breakdown.map((row, idx) => (
                <div key={idx} className="flex justify-between p-2.5 rounded-lg bg-white/5">
                  <span className="text-slate-300">{row.item}</span>
                  <span className="font-mono font-semibold text-white">{row.cost}</span>
                </div>
              ))}
            </div>

            {/* Totals Summary */}
            <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Total Medical Billed:</span>
                <span className="font-mono text-white">{currentClaim.billedAmount}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Insurer Direct Settlement:</span>
                <span className="font-mono text-[#20B26B]">{currentClaim.adjudicatedAmount}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Patient Balance Due:</span>
                <span className="font-mono text-white font-bold">{currentClaim.copay}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1479FF]/10 border border-[#1479FF]/20 text-xs text-slate-300 flex items-center justify-between">
              <span>Cryptographic Receipt Hash: 0x89f...2b4a (FHIR Claim Response 200 OK)</span>
              <ShieldCheck className="w-4 h-4 text-[#20B26B]" />
            </div>
          </div>
        </div>
      </ThreeDCard>
    </div>
  </section>
  );
}
