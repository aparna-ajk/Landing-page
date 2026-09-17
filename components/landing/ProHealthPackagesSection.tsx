'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Home,
  CheckCircle2,
  Calendar,
  User,
  Phone,
  X,
  HeartPulse,
  Activity,
  Award,
  FileText,
  Play,
  Pause,
  Layers,
  Rotate3d,
  Zap,
  Eye,
  Info,
  Check,
  Stethoscope,
  Heart,
  Droplet,
  Flame,
  Maximize2,
} from 'lucide-react';

export interface HealthPackage {
  id: string;
  category: 'master' | 'full-body' | 'cardiac' | 'specialized';
  organFocus: 'heart' | 'body' | 'metabolism' | 'women' | 'senior' | 'diabetes';
  ribbon: string;
  ribbonBg: string;
  ribbonTextColor: string;
  ribbonColor: string;
  accentGlow: string;
  title: string;
  inclusions: string;
  detailedInclusions: {
    category: string;
    tests: string[];
  }[];
  radarScores: {
    cardiac: number;
    liver: number;
    renal: number;
    metabolic: number;
    imaging: number;
  };
  price: string;
  originalPrice?: string;
  discountBadge?: string;
  buttonBg: string;
  buttonText: string;
  buttonHover: string;
  cardAccentBorder: string;
  recommendedFor: string;
  parametersCount: number;
  fastingHours: number;
  reportTurnaround: string;
}

