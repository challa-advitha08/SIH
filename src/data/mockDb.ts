import { Course, CourseSkill, DistrictSummary, JobSubmission, Skill, SkillDemand, User } from '../types';

export const INITIAL_USERS: User[] = [
  { id: 1, name: 'Maharashtra Skill Development Mission (MSDM)', email: 'admin@mahasiksham.gov.in', role: 'admin' },
  { id: 2, name: 'Tata Motors Maharashtra Operations', email: 'careers@tatamotors.com', role: 'employer' },
  { id: 3, name: 'Infosys Pune Talent Acquisition', email: 'hr@infosys.com', role: 'employer' },
  { id: 4, name: 'Citizen Guest User', email: 'guest@skillmesh.in', role: 'guest' },
];

export const INITIAL_SKILLS: Skill[] = [
  { id: 1, skill_name: 'Python', sector: 'IT & Software' },
  { id: 2, skill_name: 'SQL', sector: 'IT & Software' },
  { id: 3, skill_name: 'Power BI', sector: 'Data & Analytics' },
  { id: 4, skill_name: 'AI/ML Basics', sector: 'AI & Data Science' },
  { id: 5, skill_name: 'Cloud Computing (AWS/Azure)', sector: 'IT & Infrastructure' },
  { id: 6, skill_name: 'React & Frontend Development', sector: 'IT & Software' },
  { id: 7, skill_name: 'Cybersecurity & Network Defense', sector: 'Cybersecurity' },
  { id: 8, skill_name: 'IoT & Sensor Systems', sector: 'Electronics & Automation' },
  { id: 9, skill_name: 'EV Technology & Battery Management', sector: 'Automotive' },
  { id: 10, skill_name: 'Industrial Automation & PLC', sector: 'Manufacturing' },
  { id: 11, skill_name: 'Data Entry & Office Tools', sector: 'Business & Office' },
  { id: 12, skill_name: 'Electrical Circuitry & Wiring', sector: 'Electrical & Power' },
  { id: 13, skill_name: 'Solar PV Installation', sector: 'Green Energy' },
  { id: 14, skill_name: 'Computer Numerical Control (CNC)', sector: 'Manufacturing' },
  { id: 15, skill_name: 'DevOps & CI/CD Pipelines', sector: 'IT & Infrastructure' },
  { id: 16, skill_name: 'Digital Marketing & Analytics', sector: 'Services' },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 1,
    course_name: 'Data Analytics & Business Intelligence',
    nsqf_level: 5,
    district: 'Pune',
    sector: 'IT & Software',
    placement_rate: 74,
    duration_weeks: 24,
    enrolled_students: 240,
    demand_status: 'High Demand',
  },
  {
    id: 2,
    course_name: 'Full Stack Web Development (React & Node)',
    nsqf_level: 5,
    district: 'Mumbai',
    sector: 'IT & Software',
    placement_rate: 82,
    duration_weeks: 26,
    enrolled_students: 310,
    demand_status: 'High Demand',
  },
  {
    id: 3,
    course_name: 'Cloud Infrastructure & AWS Administration',
    nsqf_level: 6,
    district: 'Pune',
    sector: 'IT & Infrastructure',
    placement_rate: 78,
    duration_weeks: 20,
    enrolled_students: 190,
    demand_status: 'High Demand',
  },
  {
    id: 4,
    course_name: 'Cybersecurity & Network Defense Technician',
    nsqf_level: 5,
    district: 'Thane',
    sector: 'Cybersecurity',
    placement_rate: 65,
    duration_weeks: 24,
    enrolled_students: 150,
    demand_status: 'Moderate Demand',
  },
  {
    id: 5,
    course_name: 'Electric Vehicle (EV) Powertrain & Battery Tech',
    nsqf_level: 5,
    district: 'Nashik',
    sector: 'Automotive',
    placement_rate: 71,
    duration_weeks: 28,
    enrolled_students: 180,
    demand_status: 'High Demand',
  },
  {
    id: 6,
    course_name: 'Industrial Electrician & Solar Panel Tech',
    nsqf_level: 4,
    district: 'Nagpur',
    sector: 'Electrical & Power',
    placement_rate: 62,
    duration_weeks: 32,
    enrolled_students: 220,
    demand_status: 'Moderate Demand',
  },
  {
    id: 7,
    course_name: 'Digital Data Entry & Office Automation',
    nsqf_level: 3,
    district: 'Nanded',
    sector: 'Business & Office',
    placement_rate: 42,
    duration_weeks: 16,
    enrolled_students: 290,
    demand_status: 'Oversupplied',
  },
  {
    id: 8,
    course_name: 'Advanced CNC Machine Programming',
    nsqf_level: 5,
    district: 'Aurangabad',
    sector: 'Manufacturing',
    placement_rate: 69,
    duration_weeks: 24,
    enrolled_students: 160,
    demand_status: 'Moderate Demand',
  },
  {
    id: 9,
    course_name: 'IoT & Smart Sensor Deployment',
    nsqf_level: 6,
    district: 'Kolhapur',
    sector: 'Electronics & Automation',
    placement_rate: 58,
    duration_weeks: 22,
    enrolled_students: 110,
    demand_status: 'Moderate Demand',
  },
];

