import React from 'react';
import {
  Layers,
  HelpCircle,
  Globe,
  UserCheck,
  Building2,
  BarChart3,
  MapPin,
  BookOpen,
  TrendingUp,
  FileSpreadsheet,
  FileCode,
  CheckCircle2,
  LogIn,
} from 'lucide-react';
import { Language, PageId, Role } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  onOpenHelp: () => void;
  onOpenPythonModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  language,
  setLanguage,
  currentRole,
  setCurrentRole,
  onOpenHelp,
  onOpenPythonModal,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* SIH 26134 Official Notice Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-indigo-900/50">
        <div className="flex items-center gap-2 font-medium">
          <span className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[11px] tracking-wide">
            SIH PS: 26134
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Curriculum Alignment & Labour-Market Intelligence Platform • Maharashtra State Prototype
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <button
            onClick={onOpenPythonModal}
            className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold transition"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Python / Flask Backend & SQLite</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => setCurrentPage('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Skill<span className="text-indigo-600">Mesh</span>
              </span>
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block leading-none mt-0.5">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Action Controls: Role, Language, Help */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role Indicator & Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setCurrentRole('admin')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                currentRole === 'admin'
                  ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Admin</span>
            </button>
            <button
              onClick={() => setCurrentRole('employer')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                currentRole === 'employer'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Employer</span>
            </button>
            <button
              onClick={() => setCurrentRole('guest')}
              className={`px-2 py-1 rounded-lg font-semibold transition ${
                currentRole === 'guest'
                  ? 'bg-white text-slate-800 shadow-xs border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="hidden sm:inline">Guest</span>
            </button>
          </div>

          {/* Dedicated Login Link Button */}
          <button
            onClick={() => setCurrentPage('login')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              currentPage === 'login'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80'
            }`}
            title="Open Dedicated Login Page"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.navLogin}</span>
          </button>

          {/* Persistent Language Selector (8 Indian Languages) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-indigo-600 ml-1 mr-1.5 shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-white/80 hover:bg-white text-slate-800 font-semibold cursor-pointer outline-hidden rounded-lg px-2 py-1 text-xs border border-slate-200 shadow-2xs transition"
              aria-label="Select Application Language"
            >
              <option value="en">English</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="bn">বাংলা (Bengali)</option>
            </select>
          </div>

          {/* Help Icon (?) for Low Literacy */}
          <button
            onClick={onOpenHelp}
            title={t.helpTooltip}
            className="w-9 h-9 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-base transition border border-amber-300/80"
          >
            <HelpCircle className="w-5 h-5 text-amber-800" />
          </button>
        </div>
      </div>

      {/* Secondary Navigation Row for Pages */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1.5 text-xs font-medium no-scrollbar">
          <button
            onClick={() => setCurrentPage('landing')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              currentPage === 'landing'
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <span>{t.navLanding}</span>
          </button>

          <button
            onClick={() => setCurrentPage('login')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              currentPage === 'login'
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t.navLogin}</span>
          </button>

          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              currentPage === 'dashboard'
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{t.navDashboard}</span>
          </button>

          <button
            onClick={() => setCurrentPage('district')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              currentPage === 'district'
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.navDistrict}</span>
          </button>

          <button
            onClick={() => setCurrentPage('course')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              currentPage === 'course'
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.navCourse}</span>
          </button>

          <button
            onClick={() => setCurrentPage('skills')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              currentPage === 'skills'
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t.navEmergingSkills}</span>
          </button>

          <button
            onClick={() => setCurrentPage('employer')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              currentPage === 'employer' || currentPage === 'confirmation'
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.navEmployer}</span>
          </button>

          <button
            onClick={() => setCurrentPage('responses')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
              currentPage === 'responses'
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{t.navResponses}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
