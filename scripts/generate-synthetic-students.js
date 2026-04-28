const fs = require("fs");

const csvPath = "C:/Users/bconn/OneDrive - Bentley University/Senior Year/Spring/CS 399/synthetic_students.csv";
const outPath = "synthetic-students.js";

const firstNames = [
  "Aaliyah", "Aaron", "Abigail", "Adam", "Adriana", "Aiden", "Alana", "Alex", "Amara", "Andre",
  "Anika", "Anthony", "Ari", "Ariana", "Asher", "Ava", "Ben", "Bianca", "Caleb", "Camila",
  "Carmen", "Carter", "Chloe", "Christian", "Dalia", "Daniel", "Elena", "Elias", "Emily", "Ethan",
  "Fatima", "Gabriel", "Grace", "Hannah", "Isaac", "Isabella", "Jada", "Julian", "Kai", "Layla",
  "Leo", "Lina", "Logan", "Maya", "Mila", "Nadia", "Noelle", "Owen", "Sofia", "Zion"
];

const lastNames = [
  "Adams", "Alvarez", "Anderson", "Bailey", "Baker", "Bennett", "Brooks", "Brown", "Bryant", "Campbell",
  "Carter", "Castillo", "Chambers", "Chen", "Coleman", "Collins", "Cook", "Cooper", "Cruz", "Davis",
  "Diaz", "Edwards", "Evans", "Fisher", "Flores", "Foster", "Garcia", "Gomez", "Gonzalez", "Gray",
  "Green", "Griffin", "Hall", "Harris", "Hayes", "Henderson", "Hernandez", "Hill", "Howard", "Hughes",
  "Jackson", "James", "Jenkins", "Johnson", "Jones", "Kelly", "Kim", "King", "Lee", "Lewis",
  "Long", "Lopez", "Martin", "Martinez", "Miller", "Mitchell", "Moore", "Morgan", "Morris", "Murphy",
  "Nelson", "Nguyen", "Ortiz", "Parker", "Patel", "Perez", "Peterson", "Phillips", "Price", "Ramirez",
  "Reed", "Reyes", "Richardson", "Rivera", "Roberts", "Robinson", "Rodriguez", "Rogers", "Ross", "Russell",
  "Sanchez", "Scott", "Singh", "Smith", "Stewart", "Taylor", "Thomas", "Thompson", "Torres", "Turner",
  "Walker", "Ward", "Watson", "White", "Williams", "Wilson", "Wood", "Wright", "Young", "Zimmerman"
];

const advisors = ["A-01", "A-02", "A-03", "A-04"];

function parseCsv(source) {
  const lines = source.trim().split(/\r?\n/);
  const headers = lines.shift().split(",");
  return lines.map((line) => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });
}

function cohortFromYear(year) {
  if (year === 1) return "First Year";
  if (year === 2) return "Sophomore";
  if (year === 3) return "Junior";
  return "Senior";
}

function majorName(value) {
  if (value === "CS") return "Computer Science";
  if (value === "Other") return "Exploratory Studies";
  return value;
}

const rows = parseCsv(fs.readFileSync(csvPath, "utf8"));
const targetAtRiskCount = Math.round(rows.length * 0.35);
const rankedRows = rows
  .map((row, index) => {
    const riskIndex =
      ((4 - Number(row.prior_term_gpa)) / 4) * 24 +
      ((100 - Number(row.current_grade_pct)) / 100) * 18 +
      (1 - Number(row.attendance_rate)) * 18 +
      (1 - Number(row.assignment_submission_rate)) * 14 +
      Number(row.missing_assignments_count) * 1.8 +
      Number(row.late_submissions_count) * 0.8 +
      Math.max(0, 16 - Number(row.lms_logins_last_14_days)) * 0.6 +
      Number(row.financial_hold) * 5 +
      Math.max(0, Number(row.work_hours_per_week) - 25) * 0.18 +
      Math.max(0, Number(row.commute_minutes) - 45) * 0.04;
    return { index, riskIndex };
  })
  .sort((a, b) => b.riskIndex - a.riskIndex);

const forcedAtRisk = new Set(rankedRows.slice(0, targetAtRiskCount).map((item) => item.index));

