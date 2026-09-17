/**
 * HSM HEALTH-TECH SAAS COMMAND CENTER — MAIN JAVASCRIPT
 * Interactive telemetry, neural animations, ecosystem graph, role switcher & modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initCounters();
  initEcosystemDiagram();
  initModulesCarousel();
  initDashboardCockpit();
  initAiNeuralCanvas();
  initWorkflowTimeline();
  initRoleTabs();
  initModals();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. Header Scroll & Mobile Navigation
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Header Blur on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    highlightCurrentSection();
  }, { passive: true });

  // Mobile Drawer Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // ScrollSpy Active Link Tracker
  function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. Animated Statistics Counters
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = counter.getAttribute('data-format') === 'decimal';
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeProgress;

            if (isDecimal) {
              counter.textContent = currentVal.toFixed(1);
            } else {
              counter.textContent = Math.floor(currentVal);
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = isDecimal ? target.toFixed(1) : target;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   3. "The Hospital, Reimagined" Ecosystem Diagram
   -------------------------------------------------------------------------- */
function initEcosystemDiagram() {
  const satelliteNodes = document.querySelectorAll('.eco-satellite-node');
  const ecoLines = document.querySelectorAll('.eco-line');
  const coreHub = document.getElementById('ecoCoreHub');

  satelliteNodes.forEach(node => {
    const targetId = node.getAttribute('data-target');

    node.addEventListener('mouseenter', () => {
      node.classList.add('hovered');
      coreHub?.classList.add('active-connection');

      ecoLines.forEach(line => {
        if (line.getAttribute('data-connection') === targetId) {
          line.classList.add('active');
        } else {
          line.style.opacity = '0.15';
        }
      });
    });

    node.addEventListener('mouseleave', () => {
      node.classList.remove('hovered');
      coreHub?.classList.remove('active-connection');

      ecoLines.forEach(line => {
        line.classList.remove('active');
        line.style.opacity = '1';
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Platform Modules Horizontal Scrolling Showcase
   -------------------------------------------------------------------------- */
function initModulesCarousel() {
  const track = document.getElementById('modulesTrack');
  const prevBtn = document.getElementById('modulesPrevBtn');
  const nextBtn = document.getElementById('modulesNextBtn');

  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = 400;

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  // Touch drag support
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => { isDown = false; });
  track.addEventListener('mouseup', () => { isDown = false; });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Real-Time Command Dashboard Cockpit
   -------------------------------------------------------------------------- */
function initDashboardCockpit() {
  const timeBtns = document.querySelectorAll('.time-btn');
  const chartArea = document.getElementById('revenueChartArea');
  const chartLine = document.getElementById('revenueChartLine');
  const revenueVal = document.getElementById('cockpitRevenueVal');

  // SVG Paths for 7d, 30d, 90d timeframes
  const chartPaths = {
    '7d': {
      line: 'M0,130 C120,110 240,60 360,85 C480,110 600,30 720,40',
      area: 'M0,130 C120,110 240,60 360,85 C480,110 600,30 720,40 L720,200 L0,200 Z',
      revenue: '₹18.4L'
    },
    '30d': {
      line: 'M0,160 C120,130 240,90 360,70 C480,50 600,60 720,20',
      area: 'M0,160 C120,130 240,90 360,70 C480,50 600,60 720,20 L720,200 L0,200 Z',
      revenue: '₹84.2L'
    },
    '90d': {
      line: 'M0,180 C120,140 240,110 360,95 C480,60 600,35 720,15',
      area: 'M0,180 C120,140 240,110 360,95 C480,60 600,35 720,15 L720,200 L0,200 Z',
      revenue: '₹246.5L'
    }
  };

  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const period = btn.getAttribute('data-time');
      const data = chartPaths[period];
      if (data && chartArea && chartLine && revenueVal) {
        chartLine.setAttribute('d', data.line);
        chartArea.setAttribute('d', data.area);
        revenueVal.textContent = data.revenue;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. AI Neural Network Canvas Particle Animation
   -------------------------------------------------------------------------- */
function initAiNeuralCanvas() {
  const canvas = document.getElementById('aiNeuralCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 42;

  function resizeCanvas() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2.5 + 1.5;
      this.color = Math.random() > 0.4 ? '#00f2fe' : '#a78bfa';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting synapses
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.35 * (1 - dist / 110)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   7. Patient Journey Workflow (Horizontal Animated Timeline)
   -------------------------------------------------------------------------- */
function initWorkflowTimeline() {
  const steps = document.querySelectorAll('.workflow-step-node');
  const pipeProgress = document.getElementById('workflowProgress');

  steps.forEach((step, index) => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      const progressPercent = ((index) / (steps.length - 1)) * 100;
      if (pipeProgress) {
        pipeProgress.style.width = `${progressPercent}%`;
      }
    });
  });

  // Activate first step initially
  if (steps.length > 0) {
    steps[0].classList.add('active');
  }
}

/* --------------------------------------------------------------------------
   8. Interactive Role-Based Experience (10 Roles)
   -------------------------------------------------------------------------- */
function initRoleTabs() {
  const roleTabs = document.querySelectorAll('.role-tab-btn');
  const roleHeading = document.getElementById('roleHeading');
  const roleDesc = document.getElementById('roleDesc');
  const roleFeaturesList = document.getElementById('roleFeaturesList');
  const roleLaunchBtn = document.getElementById('roleLaunchBtn');
  const roleMockupContent = document.getElementById('roleMockupContent');

  // Role Configuration Dictionary
  const rolesData = {
    'superadmin': {
      title: 'Multi-Hospital Super Admin Console',
      desc: 'Central command authority overseeing multiple hospitals, medical licenses, enterprise billing agreements, and global compliance audit logs.',
      features: [
        'Multi-facility tenancy & hospital branch management',
        'Global role permission hierarchy & RBAC security',
        'Consolidated group financial reporting & license tracking',
        'System-wide audit trail logs & HIPAA telemetry'
      ],
      link: 'super-admin-portal.html',
      badge: 'Level 1 Authority',
      mockupStat: '12 Connected Hospitals | 99.99% Group Uptime'
    },
    'admin': {
      title: 'Hospital Operations Administrator',
      desc: 'Orchestrate hospital throughput, emergency triage surges, ICU and bed inventory, physician rosters, and cross-departmental operations.',
      features: [
        'Live bed & ward occupancy allocation dashboard',
        'Staff scheduling, shift rosters, and attendance sync',
        'Real-time outpatient (OPD) & inpatient (IPD) flow control',
        'Department revenue analytics and inventory tracking'
      ],
      link: 'admin-portal.html',
      badge: 'Operations Hub',
      mockupStat: '248 / 300 Beds Occupied | 32 Admissions Today'
    },
    'doctor': {
      title: 'Physician & Clinical Specialist Suite',
      desc: 'Streamlined doctor workstation providing rapid access to longitudinal EHR, ICD-10 notes, digital e-prescriptions, and PACS imaging.',
      features: [
        'One-click patient medical record & allergy history',
        'ICD-10 clinical notes & voice dictation templates',
        'Instant digital prescription (e-Rx) to dispensary',
        'Lab & radiology test orders with abnormal value alerts'
      ],
      link: 'admin-portal.html#doctor-consult',
      badge: 'Clinical Workstation',
      mockupStat: '24 Scheduled Consultations | 4 Pending Lab Reviews'
    },
    'nurse': {
      title: 'Triage & Nursing Care Station',
      desc: 'Bedside digital charting, medication administration tracking, vital sign monitoring, and urgent doctor dispatch triggers.',
      features: [
        'Automated vitals charting with early-warning scores (EWS)',
        'Barcoded medication administration record (eMAR)',
        'Dietary instructions & doctor order execution',
        'Rapid bed handover & shift transfer notes'
      ],
      link: 'admin-portal.html#triage',
      badge: 'Nursing Care',
      mockupStat: 'Ward 4B Active | 16 Patients Under Monitoring'
    },
    'lab': {
      title: 'Laboratory Information System (LIS)',
      desc: 'End-to-end pathology workflow covering automated barcoded tube tracking, analyzer interfacing, quality control, and instant PDF result delivery.',
      features: [
        'Barcode-driven sample accessioning & tracking',
        'Direct bidirectional lab analyzer interface',
        'Critical alert flags for abnormal lab test values',
        'One-click digital signature & patient portal dispatch'
      ],
      link: 'admin-portal.html#lab-test-master',
      badge: 'Pathology & LIS',
      mockupStat: '184 Samples Processed | 6 Urgent Troponin Tests'
    },
    'radiology': {
      title: 'Radiology & Cloud PACS Suite',
      desc: 'Zero-footprint web DICOM viewer, multi-modality worklist (CT, MRI, X-Ray), structured reporting templates, and cloud study archive.',
      features: [
        'Integrated web DICOM viewer with 3D reconstruction',
        'Modality Worklist (MWL) integration with imaging devices',
        'Standardized structured radiology reporting templates',
        'Instant clinician notification for acute findings'
      ],
      link: 'admin-portal.html#radiology',
      badge: 'Imaging & PACS',
      mockupStat: '42 Studies Acquired | 8 Pending Radiologist Sign-off'
    },
    'pharmacy': {
      title: 'Pharmacy & Dispensary POS',
      desc: 'Automated prescription fulfillment, barcode dispensing, batch expiration warnings, reorder thresholds, and point-of-sale billing.',
      features: [
        'Direct electronic e-Rx ingestion from consulting doctors',
        'Automated drug-drug interaction & allergy safeguards',
        'Batch tracking, expiry warnings, and supplier reordering',
        'Barcode POS checkout with integrated insurance billing'
      ],
      link: 'pharmacist-portal.html',
      badge: 'Dispensary POS',
      mockupStat: '142 Prescriptions Dispensed | Zero Inventory Discrepancy'
    },
    'billing': {
      title: 'Billing, Invoicing & Revenue Operations',
      desc: 'Comprehensive revenue cycle engine automating OPD consultation fees, surgical package calculations, and electronic invoice generation.',
      features: [
        'Unified OPD, IPD, and emergency invoice generator',
        'Automated surgical & consumable package tariff mapping',
        'Digital payments (Cards, UPI, Bank Transfer, Stripe)',
        'Real-time accounts receivable & daily collection audits'
      ],
      link: 'admin-portal.html#billing-invoice',
      badge: 'Revenue Velocity',
      mockupStat: '₹14.8L Daily Collection | 99.2% Settlement Rate'
    },
    'insurance': {
      title: 'Insurance & TPA Claims Management',
      desc: 'Seamless health insurance pre-authorization, cashless claim submission, query resolution, and settlement tracking.',
      features: [
        'Automated digital TPA eligibility verification',
        'Fast-track cashless pre-authorization submission',
        'Real-time claim status & query response management',
        'Settlement reconciliation with minimal denial rates'
      ],
      link: 'admin-portal.html#insurance-tpa',
      badge: 'Claims Engine',
      mockupStat: '97.8% First-Pass Clean Claims | 18 Approved Today'
    },
    'patient': {
      title: 'Patient & Family Health Portal',
      desc: 'Empowering patients with online appointment scheduling, remote teleconsultations, digital lab downloads, and transparent billing receipts.',
      features: [
        'Self-service doctor appointment booking & calendar sync',
        'Secure 24/7 access to lab results & radiology reports',
        'Telehealth video consultations & digital prescriptions',
        'Direct bill payment & insurance claim tracking'
      ],
      link: 'patient-portal.html',
      badge: 'Patient Experience',
      mockupStat: '4.9/5 Patient Satisfaction | Instant Report Download'
    }
  };

  roleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      roleTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const roleKey = tab.getAttribute('data-role');
      const data = rolesData[roleKey];
      if (!data) return;

      if (roleHeading) roleHeading.textContent = data.title;
      if (roleDesc) roleDesc.textContent = data.desc;
      if (roleLaunchBtn) {
        roleLaunchBtn.setAttribute('href', data.link);
        roleLaunchBtn.innerHTML = `Launch ${tab.textContent} Workspace &rarr;`;
      }

      if (roleFeaturesList) {
        roleFeaturesList.innerHTML = data.features.map(f => `
          <div class="role-feature-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>${f}</span>
          </div>
        `).join('');
      }

      if (roleMockupContent) {
        roleMockupContent.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="console-status-pill"><span class="pulse-dot"></span> ${data.badge}</span>
            <span style="font-size: 0.75rem; color: var(--cyan-primary); font-family: 'JetBrains Mono', monospace;">LIVE DATA FEED</span>
          </div>
          <div style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; font-family: 'JetBrains Mono', monospace;">
            ${data.mockupStat}
          </div>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
            Directly connected to the enterprise medical data pipeline with AES-256 encryption.
          </p>
          <a href="${data.link}" class="btn btn-primary btn-sm" style="width: 100%;">
            Open ${tab.textContent} Interface
          </a>
        `;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Interactive Modals (Request Demo & Login)
   -------------------------------------------------------------------------- */
function initModals() {
  const demoModal = document.getElementById('demoModal');
  const loginModal = document.getElementById('loginModal');
  const demoOpenBtns = document.querySelectorAll('.btn-open-demo');
  const loginOpenBtns = document.querySelectorAll('.btn-open-login');
  const closeBtns = document.querySelectorAll('.modal-close-btn');
  const demoForm = document.getElementById('demoForm');
  const loginForm = document.getElementById('loginForm');

  // Open Demo Modal
  demoOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      demoModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Open Login Modal
  loginOpenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      loginModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Modals
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      demoModal?.classList.remove('active');
      loginModal?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close on backdrop click
  [demoModal, loginModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      demoModal?.classList.remove('active');
      loginModal?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Demo Form Submit
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      demoModal?.classList.remove('active');
      document.body.style.overflow = '';
      showToast('Demo scheduled successfully! Our enterprise healthcare specialist will contact you.');
      demoForm.reset();
    });
  }

  // Login Form Submit with Role Redirection
  if (loginForm) {
    const rolePills = document.querySelectorAll('.modal-role-pill');
    let selectedPortal = 'doctor';

    rolePills.forEach(pill => {
      pill.addEventListener('click', () => {
        rolePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedPortal = pill.getAttribute('data-role');
      });
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginModal?.classList.remove('active');
      document.body.style.overflow = '';

      showToast(`Authenticated as ${selectedPortal.toUpperCase()}. Redirecting to portal...`);

      setTimeout(() => {
        if (selectedPortal === 'superadmin') {
          window.location.href = 'super-admin-portal.html';
        } else if (selectedPortal === 'admin') {
          window.location.href = 'admin-portal.html';
        } else if (selectedPortal === 'pharmacist') {
          window.location.href = 'pharmacist-portal.html';
        } else if (selectedPortal === 'patient') {
          window.location.href = 'patient-portal.html';
        } else {
          window.location.href = 'admin-portal.html';
        }
      }, 1000);
    });
  }
}

/* --------------------------------------------------------------------------
   10. Floating Utilities (Toast & Back to Top)
   -------------------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4000);
}

function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
