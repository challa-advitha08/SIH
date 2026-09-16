import React from 'react';
import { Volume2, X, CheckCircle, Info, Sparkles } from 'lucide-react';
import { Language, PageId } from '../types';
import { translations } from '../data/translations';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageId;
  language: Language;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, currentPage, language }) => {
  const [speaking, setSpeaking] = React.useState(false);
  const t = translations[language];

  if (!isOpen) return null;

  const getHelpText = () => {
    switch (currentPage) {
      case 'landing':
      case 'login':
        return t.helpLanding;
      case 'dashboard':
        return t.helpDashboard;
      case 'district':
        return t.helpDistrict;
      case 'course':
        return t.helpCourse;
      case 'skills':
        return t.helpEmerging;
      case 'employer':
      case 'confirmation':
        return t.helpEmployer;
      case 'responses':
        return 'This page shows submissions made by companies. Officials can review what skills are lacking and plan new vocational courses.';
      default:
        return t.helpLanding;
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(getHelpText());
      const langLocaleMap: Record<Language, string> = {
        en: 'en-IN',
        mr: 'mr-IN',
        hi: 'hi-IN',
        gu: 'gu-IN',
        kn: 'kn-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        bn: 'bn-IN',
      };
      utterance.lang = langLocaleMap[language] || 'en-IN';
      utterance.rate = 0.95;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-lg">
            <Info className="w-6 h-6 text-indigo-600" />
            <span>{t.helpTitle}</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            aria-label="Close help"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="rounded-xl bg-amber-50 p-4 border border-amber-200 text-amber-900 text-base leading-relaxed">
            <p>{getHelpText()}</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleSpeak}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition border border-indigo-200"
            >
              <Volume2 className="w-4 h-4" />
              <span>{speaking ? 'Stop Audio' : 'Listen in Audio (स्पीच)'}</span>
            </button>

            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-sm transition"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{t.helpClose}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
