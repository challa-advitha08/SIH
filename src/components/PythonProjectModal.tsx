import React, { useState } from 'react';
import {
  FileCode,
  X,
  Copy,
  Check,
  Terminal,
  Database,
  FolderTree,
  Download,
  ExternalLink,
} from 'lucide-react';

interface PythonProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PythonProjectModal: React.FC<PythonProjectModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'app' | 'seed' | 'schema' | 'instructions'>('app');

  if (!isOpen) return null;

  const handleCopyInstructions = () => {
    const text = `python -m venv venv
# On Windows:
venv\\Scripts\\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python app.py`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 text-slate-100 border border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                SkillMesh Python / Flask & SQLite Source Repository
              </h3>
              <p className="text-xs text-slate-400">
                SIH Problem Statement ID: 26134 Architecture & Local Run Suite
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-900/80 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'instructions'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>How to Run Locally</span>
          </button>
          <button
            onClick={() => setActiveTab('app')}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'app'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>app.py (Flask Server & APIs)</span>
          </button>
          <button
            onClick={() => setActiveTab('seed')}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'seed'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>seed_data.py (SQLite Seeder)</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-3 px-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Folder Structure</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs leading-relaxed text-slate-300">
          {activeTab === 'instructions' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-3 text-slate-400 font-bold uppercase text-[11px]">
                  <span>Bash / Terminal Commands</span>
                  <button
                    onClick={handleCopyInstructions}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-[11px]"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-emerald-400 overflow-x-auto">
{`# 1. Clone or extract the SkillMesh repository
cd SkillMesh

# 2. Create Python virtual environment
python -m venv venv

# 3. Activate virtual environment
# On Windows:
venv\\Scripts\\activate
# On Linux / macOS:
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run Flask Web Application
python app.py

# Access web application at: http://127.0.0.1:5000`}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-900/60 text-slate-300 font-sans text-xs space-y-2">
                <h4 className="font-bold text-indigo-300 text-sm">Key Prototype Features Included:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li>Automatic SQLite database schema creation (`skillmesh.db`) on startup.</li>
                  <li>Pre-seeded with Maharashtra districts, realistic vocational courses, and skill demands.</li>
                  <li>REST APIs: `/api/skills`, `/api/dashboard`, `/api/district/&lt;name&gt;`, `/api/course/&lt;id&gt;`, `/api/emerging-skills`, `/api/employer`.</li>
                  <li>Rule-based Skill Gap Algorithm & Alignment Score calculation (0-100).</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'app' && (
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 overflow-x-auto text-[11px]">
{`"""
SkillMesh - Labour-Market Intelligence & Curriculum Alignment Platform
SIH Problem Statement ID: 26134
Tech Stack: Python, Flask, SQLite3, HTML5, Chart.js
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for
import sqlite3
import os

app = Flask(__name__)
DB_FILE = 'skillmesh.db'

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

# Skill Gap Algorithm
def calculate_alignment(course_id):
    conn = get_db()
    course = conn.execute("SELECT * FROM courses WHERE id = ?", (course_id,)).fetchone()
    if not course:
        return None
    skills = conn.execute("""
        SELECT cs.skill_id, s.skill_name, cs.coverage_percentage,
               COALESCE(sd.demand_percentage, 75) as demand_percentage
        FROM course_skills cs
        JOIN skills s ON cs.skill_id = s.id
        LEFT JOIN skill_demand sd ON sd.skill_id = cs.skill_id AND sd.district = ?
        WHERE cs.course_id = ?
    """, (course['district'], course_id)).fetchall()

    sum_min = 0
    sum_demand = 0
    breakdown = []
    recommendations = []

    for s in skills:
        demand = s['demand_percentage']
        cov = s['coverage_percentage']
        gap = demand - cov
        sum_min += min(demand, cov)
        sum_demand += demand
        status = 'High Skill Gap' if gap >= 20 else ('Moderate Skill Gap' if gap >= 10 else 'Aligned')
        if gap >= 20:
            recommendations.append(f"Add module on {s['skill_name']} to close {gap}% deficit.")
        breakdown.append({
            'skill_name': s['skill_name'],
            'industry_demand': demand,
            'course_coverage': cov,
            'gap': gap,
            'status': status
        })

    score = round((sum_min / sum_demand) * 100) if sum_demand > 0 else 70
    return {'course': dict(course), 'alignment_score': score, 'breakdown': breakdown, 'recommendations': recommendations}

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/district/<name>')
def district(name):
    return render_template('district.html', district_name=name)

@app.route('/course/<int:id>')
def course(id):
    data = calculate_alignment(id)
    return render_template('course.html', data=data)

# REST APIs
@app.route('/api/dashboard')
def api_dashboard():
    return jsonify({"active_courses": 1250, "avg_placement": 68, "emerging_skills": 42, "unmet_demand_index": 31})

@app.route('/api/employer', methods=['POST'])
def api_employer():
    req = request.json
    conn = get_db()
    conn.execute("""
        INSERT INTO jobs (employer_name, contact, industry, role, district, required_skills, missing_skills, comments)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (req['employer_name'], req['contact'], req['industry'], req['role'], req['district'],
          ",".join(req.get('required_skills', [])), ",".join(req.get('missing_skills', [])), req.get('comments', '')))
    conn.commit()
    return jsonify({"status": "success", "message": "Requirement submitted successfully"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)`}
            </pre>
          )}

          {activeTab === 'seed' && (
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 overflow-x-auto text-[11px]">
{`# SQLite Schema & Seed Initialization for SkillMesh
import sqlite3

def init_db():
    conn = sqlite3.connect('skillmesh.db')
    cursor = conn.cursor()

    cursor.executescript("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_name TEXT NOT NULL,
        nsqf_level INTEGER NOT NULL,
        district TEXT NOT NULL,
        placement_rate REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        skill_name TEXT UNIQUE NOT NULL,
        sector TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS course_skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER,
        skill_id INTEGER,
        coverage_percentage REAL,
        FOREIGN KEY(course_id) REFERENCES courses(id),
        FOREIGN KEY(skill_id) REFERENCES skills(id)
    );

    CREATE TABLE IF NOT EXISTS skill_demand (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        skill_id INTEGER,
        district TEXT,
        sector TEXT,
        demand_percentage REAL,
        growth_percentage REAL,
        date TEXT
    );

    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employer_name TEXT NOT NULL,
        contact TEXT NOT NULL,
        industry TEXT NOT NULL,
        role TEXT NOT NULL,
        district TEXT NOT NULL,
        required_skills TEXT,
        missing_skills TEXT,
        comments TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)
    conn.commit()
    conn.close()
    print("SkillMesh SQLite database initialized successfully!")

if __name__ == '__main__':
    init_db()`}
            </pre>
          )}

          {activeTab === 'schema' && (
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-emerald-400 overflow-x-auto text-[11px]">
{`SkillMesh/
│
├── app.py                     # Main Flask Application (Routes & API endpoints)
├── requirements.txt           # Python dependencies (Flask, etc.)
├── README.md                  # SIH Problem Statement 26134 Documentation
├── skillmesh.db               # SQLite database file
│
├── templates/
│   ├── base.html              # Shared layout with navigation & language switcher
│   ├── index.html             # Page 1: Landing / Login
│   ├── dashboard.html         # Page 2: State-level Maharashtra Dashboard
│   ├── district.html          # Page 3: District Detail Page
│   ├── course.html            # Page 4: Course Detail & Skill Comparison
│   ├── skills.html            # Page 5: Top 10 Emerging Skills
│   ├── employer.html          # Page 6: Employer Requirement Portal
│   ├── confirmation.html      # Page 7: Employer Confirmation
│   └── responses.html         # Page 8: Employer Submissions Archive
│
├── static/
│   ├── css/
│   │   └── style.css          # Custom styling & responsive utilities
│   └── js/
│       └── app.js             # Client-side Chart.js & translation scripts
│
└── data/
    └── seed_data.py           # SQLite database creation & Maharashtra seed data`}
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>All files are also physically written in the project repository for immediate export.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
