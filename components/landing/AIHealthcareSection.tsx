'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Brain,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  FileText,
  CornerDownLeft,
  Activity,
} from 'lucide-react';
import ThreeDCard from '@/components/ui/ThreeDCard';

interface Scenario {
  prompt: string;
  response: string;
  confidence: string;
  references: string;
  warning?: string;
}

const SCENARIOS: Scenario[] = [
  {
    prompt: 'Check drug interaction: Metformin 1000mg + IV Iodinated Contrast Dye',
    response:
      'CAUTION DETECTED: Risk of lactic acidosis and acute contrast-induced nephropathy (CIN). Protocol: Discontinue Metformin at time of or prior to iodinated contrast procedure. Withhold for 48 hours post-procedure; re-evaluate eGFR before resuming.',
    confidence: '99.8% FDA & Renal Society Consensus',
    references: 'KDIGO 2024 Clinical Practice Guideline for Acute Kidney Injury',
    warning: 'Physician order hold automatically drafted for attending signature.',
  },
  {
    prompt: 'Draft discharge summary for Patient #MC-88294 (CABG Post-Op Day 3)',
    response:
      'SUMMARY GENERATED: 55-year-old male s/p off-pump CABG x 3. Vital signs stable, afebrile, sternotomy incision clean/intact, chest tubes removed. Ambulated 150m without desaturation. Discharge Rx: Aspirin 81mg, Metoprolol Tartrate 25mg BID, Atorvastatin 80mg. Outpatient cardiology follow-up in 10 days.',
    confidence: '99.2% Clinical Note Alignment',
    references: 'AHA/ACC 2023 Secondary Prevention Guidelines',
  },
  {
    prompt: 'Predict 30-day readmission risk for Heart Failure cohort (Ward 3)',
    response:
      'RISK PROFILE CALCULATED: Overall cohort readmission risk: 8.4% (Down from 18.2% baseline). High-risk outlier identified: Bed 308 (NT-proBNP > 4,200 pg/mL, eGFR 38). Recommended intervention: Initiate remote cellular scale tracking and nurse tele-check at 48 hours post-discharge.',
    confidence: '96.4% Predictive Accuracy (AUROC 0.89)',
    references: 'Framingham Heart Study ML Risk Recalibration Model',
  },
];

export default function AIHealthcareSection() {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const activeScenario = SCENARIOS[selectedScenarioIndex];

  const handleSelectScenario = (index: number) => {
    setIsProcessing(true);
    setTimeout(() => {
      setSelectedScenarioIndex(index);
      setIsProcessing(false);
    }, 450);
  };

  return (
    <section id="ai-intelligence" className="relative py-28 bg-[#F8FAFC] dark:bg-[#071521] text-slate-900 dark:text-white overflow-hidden transition-colors">
      {/* Background Neural Grid and Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(2,132,199,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #0284C7 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0284C7]/10 dark:bg-[#18C7C9]/15 border border-[#0284C7]/25 dark:border-[#18C7C9]/30 text-[#0284C7] dark:text-[#18C7C9] text-xs font-semibold uppercase tracking-wider mb-4">
            <Brain className="w-3.5 h-3.5" />
            Clinical Artificial Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-5">
            Safe, Transparent & Explainable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0D9488] to-[#059669] dark:from-[#18C7C9] dark:via-[#1479FF] dark:to-[#20B26B]">
              Hospital Intelligence Engine
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Trained on millions of anonymized clinical interactions and FDA-cleared safety guidelines.
            MediCare AI operates strictly with human-in-the-loop oversight to eliminate diagnostic blindspots.
          </p>
        </div>

        {/* AI Interactive Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Preset Prompts & Capability Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2 font-medium">
                Select Clinical Query Simulation
              </span>

              {SCENARIOS.map((scenario, idx) => {
                const isSelected = idx === selectedScenarioIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectScenario(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#0284C7]/15 to-[#0D9488]/10 dark:from-[#18C7C9]/20 dark:to-[#1479FF]/15 border-[#0284C7] dark:border-[#18C7C9] shadow-md shadow-[#0284C7]/15'
                        : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#18C7C9] mb-1">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Prompt #{idx + 1}
                      </span>
                      {isSelected && <span className="text-[10px] text-[#20B26B] font-bold">ACTIVE</span>}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">
                      {scenario.prompt}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Guardrails Trust Box */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0B1F33] border border-slate-200 dark:border-white/10 space-y-2 text-xs shadow-sm">
              <div className="flex items-center gap-2 text-[#059669] dark:text-[#20B26B] font-bold">
                <ShieldCheck className="w-4 h-4" />
                Zero Hallucination Protocol &bull; Human-in-the-Loop
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                Every AI suggestion requires attending physician confirmation before being committed to the official medical record.
              </p>
            </div>
          </div>

          {/* Right Column: Simulated AI Clinical Agent Terminal with 3D Depth (7 cols) */}
          <ThreeDCard maxTilt={4} scale={1.01} glare={false} className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0B1F33] border border-white/15 p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden h-full">
            {/* Terminal Topbar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#18C7C9] to-[#1479FF] flex items-center justify-center text-[#071521]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">MediCare Clinical LLM Engine</div>
                  <div className="text-[10px] text-slate-400 font-mono">Model: Med-PaLM-Enterprise &bull; 99.98% SLA</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] font-mono text-[#20B26B] bg-[#20B26B]/15 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#20B26B] animate-pulse" />
                  Verified Safety Guard
                </span>
              </div>
            </div>

            {/* Prompt Display */}
            <div className="space-y-4 flex-1">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <div className="text-[10px] font-mono text-slate-400 mb-1">CLINICIAN INPUT:</div>
                <div className="font-semibold text-white">{activeScenario.prompt}</div>
              </div>

              {/* AI Synthesized Output */}
              <div className="p-5 rounded-2xl bg-[#071521] border border-[#18C7C9]/30 relative">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#18C7C9] mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    CLINICAL AI SYNTHESIS
                  </span>
                  <span className="text-[#20B26B]">{activeScenario.confidence}</span>
                </div>

                {isProcessing ? (
                  <div className="py-8 flex items-center justify-center gap-2 text-xs text-[#18C7C9] font-mono">
                    <span className="w-3 h-3 rounded-full border-2 border-[#18C7C9] border-t-transparent animate-spin" />
                    Querying Medical Knowledge Graph...
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-slate-200 leading-relaxed font-sans mb-4">
                      {activeScenario.response}
                    </p>

                    {activeScenario.warning && (
                      <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        <span>{activeScenario.warning}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>Ref: {activeScenario.references}</span>
                      <span className="text-white font-bold flex items-center gap-1 cursor-pointer hover:text-[#18C7C9]">
                        <FileText className="w-3.5 h-3.5" /> Full Audit Trail
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Scribe Indicator */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Ambient speech transcription ready (EN, ES, FR, HI, AR supported)</span>
              <span className="text-[#18C7C9] font-semibold">HIPAA Tier 4 Safe</span>
            </div>
          </div>
        </ThreeDCard>
      </div>
    </div>
  </section>
);
}
