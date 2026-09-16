"""
SkillMesh Database Initialization & Seed Data Script
SIH Problem Statement ID: 26134
Prepopulates SQLite database (skillmesh.db) with realistic Maharashtra labour market data.
"""

import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'skillmesh.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Enable foreign keys
    cursor.execute("PRAGMA foreign_keys = ON;")

    # 1. users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('admin', 'employer', 'guest'))
    );
    """)

    # 2. courses table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_name TEXT NOT NULL,
        nsqf_level INTEGER NOT NULL,
        district TEXT NOT NULL,
        sector TEXT NOT NULL,
        placement_rate REAL NOT NULL,
        duration_weeks INTEGER DEFAULT 24,
        enrolled_students INTEGER DEFAULT 150,
        demand_status TEXT DEFAULT 'Moderate Demand'
    );
    """)

    # 3. skills table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        skill_name TEXT UNIQUE NOT NULL,
        sector TEXT NOT NULL
    );
    """)

    # 4. course_skills table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS course_skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER NOT NULL,
        skill_id INTEGER NOT NULL,
        coverage_percentage REAL NOT NULL,
        FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE,
        FOREIGN KEY(skill_id) REFERENCES skills(id) ON DELETE CASCADE
    );
    """)

    # 5. skill_demand table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS skill_demand (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        skill_id INTEGER NOT NULL,
        district TEXT NOT NULL,
        sector TEXT NOT NULL,
        demand_percentage REAL NOT NULL,
        growth_percentage REAL NOT NULL,
        date TEXT NOT NULL,
        FOREIGN KEY(skill_id) REFERENCES skills(id) ON DELETE CASCADE
    );
    """)

    # 6. jobs table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employer_name TEXT NOT NULL,
        contact TEXT NOT NULL,
        industry TEXT NOT NULL,
        role TEXT NOT NULL,
        district TEXT NOT NULL,
        required_skills TEXT NOT NULL,
        missing_skills TEXT,
        comments TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Clear existing data to ensure clean idempotency
    cursor.execute("DELETE FROM jobs;")
    cursor.execute("DELETE FROM skill_demand;")
    cursor.execute("DELETE FROM course_skills;")
    cursor.execute("DELETE FROM courses;")
    cursor.execute("DELETE FROM skills;")
    cursor.execute("DELETE FROM users;")

    # Seed users
    cursor.executemany("""
    INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)
    """, [
        ('Maharashtra Skill Development Mission (MSDM)', 'admin@mahasiksham.gov.in', 'SkillGov@2026', 'admin'),
        ('Tata Motors Hiring Operations', 'careers@tatamotors.com', 'TataAuto@2026', 'employer'),
        ('Infosys Pune Talent Acquisition', 'hr@infosys.com', 'InfoPune@2026', 'employer'),
        ('Citizen Guest User', 'guest@skillmesh.in', 'guest123', 'guest')
    ])

    # Seed skills
    skills_data = [
        (1, 'Python', 'IT & Software'),
        (2, 'SQL', 'IT & Software'),
        (3, 'Power BI', 'Data & Analytics'),
        (4, 'AI/ML Basics', 'AI & Data Science'),
        (5, 'Cloud Computing (AWS/Azure)', 'IT & Infrastructure'),
        (6, 'React & Frontend Development', 'IT & Software'),
        (7, 'Cybersecurity & Network Defense', 'Cybersecurity'),
        (8, 'IoT & Sensor Systems', 'Electronics & Automation'),
        (9, 'EV Technology & Battery Management', 'Automotive'),
        (10, 'Industrial Automation & PLC', 'Manufacturing'),
        (11, 'Data Entry & Office Tools', 'Business & Office'),
        (12, 'Electrical Circuitry & Wiring', 'Electrical & Power'),
        (13, 'Solar PV Installation', 'Green Energy'),
        (14, 'Computer Numerical Control (CNC)', 'Manufacturing'),
        (15, 'DevOps & CI/CD Pipelines', 'IT & Infrastructure')
    ]
    cursor.executemany("INSERT INTO skills (id, skill_name, sector) VALUES (?, ?, ?)", skills_data)

    # Seed courses
    courses_data = [
        (1, 'Data Analytics & Business Intelligence', 5, 'Pune', 'IT & Software', 74, 24, 240, 'High Demand'),
        (2, 'Full Stack Web Development (React & Node)', 5, 'Mumbai', 'IT & Software', 82, 26, 310, 'High Demand'),
        (3, 'Cloud Infrastructure & AWS Administration', 6, 'Pune', 'IT & Infrastructure', 78, 20, 190, 'High Demand'),
        (4, 'Cybersecurity & Network Defense Technician', 5, 'Thane', 'Cybersecurity', 65, 24, 150, 'Moderate Demand'),
        (5, 'Electric Vehicle (EV) Powertrain & Battery Tech', 5, 'Nashik', 'Automotive', 71, 28, 180, 'High Demand'),
        (6, 'Industrial Electrician & Solar Panel Tech', 4, 'Nagpur', 'Electrical & Power', 62, 32, 220, 'Moderate Demand'),
        (7, 'Digital Data Entry & Office Automation', 3, 'Nanded', 'Business & Office', 42, 16, 290, 'Oversupplied'),
        (8, 'Advanced CNC Machine Programming', 5, 'Aurangabad', 'Manufacturing', 69, 24, 160, 'Moderate Demand'),
        (9, 'IoT & Smart Sensor Deployment', 6, 'Kolhapur', 'Electronics & Automation', 58, 22, 110, 'Moderate Demand')
    ]
    cursor.executemany("""
    INSERT INTO courses (id, course_name, nsqf_level, district, sector, placement_rate, duration_weeks, enrolled_students, demand_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, courses_data)

    # Seed course_skills (curriculum coverage %)
    course_skills_data = [
        # Course 1: Data Analytics (Pune)
        (1, 1, 80), # Python
        (1, 2, 90), # SQL
        (1, 3, 40), # Power BI (Gap!)
        (1, 4, 10), # AI/ML Basics (High Gap!)
        (1, 5, 25), # Cloud Computing

        # Course 2: Web Dev (Mumbai)
        (2, 6, 85), # React
        (2, 1, 50), # Python
        (2, 2, 75), # SQL
        (2, 5, 30), # Cloud Computing

        # Course 3: Cloud (Pune)
        (3, 5, 85), # Cloud Computing
        (3, 15, 50),# DevOps
        (3, 1, 60), # Python
        (3, 7, 40), # Cybersecurity

        # Course 4: Cybersecurity (Thane)
        (4, 7, 75),
        (4, 5, 40),
        (4, 1, 45),

        # Course 5: EV Powertrain (Nashik)
        (5, 9, 65),
        (5, 12, 85),
        (5, 8, 35),

        # Course 6: Electrician (Nagpur)
        (6, 12, 90),
        (6, 13, 40),
        (6, 8, 15),

        # Course 7: Data Entry (Nanded)
        (7, 11, 95),
        (7, 2, 15),
        (7, 3, 5),

        # Course 8: CNC (Aurangabad)
        (8, 14, 85),
        (8, 10, 45),
        (8, 8, 20),

        # Course 9: IoT (Kolhapur)
        (9, 8, 70),
        (9, 1, 40),
        (9, 12, 60)
    ]
    cursor.executemany("""
    INSERT INTO course_skills (course_id, skill_id, coverage_percentage) VALUES (?, ?, ?)
    """, course_skills_data)

    # Seed skill_demand (district level industry demands)
    skill_demand_data = [
        # Pune
        (1, 'Pune', 'IT & Software', 90, 28, '2026-08-01'), # Python
        (2, 'Pune', 'IT & Software', 85, 20, '2026-08-01'), # SQL
        (3, 'Pune', 'Data & Analytics', 80, 35, '2026-08-01'), # Power BI
        (4, 'Pune', 'AI & Data Science', 60, 58, '2026-08-01'), # AI/ML
        (5, 'Pune', 'IT & Infrastructure', 82, 42, '2026-08-01'), # Cloud
        (9, 'Pune', 'Automotive', 75, 62, '2026-08-01'),

        # Mumbai
        (6, 'Mumbai', 'IT & Software', 88, 30, '2026-08-01'),
        (1, 'Mumbai', 'IT & Software', 85, 26, '2026-08-01'),
        (7, 'Mumbai', 'Cybersecurity', 84, 48, '2026-08-01'),
        (5, 'Mumbai', 'IT & Infrastructure', 86, 45, '2026-08-01'),

        # Nashik
        (9, 'Nashik', 'Automotive', 82, 65, '2026-08-01'),
        (10, 'Nashik', 'Manufacturing', 78, 24, '2026-08-01'),
        (14, 'Nashik', 'Manufacturing', 72, 18, '2026-08-01'),

        # Nagpur
        (13, 'Nagpur', 'Green Energy', 74, 40, '2026-08-01'),
        (12, 'Nagpur', 'Electrical & Power', 70, 15, '2026-08-01'),
        (8, 'Nagpur', 'Electronics & Automation', 62, 38, '2026-08-01'),

        # Aurangabad
        (14, 'Aurangabad', 'Manufacturing', 80, 22, '2026-08-01'),
        (9, 'Aurangabad', 'Automotive', 76, 54, '2026-08-01'),
        (10, 'Aurangabad', 'Manufacturing', 70, 25, '2026-08-01'),

        # Thane
        (7, 'Thane', 'Cybersecurity', 82, 44, '2026-08-01'),
        (5, 'Thane', 'IT & Infrastructure', 79, 39, '2026-08-01'),

        # Kolhapur
        (10, 'Kolhapur', 'Manufacturing', 73, 22, '2026-08-01'),
        (8, 'Kolhapur', 'Electronics & Automation', 68, 35, '2026-08-01'),

        # Nanded
        (13, 'Nanded', 'Green Energy', 68, 42, '2026-08-01'),
        (3, 'Nanded', 'Data & Analytics', 52, 30, '2026-08-01'),
        (11, 'Nanded', 'Business & Office', 32, -12, '2026-08-01')
    ]
    cursor.executemany("""
    INSERT INTO skill_demand (skill_id, district, sector, demand_percentage, growth_percentage, date)
    VALUES (?, ?, ?, ?, ?, ?)
    """, skill_demand_data)

    # Seed sample jobs
    jobs_data = [
        ('Bajaj Auto Ltd', 'hiring@bajajauto.com | 020-27472851', 'Automotive & Mobility', 'EV Powertrain Diagnostic Engineer', 'Pune',
         'EV Technology & Battery Management,IoT & Sensor Systems,Python',
         'Battery Management diagnostics,CAN bus communication protocol',
         'Most ITI diploma candidates lack practical knowledge of battery balancing algorithms and high-voltage DC safety precautions.'),
        ('Persistent Systems', 'campus@persistent.com | 020-67030000', 'IT & Software', 'Junior Data Analyst', 'Pune',
         'SQL,Power BI,Python,AI/ML Basics',
         'Power BI DAX formulas,Live cloud database queries',
         'Students are taught theoretical SQL but struggle with complex multi-table joins, subqueries, and enterprise Power BI reporting dashboards.'),
        ('Godrej & Boyce Mfg Co', 'careers@godrej.com | 022-67961700', 'Manufacturing', 'Industrial Automation Specialist', 'Mumbai',
         'Industrial Automation & PLC,Electrical Circuitry & Wiring,IoT & Sensor Systems',
         'PLC ladder logic programming,SCADA troubleshooting',
         'Great fundamentals in classical electrical safety, but modern factories require PLC programming and IoT sensors on assembly lines.'),
        ('Mahindra & Mahindra', 'talent@mahindra.com | 0712-2589000', 'Automotive', 'Solar Agri-Tech Technician', 'Nagpur',
         'Solar PV Installation,Electrical Circuitry & Wiring',
         'Solar inverter micro-controller repairs',
         'Need technicians capable of handling both off-grid solar water pumps and smart IoT sensors in Vidarbha agriculture zones.')
    ]
    cursor.executemany("""
    INSERT INTO jobs (employer_name, contact, industry, role, district, required_skills, missing_skills, comments)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, jobs_data)

    conn.commit()
    conn.close()
    print("SkillMesh database initialized & seeded successfully at:", DB_PATH)

if __name__ == '__main__':
    init_db()
