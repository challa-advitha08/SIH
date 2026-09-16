import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
  BookOpen,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  MapPin,
  Filter,
  ArrowUpRight,
  Sparkles,
  Info,
  ChevronRight,
  Search,
} from 'lucide-react';
import { DistrictSummary, Language, PageId } from '../types';
import { translations } from '../data/translations';
import { DISTRICT_SUMMARIES, TOP_10_EMERGING_SKILLS } from '../data/mockDb';
import { getLocalizedDistrictName } from '../data/districtTranslations';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AdminDashboardProps {
  onSelectDistrict: (districtName: string) => void;
  onNavigate: (page: PageId) => void;
  language: Language;
  onOpenHelp: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onSelectDistrict,
  onNavigate,
  language,
  onOpenHelp,
}) => {
  const t = translations[language];

  // Filters
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState<string>('all');
  const [selectedNsqf, setSelectedNsqf] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('lastQuarter');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const districtsList = Object.values(DISTRICT_SUMMARIES);

  // Filter districts
  const filteredDistricts = districtsList.filter((d) => {
    if (selectedDistrictFilter !== 'all' && d.name !== selectedDistrictFilter) return false;
    if (severityFilter !== 'all' && d.severity !== severityFilter) return false;
    return true;
  });

  // Chart 1: Skill Demand Trend (Line Chart)
  const demandTrendData = {
    labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026'],
    datasets: [
      {
        label: 'Industry Talent Demand (Jobs in 1000s)',
        data: [42, 48, 55, 63, 72, 85, 94],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Vocational Training Output (Trained in 1000s)',
        data: [38, 41, 45, 50, 56, 61, 65],
        borderColor: '#0284c7',
        backgroundColor: 'rgba(2, 132, 199, 0.05)',
        borderDash: [5, 5],
        fill: false,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { boxWidth: 12, font: { size: 12 } },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        grid: { color: '#f1f5f9' },
        ticks: { font: { size: 11 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } },
      },
    },
  };

  // Chart 2: Employment vs Unemployment (Bar Chart)
  const employmentData = {
    labels: ['Pune', 'Mumbai', 'Nashik', 'Nagpur', 'Aurangabad', 'Thane', 'Kolhapur', 'Nanded'],
    datasets: [
      {
        label: 'Placed in Core Skills (%)',
        data: [76, 81, 68, 63, 59, 73, 64, 46],
        backgroundColor: '#10b981',
        borderRadius: 6,
      },
      {
        label: 'Seeking Placement / Underemployed (%)',
        data: [24, 19, 32, 37, 41, 27, 36, 54],
        backgroundColor: '#f43f5e',
        borderRadius: 6,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { boxWidth: 12, font: { size: 12 } },
      },
    },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { stacked: true, max: 100, grid: { color: '#f1f5f9' } },
    },
  };

  // Chart 3: Top Emerging Skills (Horizontal Bar Chart)
  const top5Emerging = TOP_10_EMERGING_SKILLS.slice(0, 5);
  const emergingSkillsData = {
    labels: top5Emerging.map((s) => s.name.split(' ')[0] + ' ' + (s.name.split(' ')[1] || '')),
    datasets: [
      {
        label: 'Demand %',
        data: top5Emerging.map((s) => s.demand_percentage),
        backgroundColor: '#6366f1',
        borderRadius: 6,
      },
      {
        label: 'YoY Growth %',
        data: top5Emerging.map((s) => s.growth_percentage),
        backgroundColor: '#f59e0b',
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Top Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{t.stateSubheader}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.stateHeader}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('skills')}
            className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 font-semibold text-xs flex items-center gap-1.5 transition"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Top 10 Emerging Skills</span>
          </button>

          <button
            onClick={onOpenHelp}
            className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 font-semibold text-xs flex items-center gap-1.5 transition"
          >
            <Info className="w-4 h-4 text-amber-700" />
            <span>{t.helpBtn}</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Active Courses */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {t.kpiActiveCourses}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">1,250</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12% YoY
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Across 36 Maharashtra districts</p>
        </div>

        {/* KPI 2: Average Placement Rate */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {t.kpiAvgPlacement}
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">68%</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +4.2% QoQ
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Target benchmark: 75% for 2026</p>
        </div>

        {/* KPI 3: Emerging Skills */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {t.kpiEmergingSkills}
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">42</span>
            <span className="text-xs font-semibold text-purple-600">High Growth</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">AI, EV, Cloud, Solar & Smart Tech</p>
        </div>

        {/* KPI 4: Unmet Demand Index */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {t.kpiUnmetDemand}
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-600">31%</span>
            <span className="text-xs font-semibold text-rose-500">Critical Gap</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Unfilled industry vacancies due to mismatch</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>Interactive State-Level Filters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Sector Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">{t.filterSector}</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full text-xs font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">{t.allSectors}</option>
              <option value="IT & Software">IT & Software</option>
              <option value="Automotive">Automotive & EV</option>
              <option value="Manufacturing">Manufacturing & CNC</option>
              <option value="Green Energy">Green Energy & Solar</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">{t.filterDistrict}</label>
            <select
              value={selectedDistrictFilter}
              onChange={(e) => setSelectedDistrictFilter(e.target.value)}
              className="w-full text-xs font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">{t.allDistricts}</option>
              {districtsList.map((d) => (
                <option key={d.name} value={d.name}>
                  {getLocalizedDistrictName(d.name, language)} {language !== 'en' ? `(${d.name})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* NSQF Level Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">{t.filterNsqf}</label>
            <select
              value={selectedNsqf}
              onChange={(e) => setSelectedNsqf(e.target.value)}
              className="w-full text-xs font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">{t.allNsqf}</option>
              <option value="3">NSQF Level 3 (Basic)</option>
              <option value="4">NSQF Level 4 (Technician)</option>
              <option value="5">NSQF Level 5 (Specialist)</option>
              <option value="6">NSQF Level 6 (Advanced)</option>
            </select>
          </div>

          {/* Time Period Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">{t.filterPeriod}</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full text-xs font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="lastQuarter">{t.lastQuarter}</option>
              <option value="last6Months">{t.last6Months}</option>
              <option value="lastYear">{t.lastYear}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Maharashtra District Skill-Gap Visualization */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <span>{t.districtVisualizerTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{t.districtVisualizerSubtitle}</p>
          </div>

          {/* Severity Legend */}
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setSeverityFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                severityFilter === 'all' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSeverityFilter('low')}
              className={`px-2 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                severityFilter === 'low' ? 'bg-emerald-100 text-emerald-800' : 'text-emerald-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>🟢 {t.severityLow}</span>
            </button>
            <button
              onClick={() => setSeverityFilter('medium')}
              className={`px-2 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                severityFilter === 'medium' ? 'bg-amber-100 text-amber-800' : 'text-amber-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>🟡 {t.severityMedium}</span>
            </button>
            <button
              onClick={() => setSeverityFilter('high')}
              className={`px-2 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                severityFilter === 'high' ? 'bg-rose-100 text-rose-800' : 'text-rose-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>🔴 {t.severityHigh}</span>
            </button>
          </div>
        </div>

        {/* District Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredDistricts.map((district) => {
            const isHigh = district.severity === 'high';
            const isMedium = district.severity === 'medium';
            const badgeBg = isHigh
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : isMedium
              ? 'bg-amber-50 border-amber-200 text-amber-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700';

            const dotColor = isHigh ? 'bg-rose-500' : isMedium ? 'bg-amber-500' : 'bg-emerald-500';
            const localizedName = getLocalizedDistrictName(district.name, language);

            return (
              <div
                key={district.name}
                onClick={() => {
                  onSelectDistrict(district.name);
                  onNavigate('district');
                }}
                className="group relative bg-white rounded-xl border border-slate-200 p-4 hover:border-indigo-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${dotColor} animate-pulse`}></span>
                      <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition">
                        {localizedName}
                      </h3>
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${badgeBg}`}>
                      {district.skill_gap_percentage}% Gap
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Approved Courses:</span>
                      <span className="font-semibold text-slate-800">{district.active_courses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg Placement:</span>
                      <span className="font-semibold text-slate-800">{district.avg_placement_rate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Demanded Vacancies:</span>
                      <span className="font-semibold text-indigo-700">
                        {district.demanded_jobs_count.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Top Demanded Role
                    </p>
                    <span className="inline-block text-xs font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      {district.top_demanded_roles[0]}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition">
                  <span>Open District Intelligence</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 Chart.js Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Trend Line (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="mb-3">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>{t.chartSkillDemandTrend}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Widening shortfall between industry job openings and government-trained graduates.
            </p>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <Line data={demandTrendData} options={lineChartOptions} />
          </div>
        </div>

        {/* Chart 2: Employment Breakdown (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="mb-3">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t.chartEmploymentVsUnemployment}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Placed in core trade vs seeking employment across Maharashtra districts.
            </p>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <Bar data={employmentData} options={barChartOptions} />
          </div>
        </div>

        {/* Chart 3: Top Emerging Skills (Full Width) */}
        <div className="lg:col-span-12 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t.chartTopEmerging}</span>
              </h3>
              <p className="text-xs text-slate-500">
                Skills registering highest quarterly surge in employer postings across Maharashtra.
              </p>
            </div>
            <button
              onClick={() => onNavigate('skills')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All 10 Emerging Skills</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-56 sm:h-64 w-full">
            <Bar
              data={emergingSkillsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top', labels: { boxWidth: 12 } },
                },
                scales: {
                  y: { max: 100, grid: { color: '#f8fafc' } },
                  x: { grid: { display: false } },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
