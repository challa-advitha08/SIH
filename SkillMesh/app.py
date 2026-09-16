"""
SkillMesh - Labour-Market Intelligence & Curriculum Alignment Platform
SIH Problem Statement ID: 26134
Main Flask Web Application & REST APIs
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for
import sqlite3
import os

app = Flask(__name__)
DB_PATH = os.path.join(os.path.dirname(__file__), 'skillmesh.db')

def get_db():
    """Returns a SQLite connection with row access by column name."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def auto_init_db():
    """Ensure tables exist on first boot."""
    if not os.path.exists(DB_PATH):
        from data.seed_data import init_db
        init_db()

# -------------------------------------------------------------------------
# SKILL GAP ALGORITHM
# -------------------------------------------------------------------------
def calculate_course_alignment(course_id):
    """
    Calculates alignment score, skill gap breakdown, and recommended updates.
    Formula:
    gap = industry_demand - course_coverage
    If gap >= 20: High Skill Gap
    If gap >= 10: Moderate Skill Gap
    Otherwise: Aligned
    alignment_score = (sum of min(demand, coverage)) / (sum of demand) * 100
    """
    conn = get_db()
    course = conn.execute("SELECT * FROM courses WHERE id = ?", (course_id,)).fetchone()
    if not course:
        conn.close()
        return None

    # Fetch course skills with matching district demand
    query = """
        SELECT cs.skill_id, s.skill_name, cs.coverage_percentage,
               COALESCE(sd.demand_percentage, 75.0) AS demand_percentage
        FROM course_skills cs
        JOIN skills s ON cs.skill_id = s.id
        LEFT JOIN skill_demand sd ON sd.skill_id = cs.skill_id AND sd.district = ?
        WHERE cs.course_id = ?
    """
    skills = conn.execute(query, (course['district'], course_id)).fetchall()

    sum_min = 0.0
    sum_demand = 0.0
    comparison = []
    recommendations = []

    for row in skills:
        skill_name = row['skill_name']
        demand = float(row['demand_percentage'])
        coverage = float(row['coverage_percentage'])
        gap = round(demand - coverage, 1)

        sum_min += min(demand, coverage)
        sum_demand += demand

        if gap >= 20:
            status = 'High Skill Gap'
            recommendations.append(f"Add dedicated 40-hour module on {skill_name} (Coverage: {coverage}%, Demand: {demand}%).")
        elif gap >= 10:
            status = 'Moderate Skill Gap'
            recommendations.append(f"Strengthen practical lab exercises and industry projects for {skill_name} to close {gap}% deficit.")
        else:
            status = 'Aligned'

        comparison.append({
            'skill_name': skill_name,
            'industry_demand': demand,
            'course_coverage': coverage,
            'gap': gap,
            'status': status
        })

    alignment_score = round((sum_min / sum_demand) * 100) if sum_demand > 0 else 70

    if alignment_score < 70:
        recommendations.append(f"Introduce 4-week industry internship with registered {course['district']} manufacturing/IT partners.")
    else:
        recommendations.append("Curriculum aligns well with current industry requirements; maintain regular employer dialogue.")

    conn.close()
    return {
        'course': dict(course),
        'alignment_score': alignment_score,
        'comparison': comparison,
        'recommendations': recommendations
    }

# -------------------------------------------------------------------------
# HTML PAGE ROUTES (Pages 1 - 8)
# -------------------------------------------------------------------------
@app.route('/')
def index():
    """PAGE 1 — Landing / Overview"""
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    """PAGE — Dedicated Multi-Role Login Portal"""
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        role = request.form.get('role', 'admin')
        if 'admin' in email or role == 'admin':
            return redirect(url_for('dashboard'))
        elif 'employer' in email or role == 'employer':
            return redirect(url_for('employer_portal'))
        else:
            return redirect(url_for('emerging_skills_page'))
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    """PAGE 2 — Admin Dashboard"""
    conn = get_db()
    courses = conn.execute("SELECT * FROM courses").fetchall()
    conn.close()
    return render_template('dashboard.html', courses=courses)

@app.route('/district/<district_name>')
def district(district_name):
    """PAGE 3 — District Detail"""
    conn = get_db()
    courses = conn.execute("SELECT * FROM courses WHERE district = ? COLLATE NOCASE", (district_name,)).fetchall()
    if not courses:
        courses = conn.execute("SELECT * FROM courses LIMIT 4").fetchall()
    conn.close()
    return render_template('district.html', district_name=district_name, courses=courses)

@app.route('/course/<int:course_id>')
def course_detail(course_id):
    """PAGE 4 — Course Detail"""
    data = calculate_course_alignment(course_id)
    if not data:
        return redirect(url_for('dashboard'))
    return render_template('course.html', data=data)

@app.route('/skills')
def emerging_skills_page():
    """PAGE 5 — Emerging Skills"""
    return render_template('skills.html')

@app.route('/employer')
def employer_portal():
    """PAGE 6 — Employer Portal"""
    return render_template('employer.html')

@app.route('/confirmation')
def employer_confirmation():
    """PAGE 7 — Employer Confirmation"""
    return render_template('confirmation.html')

@app.route('/responses')
def employer_responses():
    """PAGE 8 — Employer Responses"""
    conn = get_db()
    jobs = conn.execute("SELECT * FROM jobs ORDER BY created_at DESC").fetchall()
    conn.close()
    return render_template('responses.html', jobs=jobs)