export const INITIAL_COURSE_SKILLS: CourseSkill[] = [
  // Course 1: Data Analytics (Pune)
  { id: 1, course_id: 1, skill_id: 1, skill_name: 'Python', coverage_percentage: 80 },
  { id: 2, course_id: 1, skill_id: 2, skill_name: 'SQL', coverage_percentage: 90 },
  { id: 3, course_id: 1, skill_id: 3, skill_name: 'Power BI', coverage_percentage: 40 },
  { id: 4, course_id: 1, skill_id: 4, skill_name: 'AI/ML Basics', coverage_percentage: 10 },
  { id: 5, course_id: 1, skill_id: 5, skill_name: 'Cloud Computing (AWS/Azure)', coverage_percentage: 25 },

  // Course 2: Web Dev (Mumbai)
  { id: 6, course_id: 2, skill_id: 6, skill_name: 'React & Frontend Development', coverage_percentage: 85 },
  { id: 7, course_id: 2, skill_id: 1, skill_name: 'Python', coverage_percentage: 50 },
  { id: 8, course_id: 2, skill_id: 2, skill_name: 'SQL', coverage_percentage: 75 },
  { id: 9, course_id: 2, skill_id: 5, skill_name: 'Cloud Computing (AWS/Azure)', coverage_percentage: 30 },

  // Course 3: Cloud Infrastructure (Pune)
  { id: 10, course_id: 3, skill_id: 5, skill_name: 'Cloud Computing (AWS/Azure)', coverage_percentage: 85 },
  { id: 11, course_id: 3, skill_id: 15, skill_name: 'DevOps & CI/CD Pipelines', coverage_percentage: 50 },
  { id: 12, course_id: 3, skill_id: 1, skill_name: 'Python', coverage_percentage: 60 },
  { id: 13, course_id: 3, skill_id: 7, skill_name: 'Cybersecurity & Network Defense', coverage_percentage: 40 },

  // Course 4: Cybersecurity (Thane)
  { id: 14, course_id: 4, skill_id: 7, skill_name: 'Cybersecurity & Network Defense', coverage_percentage: 75 },
  { id: 15, course_id: 4, skill_id: 5, skill_name: 'Cloud Computing (AWS/Azure)', coverage_percentage: 40 },
  { id: 16, course_id: 4, skill_id: 1, skill_name: 'Python', coverage_percentage: 45 },

  // Course 5: EV Tech (Nashik)
  { id: 17, course_id: 5, skill_id: 9, skill_name: 'EV Technology & Battery Management', coverage_percentage: 65 },
  { id: 18, course_id: 5, skill_id: 12, skill_name: 'Electrical Circuitry & Wiring', coverage_percentage: 85 },
  { id: 19, course_id: 5, skill_id: 8, skill_name: 'IoT & Sensor Systems', coverage_percentage: 35 },

  // Course 6: Electrician (Nagpur)
  { id: 20, course_id: 6, skill_id: 12, skill_name: 'Electrical Circuitry & Wiring', coverage_percentage: 90 },
  { id: 21, course_id: 6, skill_id: 13, skill_name: 'Solar PV Installation', coverage_percentage: 40 },
  { id: 22, course_id: 6, skill_id: 8, skill_name: 'IoT & Sensor Systems', coverage_percentage: 15 },

  // Course 7: Data Entry (Nanded)
  { id: 23, course_id: 7, skill_id: 11, skill_name: 'Data Entry & Office Tools', coverage_percentage: 95 },
  { id: 24, course_id: 7, skill_id: 2, skill_name: 'SQL', coverage_percentage: 15 },
  { id: 25, course_id: 7, skill_id: 3, skill_name: 'Power BI', coverage_percentage: 5 },

  // Course 8: CNC (Aurangabad)
  { id: 26, course_id: 8, skill_id: 14, skill_name: 'Computer Numerical Control (CNC)', coverage_percentage: 85 },
  { id: 27, course_id: 8, skill_id: 10, skill_name: 'Industrial Automation & PLC', coverage_percentage: 45 },
  { id: 28, course_id: 8, skill_id: 8, skill_name: 'IoT & Sensor Systems', coverage_percentage: 20 },

  // Course 9: IoT (Kolhapur)
  { id: 29, course_id: 9, skill_id: 8, skill_name: 'IoT & Sensor Systems', coverage_percentage: 70 },
  { id: 30, course_id: 9, skill_id: 1, skill_name: 'Python', coverage_percentage: 40 },
  { id: 31, course_id: 9, skill_id: 12, skill_name: 'Electrical Circuitry & Wiring', coverage_percentage: 60 },
];

