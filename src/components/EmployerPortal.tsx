import React, { useState } from 'react';
import {
  Building2,
  Phone,
  Briefcase,
  MapPin,
  Tag,
  X,
  Plus,
  Send,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Info,
  Sparkles,
  Layers,
} from 'lucide-react';
import { JobSubmission, Language, PageId } from '../types';
import { translations } from '../data/translations';
import { INITIAL_SKILLS, DISTRICT_SUMMARIES } from '../data/mockDb';

interface EmployerPortalProps {
  onSubmitJob: (job: Omit<JobSubmission, 'id' | 'created_at'>) => void;
  language: Language;
  onOpenHelp: () => void;
}

export const EmployerPortal: React.FC<EmployerPortalProps> = ({
  onSubmitJob,
  language,
  onOpenHelp,
}) => {
  const t = translations[language];

  // Form states
  const [employerName, setEmployerName] = useState('');
  const [contact, setContact] = useState('');
  const [industry, setIndustry] = useState('IT & Software');
  const [role, setRole] = useState('');
  const [district, setDistrict] = useState('Pune');
  const [requiredSkills, setRequiredSkills] = useState<string[]>(['Python', 'SQL']);
  const [missingSkills, setMissingSkills] = useState<string[]>([
    'Practical SQL subqueries and complex joins',
  ]);
  const [comments, setComments] = useState('');

  // Autocomplete skill tag input state
  const [skillInput, setSkillInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  // Missing skill custom adder
  const [missingInput, setMissingInput] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const districtsList = Object.values(DISTRICT_SUMMARIES);

  // Pre-configured common candidate missing skill options for quick check
  const commonMissingOptions = [
    'Practical hands-on lab experience',
    'Real-world project debugging',
    'Industry-standard tool knowledge',
    'Communication and team collaboration',
    'Code version control (Git / GitHub)',
    'Safety protocols and hardware diagnostics',
  ];

  // Handle skill input change and autocomplete filter (when >= 3 characters)
  const handleSkillInputChange = (value: string) => {
    setSkillInput(value);
    if (value.trim().length >= 3) {
      const q = value.toLowerCase();
      const matched = INITIAL_SKILLS.filter(
        (s) =>
          s.skill_name.toLowerCase().includes(q) &&
          !requiredSkills.includes(s.skill_name)
      ).map((s) => s.skill_name);
      setSuggestions(matched);
    } else {
      setSuggestions([]);
    }
  };

  const addSkillTag = (skillName: string) => {
    if (!skillName.trim()) return;
    if (!requiredSkills.includes(skillName.trim())) {
      setRequiredSkills([...requiredSkills, skillName.trim()]);
    }
    setSkillInput('');
    setSuggestions([]);
    if (errors.requiredSkills) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.requiredSkills;
        return next;
      });
    }
  };

  const removeSkillTag = (skillToRemove: string) => {
    setRequiredSkills(requiredSkills.filter((s) => s !== skillToRemove));
  };

  const toggleMissingSkill = (option: string) => {
    if (missingSkills.includes(option)) {
      setMissingSkills(missingSkills.filter((m) => m !== option));
    } else {
      setMissingSkills([...missingSkills, option]);
    }
  };

  const addCustomMissingSkill = () => {
    if (missingInput.trim() && !missingSkills.includes(missingInput.trim())) {
      setMissingSkills([...missingSkills, missingInput.trim()]);
      setMissingInput('');
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!employerName.trim()) newErrors.employerName = t.requiredError;
    if (!contact.trim()) newErrors.contact = t.requiredError;
    if (!industry.trim()) newErrors.industry = t.requiredError;
    if (!role.trim()) newErrors.role = t.requiredError;
    if (!district.trim()) newErrors.district = t.requiredError;
    if (requiredSkills.length === 0) newErrors.requiredSkills = t.skillsRequiredError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmitJob({
      employer_name: employerName.trim(),
      contact: contact.trim(),
      industry: industry.trim(),
      role: role.trim(),
      district: district.trim(),
      required_skills: requiredSkills,
      missing_skills: missingSkills,
      comments: comments.trim(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>SIH Industry Feedback Loop</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.employerPortalTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.employerPortalSubtitle}
          </p>
        </div>

        <button
          onClick={onOpenHelp}
          className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{t.helpBtn}</span>
        </button>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Error banner if any */}
        {Object.keys(errors).length > 0 && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>Please correct the highlighted fields before submitting.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Employer Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.fieldEmployerName} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
                placeholder="e.g., Tata Motors Ltd, Infosys, Bharat Forge"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition ${
                  errors.employerName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 bg-white'
                }`}
              />
            </div>
            {errors.employerName && (
              <p className="text-rose-600 text-xs mt-1">{errors.employerName}</p>
            )}
          </div>

          {/* Contact */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.fieldContact} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="e.g., hr@tatamotors.com | 020-27472851"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition ${
                  errors.contact ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 bg-white'
                }`}
              />
            </div>
            {errors.contact && (
              <p className="text-rose-600 text-xs mt-1">{errors.contact}</p>
            )}
          </div>

          {/* Industry */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.fieldIndustry} <span className="text-rose-500">*</span>
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 bg-white text-sm font-medium"
            >
              <option value="IT & Software">IT & Software</option>
              <option value="Automotive & Mobility">Automotive & Mobility (EV)</option>
              <option value="Manufacturing & Precision Engg">Manufacturing & Precision Engg</option>
              <option value="Electronics & IoT">Electronics & IoT</option>
              <option value="Renewable Energy & Solar">Renewable Energy & Solar</option>
              <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
              <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
            </select>
          </div>

          {/* Job Role */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.fieldJobRole} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Junior Data Analyst, EV Powertrain Tech"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition ${
                  errors.role ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 bg-white'
                }`}
              />
            </div>
            {errors.role && <p className="text-rose-600 text-xs mt-1">{errors.role}</p>}
          </div>

          {/* District */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.fieldDistrict} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium"
              >
                {districtsList.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name} {language === 'mr' ? `(${d.marathiName})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Required Skills Tag / Autocomplete Interface */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            {t.fieldRequiredSkills} <span className="text-rose-500">*</span>
          </label>
          <p className="text-xs text-slate-500">
            Add skills you demand. Type at least 3 characters to search skills from the state vocational repository.
          </p>

          {/* Existing tags display */}
          <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 min-h-[50px] items-center">
            {requiredSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold shadow-xs animate-in fade-in"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkillTag(skill)}
                  className="hover:bg-indigo-700 rounded-full p-0.5 transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}

            {requiredSkills.length === 0 && (
              <span className="text-xs text-slate-400 italic">
                No skills added yet. Use the field below to search & add tags.
              </span>
            )}
          </div>
          {errors.requiredSkills && (
            <p className="text-rose-600 text-xs">{errors.requiredSkills}</p>
          )}

          {/* Autocomplete Input */}
          <div className="relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => handleSkillInputChange(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  placeholder={t.typeToAddSkill}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkillTag(skillInput);
                    }
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => addSkillTag(skillInput)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addTagBtn}</span>
              </button>
            </div>

            {/* Autocomplete Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute z-20 left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden py-1 max-h-48 overflow-y-auto">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 bg-slate-50">
                  Matching Skills from Database:
                </div>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => addSkillTag(suggestion)}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 flex items-center justify-between transition"
                  >
                    <span>{suggestion}</span>
                    <Plus className="w-3.5 h-3.5 text-indigo-500" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Missing Skills in Candidates Feedback */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            {t.fieldMissingSkills}
          </label>
          <p className="text-xs text-slate-500">
            Select the gaps your interviewers frequently encounter in recent vocational graduates.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {commonMissingOptions.map((opt) => {
              const isChecked = missingSkills.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleMissingSkill(opt)}
                  className={`text-left p-3 rounded-xl border text-xs font-medium transition flex items-center justify-between ${
                    isChecked
                      ? 'bg-rose-50 border-rose-300 text-rose-900 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{opt}</span>
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                      isChecked ? 'bg-rose-600 text-white' : 'border border-slate-300'
                    }`}
                  >
                    {isChecked && '✓'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Add custom missing skill */}
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={missingInput}
              onChange={(e) => setMissingInput(e.target.value)}
              placeholder="Or type specific missing skill (e.g., DAX formulas, High Voltage Safety)..."
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomMissingSkill();
                }
              }}
            />
            <button
              type="button"
              onClick={addCustomMissingSkill}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              Add Gaps
            </button>
          </div>
        </div>

        {/* Comments with 500-Character Counter */}
        <div className="space-y-1.5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.fieldComments}
            </label>
            <span
              className={`text-xs font-semibold ${
                500 - comments.length < 50 ? 'text-rose-600' : 'text-slate-400'
              }`}
            >
              {500 - comments.length} {t.charsRemaining}
            </span>
          </div>
          <textarea
            value={comments}
            maxLength={500}
            rows={3}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Please elaborate on syllabus improvements, equipment needs, or internship opportunities you can offer..."
            className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Big Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Send className="w-5 h-5" />
            <span>{t.submitRequirementsBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
