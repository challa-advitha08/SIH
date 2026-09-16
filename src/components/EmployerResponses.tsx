import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Filter,
  Search,
  Building2,
  Calendar,
  AlertCircle,
  Tag,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';
import { JobSubmission, Language, PageId } from '../types';
import { translations } from '../data/translations';
import { DISTRICT_SUMMARIES } from '../data/mockDb';

interface EmployerResponsesProps {
  responses: JobSubmission[];
  language: Language;
  onOpenHelp: () => void;
}

export const EmployerResponses: React.FC<EmployerResponsesProps> = ({
  responses,
  language,
  onOpenHelp,
}) => {
  const t = translations[language];

  // Filters
  const [districtFilter, setDistrictFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [searchRole, setSearchRole] = useState('');

  const districtsList = Object.values(DISTRICT_SUMMARIES);

  // Filtered responses
  const filteredResponses = responses.filter((r) => {
    if (districtFilter !== 'all' && r.district !== districtFilter) return false;
    if (industryFilter !== 'all' && r.industry !== industryFilter) return false;
    if (searchRole.trim()) {
      const q = searchRole.toLowerCase();
      return (
        r.role.toLowerCase().includes(q) ||
        r.employer_name.toLowerCase().includes(q) ||
        r.required_skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Employer Name',
      'Contact',
      'Industry',
      'Job Role',
      'District',
      'Required Skills',
      'Missing Skills',
      'Comments',
      'Date Submitted',
    ];

    const rows = filteredResponses.map((r) => [
      r.id,
      `"${r.employer_name.replace(/"/g, '""')}"`,
      `"${r.contact.replace(/"/g, '""')}"`,
      `"${r.industry}"`,
      `"${r.role}"`,
      `"${r.district}"`,
      `"${r.required_skills.join(', ')}"`,
      `"${r.missing_skills.join(', ')}"`,
      `"${r.comments.replace(/"/g, '""')}"`,
      `"${r.created_at}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SkillMesh_Employer_Submissions_Maharashtra.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Government Skill Planning Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.responsesTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.responsesSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>{t.exportCsvBtn}</span>
          </button>

          <button
            onClick={onOpenHelp}
            className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{t.helpBtn}</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>Filter Submissions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* District Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">{t.filterDistrict}</label>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full text-xs font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white"
            >
              <option value="all">{t.allDistricts}</option>
              {districtsList.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Industry Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">{t.filterSector}</label>
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="w-full text-xs font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white"
            >
              <option value="all">{t.allSectors}</option>
              <option value="IT & Software">IT & Software</option>
              <option value="Automotive & Mobility">Automotive & Mobility</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Automotive">Automotive</option>
            </select>
          </div>

          {/* Role / Keyword Search */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Search Role / Company</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchRole}
                onChange={(e) => setSearchRole(e.target.value)}
                placeholder="e.g., Engineer, Tata, SQL..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submissions Table (Desktop) & Cards (Mobile) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            Verified Submissions Archive
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {filteredResponses.length} Submissions Found
          </span>
        </div>

        {filteredResponses.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            {t.noResponsesFound}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-5">{t.colEmployer}</th>
                    <th className="py-3.5 px-4">{t.colIndustry} & District</th>
                    <th className="py-3.5 px-4">{t.colRole}</th>
                    <th className="py-3.5 px-4">{t.colReqSkills}</th>
                    <th className="py-3.5 px-4">{t.colMissSkills}</th>
                    <th className="py-3.5 px-5">{t.colComments}</th>
                    <th className="py-3.5 px-4">{t.colDate}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredResponses.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-4 px-5">
                        <div className="font-bold text-slate-900 text-sm">{r.employer_name}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{r.contact}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-800">{r.industry}</div>
                        <span className="inline-block text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 mt-1">
                          📍 {r.district}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-900">
                        {r.role}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {r.required_skills.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[11px] font-medium border border-indigo-200"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {r.missing_skills.map((m) => (
                            <span
                              key={m}
                              className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[11px] font-medium border border-rose-200"
                            >
                              ⚠️ {m}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-5 text-slate-600 max-w-xs text-[11px] leading-relaxed italic">
                        &quot;{r.comments || 'No additional comments'}&quot;
                      </td>
                      <td className="py-4 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                        {r.created_at}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Cards */}
            <div className="lg:hidden divide-y divide-slate-100">
              {filteredResponses.map((r) => (
                <div key={r.id} className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{r.employer_name}</h4>
                      <p className="text-xs text-indigo-700 font-semibold">{r.role} • 📍 {r.district}</p>
                    </div>
                    <span className="text-[10px] text-slate-400">{r.created_at.split(' ')[0]}</span>
                  </div>

                  <div className="text-xs text-slate-600">
                    <span className="font-bold text-slate-700">Industry:</span> {r.industry}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                      Required Skills:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {r.required_skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[11px] font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-rose-500 block mb-1">
                      Reported Deficits / Missing Skills:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {r.missing_skills.map((m) => (
                        <span
                          key={m}
                          className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[11px] font-medium border border-rose-200"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {r.comments && (
                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 italic border border-slate-200/70">
                      &quot;{r.comments}&quot;
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
