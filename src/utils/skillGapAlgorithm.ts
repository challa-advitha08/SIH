import { Course, CourseAlignmentResult, CourseSkill, SkillComparisonItem, SkillDemand } from '../types';

/**
 * SIH Skill Gap Algorithm (SIH-26134)
 * Compares Industry Demand against Course Coverage.
 * Calculates Alignment Score and generates actionable curriculum updates.
 */
export function calculateCourseSkillGap(
  course: Course,
  courseSkills: CourseSkill[],
  allDemands: SkillDemand[]
): CourseAlignmentResult {
  // Filter demands for this course's district or fall back to general demand
  const districtDemands = allDemands.filter((d) => d.district === course.district);

  let sumMinCoverageAndDemand = 0;
  let sumIndustryDemand = 0;

  const comparison: SkillComparisonItem[] = courseSkills.map((cs) => {
    // Look up demand for this skill in the course district or any district
    const matchedDemand =
      districtDemands.find((d) => d.skill_id === cs.skill_id) ||
      allDemands.find((d) => d.skill_id === cs.skill_id);

    const industry_demand = matchedDemand ? matchedDemand.demand_percentage : 70;
    const course_coverage = cs.coverage_percentage;
    const gap = industry_demand - course_coverage;

    sumMinCoverageAndDemand += Math.min(industry_demand, course_coverage);
    sumIndustryDemand += industry_demand;

    let status: 'High Skill Gap' | 'Moderate Skill Gap' | 'Aligned' = 'Aligned';
    if (gap >= 20) {
      status = 'High Skill Gap';
    } else if (gap >= 10) {
      status = 'Moderate Skill Gap';
    } else {
      status = 'Aligned';
    }

    return {
      skill_name: cs.skill_name,
      industry_demand,
      course_coverage,
      gap,
      status,
    };
  });

  // Calculate Alignment Score
  const alignment_score =
    sumIndustryDemand > 0
      ? Math.round((sumMinCoverageAndDemand / sumIndustryDemand) * 100)
      : 70;

  // Generate automated recommendations for skills with large gaps
  const recommendations: string[] = [];

  // Skills with High Gap (gap >= 20)
  const highGapSkills = comparison.filter((c) => c.gap >= 20);
  highGapSkills.forEach((item) => {
    recommendations.push(
      `Add dedicated 40-hour practical module on ${item.skill_name} (Current coverage: ${item.course_coverage}%, Market demand: ${item.industry_demand}%)`
    );
  });

  // Skills with Moderate Gap (gap >= 10 and < 20)
  const moderateGapSkills = comparison.filter((c) => c.gap >= 10 && c.gap < 20);
  moderateGapSkills.forEach((item) => {
    recommendations.push(
      `Strengthen hands-on lab exercises and assign graded industry projects for ${item.skill_name} to bridge the ${item.gap}% gap.`
    );
  });

  // General curriculum enhancement recommendations based on score
  if (alignment_score < 70) {
    recommendations.push(
      `Incorporate mandatory 4-week industry internship or capstone project with local ${course.district} employers.`
    );
    recommendations.push(
      `Organize guest masterclasses from industry practitioners in ${course.sector} sector.`
    );
  } else {
    recommendations.push(
      `Maintain current syllabus rigor and schedule bi-annual curriculum review with regional employer partners.`
    );
  }

  return {
    course,
    alignment_score,
    comparison,
    recommendations,
  };
}
