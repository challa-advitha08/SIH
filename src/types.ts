export type Role = 'guest' | 'admin' | 'employer';

export type Language = 'en' | 'mr' | 'hi' | 'gu' | 'kn' | 'ta' | 'te' | 'bn';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'employer' | 'guest';
}

export interface Skill {
  id: number;
  skill_name: string;
  sector: string;
}

export interface Course {
  id: number;
  course_name: string;
  nsqf_level: number;
  district: string;
  sector: string;
  placement_rate: number;
  duration_weeks: number;
  enrolled_students: number;
  demand_status: 'High Demand' | 'Moderate Demand' | 'Low Demand' | 'Oversupplied';
}

export interface CourseSkill {
  id: number;
  course_id: number;
  skill_id: number;
  skill_name: string;
  coverage_percentage: number;
}

export interface SkillDemand {
  id: number;
  skill_id: number;
  skill_name: string;
  district: string;
  sector: string;
  demand_percentage: number;
  growth_percentage: number;
  date: string;
}

export interface JobSubmission {
  id: number;
  employer_name: string;
  contact: string;
  industry: string;
  role: string;
  district: string;
  required_skills: string[];
  missing_skills: string[];
  comments: string;
  created_at: string;
}

export interface DistrictSummary {
  name: string;
  marathiName: string;
  hindiName: string;
  severity: 'low' | 'medium' | 'high'; // 🟢 Low, 🟡 Medium, 🔴 High
  skill_gap_percentage: number;
  active_courses: number;
  avg_placement_rate: number;
  demanded_jobs_count: number;
  unmet_demand_index: number;
  top_demanded_roles: string[];
  top_emerging_skills: string[];
}

export interface SkillComparisonItem {
  skill_name: string;
  industry_demand: number;
  course_coverage: number;
  gap: number;
  status: 'High Skill Gap' | 'Moderate Skill Gap' | 'Aligned';
}

export interface CourseAlignmentResult {
  course: Course;
  alignment_score: number;
  comparison: SkillComparisonItem[];
  recommendations: string[];
}

export type PageId =
  | 'landing'
  | 'login'
  | 'dashboard'
  | 'district'
  | 'course'
  | 'skills'
  | 'employer'
  | 'confirmation'
  | 'responses';
