import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  User,
  KeyRound,
  Mail,
  HelpCircle,
  CheckCircle,
  Sparkles,
  Award,
  TrendingUp,
  MapPin,
} from 'lucide-react';
import { Language, PageId, Role } from '../types';
import { translations } from '../data/translations';

interface LandingPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
  onSetRole: (role: Role) => void;
  onOpenHelp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  language,
  onSetRole,
  onOpenHelp,
}) => {
  const t = translations[language];
  const [emailOrPhone, setEmailOrPhone] = useState('admin@mahasiksham.gov.in');
  const [password, setPassword] = useState('SkillGov@2026');
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setError(t.requiredError);
      return;
    }
    setError('');
    // Auto-detect role or default to admin
    if (emailOrPhone.toLowerCase().includes('admin') || emailOrPhone.toLowerCase().includes('gov')) {
      onSetRole('admin');
      onNavigate('dashboard');
    } else {
      onSetRole('employer');
      onNavigate('employer');
    }
  };

  const handleAdminDirect = () => {
    setEmailOrPhone('admin@mahasiksham.gov.in');
    setPassword('SkillGov@2026');
    onSetRole('admin');
    onNavigate('dashboard');
  };

  const handleEmployerDirect = () => {
    setEmailOrPhone('talent@tatamotors.com');
    setPassword('TataAuto@2026');
    onSetRole('employer');
    onNavigate('employer');
  };

  const handleGuest = () => {
    onSetRole('guest');
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col justify-between">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden py-10 sm:py-16 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Big Brand Pitch */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>SIH Problem Statement ID: 26134</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-none">
                  {t.appTitle}
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-indigo-700">
                  {t.appSubtitle}
                </p>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                  {t.loginDesc}
                </p>
              </div>

              {/* Three High-Contrast Core Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Industry Demands</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Real-time requirements from registered employers</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Curriculum Audit</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Automated alignment score & module recommendations</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">36 Districts</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Granular gap index across all Maharashtra districts</p>
                  </div>
                </div>
              </div>

              {/* Low-Literacy Help Callout */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between gap-3 text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>{t.easyAccessNotice}</span>
                </div>
                <button
                  onClick={onOpenHelp}
                  className="font-bold text-amber-800 underline hover:text-amber-950 shrink-0 cursor-pointer"
                >
                  {t.helpBtn}
                </button>
              </div>
            </div>

            {/* Right Column: Portal Login & Quick Actions Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900 text-lg">{t.loginTitle}</h2>
                      <p className="text-xs text-slate-500">SIH 2026 Evaluation Prototype</p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenHelp}
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                    title={t.helpTooltip}
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t.emailOrMobile}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder={t.emailOrMobilePlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {t.password}
                      </label>
                      <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('In demo prototype mode, use the 1-Click buttons below to log in directly.'); }} className="text-xs text-indigo-600 hover:underline">
                        {t.forgotPassword}
                      </a>
                    </div>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t.passwordPlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                      />
                    </div>
                  </div>

                  {/* Primary Big Login Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <span>{t.loginBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('login')}
                    className="w-full py-2 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Open Dedicated Multi-Role Login Portal</span>
                  </button>
                </form>

                {/* 1-Click Quick Demo Sign-Ins */}
                <div className="pt-2 border-t border-slate-100 space-y-2.5">
                  <p className="text-xs font-bold text-slate-400 text-center uppercase tracking-wider">
                    Quick SIH Evaluation Logins
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleAdminDirect}
                      className="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{t.adminLoginBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleEmployerDirect}
                      className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                    >
                      <Building2 className="w-4 h-4 text-blue-200" />
                      <span>Employer Portal</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleGuest}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.continueGuestBtn} (No Login Required)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Credentials & SIH Attribution */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © 2026 SkillMesh • Labour-Market Intelligence and Curriculum Alignment Platform • Built for SIH Problem Statement ID: 26134
          </p>
          <div className="flex items-center gap-4 text-slate-600">
            <button onClick={() => onNavigate('dashboard')} className="hover:text-indigo-600 font-medium">
              State Dashboard
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('district')} className="hover:text-indigo-600 font-medium">
              District View
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('employer')} className="hover:text-indigo-600 font-medium">
              Employer Form
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
