# SkillMesh: Labour-Market Intelligence & Curriculum Alignment Platform
**SIH Problem Statement ID: 26134**  
*Title: Challenges in aligning skill development programs with industry requirements and emerging job market demands*

---

## 🎯 Overview
SkillMesh is a data-driven intelligence platform that connects government vocational training programs (NSDC, MSKVIB, DVET, ITIs) with real-time industry demands across districts in Maharashtra. 

By comparing **Industry/Job Demand** against **Vocational Course Coverage**, SkillMesh:
1. Calculates a mathematical **Curriculum Alignment Score** (0-100).
2. Flags **High Skill Gaps (≥20% deficit)** and **Moderate Skill Gaps (10-19%)**.
3. Automatically generates **actionable curriculum update recommendations** for syllabus boards.
4. Provides a direct **Employer Feedback Pipeline** with autocomplete skill tagging and missing candidate skill reporting.
5. Surfaces **Top 10 Emerging Skills** with predictive demand trends.
6. Offers low-literacy accessibility with multilingual support in **English, Marathi (मराठी), and Hindi (हिंदी)**.

---

## 🏗️ Architecture & Tech Stack
- **Frontend**: HTML5, CSS3 (Modern Responsive Flex/Grid), Vanilla JavaScript, Chart.js for data visualization.
- **Backend**: Python 3, Flask framework.
- **Database**: SQLite3 (`skillmesh.db`) with 6 relational tables (`users`, `courses`, `skills`, `course_skills`, `skill_demand`, `jobs`).
- **Algorithm**: Rule-based skill gap matching & alignment score formula requiring zero paid external APIs.

---

## 🚀 How to Run Locally

### 1. Prerequisites
Ensure you have Python 3.8+ installed on your computer.

### 2. Setup Virtual Environment
```bash
# Navigate to the SkillMesh folder
cd SkillMesh

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux / macOS:
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Initialize Database & Seed Realistic Maharashtra Data
```bash
python data/seed_data.py
```
*(Note: `app.py` also checks and initializes the database automatically on startup if `skillmesh.db` is missing).*

### 5. Start the Flask Application
```bash
python app.py
```
Open your browser and navigate to: **`http://127.0.0.1:5000`**

---

## 📋 Database Schema (SQLite)

| Table | Columns |
|---|---|
| `users` | `id`, `name`, `email`, `password`, `role` |
| `courses` | `id`, `course_name`, `nsqf_level`, `district`, `sector`, `placement_rate` |
| `skills` | `id`, `skill_name`, `sector` |
| `course_skills` | `id`, `course_id`, `skill_id`, `coverage_percentage` |
| `skill_demand` | `id`, `skill_id`, `district`, `sector`, `demand_percentage`, `growth_percentage`, `date` |
| `jobs` | `id`, `employer_name`, `contact`, `industry`, `role`, `district`, `required_skills`, `missing_skills`, `comments`, `created_at` |

---

## 🧮 Skill Gap & Alignment Formula
For each course:
1. For each skill: `gap = industry_demand - course_coverage`
   - If `gap >= 20`: **High Skill Gap** (Red)
   - If `gap >= 10`: **Moderate Skill Gap** (Yellow)
   - Otherwise: **Aligned** (Green)
2. Alignment Score:
   $$\text{Alignment Score} = \frac{\sum \min(\text{industry demand}, \text{course coverage})}{\sum \text{industry demand}} \times 100$$
3. Recommendations are automatically formulated to introduce targeted 40-hour modules or hands-on labs for any skill with $\ge 20\%$ gap.

---

## 🌐 API Endpoints Reference
- `GET /api/skills`: Retrieve all skills in the database
- `GET /api/skills/search?q=<query>`: Autocomplete search (>= 3 chars)
- `GET /api/dashboard`: State KPI indicators and district severities
- `GET /api/district/<district_name>`: Granular district demand vs course list
- `GET /api/course/<course_id>`: Course curriculum audit, gap analysis & score
- `GET /api/emerging-skills`: Top 10 emerging skills with growth percentages
- `POST /api/employer`: Submit industry requirement and candidate deficit feedback
- `GET /api/employer-responses`: View all employer submissions with filters
