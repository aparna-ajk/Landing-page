'use client';

import React, { useState } from 'react';
import { PasswordInput } from './PasswordInput';
import { GoogleWorkspaceButton } from './GoogleWorkspaceButton';
import { QuickDemoAccess } from './QuickDemoAccess';
import { DemoRoleType } from './DemoRoleCard';
import { SupportedLanguage } from '../ui/LanguageSelector';

interface LoginFormProps {
  className?: string;
  language?: SupportedLanguage;
}

export const I18N_DICTIONARY: Record<SupportedLanguage, {
  welcome: string;
  welcomeSubtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailRequired: string;
  emailInvalid: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  passwordRequired: string;
  passwordMinLength: string;
  rememberMe: string;
  forgotPassword: string;
  signInBtn: string;
  signingIn: string;
  orDivider: string;
  googleBtn: string;
  noAccount: string;
  createAccount: string;
  demoTitle: string;
  demoSubtitle: string;
  securityText: string;
  copyright: string;
}> = {
  en: {
    welcome: 'Welcome Back',
    welcomeSubtitle: 'Sign in to securely access your hospital dashboard.',
    emailLabel: 'Work Email Address',
    emailPlaceholder: 'you@hospital.com',
    emailRequired: 'Please enter your work email.',
    emailInvalid: 'Please enter a valid email address.',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    passwordRequired: 'Please enter your password.',
    passwordMinLength: 'Password must be at least 6 characters.',
    rememberMe: 'Keep me signed in',
    forgotPassword: 'Forgot Password?',
    signInBtn: 'Sign In to Dashboard',
    signingIn: 'Signing you in...',
    orDivider: 'or continue with',
    googleBtn: 'Continue with Google Workspace',
    noAccount: "Don't have an account?",
    createAccount: 'Create Account',
    demoTitle: 'Quick Demo Access',
    demoSubtitle: 'Explore MediCare using a predefined role.',
    securityText: '🔒 Secure • HIPAA-ready architecture • Enterprise-grade access',
    copyright: '© 2026 MediCare Health Systems',
  },
  hi: {
    welcome: 'वापसी पर स्वागत है',
    welcomeSubtitle: 'अपने अस्पताल डैशबोर्ड तक सुरक्षित रूप से पहुंचने के लिए साइन इन करें।',
    emailLabel: 'कार्य ईमेल पता',
    emailPlaceholder: 'you@hospital.com',
    emailRequired: 'कृपया अपना कार्य ईमेल दर्ज करें।',
    emailInvalid: 'कृपया एक मान्य ईमेल दर्ज करें।',
    passwordLabel: 'पासवर्ड',
    passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    passwordRequired: 'कृपया अपना पासवर्ड दर्ज करें।',
    passwordMinLength: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।',
    rememberMe: 'मुझे साइन इन रखें',
    forgotPassword: 'पासवर्ड भूल गए?',
    signInBtn: 'डैशबोर्ड में साइन इन करें',
    signingIn: 'साइन इन हो रहा है...',
    orDivider: 'या इसके साथ जारी रखें',
    googleBtn: 'Google Workspace के साथ जारी रखें',
    noAccount: 'खाता नहीं है?',
    createAccount: 'खाता बनाएं',
    demoTitle: 'त्वरित डेमो पहुंच',
    demoSubtitle: 'पूर्वनिर्धारित भूमिका का उपयोग करके MediCare देखें।',
    securityText: '🔒 सुरक्षित • HIPAA-अनुकूल आर्किटेक्चर • उद्यम-स्तरीय पहुंच',
    copyright: '© 2026 MediCare Health Systems',
  },
  te: {
    welcome: 'మళ్ళీ స్వాగతం',
    welcomeSubtitle: 'మీ ఆసుపత్రి డ్యాష్‌బోర్డ్‌ను సురక్షితంగా యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి.',
    emailLabel: 'పని ఇమెయిల్ చిరునామా',
    emailPlaceholder: 'you@hospital.com',
    emailRequired: 'దయచేసి మీ పని ఇమెయిల్‌ను నమోదు చేయండి.',
    emailInvalid: 'దయచేసి సరైన ఇమెయిల్‌ను నమోదు చేయండి.',
    passwordLabel: 'పాస్‌వర్డ్',
    passwordPlaceholder: 'మీ పాస్‌వర్డ్‌ను నమోదు చేయండి',
    passwordRequired: 'దయచేసి మీ పాస్‌వర్డ్‌ను నమోదు చేయండి.',
    passwordMinLength: 'పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి.',
    rememberMe: 'నన్ను సైన్ ఇన్ చేసి ఉంచండి',
    forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    signInBtn: 'డ్యాష్‌బోర్డ్‌కు సైన్ ఇన్ చేయండి',
    signingIn: 'సైన్ ఇన్ అవుతోంది...',
    orDivider: 'లేదా కొనసాగించండి',
    googleBtn: 'Google Workspace తో కొనసాగించండి',
    noAccount: 'ఖాతా లేదా?',
    createAccount: 'ఖాతాను సృష్టించండి',
    demoTitle: 'త్వరిత డెమో యాక్సెస్',
    demoSubtitle: 'ముందుగా నిర్వచించిన పాత్రను ఉపయోగించి MediCareని అన్వేషించండి.',
    securityText: '🔒 సురక్షితం • HIPAA-సిద్ధ ఆర్కిటెక్చర్ • ఎంటర్‌ప్రైజ్-స్థాయి యాక్సెస్',
    copyright: '© 2026 MediCare Health Systems',
  },
};