export const INITIAL_SKILL_DEMANDS: SkillDemand[] = [
  // Pune District Demands
  { id: 1, skill_id: 1, skill_name: 'Python', district: 'Pune', sector: 'IT & Software', demand_percentage: 90, growth_percentage: 28, date: '2026-08-01' },
  { id: 2, skill_id: 2, skill_name: 'SQL', district: 'Pune', sector: 'IT & Software', demand_percentage: 85, growth_percentage: 20, date: '2026-08-01' },
  { id: 3, skill_id: 3, skill_name: 'Power BI', district: 'Pune', sector: 'Data & Analytics', demand_percentage: 80, growth_percentage: 35, date: '2026-08-01' },
  { id: 4, skill_id: 4, skill_name: 'AI/ML Basics', district: 'Pune', sector: 'AI & Data Science', demand_percentage: 60, growth_percentage: 58, date: '2026-08-01' },
  { id: 5, skill_id: 5, skill_name: 'Cloud Computing (AWS/Azure)', district: 'Pune', sector: 'IT & Infrastructure', demand_percentage: 82, growth_percentage: 42, date: '2026-08-01' },
  { id: 6, skill_id: 9, skill_name: 'EV Technology & Battery Management', district: 'Pune', sector: 'Automotive', demand_percentage: 75, growth_percentage: 62, date: '2026-08-01' },

  // Mumbai District Demands
  { id: 7, skill_id: 6, skill_name: 'React & Frontend Development', district: 'Mumbai', sector: 'IT & Software', demand_percentage: 88, growth_percentage: 30, date: '2026-08-01' },
  { id: 8, skill_id: 1, skill_name: 'Python', district: 'Mumbai', sector: 'IT & Software', demand_percentage: 85, growth_percentage: 26, date: '2026-08-01' },
  { id: 9, skill_id: 7, skill_name: 'Cybersecurity & Network Defense', district: 'Mumbai', sector: 'Cybersecurity', demand_percentage: 84, growth_percentage: 48, date: '2026-08-01' },
  { id: 10, skill_id: 5, skill_name: 'Cloud Computing (AWS/Azure)', district: 'Mumbai', sector: 'IT & Infrastructure', demand_percentage: 86, growth_percentage: 45, date: '2026-08-01' },

  // Nashik District Demands
  { id: 11, skill_id: 9, skill_name: 'EV Technology & Battery Management', district: 'Nashik', sector: 'Automotive', demand_percentage: 82, growth_percentage: 65, date: '2026-08-01' },
  { id: 12, skill_id: 10, skill_name: 'Industrial Automation & PLC', district: 'Nashik', sector: 'Manufacturing', demand_percentage: 78, growth_percentage: 24, date: '2026-08-01' },
  { id: 13, skill_id: 14, skill_name: 'Computer Numerical Control (CNC)', district: 'Nashik', sector: 'Manufacturing', demand_percentage: 72, growth_percentage: 18, date: '2026-08-01' },

  // Nagpur District Demands
  { id: 14, skill_id: 13, skill_name: 'Solar PV Installation', district: 'Nagpur', sector: 'Green Energy', demand_percentage: 74, growth_percentage: 40, date: '2026-08-01' },
  { id: 15, skill_id: 12, skill_name: 'Electrical Circuitry & Wiring', district: 'Nagpur', sector: 'Electrical & Power', demand_percentage: 70, growth_percentage: 15, date: '2026-08-01' },
  { id: 16, skill_id: 8, skill_name: 'IoT & Sensor Systems', district: 'Nagpur', sector: 'Electronics & Automation', demand_percentage: 62, growth_percentage: 38, date: '2026-08-01' },

  // Aurangabad District Demands
  { id: 17, skill_id: 14, skill_name: 'Computer Numerical Control (CNC)', district: 'Aurangabad', sector: 'Manufacturing', demand_percentage: 80, growth_percentage: 22, date: '2026-08-01' },
  { id: 18, skill_id: 9, skill_name: 'EV Technology & Battery Management', district: 'Aurangabad', sector: 'Automotive', demand_percentage: 76, growth_percentage: 54, date: '2026-08-01' },
  { id: 19, skill_id: 10, skill_name: 'Industrial Automation & PLC', district: 'Aurangabad', sector: 'Manufacturing', demand_percentage: 70, growth_percentage: 25, date: '2026-08-01' },

  // Thane District Demands
  { id: 20, skill_id: 7, skill_name: 'Cybersecurity & Network Defense', district: 'Thane', sector: 'Cybersecurity', demand_percentage: 82, growth_percentage: 44, date: '2026-08-01' },
  { id: 21, skill_id: 5, skill_name: 'Cloud Computing (AWS/Azure)', district: 'Thane', sector: 'IT & Infrastructure', demand_percentage: 79, growth_percentage: 39, date: '2026-08-01' },

  // Kolhapur District Demands
  { id: 22, skill_id: 10, skill_name: 'Industrial Automation & PLC', district: 'Kolhapur', sector: 'Manufacturing', demand_percentage: 73, growth_percentage: 22, date: '2026-08-01' },
  { id: 23, skill_id: 8, skill_name: 'IoT & Sensor Systems', district: 'Kolhapur', sector: 'Electronics & Automation', demand_percentage: 68, growth_percentage: 35, date: '2026-08-01' },

  // Nanded District Demands
  { id: 24, skill_id: 13, skill_name: 'Solar PV Installation', district: 'Nanded', sector: 'Green Energy', demand_percentage: 68, growth_percentage: 42, date: '2026-08-01' },
  { id: 25, skill_id: 3, skill_name: 'Power BI', district: 'Nanded', sector: 'Data & Analytics', demand_percentage: 52, growth_percentage: 30, date: '2026-08-01' },
  { id: 26, skill_id: 11, skill_name: 'Data Entry & Office Tools', district: 'Nanded', sector: 'Business & Office', demand_percentage: 32, growth_percentage: -12, date: '2026-08-01' },
];

