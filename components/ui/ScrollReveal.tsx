'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in ms
  direction?: '3d-rise' | '3d-flip' | '3d-tilt' | 'up' | 'down' | 'left' | 'right' | 'zoom' | 'none';
  distance?: number;
  duration?: number;
  threshold?: number;
  enableContinuousTilt?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = '3d-rise',
  distance = 36,
  duration = 750,
  threshold = 0.05,
  enableContinuousTilt = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollTiltX, setScrollTiltX] = useState(0);
  const [scrollTranslateZ, setScrollTranslateZ] = useState(0);
  const domRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // Continuous scroll-driven 3D perspective tracking
  useEffect(() => {
    if (!enableContinuousTilt) return;

    const handleScroll = () => {
      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const el = domRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;

        // Calculate continuous 3D tilt when element is near or within viewport
        if (rect.bottom >= -80 && rect.top <= vh + 80) {
          const elemCenter = rect.top + rect.height / 2;
          const delta = (elemCenter - vh / 2) / (vh / 2);
          const clamped = Math.max(-1, Math.min(1, delta));

          // Subtle dynamic tilt: ±3.2 degrees of natural 3D perspective curvature
          const tiltX = clamped * 3.2;
          const depthZ = -Math.abs(clamped) * 16;

          setScrollTiltX(tiltX);
          setScrollTranslateZ(depthZ);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [enableContinuousTilt]);

  const getInitialTransform = () => {
    switch (direction) {
      case '3d-rise':
        return `perspective(1400px) rotateX(12deg) translateY(${distance}px) translateZ(-40px) scale(0.96)`;
      case '3d-flip':
        return `perspective(1400px) rotateY(-14deg) translateX(${distance}px) translateZ(-50px) scale(0.95)`;
      case '3d-tilt':
        return `perspective(1400px) rotateX(-10deg) rotateY(6deg) translateY(${distance}px) translateZ(-30px) scale(0.97)`;
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      case 'zoom':
        return 'scale(0.92) translateZ(-60px)';
      case 'none':
      default:
        return 'none';
    }
  };

  const currentTransform = isVisible
    ? `perspective(1400px) rotateX(${scrollTiltX.toFixed(2)}deg) rotateY(0deg) translateZ(${scrollTranslateZ.toFixed(1)}px) translateY(0) scale(1)`
    : getInitialTransform();

  return (
    <div
      ref={domRef}
      style={{
        transform: currentTransform,
        opacity: isVisible ? 1 : 0,
        transformStyle: 'preserve-3d',
        transition: isVisible
          ? 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.1, 0.9, 0.2, 1)'
          : `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