# -------------------------------------------------------------------------
# REST APIs (JSON Endpoints)
# -------------------------------------------------------------------------
@app.route('/api/skills')
def api_skills():
    conn = get_db()
    skills = conn.execute("SELECT * FROM skills ORDER BY skill_name ASC").fetchall()
    conn.close()
    return jsonify([dict(s) for s in skills])

@app.route('/api/skills/search')
def api_skills_search():
    query = request.args.get('q', '').strip()
    if len(query) < 3:
        return jsonify([])
    conn = get_db()
    skills = conn.execute("SELECT * FROM skills WHERE skill_name LIKE ? ORDER BY skill_name ASC", (f"%{query}%",)).fetchall()
    conn.close()
    return jsonify([dict(s) for s in skills])

@app.route('/api/dashboard')
def api_dashboard():
    return jsonify({
        "active_courses": 1250,
        "avg_placement": 68,
        "emerging_skills": 42,
        "unmet_demand_index": 31,
        "districts_severity": {
            "Pune": "medium",
            "Mumbai": "low",
            "Nashik": "medium",
            "Nagpur": "medium",
            "Aurangabad": "high",
            "Thane": "low",
            "Kolhapur": "medium",
            "Nanded": "high"
        }
    })

@app.route('/api/district/<district_name>')
def api_district(district_name):
    conn = get_db()
    courses = conn.execute("SELECT * FROM courses WHERE district = ? COLLATE NOCASE", (district_name,)).fetchall()
    demands = conn.execute("""
        SELECT s.skill_name, sd.demand_percentage, sd.growth_percentage
        FROM skill_demand sd
        JOIN skills s ON sd.skill_id = s.id
        WHERE sd.district = ? COLLATE NOCASE
    """, (district_name,)).fetchall()
    conn.close()
    return jsonify({
        "district": district_name,
        "courses": [dict(c) for c in courses],
        "skill_demands": [dict(d) for d in demands]
    })

@app.route('/api/course/<int:course_id>')
def api_course(course_id):
    data = calculate_course_alignment(course_id)
    if not data:
        return jsonify({"error": "Course not found"}), 404
    return jsonify(data)

@app.route('/api/emerging-skills')
def api_emerging_skills():
    return jsonify([
        {"rank": 1, "name": "AI / ML & GenAI", "sector": "AI & Data Science", "demand": 94, "growth": 64, "trend": "Surging"},
        {"rank": 2, "name": "Cybersecurity", "sector": "Cybersecurity", "demand": 89, "growth": 52, "trend": "Surging"},
        {"rank": 3, "name": "Cloud Computing", "sector": "IT & Infrastructure", "demand": 86, "growth": 45, "trend": "Surging"},
        {"rank": 4, "name": "Data Analytics", "sector": "Data & Analytics", "demand": 84, "growth": 40, "trend": "Steady"},
        {"rank": 5, "name": "Python", "sector": "IT & Software", "demand": 82, "growth": 35, "trend": "Steady"},
        {"rank": 6, "name": "SQL", "sector": "IT & Software", "demand": 81, "growth": 28, "trend": "Steady"},
        {"rank": 7, "name": "Power BI", "sector": "Data & Analytics", "demand": 79, "growth": 42, "trend": "Surging"},
        {"rank": 8, "name": "IoT", "sector": "Electronics", "demand": 75, "growth": 38, "trend": "Steady"},
        {"rank": 9, "name": "EV Technology", "sector": "Automotive", "demand": 74, "growth": 58, "trend": "Surging"},
        {"rank": 10, "name": "React", "sector": "IT & Software", "demand": 72, "growth": 30, "trend": "Steady"}
    ])

@app.route('/api/employer', methods=['POST'])
def api_submit_employer():
    data = request.json or request.form
    employer_name = data.get('employer_name')
    contact = data.get('contact')
    industry = data.get('industry')
    role = data.get('role')
    district = data.get('district')
    required_skills = data.get('required_skills', '')
    if isinstance(required_skills, list):
        required_skills = ",".join(required_skills)
    missing_skills = data.get('missing_skills', '')
    if isinstance(missing_skills, list):
        missing_skills = ",".join(missing_skills)
    comments = data.get('comments', '')

    if not employer_name or not contact or not role or not district or not required_skills:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO jobs (employer_name, contact, industry, role, district, required_skills, missing_skills, comments)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (employer_name, contact, industry, role, district, required_skills, missing_skills, comments))
    conn.commit()
    job_id = cursor.lastrowid
    conn.close()

    if request.is_json:
        return jsonify({"status": "success", "id": job_id, "message": "Requirement submitted successfully"}), 201
    return redirect(url_for('employer_confirmation'))

@app.route('/api/employer-responses')
def api_employer_responses():
    conn = get_db()
    district_filter = request.args.get('district')
    industry_filter = request.args.get('industry')

    query = "SELECT * FROM jobs WHERE 1=1"
    params = []
    if district_filter and district_filter != 'all':
        query += " AND district = ?"
        params.append(district_filter)
    if industry_filter and industry_filter != 'all':
        query += " AND industry = ?"
        params.append(industry_filter)
    query += " ORDER BY created_at DESC"

    jobs = conn.execute(query, params).fetchall()
    conn.close()
    return jsonify([dict(j) for j in jobs])

if __name__ == '__main__':
    auto_init_db()
    # Runs locally on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
