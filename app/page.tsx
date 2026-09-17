'use client';

import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PatientReviewsHoverboards from '@/components/landing/PatientReviewsHoverboards';
import CtaSection from '@/components/landing/CtaSection';
import Footer from '@/components/landing/Footer';
import DemoModal from '@/components/landing/DemoModal';
import ThemeAndAccessibilityModal from '@/components/ui/ThemeAndAccessibilityModal';
import HospitalInteriorTechnologies from '@/components/landing/HospitalInteriorTechnologies';
import ProHealthPackagesSection from '@/components/landing/ProHealthPackagesSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ThreeDScrollNavigator from '@/components/ui/ThreeDScrollNavigator';
import AnimatedLandingBackground from '@/components/ui/AnimatedLandingBackground';

export default function MediCareLandingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white font-sans antialiased overflow-x-hidden transition-colors duration-300 relative">
      {/* Living Clinical Aurora & Precision Telemetry Background */}
      <AnimatedLandingBackground />

      {/* Dynamic Scroll Progress Bar & Floating Quick Navigator */}
      <ScrollProgress />

      {/* 3D Spatial Compass & Isometric Section Navigator */}
      <ThreeDScrollNavigator />

      {/* Global Navigation Header with Live Hospital Pulse */}
      <Navbar onOpenDemo={handleOpenDemo} />

      {/* Main Narrative Flow with Dynamic 3D Scroll-Triggered Reveal Animations */}
      <main className="relative">
        {/* 1. Hero Command Center & Live Pulse (Home) */}
        <HeroSection onOpenDemo={handleOpenDemo} />

        {/* 2. Key Healthcare Impact Metrics (About) */}
        <div id="about" className="scroll-mt-24" />
        <ScrollReveal direction="3d-rise" distance={32} delay={60}>
          <StatsSection />
        </ScrollReveal>

        {/* 2b. Smart Hospital Interiors & Advanced Deployed Technologies */}
        <ScrollReveal direction="3d-rise" distance={36} delay={60}>
          <HospitalInteriorTechnologies onOpenDemo={handleOpenDemo} />
        </ScrollReveal>

        {/* 3. Reviews & Clinical Testimonials (Our Doctors & Specialists) */}
        <ScrollReveal direction="3d-rise" distance={36} delay={60}>
          <TestimonialsSection />
        </ScrollReveal>

        {/* 5b. Verified Patient Recovery Testimonials (Interactive 3D Hoverboards) */}
        <ScrollReveal direction="3d-rise" distance={36} delay={60}>
          <PatientReviewsHoverboards />
        </ScrollReveal>

        {/* 5c. MediCare ProHealth Personalized Health Check Packages (Animated Carousel) */}
        <div id="prohealth" className="scroll-mt-24" />
        <ScrollReveal direction="3d-rise" distance={36} delay={60}>
          <ProHealthPackagesSection onOpenDemo={handleOpenDemo} />
        </ScrollReveal>

        {/* 6. High-Conversion Enterprise Demo & Sandbox CTA */}
        <ScrollReveal direction="3d-rise" distance={36} delay={60}>
          <CtaSection onOpenDemo={handleOpenDemo} />
        </ScrollReveal>
      </main>

      {/* Enterprise Footer with Live ECG & Certifications */}
      <ScrollReveal direction="3d-rise" distance={28} delay={40}>
        <Footer />
      </ScrollReveal>

      {/* Interactive Book a Demo Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />

      {/* Floating Theme & Accessibility Controls Modal */}
      <ThemeAndAccessibilityModal />
    </div>
  );
}