const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'master-health-program',
    category: 'master',
    organFocus: 'metabolism',
    ribbon: 'Master',
    ribbonBg: 'bg-[#0B5351]',
    ribbonTextColor: 'text-white',
    ribbonColor: '#0B5351',
    accentGlow: 'rgba(11, 83, 81, 0.45)',
    title: 'MediCare ProHealth Master Health Program',
    inclusions: 'Key inclusions :- Lipid, Blood Sugar, Liver, Renal, ECG, Thyroid and more',
    detailedInclusions: [
      {
        category: 'Lipid & Cardiac Profile',
        tests: ['Total Cholesterol', 'Triglycerides', 'HDL, LDL & VLDL', 'Resting 12-Lead ECG'],
      },
      {
        category: 'Metabolic & Diabetic Panel',
        tests: ['Fasting Blood Glucose', 'HbA1c Glycated Hemoglobin', 'Post-Prandial Blood Sugar'],
      },
      {
        category: 'Liver & Renal Function',
        tests: ['Bilirubin Total & Direct', 'SGOT, SGPT, Alkaline Phosphatase', 'Serum Creatinine', 'Blood Urea Nitrogen', 'Uric Acid'],
      },
      {
        category: 'Endocrine & General',
        tests: ['TSH Thyroid Hormone', 'Complete Hemogram (24 Params)', 'Urine Routine & Microscopic', 'Physician Clinical Evaluation'],
      },
    ],
    radarScores: { cardiac: 78, liver: 92, renal: 90, metabolic: 95, imaging: 65 },
    price: '₹8200/-',
    originalPrice: '₹10,500',
    discountBadge: '22% OFF',
    buttonBg: 'bg-[#E3F2F3] hover:bg-[#D1EBEF]',
    buttonText: 'text-[#0B5351]',
    buttonHover: 'hover:shadow-md hover:shadow-[#0B5351]/25',
    cardAccentBorder: 'hover:border-[#0B5351]/50',
    recommendedFor: 'Men & Women aged 25-45 for comprehensive annual baseline check',
    parametersCount: 62,
    fastingHours: 10,
    reportTurnaround: 'Same day (6 hrs)',
  },
  {
    id: 'regal-whole-body',
    category: 'full-body',
    organFocus: 'body',
    ribbon: 'Full Body',
    ribbonBg: 'bg-[#0B5351]',
    ribbonTextColor: 'text-white',
    ribbonColor: '#0B5351',
    accentGlow: 'rgba(11, 83, 81, 0.45)',
    title: 'MediCare ProHealth Regal Whole Body Program',
    inclusions: 'Key inclusions :- TMT, 2D Echo Echo, Bone health, Vitamin check, Cancer Screening',
    detailedInclusions: [
      {
        category: 'Advanced Cardiac Imaging',
        tests: ['Treadmill Stress Test (TMT)', '2D Echocardiography with Color Doppler', 'Resting ECG', 'Cardiac Risk Marker hs-CRP'],
      },
      {
        category: 'Oncology & Cancer Screening',
        tests: ['PSA (for Males) / Mammography & Pap Smear (Females)', 'Stool Occult Blood', 'Chest X-Ray Digital'],
      },
      {
        category: 'Musculoskeletal & Vitamins',
        tests: ['Vitamin D3 25-Hydroxy', 'Vitamin B12 Cyanocobalamin', 'Serum Calcium & Phosphorus', 'DEXA Bone Mineral Density Scan'],
      },
      {
        category: 'Full Abdominal & Organ Health',
        tests: ['Ultrasound Whole Abdomen & Pelvis', 'Comprehensive Kidney & Liver Profile', 'Electrolytes Panel (Na, K, Cl)'],
      },
    ],
    radarScores: { cardiac: 96, liver: 94, renal: 95, metabolic: 92, imaging: 98 },
    price: '₹16400/-',
    originalPrice: '₹22,000',
    discountBadge: '25% OFF',
    buttonBg: 'bg-[#E3F2F3] hover:bg-[#D1EBEF]',
    buttonText: 'text-[#0B5351]',
    buttonHover: 'hover:shadow-md hover:shadow-[#0B5351]/25',
    cardAccentBorder: 'hover:border-[#0B5351]/50',
    recommendedFor: 'Complete organ scan & early cancer screening for adults 35+',
    parametersCount: 94,
    fastingHours: 12,
    reportTurnaround: 'Same day (8 hrs)',
  },
  {
    id: 'cardiac-heart-program',
    category: 'cardiac',
    organFocus: 'heart',
    ribbon: 'Cardiac / Heart',
    ribbonBg: 'bg-[#D97706]',
    ribbonTextColor: 'text-white',
    ribbonColor: '#D97706',
    accentGlow: 'rgba(217, 119, 6, 0.5)',
    title: 'MediCare ProHealth Cardiac / Heart Assessment Program',
    inclusions: 'Key inclusions :- 2D Echo+TMT+Pulmonary Function+Lipid Profile+Smear (for Females), Cardiologist Consult',
    detailedInclusions: [
      {
        category: 'Comprehensive Heart Telemetry',
        tests: ['2D Echo with Doppler Hemodynamics', 'Treadmill Stress Test (TMT)', 'Pulmonary Function Test (Spirometry)', '12-Lead Digital ECG'],
      },
      {
        category: 'Vascular & Lipid Profile',
        tests: ['Apolipoprotein A1 & B', 'High-Sensitivity CRP', 'Lipoprotein (a)', 'Complete Lipid Panel'],
      },
      {
        category: 'Organ Backup & Cellular Smear',
        tests: ['Peripheral Blood Smear', 'Glycated Hemoglobin (HbA1c)', 'Serum Homocysteine', 'Renal Biomarkers'],
      },
      {
        category: 'Specialist Intervention',
        tests: ['One-on-One Cardiologist Consultation', 'Personalized Cardiovascular Risk Score Report', 'Dietary & Lifestyle Counseling'],
      },
    ],
    radarScores: { cardiac: 100, liver: 80, renal: 84, metabolic: 88, imaging: 92 },
    price: '₹13800/-',
    originalPrice: '₹18,500',
    discountBadge: 'Popular',
    buttonBg: 'bg-[#FEF3C7] hover:bg-[#FDE68A]',
    buttonText: 'text-[#92400E]',
    buttonHover: 'hover:shadow-md hover:shadow-amber-500/25',
    cardAccentBorder: 'hover:border-amber-500/50',
    recommendedFor: 'Individuals with sedentary routine, hypertension, or family history of heart disease',
    parametersCount: 54,
    fastingHours: 10,
    reportTurnaround: 'Same day (6 hrs)',
  },
  {
    id: 'womens-comprehensive',
    category: 'specialized',
    organFocus: 'women',
    ribbon: "Women's Care",
    ribbonBg: 'bg-[#BE123C]',
    ribbonTextColor: 'text-white',
    ribbonColor: '#BE123C',
    accentGlow: 'rgba(190, 18, 60, 0.45)',
    title: "MediCare ProHealth Women's Comprehensive Wellness",
    inclusions: 'Key inclusions :- Mammography / Sono-Mammogram, Pap Smear, Thyroid Profile, Bone Mineral Density, Gynecologist Consult',
    detailedInclusions: [
      {
        category: "Women's Health Screening",
        tests: ['Digital Mammography / High-Res Breast Sono', 'Cervical Pap Smear (Liquid Based Cytology)', 'Pelvic & Uterine Ultrasound'],
      },
      {
        category: 'Hormonal & Thyroid Panel',
        tests: ['Complete Thyroid Profile (Total T3, T4, TSH)', 'Serum Prolactin & LH/FSH (on request)', 'Iron Deficiency Profile (Ferritin)'],
      },
      {
        category: 'Bone & Micronutrient Vitality',
        tests: ['Bone Mineral Density (BMD Spine/Hip)', 'Vitamin D3 & Calcium', 'Vitamin B12 & Zinc'],
      },
      {
        category: 'Expert Consultation',
        tests: ['Senior Gynecologist Consultation', 'Clinical Breast Examination', 'Nutrition & Lifestyle Prescription'],
      },
    ],
    radarScores: { cardiac: 75, liver: 86, renal: 88, metabolic: 92, imaging: 96 },
    price: '₹9500/-',
    originalPrice: '₹13,200',
    discountBadge: '28% OFF',
    buttonBg: 'bg-[#FFE4E6] hover:bg-[#FECDD3]',
    buttonText: 'text-[#9F1239]',
    buttonHover: 'hover:shadow-md hover:shadow-rose-500/25',
    cardAccentBorder: 'hover:border-rose-500/50',
    recommendedFor: 'Women prioritizing breast, cervical, ovarian and bone wellness',
    parametersCount: 68,
    fastingHours: 10,
    reportTurnaround: 'Same day (8 hrs)',
  },
  {
    id: 'active-senior-living',
    category: 'specialized',
    organFocus: 'senior',
    ribbon: 'Senior Citizen',
    ribbonBg: 'bg-[#4F46E5]',
    ribbonTextColor: 'text-white',
    ribbonColor: '#4F46E5',
    accentGlow: 'rgba(79, 70, 229, 0.45)',
    title: 'MediCare ProHealth Active Senior Living Program',
    inclusions: 'Key inclusions :- Cardiac Holter, Glycated Hb, Renal Profile, Orthopedic Screen, Geriatric Specialist Review',
    detailedInclusions: [
      {
        category: 'Geriatric Vitality Panel',
        tests: ['Extended 24-Hr Ambulatory ECG Holter', 'DEXA Osteoporosis Assessment', 'Complete Neurological Reflex Check'],
      },
      {
        category: 'Renal & Fluid Balance',
        tests: ['Estimated GFR (eGFR)', 'Serum Electrolytes', 'Urinary Albumin-to-Creatinine Ratio', 'Prostate Specific Antigen (PSA)'],
      },
      {
        category: 'Metabolic & Sensory',
        tests: ['Glycated HbA1c', 'Audiometry Hearing Assessment', 'Ophthalmology Fundus Exam for Glaucoma/Cataract'],
      },
      {
        category: 'Comfort Services',
        tests: ['Complimentary Doorstep Blood Collection', 'Geriatric Physician Evaluation', 'Personal Care Concierge Assistance'],
      },
    ],
    radarScores: { cardiac: 90, liver: 88, renal: 94, metabolic: 90, imaging: 89 },
    price: '₹11200/-',
    originalPrice: '₹15,000',
    discountBadge: 'Free Home Pickup',
    buttonBg: 'bg-[#EEF2FF] hover:bg-[#E0E7FF]',
    buttonText: 'text-[#3730A3]',
    buttonHover: 'hover:shadow-md hover:shadow-indigo-500/25',
    cardAccentBorder: 'hover:border-indigo-500/50',
    recommendedFor: 'Seniors aged 60+ desiring gentle, comprehensive, and home-friendly care',
    parametersCount: 82,
    fastingHours: 10,
    reportTurnaround: 'Same day (8 hrs)',
  },
  {
    id: 'diabetes-glycemic-defense',
    category: 'specialized',
    organFocus: 'diabetes',
    ribbon: 'Diabetes Care',
    ribbonBg: 'bg-[#059669]',
    ribbonTextColor: 'text-white',
    ribbonColor: '#059669',
    accentGlow: 'rgba(5, 150, 105, 0.45)',
    title: 'MediCare ProHealth Glycemic & Metabolic Defense',
    inclusions: 'Key inclusions :- HbA1c, Fundus Eye Exam, Microalbuminuria, Neuropathy Screening, Dietitian Plan',
    detailedInclusions: [
      {
        category: 'Diabetic Complication Screen',
        tests: ['Dilated Digital Fundus Retinopathy Exam', 'Biothesiometry Vibration Perception (Neuropathy)', 'Microalbuminuria Urine Panel'],
      },
      {
        category: 'Glycemic Precision',
        tests: ['HbA1c with Estimated Average Glucose', 'Fasting & 2-Hour Post Meal Blood Glucose', 'Serum Insulin & C-Peptide'],
      },
      {
        category: 'Cardiovascular & Vascular Safety',
        tests: ['Resting ECG & Ankle-Brachial Index', 'High-Density Lipid Subfractions', 'Kidney Function Serum Creatinine'],
      },
      {
        category: 'Doctor & Nutritionist Consultation',
        tests: ['Endocrinologist / Diabetologist Review', 'Personalized Low-Glycemic Nutrition Roadmap'],
      },
    ],
    radarScores: { cardiac: 82, liver: 86, renal: 95, metabolic: 100, imaging: 75 },
    price: '₹6900/-',
    originalPrice: '₹9,400',
    discountBadge: 'Essential',
    buttonBg: 'bg-[#ECFDF5] hover:bg-[#D1FAE5]',
    buttonText: 'text-[#065F46]',
    buttonHover: 'hover:shadow-md hover:shadow-emerald-500/25',
    cardAccentBorder: 'hover:border-emerald-500/50',
    recommendedFor: 'Pre-diabetics, diagnosed diabetics, or metabolic syndrome monitoring',
    parametersCount: 52,
    fastingHours: 10,
    reportTurnaround: 'Same day (6 hrs)',
  },
];

