import React, { useState } from 'react';
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
  TrendingUp,
  ArrowUpRight,
  Filter,
  Sparkles,
  Info,
  CheckCircle2,
  Layers,
  Search,
} from 'lucide-react';
import { Language, PageId } from '../types';
import { translations } from '../data/translations';
import { TOP_10_EMERGING_SKILLS, DISTRICT_SUMMARIES } from '../data/mockDb';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface EmergingSkillsProps {
  onNavigate: (page: PageId) => void;
  language: Language;
  onOpenHelp: () => void;
}

export const EmergingSkills: React.FC<EmergingSkillsProps> = ({
  onNavigate,
  language,
  onOpenHelp,
}) => {
  const t = translations[language];

  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('lastQuarter');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const districtsList = Object.values(DISTRICT_SUMMARIES);

  // Filter skills
  const filteredSkills = TOP_10_EMERGING_SKILLS.filter((skill) => {
    if (selectedSector !== 'all' && !skill.sector.toLowerCase().includes(selectedSector.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        skill.name.toLowerCase().includes(q) ||
        skill.sector.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Chart data
  const chartData = {
    labels: filteredSkills.map((s) => s.name.split(' ')[0] + ' ' + (s.name.split(' ')[1] || '')),
    datasets: [
      {
        label: 'Industry Demand %',
        data: filteredSkills.map((s) => s.demand_percentage),
        backgroundColor: '#4f46e5',
        borderRadius: 6,
      },
      {
        label: 'YoY Growth Rate %',
        data: filteredSkills.map((s) => s.growth_percentage),
        backgroundColor: '#f59e0b',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const, labels: { boxWidth: 12, font: { size: 12 } } },
    },
    scales: {
      y: { max: 100, grid: { color: '#f1f5f9' }, ticks: { callback: (val: any) => `${val}%` } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Forecasting Labour Market Trends (2026-2027)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.emergingSkillsTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.emergingSkillsSubtitle}
          </p>
        </div>

        <button
          onClick={onOpenHelp}
          className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-1.5 self-start md:self-auto"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{t.helpBtn}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>Filter Emerging Skills</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Sector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">{t.filterSector}</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full text-xs font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white"
            >
              <option value="all">{t.allSectors}</option>
              <option value="IT">IT & Software</option>
              <option value="AI">AI & Data Science</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Automotive">Automotive / EV</option>
              <option value="Electronics">Electronics / IoT</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">{t.filterDistrict}</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
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

          {/* Period */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">{t.filterPeriod}</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full text-xs font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white"
            >
              <option value="lastQuarter">{t.lastQuarter}</option>
              <option value="last6Months">{t.last6Months}</option>
              <option value="lastYear">{t.lastYear}</option>
            </select>
          </div>

          {/* Quick Search */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Search Skill</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., Python, EV, AI..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chart.js Graph */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="font-bold text-slate-900 text-base mb-1">
          Comparative Demand vs Growth Analysis
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Industry demand percentage alongside year-over-year surge rate across Maharashtra industries.
        </p>
        <div className="h-64 sm:h-72 w-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Top 10 Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            Priority Skills for Government Curriculum Inclusion
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {filteredSkills.length} Skills Listed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">{t.colRank}</th>
                <th className="py-3 px-6">{t.colSkillName}</th>
                <th className="py-3 px-6">Industry Sector</th>
                <th className="py-3 px-6">{t.colDemandPct}</th>
                <th className="py-3 px-6">{t.colGrowthPct}</th>
                <th className="py-3 px-6">{t.colTrend}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSkills.map((skill) => (
                <tr key={skill.rank} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-6 font-extrabold text-slate-400">
                    #{skill.rank}
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="font-bold text-slate-900 text-sm">
                      {skill.name}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-semibold">
                      {skill.sector}
                    </span>
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-indigo-700">{skill.demand_percentage}%</span>
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${skill.demand_percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      +{skill.growth_percentage}%
                    </span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        skill.trend === 'Surging'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <span>{skill.trend === 'Surging' ? '🔥' : '📈'}</span>
                      <span>{skill.trend}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