const students = rows.map((row, index) => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length)];
  const studentNumber = index + 2001;
  const year = Number(row.student_year);
  const major = majorName(row.major_group);
  const atRisk = forcedAtRisk.has(index);
  const missingAssignments = atRisk
    ? Math.max(Number(row.missing_assignments_count), 13 + (index % 6))
    : Math.min(Number(row.missing_assignments_count), 2);
  const lateSubmissions = atRisk
    ? Math.max(Number(row.late_submissions_count), 12 + (index % 8))
    : Math.min(Number(row.late_submissions_count), 3);
  const attendance = atRisk
    ? Math.min(Number(row.attendance_rate), 0.34 + ((index % 8) * 0.015))
    : Math.max(Number(row.attendance_rate), 0.78);
  const lmsLogins = atRisk
    ? Math.min(Number(row.lms_logins_last_14_days), index % 4)
    : Math.max(Number(row.lms_logins_last_14_days), 18);
  const priorGpa = atRisk
    ? Math.min(Number(row.prior_term_gpa), 1.05 + ((index % 5) * 0.08))
    : Math.max(Number(row.prior_term_gpa), 2.65);
  const currentGrade = atRisk
    ? Math.min(Number(row.current_grade_pct), 44 + (index % 10))
    : Math.max(Number(row.current_grade_pct), 76);
  const assignmentRate = atRisk
    ? Math.min(Number(row.assignment_submission_rate), 0.22 + ((index % 6) * 0.025))
    : Math.max(Number(row.assignment_submission_rate), 0.82);
  const supportHistory = [];

  if (missingAssignments >= 5) supportHistory.push("Missing assignment outreach recommended");
  if (attendance < 0.7) supportHistory.push("Attendance concern noted");
  if (Number(row.financial_hold) === 1) supportHistory.push("Financial hold review needed");
  if (Number(row.advisor_meetings_count) === 0) supportHistory.push("No recent advisor meeting");
  if (supportHistory.length === 0) supportHistory.push("Routine monitoring");

  const trendEnd = Math.round(((attendance - 0.82) * 40) - (missingAssignments * 0.8) - Math.max(0, 16 - lmsLogins) * 0.35);
  const interventions = [];
  if (atRisk && index % 4 === 0) {
    const type = attendance < 0.7 ? "Attendance outreach" : missingAssignments >= 4 ? "Assignment recovery plan" : "Academic coaching";
    interventions.push({
      id: `CSV-I-${studentNumber}`,
      type,
      status: "Open",
      opened: "2026-04-20",
      followUp: "2026-04-30",
      notes: "Imported synthetic record flagged for advisor follow-up.",
      outcome: "Pending"
    });
  }

  return {
    id: `CSV-${studentNumber}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@retentioniq.demo`,
    year,
    major,
    cohort: cohortFromYear(year),
    program: major,
    advisorId: advisors[index % advisors.length],
    enrollmentStatus: "Enrolled",
    retentionStatus: atRisk ? "At Risk" : "Monitor",
    status: atRisk ? "At Risk" : "Monitor",
    financialHold: Number(row.financial_hold) === 1,
    workHours: Number(row.work_hours_per_week),
    commute: Number(row.commute_minutes),
    academics: {
      priorGpa: Number(priorGpa.toFixed(2)),
      currentGrade: Math.round(currentGrade),
      creditsEnrolled: Number(row.credits_enrolled),
      creditsCompleted: Number(row.credits_completed_prior),
      missingAssignments,
      lateSubmissions,
      assignmentRate: Number(assignmentRate.toFixed(2))
    },
    engagement: {
      attendance: Number(attendance.toFixed(2)),
      lmsLogins,
      discussionPosts: Number(row.discussion_posts_count),
      events: Number(row.discussion_posts_count) % 6,
      advisingCheckins: Number(row.advisor_meetings_count),
      trend: [trendEnd + 6, trendEnd + 4, trendEnd + 3, trendEnd + 1, trendEnd, trendEnd - 1]
    },
    supportHistory,
    lastOutreachDays: Math.min(45, 3 + ((index * 7) % 41)),
    interventions
  };
});

const uniqueNames = new Set(students.map((student) => `${student.firstName} ${student.lastName}`));
if (uniqueNames.size !== students.length) {
  throw new Error(`Expected unique names, got ${uniqueNames.size} for ${students.length} students`);
}

fs.writeFileSync(outPath, `window.syntheticStudents = ${JSON.stringify(students)};\n`);
console.log(`Generated ${students.length} students with ${uniqueNames.size} unique names.`);
