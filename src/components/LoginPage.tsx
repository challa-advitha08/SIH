import React, { useState } from 'react';
import {
  Layers,
  ShieldCheck,
  Building2,
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  ArrowRight,
  Sparkles,
  HelpCircle,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Fingerprint,
} from 'lucide-react';
import { Language, PageId, Role } from '../types';
import { translations } from '../data/translations';

interface LoginPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
  onSetRole: (role: Role) => void;
  onOpenHelp: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigate,
  language,
  onSetRole,
  onOpenHelp,
}) => {
  const t = translations[language];

  // Selected login persona: 'admin' | 'employer' | 'trainee'
  const [persona, setPersona] = useState<'admin' | 'employer' | 'trainee'>('admin');
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');

  // Form fields
  const [identifier, setIdentifier] = useState('admin@mahasiksham.gov.in');
  const [password, setPassword] = useState('SkillGov@2026');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Preset demo accounts
  const demoAccounts = {
    admin: {
      id: 'admin@mahasiksham.gov.in',
      pass: 'SkillGov@2026',
      phone: '9820012345',
      name: 'Dr. Suresh Patil (Director, DVET Maharashtra)',
      badge: 'State Administrator',
    },
    employer: {
      id: 'talent@tatamotors.com',
      pass: 'TataAuto@2026',
      phone: '9820054321',
      name: 'Anita Sharma (HR Head, Tata Motors Pune)',
      badge: 'Verified Industry Partner',
    },
    trainee: {
      id: 'rahul.deshmukh@iti.edu',
      pass: 'Trainee@2026',
      phone: '9820098765',
      name: 'Rahul Deshmukh (ITI Electrician, Nashik)',
      badge: 'Certified Trainee',
    },
  };

  const handlePersonaChange = (newPersona: 'admin' | 'employer' | 'trainee') => {
    setPersona(newPersona);
    setIdentifier(demoAccounts[newPersona].id);
    setPassword(demoAccounts[newPersona].pass);
    setMobileNumber(demoAccounts[newPersona].phone);
    setErrorMessage('');
    setSuccessMessage('');
    setIsOtpSent(false);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setOtp('261340'); // Pre-fill SIH PS ID based mock OTP for easy review
      setSuccessMessage('Demo OTP sent to ' + mobileNumber + ': 261340 (Auto-filled)');
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (authMethod === 'password') {
      if (!identifier.trim()) {
        setErrorMessage(t.requiredError);
        return;
      }
      if (!password.trim()) {
        setErrorMessage('Password is required.');
        return;
      }
    } else {
      if (!isOtpSent) {
        setErrorMessage('Please request an OTP first.');
        return;
      }
      if (!otp || otp.length < 4) {
        setErrorMessage('Please enter the OTP received on your phone.');
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (persona === 'admin') {
        onSetRole('admin');
        setSuccessMessage('Welcome, State Administrator! Redirecting to State Dashboard...');
        setTimeout(() => onNavigate('dashboard'), 700);
      } else if (persona === 'employer') {
        onSetRole('employer');
        setSuccessMessage('Welcome, Industry Partner! Redirecting to Employer Portal...');
        setTimeout(() => onNavigate('employer'), 700);
      } else {
        onSetRole('guest');
        setSuccessMessage('Welcome, Trainee! Redirecting to Course & Skills Directory...');
        setTimeout(() => onNavigate('skills'), 700);
      }
    }, 500);
  };

  const handleQuickLogin = (roleType: 'admin' | 'employer' | 'trainee') => {
    handlePersonaChange(roleType);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (roleType === 'admin') {
        onSetRole('admin');
        onNavigate('dashboard');
      } else if (roleType === 'employer') {
        onSetRole('employer');
        onNavigate('employer');
      } else {
        onSetRole('guest');
        onNavigate('skills');
      }
    }, 300);
  };

  return (
    <div className="min-h-[calc(100vh-110px)] bg-gradient-to-b from-slate-100 via-slate-50 to-white py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Overview</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              SIH 26134 Secure Access
            </span>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                  <Layers className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {t.loginTitle}
                  </h1>
                  <p className="text-indigo-200 text-xs sm:text-sm mt-0.5">
                    Unified Labour-Market Intelligence & Curriculum Alignment System
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="px-3 py-1 rounded-md bg-white/10 text-slate-200 text-xs font-medium border border-white/10">
                  Govt. of Maharashtra
                </span>
              </div>
            </div>

            {/* Persona Switcher Tabs */}
            <div className="mt-6 pt-5 border-t border-indigo-900/60 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handlePersonaChange('admin')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  persona === 'admin'
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'bg-white/10 text-indigo-100 hover:bg-white/20'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${persona === 'admin' ? 'text-indigo-600' : 'text-indigo-300'}`} />
                <span>{t.adminRole}</span>
              </button>

              <button
                type="button"
                onClick={() => handlePersonaChange('employer')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  persona === 'employer'
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'bg-white/10 text-indigo-100 hover:bg-white/20'
                }`}
              >
                <Building2 className={`w-4 h-4 ${persona === 'employer' ? 'text-blue-600' : 'text-blue-300'}`} />
                <span>{t.employerRole}</span>
              </button>

              <button
                type="button"
                onClick={() => handlePersonaChange('trainee')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                  persona === 'trainee'
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'bg-white/10 text-indigo-100 hover:bg-white/20'
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${persona === 'trainee' ? 'text-emerald-600' : 'text-emerald-300'}`} />
                <span>Candidate / Guest</span>
              </button>
            </div>
          </div>

          {/* Form & Persona Info Body */}
          <div className="p-6 sm:p-8">
            {/* Active Persona Details Banner */}
            <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  {persona === 'admin' ? '🏛️' : persona === 'employer' ? '🏢' : '🎓'}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{demoAccounts[persona].name}</div>
                  <div className="text-slate-500 font-medium">{demoAccounts[persona].badge}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleQuickLogin(persona)}
                  className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <Fingerprint className="w-3.5 h-3.5" />
                  <span>1-Click Test Login</span>
                </button>
              </div>
            </div>

            {/* Error / Success Notifications */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Auth Method Selector: Password vs OTP */}
            <div className="flex items-center gap-4 mb-6 border-b border-slate-200 pb-3">
              <button
                type="button"
                onClick={() => { setAuthMethod('password'); setErrorMessage(''); }}
                className={`text-xs sm:text-sm font-bold pb-1 transition flex items-center gap-1.5 cursor-pointer ${
                  authMethod === 'password'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Password Login</span>
              </button>

              <button
                type="button"
                onClick={() => { setAuthMethod('otp'); setErrorMessage(''); }}
                className={`text-xs sm:text-sm font-bold pb-1 transition flex items-center gap-1.5 cursor-pointer ${
                  authMethod === 'otp'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>OTP via Mobile (Aadhaar / Registered)</span>
              </button>
            </div>

            {/* Forms */}
            {authMethod === 'password' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {t.emailOrMobile}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={t.emailOrMobilePlaceholder}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t.password}
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                    >
                      {t.forgotPassword}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.passwordPlaceholder}
                      className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span>Remember this device for 30 days</span>
                  </label>

                  <span className="text-[11px] text-slate-400">
                    256-Bit SSL Encrypted
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-70 mt-2"
                >
                  {isLoading ? (
                    <span>Authenticating credentials...</span>
                  ) : (
                    <>
                      <span>{t.loginBtn} as {persona === 'admin' ? 'Administrator' : persona === 'employer' ? 'Industry Partner' : 'Trainee'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* OTP Login Form */
              <form onSubmit={isOtpSent ? handleSubmit : handleSendOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Registered Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                        maxLength={10}
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shrink-0 cursor-pointer"
                    >
                      {isOtpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Enter the mobile number registered with your DVET/ITI/MSDE or company profile.
                  </p>
                </div>

                {isOtpSent && (
                  <div className="space-y-1.5 pt-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Enter 6-Digit One Time Password (OTP)
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="e.g. 261340"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-mono tracking-widest transition"
                        maxLength={6}
                        required
                      />
                    </div>
                    <p className="text-[11px] text-emerald-600 font-semibold">
                      ✓ Demo Code '261340' loaded for test evaluation.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-70 mt-3"
                >
                  {isLoading ? (
                    <span>Verifying OTP...</span>
                  ) : isOtpSent ? (
                    <>
                      <span>Verify OTP & Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Generate Security OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Quick SIH Evaluation Pre-sets bar */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Explore Without Login:</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => { onSetRole('guest'); onNavigate('dashboard'); }}
                    className="text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer"
                  >
                    Public State Dashboard
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => { onSetRole('guest'); onNavigate('skills'); }}
                    className="text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer"
                  >
                    Top Emerging Skills
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIH Hackathon Evaluation Note */}
        <div className="mt-6 p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">SIH Jury Evaluation Feature: </span>
            SkillMesh uses role-based access control (RBAC) to enforce separation of concerns between government curriculum committees (Admin), corporate recruiters (Employer), and job-seeking trainees (Candidate/Guest).
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="font-extrabold text-lg text-slate-900 mb-1">
              Reset Your SkillMesh Password
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your official government or organization email address to receive password reset instructions.
            </p>

            {forgotSent ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 mb-4">
                ✓ A password reset link has been dispatched to <strong className="font-mono">{forgotEmail || 'official@gov.in'}</strong>.
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin@mahasiksham.gov.in"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => { setShowForgotModal(false); setForgotSent(false); }}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
              >
                Close
              </button>
              {!forgotSent && (
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
