'use client';

import React from 'react';
import {
  Cloud,
  Server,
  Building,
  Activity,
  ShieldCheck,
  Zap,
  Globe,
  RefreshCw,
  Layers,
} from 'lucide-react';

export default function CloudArchitecture() {
  const nodes = [
    { title: 'Main Tertiary Medical Center', type: 'Flagship Hospital (800 Beds)', location: 'Hub North', status: 'Active Sync' },
    { title: 'Suburban Community Hospital', type: 'Secondary Care (250 Beds)', location: 'Node East', status: 'Active Sync' },
    { title: 'Regional Diagnostic & Imaging Hub', type: 'High-Volume PACS Center', location: 'Node West', status: 'Active Sync' },
    { title: 'Ambulance & Mobile Health Fleet', type: 'Cellular IoT Edge Mesh', location: 'Dynamic Nodes', status: 'Streaming' },
  ];

  return (
    <section id="architecture" className="relative py-28 bg-[#F8FAFC] dark:bg-[#071521] text-slate-900 dark:text-white overflow-hidden transition-colors">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(2,132,199,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0284C7]/10 dark:bg-[#18C7C9]/15 border border-[#0284C7]/25 dark:border-[#18C7C9]/30 text-[#0284C7] dark:text-[#18C7C9] text-xs font-semibold uppercase tracking-wider mb-4">
            <Cloud className="w-3.5 h-3.5" />
            Distributed Enterprise Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Multi-Hospital Cloud Mesh with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#059669] dark:from-[#18C7C9] dark:via-[#1479FF] dark:to-[#20B26B]">
              99.999% Fault Tolerance
            </span>
          </h2>
        </div>

        {/* Central Cloud Mesh Visual Diagram */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-white/15 bg-white dark:bg-[#0B1F33]/90 backdrop-blur-xl p-8 sm:p-12 shadow-xl relative mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Central Cloud Hub Card (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#0B1F33] to-[#071521] border border-[#0284C7]/40 relative overflow-hidden text-center space-y-4 shadow-xl text-white">
              <div className="w-16 h-16 rounded-2xl bg-[#0284C7]/15 border border-[#0284C7]/30 text-[#0284C7] mx-auto flex items-center justify-center">
                <Globe className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0284C7] dark:text-[#18C7C9] block mb-1">
                  CORE INFRASTRUCTURE
                </span>
                <h3 className="text-xl font-bold text-white">MediCare Federated Cloud Core</h3>
                <p className="text-xs text-slate-300 mt-2">
                  Active-active distributed Kubernetes clusters across 3 sovereign availability zones.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-4 text-xs font-mono">
                <span className="text-[#059669]">&bull; Sub-40ms P99 Latency</span>
                <span className="text-[#0284C7]">&bull; Zero-Loss Raft Consensus</span>
              </div>
            </div>

            {/* Right Connected Health Nodes (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nodes.map((node, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-[#071521]/80 border border-slate-200/80 dark:border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#0284C7] dark:text-[#18C7C9] font-medium">{node.location}</span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-[#059669] dark:text-[#20B26B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#20B26B] animate-ping" />
                      {node.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{node.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{node.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cloud SLA Guarantee Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1F33] border border-slate-200/90 dark:border-white/10 shadow-sm">
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">99.999%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Uptime SLA Guaranteed</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1F33] border border-slate-200/90 dark:border-white/10 shadow-sm">
            <div className="text-2xl font-bold font-mono text-[#0284C7] dark:text-[#18C7C9]">0 Seconds</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Database RPO (Zero Data Loss)</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1F33] border border-slate-200/90 dark:border-white/10 shadow-sm">
            <div className="text-2xl font-bold font-mono text-[#059669] dark:text-[#20B26B]">&lt; 30 Seconds</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Automated Failover RTO</div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1F33] border border-slate-200/90 dark:border-white/10 shadow-sm">
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">100%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sovereign Data Isolation</div>
          </div>
        </div>
      </div>
    </section>
  );
}
