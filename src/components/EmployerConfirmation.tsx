import React from 'react';
import { CheckCircle2, ArrowRight, RotateCcw, LayoutDashboard, Sparkles, Building2, MapPin } from 'lucide-react';
import { Language, PageId } from '../types';
import { translations } from '../data/translations';

interface EmployerConfirmationProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const EmployerConfirmation: React.FC<EmployerConfirmationProps> = ({
  onNavigate,
  language,
}) => {
  const t = translations[language];
  const submissionRef = 'MSDM-REQ-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
      {/* Animated Success Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xl space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Submission Registered Successfully</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.thankYouTitle}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            {t.thankYouSubtitle}
          </p>
        </div>

        {/* Reference Details */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1 max-w-md mx-auto">
          <div className="flex justify-between">
            <span className="text-slate-400 font-medium">{t.submissionId}:</span>
            <span className="font-mono font-bold text-indigo-700">{submissionRef}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-medium">Status:</span>
            <span className="font-semibold text-emerald-600">Pending Review by DVET Maharashtra</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-medium">Curriculum Impact:</span>
            <span className="font-semibold text-slate-800">Q4 2026 Board Meeting</span>
          </div>
        </div>

        {/* Two Navigation Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('employer')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.submitAnotherBtn}</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{t.goToDashboardBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
