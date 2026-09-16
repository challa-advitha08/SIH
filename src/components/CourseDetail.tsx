import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Building2,
  Sparkles,
  Info,
  BookOpen,
  Award,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Course, Language, PageId } from '../types';
import { translations } from '../data/translations';
import { INITIAL_COURSES, INITIAL_COURSE_SKILLS, INITIAL_SKILL_DEMANDS } from '../data/mockDb';
import { calculateCourseSkillGap } from '../utils/skillGapAlgorithm';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CourseDetailProps {
  courseId: number;
  onBackToDistrict: () => void;
  onNavigate: (page: PageId) => void;
  language: Language;
  onOpenHelp: () => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({
  courseId,
  onBackToDistrict,
  onNavigate,
  language,
  onOpenHelp,
}) => {
  const t = translations[language];

  // Find course or fallback to Course 1 (Data Analytics)
  const course: Course =
    INITIAL_COURSES.find((c) => c.id === courseId) || INITIAL_COURSES[0];

  const courseSkills = INITIAL_COURSE_SKILLS.filter((cs) => cs.course_id === course.id);

  // Run the SIH Skill Gap Algorithm
  const auditResult = calculateCourseSkillGap(
    course,
    courseSkills.length > 0 ? courseSkills : INITIAL_COURSE_SKILLS.slice(0, 5),
    INITIAL_SKILL_DEMANDS
  );

  const { alignment_score, comparison, recommendations } = auditResult;

  // Chart.js: Grouped Bar Chart comparing Industry Demand vs Course Coverage
  const chartData = {
    labels: comparison.map((c) => c.skill_name),
    datasets: [
      {
        label: t.industryDemandLegend,
        data: comparison.map((c) => c.industry_demand),
        backgroundColor: '#4f46e5', // Indigo
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
      {
        label: t.courseCoverageLegend,
        data: comparison.map((c) => c.course_coverage),
        // Highlight in RED if gap is >= 20%
        backgroundColor: comparison.map((c) => (c.gap >= 20 ? '#ef4444' : '#10b981')),
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { boxWidth: 14, font: { size: 12, weight: 'bold' as const } },
      },
      tooltip: {
        callbacks: {
          afterBody: (context: any) => {
            const index = context[0].dataIndex;
            const item = comparison[index];
            return `Skill Gap: ${item.gap}% (${item.status})`;
          },
        },
      },
    },
    scales: {
      y: {
        max: 100,
        ticks: { callback: (val: any) => `${val}%`, font: { size: 11 } },
        grid: { color: '#f1f5f9' },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 11 },
          maxRotation: 20,
          minRotation: 0,
        },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back and Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDistrict}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to District Profile</span>
        </button>

        <button
          onClick={onOpenHelp}
          className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{t.helpBtn}</span>
        </button>
      </div>

      {/* Course Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{t.courseDetailTitle}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {course.course_name}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Sector: <strong className="text-slate-800">{course.sector}</strong> • Duration: {course.duration_weeks} weeks
            </p>
          </div>

          <button
            onClick={() => onNavigate('employer')}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 flex items-center gap-2 transition cursor-pointer self-start lg:self-auto"
          >
            <Building2 className="w-4 h-4" />
            <span>{t.validateWithEmployersBtn}</span>
          </button>
        </div>

        {/* 4 Metadata Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t.nsqfLabel}
            </span>
            <span className="text-xl font-extrabold text-slate-900 mt-1 block">
              Level {course.nsqf_level}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t.districtLabel}
            </span>
            <span className="text-xl font-extrabold text-indigo-700 mt-1 block">
              {course.district}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t.placementRateLabel}
            </span>
            <span className="text-xl font-extrabold text-emerald-600 mt-1 block">
              {course.placement_rate}%
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Enrolled Trainees
            </span>
            <span className="text-xl font-extrabold text-slate-900 mt-1 block">
              {course.enrolled_students} Active
            </span>
          </div>
        </div>
      </div>

      {/* Alignment Score Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>SIH Labour-Market Alignment Formula</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            {t.alignmentScoreTitle}: <span className="text-amber-400">{alignment_score} / 100</span>
          </h2>
          <p className="text-sm sm:text-base text-indigo-100 max-w-2xl leading-relaxed">
            <strong className="text-amber-300">{alignment_score}%</strong> {t.alignmentExplanationPrefix}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/15 backdrop-blur-xs shrink-0">
          <div className="text-center">
            <div className="text-2xl font-black text-white">{comparison.length}</div>
            <div className="text-[11px] text-indigo-200 uppercase font-semibold">Core Skills</div>
          </div>
          <div className="h-8 w-px bg-white/20"></div>
          <div className="text-center">
            <div className="text-2xl font-black text-rose-400">
              {comparison.filter((c) => c.gap >= 20).length}
            </div>
            <div className="text-[11px] text-rose-200 uppercase font-semibold">High Gaps</div>
          </div>
        </div>
      </div>

      {/* Skill Comparison Chart & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Comparison Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <span>{t.skillComparisonTitle}</span>
              </h3>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Red = Large Gap (≥20%)
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Direct side-by-side evaluation between industry hiring requirement % and vocational syllabus coverage %.
            </p>
          </div>

          <div className="h-72 sm:h-80 w-full">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Skill Gap Cards Breakdown (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Skill Deficit Matrix
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Skills ranked by difference (Industry Demand - Syllabus Coverage).
            </p>

            <div className="space-y-3">
              {comparison.map((item) => {
                const isHigh = item.status === 'High Skill Gap';
                const isMod = item.status === 'Moderate Skill Gap';

                return (
                  <div
                    key={item.skill_name}
                    className={`p-3.5 rounded-xl border transition ${
                      isHigh
                        ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                        : isMod
                        ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                        : 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">{item.skill_name}</span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          isHigh
                            ? 'bg-rose-600 text-white'
                            : isMod
                            ? 'bg-amber-500 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {item.gap > 0 ? `-${item.gap}% Gap` : 'Aligned'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs mt-2 text-slate-600">
                      <span>Demand: <strong>{item.industry_demand}%</strong></span>
                      <span>Coverage: <strong>{item.course_coverage}%</strong></span>
                      <span className="font-semibold">{item.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Algorithm Thresholds: High ≥ 20% | Moderate ≥ 10%</span>
          </div>
        </div>
      </div>

      {/* Recommended Curriculum Updates */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-700 font-bold text-base">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>⚠️ {t.recommendedUpdatesTitle}</span>
        </div>
        <p className="text-xs text-slate-500">
          Actionable directives automatically generated for curriculum boards (MSBVE, DVET, NSDC) based on quantified market gaps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:border-amber-400 transition"
            >
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                {rec}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button: Validate with Employers */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Send this curriculum proposal to hiring managers for validation and candidate review.
          </p>
          <button
            onClick={() => onNavigate('employer')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>{t.validateWithEmployersBtn}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