export const DISTRICT_SUMMARIES: Record<string, DistrictSummary> = {
  Pune: {
    name: 'Pune',
    marathiName: 'पुणे',
    hindiName: 'पुणे',
    severity: 'medium', // 🟡 Medium
    skill_gap_percentage: 28,
    active_courses: 320,
    avg_placement_rate: 76,
    demanded_jobs_count: 14200,
    unmet_demand_index: 24,
    top_demanded_roles: ['Software Developer', 'Data Analyst', 'Cloud Engineer', 'EV Battery Specialist'],
    top_emerging_skills: ['AI/ML', 'Cloud Computing', 'Power BI', 'EV Technology'],
  },
  Mumbai: {
    name: 'Mumbai',
    marathiName: 'मुंबई',
    hindiName: 'मुंबई',
    severity: 'low', // 🟢 Low
    skill_gap_percentage: 16,
    active_courses: 410,
    avg_placement_rate: 81,
    demanded_jobs_count: 26500,
    unmet_demand_index: 18,
    top_demanded_roles: ['Full Stack Developer', 'Cybersecurity Analyst', 'Cloud Architect', 'Financial Data Modeler'],
    top_emerging_skills: ['Cybersecurity', 'React', 'DevOps', 'Cloud Computing'],
  },
  Nashik: {
    name: 'Nashik',
    marathiName: 'नाशिक',
    hindiName: 'नासिक',
    severity: 'medium', // 🟡 Medium
    skill_gap_percentage: 34,
    active_courses: 140,
    avg_placement_rate: 68,
    demanded_jobs_count: 6800,
    unmet_demand_index: 31,
    top_demanded_roles: ['EV Assembly Technician', 'Industrial Automation Engineer', 'CNC Programmer', 'Quality Inspector'],
    top_emerging_skills: ['EV Technology', 'Industrial Automation', 'IoT', 'Robotics'],
  },
  Nagpur: {
    name: 'Nagpur',
    marathiName: 'नागपूर',
    hindiName: 'नागपुर',
    severity: 'medium', // 🟡 Medium
    skill_gap_percentage: 36,
    active_courses: 165,
    avg_placement_rate: 63,
    demanded_jobs_count: 5900,
    unmet_demand_index: 33,
    top_demanded_roles: ['Solar PV Plant Supervisor', 'Industrial Electrician', 'Warehouse Automation Tech', 'GIS Specialist'],
    top_emerging_skills: ['Solar Energy', 'IoT', 'Electrical CAD', 'Supply Chain Tech'],
  },
  Aurangabad: {
    name: 'Aurangabad',
    marathiName: 'छत्रपती संभाजीनगर (औरंगाबाद)',
    hindiName: 'औरंगाबाद (संभाजीनगर)',
    severity: 'high', // 🔴 High
    skill_gap_percentage: 45,
    active_courses: 110,
    avg_placement_rate: 59,
    demanded_jobs_count: 4800,
    unmet_demand_index: 42,
    top_demanded_roles: ['Automotive Mechatronics Specialist', 'CNC Precision Machinist', 'Battery Management Tech', 'Tool & Die Maker'],
    top_emerging_skills: ['EV Powertrain', 'CNC Precision', 'PLC Programming', 'Power BI'],
  },
  Thane: {
    name: 'Thane',
    marathiName: 'ठाणे',
    hindiName: 'ठाणे',
    severity: 'low', // 🟢 Low
    skill_gap_percentage: 19,
    active_courses: 195,
    avg_placement_rate: 73,
    demanded_jobs_count: 9400,
    unmet_demand_index: 22,
    top_demanded_roles: ['Network Defense Specialist', 'Data Center Operator', 'Pharma Process Control Tech', 'Logistics Analyst'],
    top_emerging_skills: ['Cybersecurity', 'Cloud Infrastructure', 'Data Analytics', 'Python'],
  },
  Kolhapur: {
    name: 'Kolhapur',
    marathiName: 'कोल्हापूर',
    hindiName: 'कोल्हापुर',
    severity: 'medium', // 🟡 Medium
    skill_gap_percentage: 32,
    active_courses: 95,
    avg_placement_rate: 64,
    demanded_jobs_count: 3600,
    unmet_demand_index: 30,
    top_demanded_roles: ['Foundry & Casting Automation Tech', 'Smart Farm IoT Operator', 'Hydraulic Systems Specialist', 'CNC Turner'],
    top_emerging_skills: ['IoT', 'Precision Casting', 'Hydraulics', 'Python'],
  },
  Nanded: {
    name: 'Nanded',
    marathiName: 'नांदेड',
    hindiName: 'नांदेड़',
    severity: 'high', // 🔴 High
    skill_gap_percentage: 51,
    active_courses: 72,
    avg_placement_rate: 46,
    demanded_jobs_count: 2200,
    unmet_demand_index: 48,
    top_demanded_roles: ['Solar Installation Tech', 'Agri-Tech Equipment Mechanic', 'Rural Retail Data Associate', 'Micro-Irrigation Tech'],
    top_emerging_skills: ['Solar PV', 'Agri-Tech IoT', 'Basic Data Analytics', 'Renewable Energy'],
  },
};

