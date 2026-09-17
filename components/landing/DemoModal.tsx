'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Calendar, Building2, User, Mail, Phone } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hospital: '',
    beds: '100-300',
    role: 'Hospital Administrator',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071521]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E2438] border border-slate-200 dark:border-cyan-500/20 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#102A43] dark:text-white">
              Demo Request Scheduled!
            </h3>
            <p className="text-xs sm:text-sm text-[#627D98] dark:text-[#9FB3C8] mt-2 max-w-sm">
              Our clinical solutions architect will contact you within 2 business hours with your personalized command-center workspace.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1479FF]/10 text-[#1479FF] dark:text-[#36A3FF] text-[11px] font-bold uppercase tracking-wider mb-2">
                <Calendar size={12} />
                <span>Live Hospital Walkthrough</span>
              </div>
              <h3 className="text-2xl font-black text-[#102A43] dark:text-white tracking-tight">
                Schedule a MediCare HMS Demo
              </h3>
              <p className="text-xs sm:text-sm text-[#627D98] dark:text-[#9FB3C8] mt-1">
                Experience how 16 integrated departments transform clinical workflows and hospital revenue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] dark:text-white mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Michael Vance"
                      className="w-full h-11 pl-9 pr-3 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#102A43] border border-slate-200 dark:border-slate-700 text-[#102A43] dark:text-white focus:outline-none focus:border-[#1479FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] dark:text-white mb-1">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="mvance@hospital.org"
                      className="w-full h-11 pl-9 pr-3 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#102A43] border border-slate-200 dark:border-slate-700 text-[#102A43] dark:text-white focus:outline-none focus:border-[#1479FF]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] dark:text-white mb-1">
                    Hospital / Health System
                  </label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.hospital}
                      onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                      placeholder="St. Jude Medical Center"
                      className="w-full h-11 pl-9 pr-3 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#102A43] border border-slate-200 dark:border-slate-700 text-[#102A43] dark:text-white focus:outline-none focus:border-[#1479FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] dark:text-white mb-1">
                    Direct Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 382-9011"
                      className="w-full h-11 pl-9 pr-3 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#102A43] border border-slate-200 dark:border-slate-700 text-[#102A43] dark:text-white focus:outline-none focus:border-[#1479FF]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] dark:text-white mb-1">
                    Bed Capacity
                  </label>
                  <select
                    value={formData.beds}
                    onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                    className="w-full h-11 px-3 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#102A43] border border-slate-200 dark:border-slate-700 text-[#102A43] dark:text-white focus:outline-none focus:border-[#1479FF]"
                  >
                    <option value="under-100">Under 100 Beds</option>
                    <option value="100-300">100 - 300 Beds</option>
                    <option value="300-750">300 - 750 Beds</option>
                    <option value="750+">750+ Beds (Multi-Facility)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102A43] dark:text-white mb-1">
                    Your Primary Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full h-11 px-3 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#102A43] border border-slate-200 dark:border-slate-700 text-[#102A43] dark:text-white focus:outline-none focus:border-[#1479FF]"
                  >
                    <option value="Chief Medical Officer">Chief Medical Officer (CMO)</option>
                    <option value="Hospital Administrator">Hospital Administrator</option>
                    <option value="CIO / IT Director">CIO / IT Director</option>
                    <option value="Head of Nursing / Triage">Head of Nursing / Triage</option>
                    <option value="Operations / Finance">Operations / Finance</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 mt-2 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#1479FF] to-[#18C7C9] hover:shadow-lg hover:shadow-[#1479FF]/25 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                Confirm Guided Demo Request →
              </button>

              <p className="text-[11px] text-center text-slate-400">
                🔒 Protected under HIPAA Non-Disclosure. No commitment required.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default DemoModal;
