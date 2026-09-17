'use client';

import React, { useState } from 'react';
import {
  Pill,
  Sparkles,
  Barcode,
  CheckCircle2,
} from 'lucide-react';

export default function PharmacyInventory() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'normal'>('all');

  const medications = [
    {
      code: 'NDC 0002-7510-01',
      name: 'Insulin Glargine 100 U/mL (Lantus)',
      category: 'Endocrinology',
      stock: '42 Vials',
      reorderPoint: '50 Vials',
      status: 'Low Stock Alert',
      expiry: '2027-04 (14 mos)',
      lot: 'LT-84920B',
      method: 'FEFO Monitored',
      aiRestock: 'Auto-reorder dispatched to McKesson (100 units)',
    },
    {
      code: 'NDC 0409-6729-02',
      name: 'Cefepime Hydrochloride 2g IV',
      category: 'Infectious Disease',
      stock: '180 Vials',
      reorderPoint: '80 Vials',
      status: 'Optimal',
      expiry: '2026-11 (8 mos)',
      lot: 'CF-99411A',
      method: 'FEFO Priority',
      aiRestock: 'Adequate for 34 days projected burn rate',
    },
    {
      code: 'NDC 0078-0358-05',
      name: 'Atorvastatin Calcium 20mg Tablets',
      category: 'Cardiovascular',
      stock: '2,400 Tabs',
      reorderPoint: '1,000 Tabs',
      status: 'Optimal',
      expiry: '2028-02 (23 mos)',
      lot: 'AT-54122D',
      method: 'FIFO Verified',
      aiRestock: 'Autonomous monthly replenishment cycle',
    },
    {
      code: 'NDC 0074-3799-02',
      name: 'Propofol 10mg/mL Injectable Emulsion',
      category: 'Anesthesiology (OT)',
      stock: '28 Ampoules',
      reorderPoint: '45 Ampoules',
      status: 'Low Stock Alert',
      expiry: '2026-09 (6 mos)',
      lot: 'PP-10499C',
      method: 'Cold Chain IoT Locked',
      aiRestock: 'Priority courier ETA: Today 16:30',
    },
  ];

  const filteredMeds =
    activeFilter === 'all'
      ? medications
      : activeFilter === 'critical'
      ? medications.filter((m) => m.status.includes('Alert'))
      : medications.filter((m) => m.status === 'Optimal');

  return (
    <section id="pharmacy" className="relative py-28 bg-white text-black overflow-hidden select-none">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/15 text-black text-xs font-semibold uppercase tracking-wider mb-4">
              <Pill className="w-3.5 h-3.5 text-black" />
              Intelligent Pharmaceutical Supply Chain
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black mb-4">
              Zero-Stockout Pharmacy &amp; <br />
              <span className="text-zinc-600">
                Closed-Loop Medication Safety
              </span>
            </h2>
          </div>

          {/* Filter Pill Buttons */}
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All Formulations' },
              { id: 'critical', label: 'Low Stock Alerts (2)' },
              { id: 'normal', label: 'Optimal Reserves (2)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === f.id
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white text-zinc-700 border border-black/20 hover:border-black'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pharmacy Inventory Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main List (8 cols) */}
          <div className="lg:col-span-8 space-y-3">
            {filteredMeds.map((med, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-black/10 hover:border-black/30 transition-all space-y-3 shadow-sm text-black"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center text-black">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-black">{med.name}</h4>
                      <div className="text-[11px] text-zinc-500 font-mono font-bold">
                        {med.code} &bull; {med.category}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      med.status.includes('Alert')
                        ? 'bg-black text-white'
                        : 'bg-slate-100 text-black border border-black/15'
                    }`}
                  >
                    {med.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-black/10">
                    <span className="text-[10px] text-zinc-500 font-bold block">Available In Stock</span>
                    <span className="font-mono font-black text-black text-sm">{med.stock}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-black/10">
                    <span className="text-[10px] text-zinc-500 font-bold block">Reorder Threshold</span>
                    <span className="font-mono font-bold text-zinc-700 text-sm">{med.reorderPoint}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-black/10">
                    <span className="text-[10px] text-zinc-500 font-bold block">Earliest Expiry</span>
                    <span className="font-mono font-black text-black text-sm">{med.expiry}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-black/10">
                    <span className="text-[10px] text-zinc-500 font-bold block">Lot &amp; Protocol</span>
                    <span className="font-mono font-bold text-zinc-700 text-sm">{med.lot}</span>
                  </div>
                </div>

                {/* AI Predictive Restock Pipeline */}
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/5 border border-black/10 text-xs text-black">
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-black" />
                  <span className="font-mono text-[11px] font-semibold">{med.aiRestock}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Barcode Verification & Cold Chain Telemetry (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Barcode Scanner Simulator */}
            <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-black font-black">
                <Barcode className="w-4 h-4 text-black" />
                BEDSIDE 5-RIGHTS VERIFIER
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                Scan patient wristband and medication vial 2D DataMatrix code to guarantee:
              </p>

              <div className="space-y-2 text-xs">
                {['Right Patient', 'Right Medication', 'Right Dose', 'Right Route', 'Right Time'].map((right, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-black/10 text-black font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                    <span>{right}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-black text-white text-center text-xs font-bold shadow-md">
                100% Adverse Drug Event (ADE) Prevention
              </div>
            </div>

            {/* Cold Chain IoT Fridge Status */}
            <div className="p-5 rounded-2xl bg-white border border-black/10 space-y-3 text-xs shadow-sm">
              <div className="flex items-center justify-between font-mono">
                <span className="text-zinc-600 font-bold">Vaccine Cold Chain Fridge #2</span>
                <span className="text-black font-black">+3.8°C (Safe 2-8°C)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-black w-[45%]" />
              </div>
              <span className="text-[10px] text-zinc-500 font-medium block">
                Continuous IoT cellular logging with power-outage battery backup.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
