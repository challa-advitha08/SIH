import React, { useState } from 'react';
import {
  MapPin,
  ArrowLeft,
  BookOpen,
  Briefcase,
  TrendingUp,
  Percent,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Info,
  Building,
} from 'lucide-react';
import { Course, DistrictSummary, Language, PageId } from '../types';
import { translations } from '../data/translations';
import { DISTRICT_SUMMARIES, INITIAL_COURSES } from '../data/mockDb';
import { getLocalizedDistrictName } from '../data/districtTranslations';

interface DistrictDetailProps {
  districtName: string;
  onSelectCourse: (courseId: number) => void;
  onBackToDashboard: () => void;
  onNavigate: (page: PageId) => void;
  language: Language;
  onOpenHelp: () => void;
}

export const DistrictDetail: React.FC<DistrictDetailProps> = ({
  districtName,
  onSelectCourse,
  onBackToDashboard,
  onNavigate,
  language,
  onOpenHelp,
}) => {
  const t = translations[language];

  // Selected district summary
  const summary: DistrictSummary =
    DISTRICT_SUMMARIES[districtName] || DISTRICT_SUMMARIES['Pune'];

  // Courses filtered by district
  const districtCourses = INITIAL_COURSES.filter(
    (c) => c.district.toLowerCase() === summary.name.toLowerCase()
  );

  // If no courses found for this district, show relevant courses from nearby or state
  const displayedCourses =
    districtCourses.length > 0 ? districtCourses : INITIAL_COURSES.slice(0, 4);

  const getStatusBadge = (status: Course['demand_status']) => {
    switch (status) {
      case 'High Demand':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            {t.statusHighDemand}
          </span>
        );
      case 'Moderate Demand':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            {t.statusModerateDemand}
          </span>
        );
      case 'Low Demand':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            {t.statusLowDemand}
          </span>
        );
      case 'Oversupplied':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            {t.statusOversupplied}
          </span>
        );
    }
  };

  const localizedName = getLocalizedDistrictName(summary.name, language);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb / Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to State Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHelp}
            className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{t.helpBtn}</span>
          </button>
        </div>
      </div>

      {/* District Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wide text-indigo-200 mb-2">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span>Maharashtra State Vocational Training Zone</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {localizedName} District
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Real-time labour market demand vs course curricula alignment for {summary.name} district.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('employer')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
          >
            <Building className="w-4 h-4" />
            <span>Collect Employer Feedback</span>
          </button>
        </div>
      </div>

      {/* District 4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Skill Gap */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            {t.districtSkillGap}
          </span>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-3xl font-extrabold ${
                summary.severity === 'high'
                  ? 'text-rose-600'
                  : summary.severity === 'medium'
                  ? 'text-amber-600'
                  : 'text-emerald-600'
              }`}
            >
              {summary.skill_gap_percentage}%
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {summary.severity === 'high'
                ? 'High Gap (🔴 Action needed)'
                : summary.severity === 'medium'
                ? 'Moderate Gap (🟡 Monitor)'
                : 'Balanced (🟢 Good)'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Weighted difference vs industry demand</p>
        </div>

        {/* KPI 2: Active Courses */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            {t.districtCoursesCount}
          </span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {summary.active_courses}
            </span>
            <span className="text-xs font-semibold text-slate-500">ITI & Vocational</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Govt-approved skill modules</p>
        </div>

        {/* KPI 3: Placement Rate */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            {t.districtPlacementRate}
          </span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">
              {summary.avg_placement_rate}%
            </span>
            <span className="text-xs font-semibold text-emerald-700">Annual Avg</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Graduates secured job offers</p>
        </div>

        {/* KPI 4: Demanded Jobs */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            {t.districtDemandedJobs}
          </span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-600">
              {summary.demanded_jobs_count.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-indigo-700">Open Vacancies</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Aggregated from active companies</p>
        </div>
      </div>

      {/* Top Demanded Job Roles */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Briefcase className="w-5 h-5 text-indigo-600" />
          <span>{t.topDemandedRolesTitle}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summary.top_demanded_roles.map((role, idx) => (
            <div
              key={role}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                #{idx + 1}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm leading-tight">{role}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">High hiring volume</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Courses vs Local Demand Table & Card View */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>{t.coursesVsDemandTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Audited alignment between vocational courses and {summary.name}&apos;s actual job vacancies.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Showing {displayedCourses.length} accredited programs
          </span>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">{t.colCourse}</th>
                <th className="py-3 px-6">Sector & NSQF</th>
                <th className="py-3 px-6">{t.colDemand}</th>
                <th className="py-3 px-6">{t.colPlacement}</th>
                <th className="py-3 px-6">{t.colStatus}</th>
                <th className="py-3 px-6 text-right">{t.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedCourses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{course.course_name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {course.duration_weeks} weeks • {course.enrolled_students} enrolled
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold text-xs">
                      {course.sector}
                    </span>
                    <span className="ml-2 text-slate-500 font-medium">Level {course.nsqf_level}</span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-800">
                    {course.demand_status === 'High Demand'
                      ? 'Very High (90%+)'
                      : course.demand_status === 'Moderate Demand'
                      ? 'Moderate (70%)'
                      : course.demand_status === 'Low Demand'
                      ? 'Low (40%)'
                      : 'Oversupplied'}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{course.placement_rate}%</span>
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${course.placement_rate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(course.demand_status)}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => {
                        onSelectCourse(course.id);
                        onNavigate('course');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{t.btnViewCourseDetails}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden divide-y divide-slate-100">
          {displayedCourses.map((course) => (
            <div key={course.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{course.course_name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {course.sector} • NSQF Level {course.nsqf_level}
                  </p>
                </div>
                {getStatusBadge(course.demand_status)}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <span>
                  Placement Rate: <strong className="text-emerald-600">{course.placement_rate}%</strong>
                </span>
                <span>
                  Students: <strong className="text-slate-800">{course.enrolled_students}</strong>
                </span>
              </div>

              <button
                onClick={() => {
                  onSelectCourse(course.id);
                  onNavigate('course');
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <span>{t.btnViewCourseDetails}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