export const LoginForm: React.FC<LoginFormProps> = ({
  className = '',
  language = 'en',
}) => {
  const [email, setEmail] = useState('dr.smith@medicare-health.org');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<DemoRoleType | null>('doctor');
  const [loadingRole, setLoadingRole] = useState<DemoRoleType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validation States
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  // Status message
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  const t = I18N_DICTIONARY[language] || I18N_DICTIONARY.en;

  // Validate Email
  const validateEmail = (val: string): boolean => {
    if (!val.trim()) {
      setEmailError(t.emailRequired);
      setIsEmailValid(false);
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) {
      setEmailError(t.emailInvalid);
      setIsEmailValid(false);
      return false;
    }
    setEmailError(null);
    setIsEmailValid(true);
    return true;
  };

  // Validate Password
  const validatePassword = (val: string): boolean => {
    if (!val || val.length === 0) {
      setPasswordError(t.passwordRequired);
      return false;
    }
    if (val.length < 6) {
      setPasswordError(t.passwordMinLength);
      return false;
    }
    setPasswordError(null);
    return true;
  };

  // Quick Demo Access Selection
  const handleSelectDemoRole = (role: DemoRoleType, demoEmail: string) => {
    setLoadingRole(role);
    setTimeout(() => {
      setSelectedRole(role);
      setEmail(demoEmail);
      setPassword('••••••••••••');
      setEmailError(null);
      setPasswordError(null);
      setIsEmailValid(true);
      setLoadingRole(null);
      setStatusMessage({
        type: 'info',
        text: `Loaded ${role.toUpperCase()} credentials into hospital gateway.`,
      });
    }, 250);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailOk = validateEmail(email);
    const passOk = validatePassword(password);

    if (!emailOk || !passOk) {
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    // Simulate enterprise authentication
    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage({
        type: 'success',
        text: 'Authentication successful. Redirecting to clinical workspace...',
      });

      setTimeout(() => {
        if (selectedRole === 'admin') {
          window.location.href = '/super-admin-portal.html';
        } else if (selectedRole === 'nurse') {
          window.location.href = '/admin-portal.html#triage';
        } else if (selectedRole === 'staff') {
          window.location.href = '/pharmacist-portal.html';
        } else {
          window.location.href = '/admin-portal.html#doctor-consult';
        }
      }, 600);
    }, 1100);
  };

  return (
    <div
      className={`w-full max-w-[460px] mx-auto rounded-3xl p-5 sm:p-7 backdrop-blur-2xl transition-all duration-300
        bg-white/95 dark:bg-[#0E2438]/95
        border border-slate-200/80 dark:border-slate-800
        shadow-card dark:shadow-dark-glow ${className}`}
    >
      {/* --------------------------------------------------------------------
          8. LOGIN HEADER
          Welcome Back + decorative pulse indicator
          -------------------------------------------------------------------- */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl sm:text-[28px] font-black text-[#102A43] dark:text-white tracking-tight leading-tight">
            {t.welcome}
          </h2>
          {/* Small decorative healthcare pulse indicator */}
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EAF4FF] dark:bg-[#1479FF]/15 text-[#1479FF] dark:text-[#36A3FF] text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#20B26B] animate-pulse" />
            <span>Secure</span>
          </div>
        </div>
        <p className="text-xs sm:text-[13px] text-[#627D98] dark:text-[#9FB3C8] font-medium">
          {t.welcomeSubtitle}
        </p>
      </div>

      {/* Status Alert Banner */}
      {statusMessage && (
        <div
          role="status"
          className={`mb-3.5 p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200
            ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-[#20B26B]'
                : statusMessage.type === 'info'
                ? 'bg-blue-500/10 border border-blue-500/30 text-[#1479FF] dark:text-[#36A3FF]'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-600'
            }`}
        >
          <span>{statusMessage.type === 'success' ? '✓' : statusMessage.type === 'info' ? 'ℹ️' : '⚠️'}</span>
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* --------------------------------------------------------------------
          AUTHENTICATION FORM
          -------------------------------------------------------------------- */}
      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        {/* 9. Work Email Address */}
        <div>
          <label
            htmlFor="workEmail"
            className="block text-xs font-bold text-[#102A43] dark:text-[#F0F6FC] tracking-wide mb-1.5"
          >
            {t.emailLabel}
          </label>
          <div className="relative group">
            {/* Email Icon Inside Input */}
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#627D98] group-focus-within:text-[#1479FF] dark:group-focus-within:text-[#36A3FF] transition-colors duration-200">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>

            {/* Input: 52px height, 12px rounded, white background, smooth focus */}
            <input
              id="workEmail"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
              }}
              onBlur={() => validateEmail(email)}
              placeholder={t.emailPlaceholder}
              aria-invalid={!!emailError}
              className={`w-full h-[52px] pl-10 pr-10 rounded-[12px] text-sm font-medium transition-all duration-200
                bg-white dark:bg-[#102A43]
                text-[#102A43] dark:text-[#F0F6FC]
                placeholder:text-[#627D98]/60 dark:placeholder:text-[#9FB3C8]/60
                focus:outline-none focus:ring-4
                ${
                  emailError
                    ? 'border border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/15'
                    : 'border border-slate-200 dark:border-slate-700 focus:border-[#1479FF] focus:ring-[#1479FF]/15 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
            />

            {/* Green Check Icon for Valid Email */}
            {isEmailValid && email.length > 5 && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#20B26B]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </div>
          {/* Red Message for Invalid Email */}
          {emailError && (
            <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
              <span>⚠️</span>
              <span>{emailError}</span>
            </p>
          )}
        </div>

        {/* 10. Password Field with Show/Hide Toggle */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-bold text-[#102A43] dark:text-[#F0F6FC] tracking-wide mb-1.5"
          >
            {t.passwordLabel}
          </label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) validatePassword(e.target.value);
            }}
            placeholder={t.passwordPlaceholder}
            hasError={!!passwordError}
          />
          {/* Red Message for Invalid Password */}
          {passwordError && (
            <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
              <span>⚠️</span>
              <span>{passwordError}</span>
            </p>
          )}
        </div>

        {/* 11 & 12. Keep Me Signed In & Forgot Password */}
        <div className="flex items-center justify-between pt-0.5 text-xs">
          {/* Custom Checkbox */}
          <label className="flex items-center gap-2 font-medium text-[#102A43] dark:text-[#F0F6FC] cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-[#1479FF] border-slate-300 dark:border-slate-700 focus:ring-[#1479FF]/20 cursor-pointer accent-[#1479FF]"
            />
            <span className="text-[12px]">{t.rememberMe}</span>
          </label>

          {/* Forgot Password? */}
          <button
            type="button"
            onClick={() => {
              setStatusMessage({
                type: 'info',
                text: 'A secure password reset link has been dispatched to your official hospital work email.',
              });
            }}
            className="text-[12px] font-bold text-[#1479FF] dark:text-[#36A3FF] hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-[#1479FF]/30 rounded"
          >
            {t.forgotPassword}
          </button>
        </div>

        {/* 13. Primary Sign-In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[52px] sm:h-[54px] rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2
            bg-[#1479FF] hover:bg-[#0F6EE8]
            hover:shadow-[0_6px_25px_rgba(20,121,255,0.35)]
            hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]
            disabled:opacity-60 disabled:pointer-events-none
            transition-all duration-200 group relative select-none"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>{t.signingIn}</span>
            </div>
          ) : (
            <>
              <span>{t.signInBtn}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 font-mono">→</span>
            </>
          )}
        </button>
      </form>

      {/* 14. Google Workspace Divider & Button */}
      <div className="relative my-3.5 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <span className="relative px-3 text-[11px] font-medium text-[#627D98] dark:text-[#9FB3C8] bg-white dark:bg-[#0E2438] rounded-full">
          {t.orDivider}
        </span>
      </div>

      <GoogleWorkspaceButton
        label={t.googleBtn}
        onClick={() => {
          handleSelectDemoRole('doctor', 'dr.smith@medicare-health.org');
        }}
      />

      {/* 15. Create Account */}
      <div className="mt-3 text-center text-xs text-[#627D98] dark:text-[#9FB3C8]">
        {t.noAccount}{' '}
        <button
          type="button"
          onClick={() => {
            setStatusMessage({
              type: 'info',
              text: 'To register a new hospital or medical clinic, please contact MediCare enterprise onboarding.',
            });
          }}
          className="font-bold text-[#1479FF] dark:text-[#36A3FF] hover:underline focus:outline-none focus:ring-1 focus:ring-[#1479FF]/30 rounded inline-flex items-center gap-0.5"
        >
          <span>{t.createAccount}</span>
          <span>→</span>
        </button>
      </div>

      {/* 16. Quick Demo Access (2x2 Grid) */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80">
        <QuickDemoAccess
          selectedRole={selectedRole}
          loadingRole={loadingRole}
          onSelectRole={handleSelectDemoRole}
          dict={{
            title: t.demoTitle,
            subtitle: t.demoSubtitle,
          }}
        />
      </div>

      {/* 17. Footer / Security Information */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-center select-none">
        <p className="text-[11px] font-semibold text-[#627D98] dark:text-[#9FB3C8]">
          {t.securityText}
        </p>
        <p className="text-[10px] text-[#627D98]/75 dark:text-[#9FB3C8]/75 mt-0.5">
          {t.copyright}
        </p>
      </div>
    </div>
  );
};