interface ProHealthPackagesSectionProps {
  onOpenDemo?: () => void;
}

export default function ProHealthPackagesSection({ onOpenDemo }: ProHealthPackagesSectionProps) {
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'master' | 'full-body' | 'cardiac' | 'specialized'>('all');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHoveredContainer, setIsHoveredContainer] = useState(false);
  const [viewMode, setViewMode] = useState<'3d-deck' | 'grid'>('3d-deck');
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  // Active Organ Telemetry Node
  const [activeOrgan, setActiveOrgan] = useState<'heart' | 'body' | 'metabolism' | 'women' | 'senior' | 'diabetes'>('heart');

  // Interactive Modals
  const [bookingPackage, setBookingPackage] = useState<HealthPackage | null>(null);
  const [inclusionsModalPackage, setInclusionsModalPackage] = useState<HealthPackage | null>(null);

  // Booking Form State
  const [bookingStep, setBookingStep] = useState<'form' | 'success'>('form');
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingMode, setBookingMode] = useState<'home' | 'hospital'>('home');
  const [bookingReference, setBookingReference] = useState('');

  // Filtered packages
  const filteredPackages = HEALTH_PACKAGES.filter((pkg) => {
    if (selectedFilter === 'all') return true;
    return pkg.category === selectedFilter;
  });

  const totalSlides = filteredPackages.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying || isHoveredContainer || bookingPackage || inclusionsModalPackage || flippedCardId) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isHoveredContainer, bookingPackage, inclusionsModalPackage, flippedCardId, handleNext]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedFilter]);

  // Jump to package by organ focus
  const handleJumpToOrgan = (organ: 'heart' | 'body' | 'metabolism' | 'women' | 'senior' | 'diabetes') => {
    setActiveOrgan(organ);
    setSelectedFilter('all');
    const idx = HEALTH_PACKAGES.findIndex((p) => p.organFocus === organ);
    if (idx !== -1) {
      setCurrentIndex(idx);
    }
  };

  // Open booking modal
  const handleOpenBooking = (pkg: HealthPackage) => {
    setBookingPackage(pkg);
    setBookingStep('form');
    setBookingReference(`MED-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  // Submit booking
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep('success');
  };

  return (
    <section
      id="prohealth"
      className="relative py-16 md:py-24 bg-gradient-to-b from-[#F7FAFC] via-[#F1F7F9] to-white dark:from-[#071521] dark:via-[#091D2D] dark:to-[#071521] text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300"
      aria-label="MediCare ProHealth Packages"
    >
      {/* 3D Holographic Ambient Mesh Grids in Background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#0B5351_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Dynamic 3D Spatial Spheres (Atmospheric Ambient Depth) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-[#0B5351]/20 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse duration-1000" />
      <div className="absolute top-1/2 -right-32 w-[420px] h-[420px] bg-gradient-to-bl from-amber-500/15 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 left-1/3 w-80 h-80 bg-gradient-to-t from-cyan-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================= */}
        {/* COMPACT MINIMIZED STATUS BAR                              */}
        {/* ========================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-2.5 border-b border-slate-200/70 dark:border-slate-800 text-[11px] sm:text-xs">
          <div className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              124 MediCare ProHealth checks booked today
            </span>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="hidden md:inline text-slate-500 dark:text-slate-400">Next slot: 07:30 AM</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-medium">
            <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-200/80 dark:border-slate-700">
              <ShieldCheck className="w-3 h-3 text-[#0B5351] dark:text-cyan-400" />
              NABL & JCI Accredited
            </span>
            <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-200/80 dark:border-slate-700">
              <Home className="w-3 h-3 text-[#0B5351] dark:text-cyan-400" />
              Free Home Sample Pickup
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN GRID: LEFT BRAND HERO + RIGHT 3D SPATIAL DECK        */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ------------------------------------------------------- */}
          {/* LEFT COLUMN: HERO INFORMATION & 3D HOLOGRAPHIC SCANNER  */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between pr-0 lg:pr-2">
            <div>
              {/* Brand Header Logo: PRO HEALTH BY MediCare */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#0B5351] dark:text-emerald-400 font-sans flex items-center">
                    PR
                    <span className="relative inline-flex items-center justify-center">
                      O
                      {/* Stylized Leaf Icon on top of the 'O' */}
                      <svg
                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 text-emerald-500 fill-emerald-500 drop-shadow-sm"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-2.49 0-4.5-2.01-4.5-4.5 0-1.87 1.13-3.47 2.76-4.14-.17.53-.26 1.09-.26 1.64 0 2.49 2.01 4.5 4.5 4.5.55 0 1.11-.09 1.64-.26-.67 1.63-2.27 2.76-4.14 2.76z" />
                      </svg>
                    </span>
                  </span>
                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#0B5351] dark:text-emerald-400 ml-1">
                    HEALTH
                  </span>
                </div>

                {/* BY MEDICARE BADGE */}
                <div className="flex items-center gap-1.5 pl-2.5 border-l-2 border-slate-300 dark:border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">BY</span>
                  <div className="flex items-center gap-1.5">
                    <div className="relative w-6 h-6 rounded-[8px] flex items-center justify-center bg-gradient-to-tr from-[#0B1F33] via-[#123B63] to-[#1479FF] p-1 shadow-xs">
                      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-white">
                        <circle cx="16" cy="16" r="14" stroke="#18C7C9" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.5" />
                        <path d="M20 6H12C10.8954 6 10 6.89543 10 8V10H8C6.89543 10 6 10.8954 6 12V20C6 21.1046 6.89543 22 8 22H10V24C10 25.1046 10.8954 26 12 26H20C21.1046 26 22 25.1046 22 24V22H24C25.1046 22 26 21.1046 26 20V12C26 10.8954 25.1046 10 24 10H22V8C22 6.89543 21.1046 6 20 6Z" fill="currentColor" />
                        <circle cx="16" cy="16" r="2.5" fill="#18C7C9" />
                      </svg>
                    </div>
                    <span className="font-extrabold text-[#102A43] dark:text-[#F0F6FC] text-sm tracking-tight leading-none">
                      Medi<span className="text-[#1479FF] dark:text-[#36A3FF]">Care</span>
                    </span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#20B26B] animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Bold Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-[#0A2540] dark:text-white leading-[1.18] mb-4">
                You are unique, your health check <span className="text-[#0B5351] dark:text-cyan-400">should be too!</span>
              </h2>

              {/* Paragraph Description */}
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                MediCare ProHealth is the most comprehensive health check by MediCare Hospitals, offering a complete evaluation,
                risk prediction, and expert doctor guidance for long-term wellness.
              </p>

              {/* ===================================================== */}
              {/* UNIQUE 3D BIOMETRIC RADAR SCANNER ORB (Interactive)   */}
              {/* ===================================================== */}
              <div className="mb-4.5 p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-sm backdrop-blur-md relative overflow-hidden group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Rotate3d className="w-3.5 h-3.5 text-[#0B5351] dark:text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                    <span className="text-[11px] font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                      Interactive 3D Body Focus
                    </span>
                  </div>
                  <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Live
                  </span>
                </div>

                <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2">
                  Click an anatomical node to focus the 3D program:
                </p>

                {/* 3D Anatomical Focus Chips */}
                <div className="grid grid-cols-3 gap-1.5 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => handleJumpToOrgan('heart')}
                    className={`px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-1 transition-all ${
                      activeOrgan === 'heart'
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Heart</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleJumpToOrgan('body')}
                    className={`px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-1 transition-all ${
                      activeOrgan === 'body'
                        ? 'bg-[#0B5351] text-white shadow-md shadow-[#0B5351]/30 scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Full Body</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleJumpToOrgan('metabolism')}
                    className={`px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-1 transition-all ${
                      activeOrgan === 'metabolism'
                        ? 'bg-[#0B5351] text-white shadow-md shadow-[#0B5351]/30 scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <Droplet className="w-3.5 h-3.5" />
                    <span>Master</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleJumpToOrgan('women')}
                    className={`px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-1 transition-all ${
                      activeOrgan === 'women'
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-500/30 scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span>🌸 Women</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleJumpToOrgan('senior')}
                    className={`px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-1 transition-all ${
                      activeOrgan === 'senior'
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span>👴 Senior</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleJumpToOrgan('diabetes')}
                    className={`px-2.5 py-1.5 rounded-xl flex items-center justify-center gap-1 transition-all ${
                      activeOrgan === 'diabetes'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30 scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span>🩺 Diabetes</span>
                  </button>
                </div>
              </div>

              {/* Primary Call to Action Button */}
              <div className="flex flex-wrap items-center gap-3.5 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenDemo) onOpenDemo();
                    else handleOpenBooking(HEALTH_PACKAGES[0]);
                  }}
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0B5351] hover:bg-[#073B3A] text-white font-semibold text-sm sm:text-base shadow-lg shadow-[#0B5351]/25 hover:shadow-xl hover:shadow-[#0B5351]/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore All Plans</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                {/* Auto-Play Toggle */}
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-xs transition-colors"
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-emerald-500" />
                      <span>3D Auto-Glide ON</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-slate-400" />
                      <span>3D Auto-Glide PAUSED</span>
                    </>
                  )}
                </button>
              </div>

              {/* Category Filter Pills */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Filter By Category
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'All Plans', val: 'all' },
                    { label: 'Master', val: 'master' },
                    { label: 'Full Body', val: 'full-body' },
                    { label: 'Cardiac', val: 'cardiac' },
                    { label: 'Specialized', val: 'specialized' },
                  ].map((tab) => (
                    <button
                      key={tab.val}
                      type="button"
                      onClick={() => setSelectedFilter(tab.val as typeof selectedFilter)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        selectedFilter === tab.val
                          ? 'bg-[#0B5351] text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT COLUMN: 3D SPATIAL STAGE & CARDS CAROUSEL         */}
          {/* ------------------------------------------------------- */}
          <div
            className="lg:col-span-8 xl:col-span-8 relative"
            onMouseEnter={() => setIsHoveredContainer(true)}
            onMouseLeave={() => setIsHoveredContainer(false)}
          >
            {/* Top Toolbar: View Mode & Navigation Controls */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Display Perspective:</span>
                <div className="inline-flex p-0.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs">
                  <button
                    type="button"
                    onClick={() => setViewMode('3d-deck')}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      viewMode === '3d-deck'
                        ? 'bg-white dark:bg-[#0B5351] text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    3D Spatial Deck
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 rounded-md font-semibold transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-[#0B5351] text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    Matrix Grid
                  </button>
                </div>
              </div>

              {/* Navigation arrows */}
              {viewMode === '3d-deck' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white hover:scale-105 active:scale-95 transition-all duration-150"
                    aria-label="Previous health package"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white hover:scale-105 active:scale-95 transition-all duration-150"
                    aria-label="Next health package"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* In-container left floating circular arrow for direct positioning as shown in screenshot */}
            {viewMode === '3d-deck' && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="hidden xl:flex absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl items-center justify-center text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white hover:scale-110 active:scale-95 transition-all duration-150"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl items-center justify-center text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white hover:scale-110 active:scale-95 transition-all duration-150"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* ======================================================= */}
            {/* VIEW MODE 1: 3D SPATIAL DECK CAROUSEL                   */}
            {/* ======================================================= */}
            {viewMode === '3d-deck' ? (
              <div className="overflow-hidden py-6 px-1 perspective-1600">
                <div
                  className="flex transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) gap-5 sm:gap-6 transform-style-3d"
                  style={{
                    transform: `translateX(-${currentIndex * 340}px)`,
                  }}
                >
                  {filteredPackages.map((pkg, idx) => {
                    const isFlipped = flippedCardId === pkg.id;
                    const isCenter = idx === currentIndex;
                    return (
                      <Spatial3DCard
                        key={pkg.id}
                        pkg={pkg}
                        index={idx}
                        isCenter={isCenter}
                        isFlipped={isFlipped}
                        onToggleFlip={() => setFlippedCardId(isFlipped ? null : pkg.id)}
                        onBook={() => handleOpenBooking(pkg)}
                        onViewInclusions={() => setInclusionsModalPackage(pkg)}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              /* ======================================================= */
              /* VIEW MODE 2: MATRIX GRID VIEW                           */
              /* ======================================================= */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 py-4">
                {filteredPackages.map((pkg, idx) => (
                  <Spatial3DCard
                    key={pkg.id}
                    pkg={pkg}
                    index={idx}
                    isCenter={false}
                    isFlipped={flippedCardId === pkg.id}
                    onToggleFlip={() => setFlippedCardId(flippedCardId === pkg.id ? null : pkg.id)}
                    onBook={() => handleOpenBooking(pkg)}
                    onViewInclusions={() => setInclusionsModalPackage(pkg)}
                  />
                ))}
              </div>
            )}

            {/* Indicators & Active Progress */}
            <div className="flex items-center justify-between mt-4 pt-3 px-2 border-t border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                {filteredPackages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === i
                        ? 'w-8 bg-[#0B5351] dark:bg-cyan-400'
                        : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Click <span className="font-bold text-slate-800 dark:text-white">3D Flip</span> to inspect parameter telemetry</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE MODAL 1: BOOK HEALTH CHECK APPOINTMENT FLOW    */}
      {/* ========================================================= */}
      {bookingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#0E2438] rounded-3xl shadow-2xl border border-slate-200 dark:border-cyan-500/20 overflow-hidden transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Package Banner */}
            <div className={`${bookingPackage.ribbonBg} p-5 text-white flex items-center justify-between`}>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold opacity-90">MediCare ProHealth Booking</span>
                <h3 className="text-lg sm:text-xl font-bold">{bookingPackage.title}</h3>
                <span className="text-xs opacity-90 font-medium">Price: {bookingPackage.price}</span>
              </div>
              <button
                onClick={() => setBookingPackage(null)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {bookingStep === 'form' ? (
                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                      Patient Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] dark:focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                      Phone Number (For WhatsApp Reports)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] dark:focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="date"
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] dark:focus:ring-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                        Collection Mode
                      </label>
                      <select
                        value={bookingMode}
                        onChange={(e) => setBookingMode(e.target.value as 'home' | 'hospital')}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] dark:focus:ring-cyan-400"
                      >
                        <option value="home">Home Sample Pickup (Free)</option>
                        <option value="hospital">Visit MediCare Hospital / Clinic</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                      <span>Package Price:</span>
                      <span className="text-[#0B5351] dark:text-cyan-400 font-bold">{bookingPackage.price}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      * {bookingPackage.fastingHours} hours fasting required before blood sampling. Our clinical coordinator will call to confirm fasting guidelines.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#0B5351] hover:bg-[#083D3C] text-white font-bold text-sm shadow-lg shadow-[#0B5351]/25 transition-all transform hover:-translate-y-0.5"
                  >
                    Confirm & Reserve Slot
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    Health Check Slot Reserved!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-4">
                    Your appointment for <span className="font-semibold text-slate-900 dark:text-white">{bookingPackage.title}</span> is scheduled. Reference ID:{' '}
                    <span className="font-mono font-bold text-[#0B5351] dark:text-cyan-400">{bookingReference}</span>.
                  </p>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 mb-6">
                    A phlebotomist and care coordinator will call you 2 hours prior to your scheduled morning slot.
                  </div>
                  <button
                    type="button"
                    onClick={() => setBookingPackage(null)}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* INTERACTIVE MODAL 2: DETAILED TEST INCLUSIONS BREAKDOWN   */}
      {/* ========================================================= */}
      {inclusionsModalPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-[#0E2438] rounded-3xl shadow-2xl border border-slate-200 dark:border-cyan-500/20 overflow-hidden max-h-[90vh] flex flex-col transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`${inclusionsModalPackage.ribbonBg} p-5 text-white flex items-center justify-between shrink-0`}>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold opacity-90">
                  Detailed Test Breakdown • {inclusionsModalPackage.parametersCount} Parameters
                </span>
                <h3 className="text-lg sm:text-xl font-bold">{inclusionsModalPackage.title}</h3>
              </div>
              <button
                onClick={() => setInclusionsModalPackage(null)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inclusions List */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                All tests are performed on automated robotic analyzers under strict CAP and NABL quality controls at MediCare Central Diagnostic Labs.
              </p>

              {inclusionsModalPackage.detailedInclusions.map((group, gIdx) => (
                <div key={gIdx} className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2.5 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#0B5351] dark:text-cyan-400" />
                    <span>{group.category}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.tests.map((test, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{test}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div>
                <span className="text-xs text-slate-500">Package Price</span>
                <div className="text-lg font-bold text-[#0B5351] dark:text-cyan-400">{inclusionsModalPackage.price}</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setInclusionsModalPackage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const pkg = inclusionsModalPackage;
                    setInclusionsModalPackage(null);
                    handleOpenBooking(pkg);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#0B5351] text-white font-bold text-xs shadow-md hover:bg-[#073B3A] transition-colors"
                >
                  Book This Health Check
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// =========================================================================
// 3D SPATIAL CARD COMPONENT (WITH TWO-SIDED 3D FLIP & DEPTH PARALLAX)
// =========================================================================
function Spatial3DCard({
  pkg,
  index,
  isCenter,
  isFlipped,
  onToggleFlip,
  onBook,
  onViewInclusions,
}: {
  pkg: HealthPackage;
  index: number;
  isCenter: boolean;
  isFlipped: boolean;
  onToggleFlip: () => void;
  onBook: () => void;
  onViewInclusions: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tilt effect for real 3D tactile feel
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 14,
      y: x * 14,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="shrink-0 w-[300px] sm:w-[320px] md:w-[335px] select-none perspective-1200 transition-all duration-300"
      style={{
        transform: isCenter ? 'scale(1.02)' : 'scale(1.0)',
      }}
    >
      {/* 3D Rotating Wrapper */}
      <div
        className="w-full relative transform-style-3d transition-all duration-500 ease-out"
        style={{
          transform: isFlipped
            ? 'rotateY(180deg)'
            : isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-10px) translateZ(30px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ======================================================= */}
        {/* FRONT FACE OF CARD (Exact Match to Reference Screenshot) */}
        {/* ======================================================= */}
        <div
          className={`w-full rounded-2xl bg-white dark:bg-[#0C2030] border border-slate-200/90 dark:border-slate-800 shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300 relative group ${pkg.cardAccentBorder}`}
          style={{
            backfaceVisibility: 'hidden',
            boxShadow: isHovered ? `0 20px 40px -15px ${pkg.accentGlow}` : undefined,
          }}
        >
          {/* 3D Specular Sheen Glint */}
          <div
            className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none transition-opacity duration-300 z-30 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* 1. TOP HEADER RIBBON (Color matched: Master/Full Body is Dark Teal, Cardiac is Amber) */}
          <div
            className={`${pkg.ribbonBg} ${pkg.ribbonTextColor} px-4 py-1.5 font-bold text-sm sm:text-base tracking-wide flex items-center justify-between shrink-0 shadow-xs relative overflow-hidden`}
            style={{
              transform: isHovered ? 'translateZ(16px)' : 'translateZ(0px)',
              transition: 'transform 0.2s ease-out',
            }}
          >
            <span>{pkg.ribbon}</span>

            {/* Shimmer line */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine pointer-events-none" />

            <div className="flex items-center gap-1.5">
              {pkg.discountBadge && (
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-white/20 tracking-wider">
                  {pkg.discountBadge}
                </span>
              )}
              {/* 3D Flip Quick Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFlip();
                }}
                className="p-1 rounded-md bg-black/20 hover:bg-black/30 text-white transition-colors"
                title="Flip to view 3D Telemetry Radar"
              >
                <Rotate3d className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. CARD CONTENT BODY */}
          <div className="p-5 sm:p-6 flex flex-col justify-between min-h-[310px]">
            <div>
              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-3">
                {pkg.title}
              </h3>

              {/* Key Inclusions Text */}
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 min-h-[48px]">
                {pkg.inclusions}
              </div>

              {/* Inclusions Pill & Fast View */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/90 px-2.5 py-1 rounded-md">
                  <FileText className="w-3 h-3 text-[#0B5351] dark:text-cyan-400" />
                  {pkg.parametersCount} Parameters Included
                </span>

                <button
                  type="button"
                  onClick={onViewInclusions}
                  className="text-[11px] font-semibold text-[#0B5351] dark:text-cyan-400 hover:underline flex items-center gap-0.5"
                >
                  <span>View all tests</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div>
              {/* 3. PRICE TAG (With prominent blue badge styling as seen in screenshot) */}
              <div
                className="mb-4 flex items-baseline gap-2"
                style={{
                  transform: isHovered ? 'translateZ(28px)' : 'translateZ(0px)',
                  transition: 'transform 0.2s ease-out',
                }}
              >
                <div className="inline-block bg-[#1B6CA8] dark:bg-[#1E74B3] text-white px-2.5 py-1 rounded font-black text-xl sm:text-2xl tracking-tight shadow-sm">
                  {pkg.price}
                </div>
                {pkg.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {pkg.originalPrice}
                  </span>
                )}
              </div>

              {/* 4. BOTTOM ACTION BUTTON: "Book Health Check" */}
              <button
                type="button"
                onClick={onBook}
                className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-center transition-all duration-200 transform active:scale-[0.98] ${pkg.buttonBg} ${pkg.buttonText} ${pkg.buttonHover}`}
                style={{
                  transform: isHovered ? 'translateZ(18px)' : 'translateZ(0px)',
                  transition: 'transform 0.2s ease-out',
                }}
              >
                Book Health Check
              </button>
            </div>
          </div>

          {/* Under-card 3D Thruster Glow Bar */}
          <div
            className="h-1 w-full transition-opacity duration-300"
            style={{
              backgroundColor: pkg.ribbonColor,
              opacity: isHovered ? 1 : 0.4,
            }}
          />
        </div>

        {/* ======================================================= */}
        {/* BACK FACE OF CARD (3D BIOMETRIC RADAR TELEMETRY)        */}
        {/* ======================================================= */}
        <div
          className="w-full absolute inset-0 rounded-2xl bg-[#0B1B2B] text-white border border-cyan-500/30 shadow-2xl p-5 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs">
                <Activity className="w-4 h-4" />
                <span>3D Diagnostic Telemetry</span>
              </div>
              <button
                type="button"
                onClick={onToggleFlip}
                className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md"
              >
                <span>Flip Front</span>
                <Rotate3d className="w-3 h-3" />
              </button>
            </div>

            <h4 className="font-bold text-sm text-white mb-2">{pkg.title}</h4>

            {/* Biometric Scores Bars */}
            <div className="space-y-2 text-[11px] mb-4">
              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>Cardiovascular Shield</span>
                  <span className="font-mono text-cyan-400">{pkg.radarScores.cardiac}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${pkg.radarScores.cardiac}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>Metabolic & Glycemic</span>
                  <span className="font-mono text-emerald-400">{pkg.radarScores.metabolic}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pkg.radarScores.metabolic}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>Renal & Hepatic Panel</span>
                  <span className="font-mono text-amber-400">{pkg.radarScores.renal}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pkg.radarScores.renal}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>Imaging & Diagnostics</span>
                  <span className="font-mono text-rose-400">{pkg.radarScores.imaging}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-400 rounded-full" style={{ width: `${pkg.radarScores.imaging}%` }} />
                </div>
              </div>
            </div>

            {/* Fasting & Turnaround specs */}
            <div className="grid grid-cols-2 gap-2 text-[10px] bg-white/5 p-2.5 rounded-xl mb-3">
              <div>
                <span className="text-slate-400 block">Fasting:</span>
                <span className="font-bold text-white">{pkg.fastingHours} hrs water-only</span>
              </div>
              <div>
                <span className="text-slate-400 block">Reports:</span>
                <span className="font-bold text-emerald-400">{pkg.reportTurnaround}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={onBook}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all text-center"
            >
              Book Now • {pkg.price}
            </button>
            <button
              type="button"
              onClick={onViewInclusions}
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-all text-center"
            >
              Full Test Specs ({pkg.parametersCount} Tests)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