export const INITIAL_JOBS: JobSubmission[] = [
  {
    id: 1,
    employer_name: 'Bajaj Auto Ltd (Akurdi)',
    contact: 'hiring.pune@bajajauto.com | 020-27472851',
    industry: 'Automotive & Mobility',
    role: 'EV Powertrain Diagnostic Engineer',
    district: 'Pune',
    required_skills: ['EV Technology & Battery Management', 'IoT & Sensor Systems', 'Python'],
    missing_skills: ['Battery Management diagnostics', 'CAN bus communication protocol'],
    comments: 'Most ITI diploma candidates lack practical knowledge of battery balancing algorithms and high-voltage DC safety precautions. We need 80 fresh recruits immediately.',
    created_at: '2026-08-28 11:20:00',
  },
  {
    id: 2,
    employer_name: 'Persistent Systems',
    contact: 'campus_talents@persistent.com | 020-67030000',
    industry: 'IT & Software',
    role: 'Junior Data Analyst',
    district: 'Pune',
    required_skills: ['SQL', 'Power BI', 'Python', 'AI/ML Basics'],
    missing_skills: ['Power BI DAX formulas', 'Live cloud database queries'],
    comments: 'Students are taught theoretical SQL but struggle with complex multi-table joins, subqueries, and enterprise Power BI reporting dashboards.',
    created_at: '2026-09-02 14:45:00',
  },
  {
    id: 3,
    employer_name: 'Godrej & Boyce Mfg Co',
    contact: 'careers@godrej.com | 022-67961700',
    industry: 'Manufacturing',
    role: 'Industrial Automation Specialist',
    district: 'Mumbai',
    required_skills: ['Industrial Automation & PLC', 'Electrical Circuitry & Wiring', 'IoT & Sensor Systems'],
    missing_skills: ['PLC ladder logic programming', 'SCADA troubleshooting'],
    comments: 'Great fundamentals in classical electrical safety, but modern factories require PLC programming and IoT sensors on assembly lines.',
    created_at: '2026-09-05 09:15:00',
  },
  {
    id: 4,
    employer_name: 'Mahindra & Mahindra Farm Division',
    contact: 'talent.nagpur@mahindra.com | 0712-2589000',
    industry: 'Automotive',
    role: 'Solar Agri-Tech Technician',
    district: 'Nagpur',
    required_skills: ['Solar PV Installation', 'Electrical Circuitry & Wiring'],
    missing_skills: ['Solar inverter micro-controller repairs'],
    comments: 'Need technicians capable of handling both off-grid solar water pumps and smart IoT sensors in Vidarbha agriculture zones.',
    created_at: '2026-09-08 16:30:00',
  },
];

export const TOP_10_EMERGING_SKILLS = [
  { rank: 1, name: 'AI / ML & GenAI Applications', sector: 'AI & Data Science', demand_percentage: 94, growth_percentage: 64, trend: 'Surging' },
  { rank: 2, name: 'Cybersecurity & Cloud Defense', sector: 'Cybersecurity', demand_percentage: 89, growth_percentage: 52, trend: 'Surging' },
  { rank: 3, name: 'Cloud Computing (AWS / Azure / GCP)', sector: 'IT & Infrastructure', demand_percentage: 86, growth_percentage: 45, trend: 'Surging' },
  { rank: 4, name: 'Data Analytics & Predictive Modeling', sector: 'Data & Analytics', demand_percentage: 84, growth_percentage: 40, trend: 'Steady' },
  { rank: 5, name: 'Python for Automation & Data', sector: 'IT & Software', demand_percentage: 82, growth_percentage: 35, trend: 'Steady' },
  { rank: 6, name: 'Advanced SQL & Query Optimization', sector: 'IT & Software', demand_percentage: 81, growth_percentage: 28, trend: 'Steady' },
  { rank: 7, name: 'Power BI & Executive Dashboards', sector: 'Data & Analytics', demand_percentage: 79, growth_percentage: 42, trend: 'Surging' },
  { rank: 8, name: 'IoT & Smart Sensor Systems', sector: 'Electronics & Automation', demand_percentage: 75, growth_percentage: 38, trend: 'Steady' },
  { rank: 9, name: 'EV Technology & Battery Management', sector: 'Automotive', demand_percentage: 74, growth_percentage: 58, trend: 'Surging' },
  { rank: 10, name: 'React & Modern Frontend Frameworks', sector: 'IT & Software', demand_percentage: 72, growth_percentage: 30, trend: 'Steady' },
];
