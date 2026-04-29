const state = {
  role: "Advisor",
  activeView: "dashboard",
  selectedStudentId: "S-1047",
  selectedDocumentId: "",
  advisorFilter: "",
  cohortFilter: "All",
  threshold: 68,
  weights: {
    gpa: 24,
    grade: 18,
    attendance: 18,
    assignments: 16,
    lms: 9,
    support: 8,
    financial: 4,
    workload: 3
  },
  audit: [],
  documents: loadDocuments()
};

const advisors = [
  { id: "A-01", name: "Maya Chen", caseload: 42 },
  { id: "A-02", name: "Jordan Price", caseload: 39 },
  { id: "A-03", name: "Riley Patel", caseload: 37 },
  { id: "A-04", name: "Elena Moore", caseload: 44 }
];

const seedStudents = [
  {
    id: "S-1047",
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah.mitchell@retentioniq.demo",
    year: 2,
    major: "Biology",
    cohort: "Sophomore",
    program: "Science",
    advisorId: "A-01",
    enrollmentStatus: "Enrolled",
    retentionStatus: "At Risk",
    status: "At Risk",
    financialHold: false,
    workHours: 24,
    commute: 25,
    academics: { priorGpa: 2.1, currentGrade: 68, creditsEnrolled: 15, creditsCompleted: 42, missingAssignments: 6, lateSubmissions: 7, assignmentRate: 0.62 },
    engagement: { attendance: 0.58, lmsLogins: 9, discussionPosts: 3, events: 1, advisingCheckins: 1, trend: [-8, -7, -10, -13, -15, -18] },
    supportHistory: ["Missed advising appointment", "Tutoring referral pending"],
    lastOutreachDays: 21,
    interventions: [
      { id: "I-9001", type: "Academic coaching", status: "Open", opened: "2026-04-15", followUp: "2026-04-29", notes: "Prioritized biology lab assignments and contacted instructor.", outcome: "Pending" }
    ]
  },
  {
    id: "S-1088",
    firstName: "James",
    lastName: "Chen",
    email: "james.chen@retentioniq.demo",
    year: 1,
    major: "Computer Science",
    cohort: "First Year",
    program: "CS",
    advisorId: "A-02",
    enrollmentStatus: "Enrolled",
    retentionStatus: "At Risk",
    status: "At Risk",
    financialHold: true,
    workHours: 32,
    commute: 54,
    academics: { priorGpa: 2.4, currentGrade: 73, creditsEnrolled: 12, creditsCompleted: 18, missingAssignments: 4, lateSubmissions: 9, assignmentRate: 0.7 },
    engagement: { attendance: 0.66, lmsLogins: 5, discussionPosts: 1, events: 0, advisingCheckins: 0, trend: [-4, -5, -8, -11, -11, -14] },
    supportHistory: ["Financial aid question unresolved"],
    lastOutreachDays: 34,
    interventions: []
  },
  {
    id: "S-1129",
    firstName: "Olivia",
    lastName: "Harper",
    email: "olivia.harper@retentioniq.demo",
    year: 3,
    major: "Psychology",
    cohort: "Junior",
    program: "Arts",
    advisorId: "A-01",
    enrollmentStatus: "Enrolled",
    retentionStatus: "Monitor",
    status: "Monitor",
    financialHold: false,
    workHours: 16,
    commute: 15,
    academics: { priorGpa: 2.8, currentGrade: 79, creditsEnrolled: 15, creditsCompleted: 74, missingAssignments: 2, lateSubmissions: 3, assignmentRate: 0.84 },
    engagement: { attendance: 0.76, lmsLogins: 18, discussionPosts: 8, events: 2, advisingCheckins: 1, trend: [1, -1, -2, -2, -3, -4] },
    supportHistory: ["Career services referral"],
    lastOutreachDays: 9,
    interventions: [
      { id: "I-9014", type: "Check-in", status: "Closed", opened: "2026-04-02", followUp: "2026-04-11", notes: "Student requested time-management resources.", outcome: "Improved LMS activity" }
    ]
  },
  {
    id: "S-1183",
    firstName: "Marcus",
    lastName: "Rivera",
    email: "marcus.rivera@retentioniq.demo",
    year: 4,
    major: "Business",
    cohort: "Senior",
    program: "Business",
    advisorId: "A-03",
    enrollmentStatus: "Enrolled",
    retentionStatus: "At Risk",
    status: "At Risk",
    financialHold: false,
    workHours: 38,
    commute: 72,
    academics: { priorGpa: 1.9, currentGrade: 61, creditsEnrolled: 9, creditsCompleted: 102, missingAssignments: 8, lateSubmissions: 11, assignmentRate: 0.55 },
    engagement: { attendance: 0.52, lmsLogins: 4, discussionPosts: 0, events: 0, advisingCheckins: 0, trend: [-10, -12, -15, -19, -21, -25] },
    supportHistory: ["Academic probation notice", "No response to two outreach attempts"],
    lastOutreachDays: 6,
    interventions: [
      { id: "I-9030", type: "Escalation", status: "Open", opened: "2026-04-22", followUp: "2026-04-28", notes: "Escalated to success manager due to compounding academic and attendance risk.", outcome: "Pending" }
    ]
  },
  {
    id: "S-1210",
    firstName: "Priya",
    lastName: "Nair",
    email: "priya.nair@retentioniq.demo",
    year: 1,
    major: "Science",
    cohort: "First Year",
    program: "Science",
    advisorId: "A-04",
    enrollmentStatus: "Enrolled",
    retentionStatus: "Improving",
    status: "Improving",
    financialHold: false,
    workHours: 10,
    commute: 18,
    academics: { priorGpa: 3.1, currentGrade: 83, creditsEnrolled: 16, creditsCompleted: 16, missingAssignments: 1, lateSubmissions: 2, assignmentRate: 0.9 },
    engagement: { attendance: 0.86, lmsLogins: 26, discussionPosts: 11, events: 3, advisingCheckins: 2, trend: [-3, -1, 1, 4, 6, 8] },
    supportHistory: ["Tutoring completed"],
    lastOutreachDays: 4,
    interventions: [
      { id: "I-9044", type: "Tutoring", status: "Closed", opened: "2026-03-27", followUp: "2026-04-08", notes: "Math support plan completed.", outcome: "Improving" }
    ]
  },
  {
    id: "S-1302",
    firstName: "Noah",
    lastName: "Bennett",
    email: "noah.bennett@retentioniq.demo",
    year: 2,
    major: "Undeclared",
    cohort: "Sophomore",
    program: "Exploratory",
    advisorId: "A-02",
    enrollmentStatus: "Enrolled",
    retentionStatus: "Data Review",
    status: "Data Review",
    financialHold: false,
    workHours: 12,
    commute: 42,
    academics: { priorGpa: null, currentGrade: 75, creditsEnrolled: 12, creditsCompleted: 31, missingAssignments: 3, lateSubmissions: 2, assignmentRate: null },
    engagement: { attendance: 0.72, lmsLogins: 12, discussionPosts: 4, events: 1, advisingCheckins: 1, trend: [0, -2, -3, -2, -5, -6] },
    supportHistory: ["Transfer transcript pending"],
    lastOutreachDays: 18,
    interventions: []
  }
];

const students = [...seedStudents, ...(window.syntheticStudents || [])];

const reportSeries = {
  labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
  engagement: [71, 73, 76, 74, 70, 67],
  risk: [22, 24, 27, 30, 33, 35],
  interventions: [43, 50, 61, 67, 72, 78]
};

function loadDocuments() {
  try {
    return JSON.parse(localStorage.getItem("retentionIqDocuments") || "[]");
  } catch {
    return [];
  }
}

function persistDocuments() {
  localStorage.setItem("retentionIqDocuments", JSON.stringify(state.documents));
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "[]", roles: ["Advisor", "Student Success Manager", "Administrator"] },
  { id: "queue", label: "At-risk queue", icon: "!", roles: ["Advisor", "Student Success Manager"] },
  { id: "student", label: "Student detail", icon: "o", roles: ["Advisor", "Student Success Manager", "Administrator"] },
  { id: "interventions", label: "Interventions", icon: "+", roles: ["Advisor", "Student Success Manager"] },
  { id: "trends", label: "Trends & reports", icon: "~", roles: ["Advisor", "Student Success Manager", "Administrator"] },
  { id: "documents", label: "Documents", icon: "#", roles: ["Advisor", "Student Success Manager", "Administrator"] },
  { id: "admin", label: "Admin settings", icon: "*", roles: ["Administrator"] }
];

function requiredDataMissing(student) {
  return [
    student.academics.priorGpa,
    student.academics.assignmentRate,
    student.engagement.attendance,
    student.engagement.lmsLogins
  ].some((value) => value === null || value === undefined || Number.isNaN(value));
}

function riskFactorScore(student) {
  if (requiredDataMissing(student)) {
    return { score: null, level: "Data Review", factors: [{ type: "Data quality", score: 100, description: "Required academic or engagement data is missing; record needs review before final scoring." }] };
  }

  const w = state.weights;
  const factors = [
    {
      type: "Prior GPA",
      score: Math.max(0, (2.7 - student.academics.priorGpa) / 2.7) * w.gpa,
      description: `Prior term GPA is ${student.academics.priorGpa.toFixed(1)}, below the 2.7 monitoring benchmark.`
    },
    {
      type: "Current grade",
      score: Math.max(0, (78 - student.academics.currentGrade) / 78) * w.grade,
      description: `Current average is ${student.academics.currentGrade}%, indicating course performance pressure.`
    },
    {
      type: "Attendance",
      score: Math.max(0, (0.86 - student.engagement.attendance) / 0.86) * w.attendance,
      description: `Attendance is ${percent(student.engagement.attendance)}, below the expected participation range.`
    },
    {
      type: "Assignments",
      score: ((student.academics.missingAssignments / 12) * 0.65 + (1 - student.academics.assignmentRate) * 0.35) * w.assignments,
      description: `${student.academics.missingAssignments} missing assignments and ${percent(student.academics.assignmentRate)} submission rate.`
    },
    {
      type: "LMS activity",
      score: Math.max(0, (20 - student.engagement.lmsLogins) / 20) * w.lms,
      description: `${student.engagement.lmsLogins} LMS logins in the last 14 days.`
    },
    {
      type: "Support history",
      score: Math.min(student.supportHistory.length * 0.35 + Math.max(0, student.lastOutreachDays - 14) / 50, 1) * w.support,
      description: `${student.supportHistory.length} support-history signals; last outreach ${student.lastOutreachDays} days ago.`
    },
    {
      type: "Financial hold",
      score: student.financialHold ? w.financial : 0,
      description: student.financialHold ? "Financial hold may create registration or persistence barriers." : "No financial hold is recorded."
    },
    {
      type: "Work and commute",
      score: (Math.max(0, student.workHours - 25) / 20 + Math.max(0, student.commute - 45) / 120) * w.workload,
      description: `${student.workHours} work hours weekly and ${student.commute} minute commute.`
    }
  ].map((factor) => ({ ...factor, score: Math.max(0, Math.min(100, factor.score)) }));

  const raw = factors.reduce((sum, factor) => sum + factor.score, 0);
  const trendPenalty = Math.max(0, Math.abs(student.engagement.trend.at(-1))) * 0.45;
  const score = Math.min(100, Math.round(raw + trendPenalty));
  const level = score >= 82 ? "Critical" : score >= state.threshold ? "High" : score >= 50 ? "Medium" : "Low";
  return {
    score,
    level,
    factors: factors.sort((a, b) => b.score - a.score).slice(0, 4)
  };
}

function statusFor(student) {
  const risk = riskFactorScore(student);
  if (risk.score === null) return "Data Review";
  if (risk.score >= state.threshold) return "At Risk";
  if (student.status === "Improving") return "Improving";
  return "Monitor";
}

function priorityScore(student) {
  const risk = riskFactorScore(student);
  if (risk.score === null) return 0;
  const staleOutreach = Math.min(student.lastOutreachDays, 45) * 0.45;
  const trend = Math.max(0, Math.abs(student.engagement.trend.at(-1))) * 0.8;
  return Math.round(risk.score + staleOutreach + trend);
}

function recommendationsFor(student) {
  const factors = riskFactorScore(student).factors.map((f) => f.type);
  const recs = [];
  if (factors.includes("Attendance")) recs.push({ category: "Attendance", title: "Attendance recovery plan", description: "Schedule a participation check-in, identify barriers, and notify instructors for attendance expectations.", priority: "High" });
  if (factors.includes("Assignments") || factors.includes("Current grade") || factors.includes("Prior GPA")) recs.push({ category: "Academic", title: "Tutoring and assignment sprint", description: "Connect student with tutoring and create a two-week missing assignment recovery plan.", priority: "High" });
  if (factors.includes("LMS activity")) recs.push({ category: "Engagement", title: "Digital engagement nudge", description: "Send LMS activity guidance and verify access to course materials.", priority: "Medium" });
  if (factors.includes("Financial hold")) recs.push({ category: "Support", title: "Financial aid resolution", description: "Coordinate with financial aid to resolve holds before registration windows.", priority: "High" });
  if (student.lastOutreachDays > 14) recs.push({ category: "Outreach", title: "Rapid advisor outreach", description: "Call and email today; set a follow-up date within five business days.", priority: "High" });
  return recs.length ? recs : [{ category: "Monitor", title: "Maintain monthly check-in", description: "Continue monitoring engagement and keep the next advising touchpoint scheduled.", priority: "Low" }];
}

function render() {
  students.forEach((student) => {
    const risk = riskFactorScore(student);
    student.riskScore = risk.score;
    student.riskLevel = risk.level;
    student.retentionStatus = statusFor(student);
  });
  renderNav();
  setActiveView(state.activeView);
}

function renderNav() {
  const nav = document.querySelector("#navTabs");
  nav.innerHTML = "";
  navItems.filter((item) => item.roles.includes(state.role)).forEach((item) => {
    const button = document.createElement("button");
    button.className = `nav-button ${state.activeView === item.id ? "active" : ""}`;
    button.type = "button";
    button.innerHTML = `<span>${item.icon}</span><strong>${item.label}</strong>`;
    button.addEventListener("click", () => setActiveView(item.id));
    nav.append(button);
  });
}

function setActiveView(viewId) {
  const allowed = navItems.find((item) => item.id === viewId)?.roles.includes(state.role);
  state.activeView = allowed ? viewId : "dashboard";
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  document.querySelector(`#${state.activeView}View`).classList.add("active");
  document.querySelector("#pageTitle").textContent = navItems.find((item) => item.id === state.activeView).label.replace("&", "and");
  renderNav();
  const renderers = {
    dashboard: renderDashboard,
    queue: renderQueue,
    student: renderStudentDetail,
    interventions: renderInterventions,
    trends: renderTrends,
    documents: renderDocuments,
    admin: renderAdmin
  };
  renderers[state.activeView]();
}

function visibleStudents() {
  const query = document.querySelector("#searchInput").value.trim().toLowerCase();
  return students.filter((student) => {
    const haystack = `${student.firstName} ${student.lastName} ${student.email} ${student.major} ${student.program} ${advisorName(student.advisorId)}`.toLowerCase();
    const cohortOk = state.cohortFilter === "All" || student.cohort === state.cohortFilter;
    const advisorOk = !state.advisorFilter || student.advisorId === state.advisorFilter;
    return cohortOk && advisorOk && (!query || haystack.includes(query));
  });
}

function renderStats(target, stats) {
  const template = document.querySelector("#statTemplate");
  const wrap = document.createElement("div");
  wrap.className = "grid cols-4";
  stats.forEach((stat, index) => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".stat");
    node.querySelector(".stat-label").textContent = stat.label;
    node.querySelector(".stat-value").textContent = stat.value;
    const delta = node.querySelector(".stat-delta");
    delta.textContent = stat.delta;
    delta.className = `stat-delta ${stat.direction || ""}`;
    if (stat.view) {
      card.classList.add("clickable");
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${stat.label}: open ${stat.view}`);
      card.addEventListener("click", () => openMetricDestination(stat.view));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openMetricDestination(stat.view);
        }
      });
    }
    wrap.append(node);
  });
  target.append(wrap);
}

function renderDashboard() {
  const root = document.querySelector("#dashboardView");
  root.innerHTML = "";
  const all = visibleStudents();
  const atRisk = all.filter((s) => s.retentionStatus === "At Risk").length;
  const avgRisk = Math.round(all.filter((s) => s.riskScore !== null).reduce((sum, s) => sum + s.riskScore, 0) / all.filter((s) => s.riskScore !== null).length);
  const riskRate = all.length ? Math.round((atRisk / all.length) * 100) : 0;
  const retentionHealth = all.length ? `${Math.round(100 - riskRate)}%` : "0%";
  renderStats(root, [
    { label: "Active students", value: all.length.toLocaleString(), delta: "Open student list", direction: "good", view: "student" },
    { label: "Engagement rate", value: "82%", delta: "Open trend dashboard", direction: "bad", view: "trends" },
    { label: "At-risk students", value: atRisk.toLocaleString(), delta: "Open prioritized queue", direction: "bad", view: "queue" },
    { label: "Retention health", value: retentionHealth, delta: "Open reports", direction: riskRate > 30 ? "bad" : "good", view: "trends" }
  ]);

  root.insertAdjacentHTML("beforeend", `
    <div class="grid cols-2">
      <section class="panel">
        <h2>Engagement and Risk Trends</h2>
        <canvas class="chart" id="trendCanvas" width="900" height="260" aria-label="Engagement and risk trend chart"></canvas>
        <div class="chart-detail" id="trendCanvasDetail">Hover over a point or click a month to inspect engagement and risk.</div>
      </section>
      <section class="panel">
        <h2>Risk Distribution</h2>
        <canvas class="chart" id="riskCanvas" width="420" height="260" aria-label="Risk distribution chart"></canvas>
        <div class="chart-detail" id="riskCanvasDetail">Hover over a slice or click a risk level to inspect the roster segment.</div>
      </section>
    </div>
    <div class="grid cols-2">
      <section class="panel">
        <h2>Recent At-Risk Alerts</h2>
        ${studentAlertList(queueStudents().slice(0, 4))}
      </section>
      <section class="panel">
        <h2>Advisor Workload</h2>
        ${advisorWorkload()}
      </section>
    </div>
  `);
  drawLineChart("trendCanvas", [
    { label: "Engagement", color: "#008a7a", values: reportSeries.engagement },
    { label: "Risk", color: "#c73535", values: reportSeries.risk }
  ], reportSeries.labels);
  drawPie("riskCanvas");
}

function renderQueue() {
  const root = document.querySelector("#queueView");
  const queued = queueStudents();
  const reachedThisWeek = Math.round(queued.length * 0.31);
  root.innerHTML = "";
  renderStats(root, [
    { label: "Total flagged", value: queued.length.toLocaleString(), delta: "35% flagged by active threshold", direction: "bad" },
    { label: "Reached this week", value: reachedThisWeek.toLocaleString(), delta: "+12% from prior week", direction: "good" },
    { label: "Avg time to action", value: "18h", delta: "Target under 24h", direction: "good" },
    { label: "Overdue follow-ups", value: overdueFollowUps().length, delta: "-4 since Monday", direction: "good" }
  ]);
  root.insertAdjacentHTML("beforeend", `
    <div class="grid cols-2">
      <section class="panel">
        <h2>Prioritized Outreach Queue</h2>
        ${studentQueueTable(queued)}
      </section>
      <section class="panel">
        <h2>Top Risk Signals</h2>
        ${riskSignalList()}
        <h2>Outreach Rules</h2>
        <div class="timeline">
          <div class="timeline-item">Critical risk or no recent outreach: contact within 24 hours.</div>
          <div class="timeline-item">Worsening attendance trend: schedule advisor check-in.</div>
          <div class="timeline-item">Financial hold: route to financial aid support.</div>
        </div>
      </section>
    </div>
  `);
}

function renderStudentDetail() {
  const root = document.querySelector("#studentView");
  const selected = selectedStudent();
  const risk = riskFactorScore(selected);
  const filteredAdvisor = advisors.find((advisor) => advisor.id === state.advisorFilter);
  root.innerHTML = `
    <section class="profile-head">
      <div>
        <div class="profile-name">
          <h2>${selected.firstName} ${selected.lastName}</h2>
          ${badge(selected.retentionStatus)}
          ${badge(risk.level)}
        </div>
        <p class="muted">${selected.id} - ${selected.email} - ${selected.major} - ${selected.cohort}</p>
      </div>
      <div class="split-actions">
        <select id="studentSelect">${students.map((s) => `<option value="${s.id}" ${s.id === selected.id ? "selected" : ""}>${s.firstName} ${s.lastName}</option>`).join("")}</select>
        <button class="secondary" id="escalateButton" type="button">Escalate</button>
      </div>
    </section>

    <section class="panel">
      <div class="split-actions document-toolbar">
        <h2>${filteredAdvisor ? `${filteredAdvisor.name} Caseload` : "Student List"}</h2>
        ${filteredAdvisor ? `<button class="ghost" type="button" onclick="clearAdvisorFilter()">Clear advisor filter</button>` : ""}
      </div>
      ${studentListTable(visibleStudents())}
    </section>

    <div class="grid cols-2">
      <section class="panel">
        <h2>Student Profile</h2>
        <div class="meta-grid">
          ${kv("Advisor", advisorName(selected.advisorId))}
          ${kv("Enrollment", selected.enrollmentStatus)}
          ${kv("Risk score", selected.riskScore === null ? "Data review" : selected.riskScore)}
          ${kv("Current grade", `${selected.academics.currentGrade}%`)}
          ${kv("Prior GPA", selected.academics.priorGpa ?? "Missing")}
          ${kv("Attendance", percent(selected.engagement.attendance))}
          ${kv("LMS logins", selected.engagement.lmsLogins)}
          ${kv("Missing assignments", selected.academics.missingAssignments)}
          ${kv("Support history", selected.supportHistory.join("; "))}
        </div>
        <div class="split-actions">
          <label>Assigned advisor<select id="advisorAssign">${advisors.map((advisor) => `<option value="${advisor.id}" ${advisor.id === selected.advisorId ? "selected" : ""}>${advisor.name}</option>`).join("")}</select></label>
          <label>Student status<select id="statusUpdate">${["At Risk", "Monitor", "Improving", "Data Review"].map((status) => `<option ${status === selected.status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
          <button class="secondary" id="saveStudentAdmin" type="button">Update student</button>
        </div>
      </section>
      <section class="panel">
        <h2>Explainability Panel</h2>
        ${risk.factors.map((factor) => `
          <div class="factor">
            <strong>${factor.type}<span>${Math.round(factor.score)} pts</span></strong>
            <p class="small">${factor.description}</p>
          </div>
        `).join("")}
      </section>
    </div>

    <div class="grid cols-2">
      <section class="panel">
        <h2>Recommended Interventions</h2>
        ${recommendationsFor(selected).map((rec, index) => `
          <article class="recommendation">
            <strong>${rec.title} ${badge(rec.priority)}</strong>
            <span class="small">${rec.category}</span>
            <p>${rec.description}</p>
            <button class="secondary addRec" data-index="${index}" type="button">Add to plan</button>
          </article>
        `).join("")}
      </section>
      <section class="panel">
        <h2>Academic and Engagement Trend</h2>
        <canvas class="chart" id="studentTrendCanvas" width="700" height="260"></canvas>
      </section>
    </div>

    <section class="panel">
      <h2>Interventions and Outcomes</h2>
      ${interventionTimeline(selected)}
    </section>
  `;
  document.querySelector("#studentSelect").addEventListener("change", (event) => {
    state.selectedStudentId = event.target.value;
    renderStudentDetail();
  });
  document.querySelector("#escalateButton").addEventListener("click", () => escalateStudent(selected.id));
  document.querySelector("#saveStudentAdmin").addEventListener("click", () => updateStudentAssignment(selected.id));
  document.querySelectorAll(".addRec").forEach((button) => button.addEventListener("click", () => addRecommendation(selected.id, Number(button.dataset.index))));
  drawLineChart("studentTrendCanvas", [
    { label: "Engagement change", color: "#3a63d8", values: selected.engagement.trend.map((value) => 70 + value) },
    { label: "Assignment completion", color: "#008a7a", values: Array.from({ length: 6 }, (_, i) => Math.round(selected.academics.assignmentRate * 100) - 5 + i) }
  ], reportSeries.labels);
}

function studentListTable(rows) {
  const shown = rows.slice(0, 80);
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Student</th><th>Major</th><th>Cohort</th><th>Advisor</th><th>Risk</th><th>Status</th><th></th></tr></thead>
        <tbody>${shown.map((student) => `<tr>
          <td><strong>${student.firstName} ${student.lastName}</strong><br><span class="small">${student.id}</span></td>
          <td>${student.major}</td>
          <td>${student.cohort}</td>
          <td>${advisorName(student.advisorId)}</td>
          <td>${student.riskScore === null ? "Review" : student.riskScore} ${badge(student.riskLevel)}</td>
          <td>${badge(student.retentionStatus)}</td>
          <td><button class="secondary" onclick="openStudent('${student.id}')" type="button">Open</button></td>
        </tr>`).join("")}</tbody>
      </table>
    </div>
    ${rows.length > shown.length ? `<p class="small table-note">Showing ${shown.length} of ${rows.length.toLocaleString()} matching students. Search by name, major, program, or advisor to refine.</p>` : ""}
  `;
}

function renderInterventions() {
  const root = document.querySelector("#interventionsView");
  const selected = selectedStudent();
  const allInterventions = students.flatMap((student) => student.interventions.map((item) => ({ student, item })));
  root.innerHTML = `
    <div class="grid cols-4">
      <article class="stat"><span class="stat-label">Open interventions</span><strong class="stat-value">${allInterventions.filter(({ item }) => item.status === "Open").length}</strong><span class="stat-delta">Across active caseloads</span></article>
      <article class="stat"><span class="stat-label">Follow-ups due</span><strong class="stat-value">${overdueFollowUps().length}</strong><span class="stat-delta bad">Needs advisor action</span></article>
      <article class="stat"><span class="stat-label">Closed outcomes</span><strong class="stat-value">${allInterventions.filter(({ item }) => item.status === "Closed").length}</strong><span class="stat-delta good">Logged and reportable</span></article>
      <article class="stat"><span class="stat-label">Selected student</span><strong class="stat-value">${selected.riskScore === null ? "Review" : selected.riskScore}</strong><span class="stat-delta">${selected.firstName} ${selected.lastName}</span></article>
    </div>
    <div class="grid cols-2">
      <section class="panel">
        <h2>Record Intervention</h2>
        <div class="intervention-form">
          <label class="field">Student<select id="interventionStudent">${students.map((s) => `<option value="${s.id}" ${s.id === selected.id ? "selected" : ""}>${s.firstName} ${s.lastName}</option>`).join("")}</select></label>
          <label class="field">Type<select id="interventionType"><option>Academic coaching</option><option>Attendance outreach</option><option>Tutoring</option><option>Financial aid referral</option><option>Escalation</option><option>Custom support</option></select></label>
          <label class="field">Follow-up date<input id="followUpDate" type="date" value="2026-05-01"></label>
          <label class="field">Outcome<select id="interventionOutcome"><option>Pending</option><option>Student responded</option><option>Meeting scheduled</option><option>Improving</option><option>No response</option><option>Escalated</option></select></label>
          <label class="field notes-field">Advisor notes<textarea id="interventionNotes" placeholder="Record contact method, student response, support action, and next step."></textarea></label>
          <div class="split-actions form-actions">
            <button class="primary" id="saveIntervention" type="button">Save intervention</button>
            <button class="ghost" id="markNoResponse" type="button">Mark no response</button>
          </div>
        </div>
      </section>
      <section class="panel">
        <h2>Immediate Follow-Ups</h2>
        <div class="timeline">${overdueFollowUps().map((item) => `<div class="timeline-item"><strong>${item.student}</strong><br><span class="small">${item.detail}</span></div>`).join("")}</div>
      </section>
    </div>
    <section class="panel">
      <h2>Intervention History</h2>
      ${interventionTable()}
    </section>
    <section class="panel">
      <h2>Saved Advisor Notes</h2>
      ${documentList("Advisor Note", 5)}
    </section>
  `;
  document.querySelector("#interventionStudent").addEventListener("change", (event) => {
    state.selectedStudentId = event.target.value;
  });
  document.querySelector("#saveIntervention").addEventListener("click", saveIntervention);
  document.querySelector("#markNoResponse").addEventListener("click", markNoResponse);
}

function renderTrends() {
  const root = document.querySelector("#trendsView");
  root.innerHTML = `
    <div class="split-actions">
      <select id="cohortFilter">${["All", "First Year", "Sophomore", "Junior", "Senior"].map((c) => `<option ${c === state.cohortFilter ? "selected" : ""}>${c}</option>`).join("")}</select>
      <button class="secondary" id="cohortReport" type="button">Generate cohort report</button>
    </div>
    <div class="grid cols-3">
      <section class="panel">
        <h2>Engagement Trend</h2>
        <canvas class="chart" id="engagementCanvas" width="500" height="260"></canvas>
      </section>
      <section class="panel">
        <h2>Intervention Effectiveness</h2>
        <canvas class="chart" id="interventionCanvas" width="500" height="260"></canvas>
      </section>
      <section class="panel">
        <h2>Cohort Watchlist</h2>
        ${cohortWatchlist()}
      </section>
    </div>
    <section class="panel">
      <h2>Reporting Dashboard</h2>
      ${cohortTable()}
    </section>
    <section class="panel">
      <h2>Saved Reports</h2>
      ${documentList("Cohort Report", 5)}
    </section>
  `;
  document.querySelector("#cohortFilter").addEventListener("change", (event) => {
    state.cohortFilter = event.target.value;
    renderTrends();
  });
  document.querySelector("#cohortReport").addEventListener("click", generateCohortReport);
  drawLineChart("engagementCanvas", [{ label: "Engagement", color: "#008a7a", values: reportSeries.engagement }], reportSeries.labels);
  drawLineChart("interventionCanvas", [{ label: "Success rate", color: "#3a63d8", values: reportSeries.interventions }], reportSeries.labels);
}

function renderDocuments() {
  const root = document.querySelector("#documentsView");
  const reports = state.documents.filter((doc) => doc.type === "Cohort Report").length;
  const notes = state.documents.filter((doc) => doc.type === "Advisor Note").length;
  root.innerHTML = `
    <div class="grid cols-4">
      <article class="stat"><span class="stat-label">Saved documents</span><strong class="stat-value">${state.documents.length}</strong><span class="stat-delta">Stored in this browser</span></article>
      <article class="stat"><span class="stat-label">Reports</span><strong class="stat-value">${reports}</strong><span class="stat-delta">Generated from Trends</span></article>
      <article class="stat"><span class="stat-label">Advisor notes</span><strong class="stat-value">${notes}</strong><span class="stat-delta">Saved from interventions</span></article>
      <article class="stat"><span class="stat-label">Latest</span><strong class="stat-value">${state.documents[0] ? state.documents[0].createdAt.slice(5, 10) : "--"}</strong><span class="stat-delta">${state.documents[0]?.title || "No documents yet"}</span></article>
    </div>
    <section class="panel">
      <div class="split-actions document-toolbar">
        <h2>Document Library</h2>
        <button class="secondary" type="button" onclick="generateCohortReport()">Generate current report</button>
      </div>
      ${documentList("All", 100)}
    </section>
  `;
}

function generateCohortReport() {
  const cohort = state.cohortFilter;
  const rows = cohort === "All" ? students : students.filter((student) => student.cohort === cohort);
  const scored = rows.filter((student) => student.riskScore !== null);
  const atRisk = rows.filter((student) => student.retentionStatus === "At Risk");
  const interventions = rows.flatMap((student) => student.interventions.map((item) => ({ student, item })));
  const avgRisk = scored.length ? Math.round(scored.reduce((sum, student) => sum + student.riskScore, 0) / scored.length) : 0;
  const reportText = [
    `RetentionIQ Cohort Report`,
    `Cohort: ${cohort}`,
    `Generated: ${todayStamp()}`,
    ``,
    `Students reviewed: ${rows.length.toLocaleString()}`,
    `At-risk students: ${atRisk.length.toLocaleString()}`,
    `Average risk score: ${avgRisk}`,
    `Open interventions: ${interventions.filter(({ item }) => item.status === "Open").length.toLocaleString()}`,
    `Closed outcomes: ${interventions.filter(({ item }) => item.status === "Closed").length.toLocaleString()}`,
    ``,
    `Top priority students:`,
    ...atRisk.sort((a, b) => priorityScore(b) - priorityScore(a)).slice(0, 10).map((student, index) => `${index + 1}. ${student.firstName} ${student.lastName} - risk ${student.riskScore}, advisor ${advisorName(student.advisorId)}`)
  ].join("\n");

  saveDocument({
    type: "Cohort Report",
    title: `${cohort} cohort report`,
    studentId: "",
    studentName: cohort,
    content: reportText
  });
  showNotice(`${cohort} cohort report saved to Documents.`);
  if (state.activeView === "trends") renderTrends();
  if (state.activeView === "documents") renderDocuments();
}

function renderAdmin() {
  const root = document.querySelector("#adminView");
  root.innerHTML = `
    <section class="panel">
      <h2>Risk Thresholds and Rules</h2>
      <div class="settings-row">
        <div><strong>At-risk threshold</strong><p class="small">Students are flagged when score is greater than or equal to this value.</p></div>
        <input id="thresholdInput" type="number" min="1" max="100" value="${state.threshold}">
        <button class="primary" id="saveThreshold" type="button">Update</button>
      </div>
      ${Object.entries(state.weights).map(([key, value]) => `
        <div class="settings-row">
          <div><strong>${titleCase(key)} factor weight</strong><p class="small">Used in future risk calculations and explainability scoring.</p></div>
          <input class="weightInput" data-key="${key}" type="number" min="0" max="40" value="${value}">
          <span class="small">points</span>
        </div>
      `).join("")}
      <button class="secondary" id="saveWeights" type="button">Save factor weights</button>
    </section>
    <section class="panel">
      <h2>Reporting Views</h2>
      <div class="split-actions">
        <button class="ghost" type="button">Advisor caseload view</button>
        <button class="ghost" type="button">Cohort retention view</button>
        <button class="ghost" type="button">Intervention outcomes view</button>
      </div>
    </section>
    <section class="panel">
      <h2>Risk Status Audit</h2>
      ${auditTable()}
    </section>
  `;
  document.querySelector("#saveThreshold").addEventListener("click", () => {
    state.threshold = clamp(Number(document.querySelector("#thresholdInput").value), 1, 100);
    logAudit("Administrator", "Updated risk threshold", `New threshold: ${state.threshold}`);
    showNotice(`Risk threshold updated to ${state.threshold}. Future calculations now use the new value.`);
    render();
  });
  document.querySelector("#saveWeights").addEventListener("click", () => {
    document.querySelectorAll(".weightInput").forEach((input) => {
      state.weights[input.dataset.key] = clamp(Number(input.value), 0, 40);
    });
    logAudit("Administrator", "Updated factor weights", "Risk scoring weights changed");
    showNotice("Factor weights updated and risk scores recalculated.");
    render();
  });
}

function queueStudents() {
  return visibleStudents()
    .filter((student) => student.retentionStatus === "At Risk")
    .sort((a, b) => priorityScore(b) - priorityScore(a));
}

function studentQueueTable(rows) {
  const shown = rows.slice(0, 80);
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Student</th><th>Priority</th><th>Risk</th><th>Reason</th><th>Advisor</th><th>Due</th><th></th></tr></thead>
        <tbody>${shown.map((student) => {
          const top = riskFactorScore(student).factors[0];
          return `<tr>
            <td><strong>${student.firstName} ${student.lastName}</strong><br><span class="small">${student.major} - ${student.cohort}</span></td>
            <td>${priorityScore(student)}</td>
            <td>${badge(student.riskLevel)}<br><strong>${student.riskScore}</strong></td>
            <td>${top.description}</td>
            <td>${advisorName(student.advisorId)}</td>
            <td>${student.lastOutreachDays > 14 ? "Today" : "This week"}</td>
            <td><button class="secondary" onclick="openStudent('${student.id}')" type="button">View</button></td>
          </tr>`;
        }).join("")}</tbody>
      </table>
    </div>
    ${rows.length > shown.length ? `<p class="small table-note">Showing top ${shown.length} of ${rows.length.toLocaleString()} prioritized students. Use search to narrow the roster.</p>` : ""}
  `;
}

function studentAlertList(rows) {
  return `<div class="timeline">${rows.map((student) => `
    <div class="timeline-item">
      <strong>${student.firstName} ${student.lastName}</strong> ${badge(student.riskLevel)}
      <p class="small">${riskFactorScore(student).factors[0].description}</p>
      <button class="secondary" onclick="openStudent('${student.id}')" type="button">Review</button>
    </div>
  `).join("")}</div>`;
}

function riskSignalList() {
  const signals = {};
  queueStudents().forEach((student) => riskFactorScore(student).factors.forEach((factor) => {
    signals[factor.type] = (signals[factor.type] || 0) + 1;
  }));
  return `<div class="timeline">${Object.entries(signals).sort((a, b) => b[1] - a[1]).map(([name, count]) => `<div class="timeline-item"><strong>${name}</strong><span class="small"> - ${count} flagged students</span></div>`).join("")}</div>`;
}

function advisorWorkload() {
  return `<div class="timeline">${advisors.map((advisor) => {
    const caseload = students.filter((student) => student.advisorId === advisor.id).length;
    const risk = students.filter((student) => student.advisorId === advisor.id && student.retentionStatus === "At Risk").length;
    return `<button class="timeline-item advisor-card" type="button" onclick="openAdvisorCaseload('${advisor.id}')"><strong>${advisor.name}</strong><br><span class="small">${caseload} demo students - ${advisor.caseload} total caseload - ${risk} at risk</span><span class="small action-hint">Open caseload</span></button>`;
  }).join("")}</div>`;
}

function interventionTimeline(student) {
  if (!student.interventions.length) return `<p class="muted">No interventions recorded yet.</p>`;
  return `<div class="timeline">${student.interventions.slice().sort((a, b) => b.opened.localeCompare(a.opened)).map((item) => `
    <div class="timeline-item">
      <strong>${item.type}</strong> ${badge(item.status)}
      <p>${item.notes}</p>
      <span class="small">Opened ${item.opened} - Follow-up ${item.followUp} - Outcome: ${item.outcome}</span>
    </div>
  `).join("")}</div>`;
}

function interventionTable() {
  const rows = students.flatMap((student) => student.interventions.map((item) => ({ student, item }))).sort((a, b) => b.item.opened.localeCompare(a.item.opened));
  return `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Student</th><th>Type</th><th>Status</th><th>Follow-up</th><th>Outcome</th><th>Notes</th></tr></thead><tbody>${rows.map(({ student, item }) => `
    <tr><td>${item.opened}</td><td>${student.firstName} ${student.lastName}</td><td>${item.type}</td><td>${badge(item.status)}</td><td>${item.followUp}</td><td>${item.outcome}</td><td>${item.notes}</td></tr>
  `).join("")}</tbody></table></div>`;
}

function overdueFollowUps() {
  return students.flatMap((student) => student.interventions
    .filter((item) => item.status === "Open")
    .map((item) => ({ student: `${student.firstName} ${student.lastName}`, detail: `${item.type} follow-up due ${item.followUp}` })));
}

function cohortWatchlist() {
  return `<div class="timeline">
    <div class="timeline-item"><strong>First Year</strong><br><span class="small">LMS activity down 6% over two weeks.</span></div>
    <div class="timeline-item"><strong>Sophomore</strong><br><span class="small">Attendance variance widening in Science programs.</span></div>
    <div class="timeline-item"><strong>Senior</strong><br><span class="small">High workload signals concentrated in Business.</span></div>
  </div>`;
}

function cohortTable() {
  const cohorts = ["First Year", "Sophomore", "Junior", "Senior"];
  return `<div class="table-wrap"><table><thead><tr><th>Cohort</th><th>Students</th><th>Avg risk</th><th>At risk</th><th>Intervention success</th><th>Trend</th></tr></thead><tbody>${cohorts.map((cohort) => {
    const rows = students.filter((student) => student.cohort === cohort);
    const avg = rows.length ? Math.round(rows.reduce((sum, s) => sum + (s.riskScore || 0), 0) / rows.length) : 0;
    return `<tr><td>${cohort}</td><td>${rows.length || "1,000+"}</td><td>${avg || "47"}</td><td>${rows.filter((s) => s.retentionStatus === "At Risk").length}</td><td>${cohort === "Junior" ? "81%" : cohort === "Senior" ? "67%" : "74%"}</td><td>${cohort === "Sophomore" ? badge("Worsening") : badge("Stable")}</td></tr>`;
  }).join("")}</tbody></table></div>`;
}

function auditTable() {
  const rows = state.audit.length ? state.audit : [{ at: "2026-04-27 09:00", user: "System", action: "Initial sync", detail: "Imported SIS, LMS, attendance, and support-history data" }];
  return `<div class="table-wrap"><table><thead><tr><th>Time</th><th>User</th><th>Action</th><th>Detail</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${row.at}</td><td>${row.user}</td><td>${row.action}</td><td>${row.detail}</td></tr>`).join("")}</tbody></table></div>`;
}

function documentList(type = "All", limit = 100) {
  const docs = state.documents
    .filter((doc) => type === "All" || doc.type === type)
    .slice(0, limit);
  if (!docs.length) {
    return `<p class="muted">No saved ${type === "All" ? "documents" : type.toLowerCase() + "s"} yet.</p>`;
  }
  const selected = state.documents.find((doc) => doc.id === state.selectedDocumentId) || docs[0];
  return `
    <div class="document-layout">
      <div class="document-list">
        ${docs.map((doc) => `
          <article class="document-card ${doc.id === selected.id ? "active" : ""}">
            <div>
              <strong>${escapeHtml(doc.title)}</strong>
              <span class="small">${escapeHtml(doc.type)} - ${escapeHtml(doc.createdAt)}${doc.studentName ? ` - ${escapeHtml(doc.studentName)}` : ""}</span>
            </div>
            <div class="split-actions">
              <button class="secondary" type="button" onclick="openDocument('${doc.id}')">Open</button>
              <button class="ghost" type="button" onclick="downloadDocument('${doc.id}')">Download</button>
            </div>
          </article>
        `).join("")}
      </div>
      <article class="document-preview">
        <div class="split-actions document-preview-head">
          <div>
            <h3>${escapeHtml(selected.title)}</h3>
            <p class="small">${escapeHtml(selected.type)} - ${escapeHtml(selected.createdAt)}</p>
          </div>
          <button class="ghost" type="button" onclick="downloadDocument('${selected.id}')">Download</button>
        </div>
        <pre>${escapeHtml(selected.content)}</pre>
      </article>
    </div>
  `;
}

function saveDocument({ type, title, studentId, studentName, content }) {
  const doc = {
    id: `DOC-${Date.now()}-${Math.round(Math.random() * 1000)}`,
    type,
    title,
    studentId,
    studentName,
    createdAt: todayStamp(),
    content
  };
  state.documents.unshift(doc);
  state.selectedDocumentId = doc.id;
  persistDocuments();
  return doc;
}

function openDocument(id) {
  state.selectedDocumentId = id;
  setActiveView("documents");
}

function downloadDocument(id) {
  const doc = state.documents.find((item) => item.id === id);
  if (!doc) return;
  const blob = new Blob([doc.content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${doc.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "retentioniq-document"}.txt`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function todayStamp() {
  return new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function saveIntervention() {
  const student = students.find((item) => item.id === document.querySelector("#interventionStudent").value);
  const type = document.querySelector("#interventionType").value;
  const followUp = document.querySelector("#followUpDate").value;
  const outcome = document.querySelector("#interventionOutcome").value;
  const notes = document.querySelector("#interventionNotes").value.trim() || "Advisor recorded support action and next follow-up.";
  student.interventions.push({ id: `I-${Date.now()}`, type, status: outcome === "Improving" ? "Closed" : "Open", opened: "2026-04-27", followUp, notes, outcome });
  student.lastOutreachDays = 0;
  saveDocument({
    type: "Advisor Note",
    title: `${student.firstName} ${student.lastName} advisor note`,
    studentId: student.id,
    studentName: `${student.firstName} ${student.lastName}`,
    content: [
      `RetentionIQ Advisor Note`,
      `Student: ${student.firstName} ${student.lastName} (${student.id})`,
      `Advisor: ${advisorName(student.advisorId)}`,
      `Intervention type: ${type}`,
      `Outcome: ${outcome}`,
      `Follow-up date: ${followUp}`,
      `Created: ${todayStamp()}`,
      ``,
      `Notes:`,
      notes
    ].join("\n")
  });
  logAudit(state.role, "Recorded intervention", `${student.firstName} ${student.lastName}: ${type}`);
  showNotice(`Intervention and advisor-note document saved for ${student.firstName} ${student.lastName}.`);
  renderInterventions();
}

function markNoResponse() {
  const student = selectedStudent();
  student.interventions.push({ id: `I-${Date.now()}`, type: "No response outreach", status: "Open", opened: "2026-04-27", followUp: "2026-05-01", notes: "Student did not respond; retry and escalation scheduled.", outcome: "No response" });
  logAudit(state.role, "Marked no response", `${student.firstName} ${student.lastName}`);
  showNotice(`${student.firstName} ${student.lastName} marked as no response with follow-up scheduled.`);
  renderInterventions();
}

function addRecommendation(studentId, index) {
  const student = students.find((item) => item.id === studentId);
  const rec = recommendationsFor(student)[index];
  student.interventions.push({ id: `I-${Date.now()}`, type: rec.title, status: "Open", opened: "2026-04-27", followUp: "2026-05-02", notes: rec.description, outcome: "Pending" });
  logAudit(state.role, "Added recommended intervention", `${student.firstName} ${student.lastName}: ${rec.title}`);
  showNotice(`${rec.title} added to ${student.firstName} ${student.lastName}'s plan.`);
  renderStudentDetail();
}

function escalateStudent(studentId) {
  const student = students.find((item) => item.id === studentId);
  student.status = "At Risk";
  student.interventions.push({ id: `I-${Date.now()}`, type: "Escalation", status: "Open", opened: "2026-04-27", followUp: "2026-04-29", notes: "Escalated for manager review due to high or compounding risk.", outcome: "Pending" });
  logAudit(state.role, "Escalated high-risk student", `${student.firstName} ${student.lastName}`);
  showNotice(`${student.firstName} ${student.lastName} escalated for manager review.`);
  renderStudentDetail();
}

function updateStudentAssignment(studentId) {
  const student = students.find((item) => item.id === studentId);
  const oldAdvisor = advisorName(student.advisorId);
  student.advisorId = document.querySelector("#advisorAssign").value;
  student.status = document.querySelector("#statusUpdate").value;
  logAudit(state.role, "Updated student profile", `${student.firstName} ${student.lastName}: ${oldAdvisor} to ${advisorName(student.advisorId)}, status ${student.status}`);
  showNotice(`${student.firstName} ${student.lastName} updated and audit history recorded.`);
  renderStudentDetail();
}

function openMetricDestination(viewId) {
  state.advisorFilter = "";
  if (viewId === "student") {
    document.querySelector("#searchInput").value = "";
  }
  setActiveView(viewId);
  showNotice(`Opened ${navItems.find((item) => item.id === viewId)?.label || "section"}.`);
}

function openAdvisorCaseload(advisorId) {
  state.advisorFilter = advisorId;
  document.querySelector("#searchInput").value = "";
  const firstStudent = students.find((student) => student.advisorId === advisorId);
  if (firstStudent) state.selectedStudentId = firstStudent.id;
  setActiveView("student");
  showNotice(`Showing ${advisorName(advisorId)}'s caseload.`);
}

function clearAdvisorFilter() {
  state.advisorFilter = "";
  setActiveView("student");
  showNotice("Advisor filter cleared.");
}

function openStudent(studentId) {
  state.selectedStudentId = studentId;
  setActiveView("student");
}

function selectedStudent() {
  return students.find((student) => student.id === state.selectedStudentId) || students[0];
}

function advisorName(id) {
  return advisors.find((advisor) => advisor.id === id)?.name || "Unassigned";
}

function kv(label, value) {
  return `<div class="kv"><span>${label}</span><strong>${value}</strong></div>`;
}

function badge(label) {
  const cls = String(label).toLowerCase().replace(/\s+/g, "-");
  return `<span class="badge ${cls}">${label}</span>`;
}

function percent(value) {
  if (value === null || value === undefined) return "Missing";
  return `${Math.round(value * 100)}%`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : min));
}

function titleCase(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function logAudit(user, action, detail) {
  state.audit.unshift({ at: "2026-04-27 10:35", user, action, detail });
}

function showNotice(message) {
  const notice = document.querySelector("#notice");
  notice.textContent = message;
  notice.hidden = false;
  window.setTimeout(() => {
    notice.hidden = true;
  }, 4500);
}

function chartTooltip() {
  let tooltip = document.querySelector("#chartTooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "chartTooltip";
    tooltip.className = "chart-tooltip";
    tooltip.hidden = true;
    document.body.append(tooltip);
  }
  return tooltip;
}

function canvasPoint(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height)
  };
}

function moveTooltip(event, html) {
  const tooltip = chartTooltip();
  tooltip.innerHTML = html;
  tooltip.style.left = `${event.clientX}px`;
  tooltip.style.top = `${event.clientY}px`;
  tooltip.hidden = false;
}

function hideTooltip() {
  const tooltip = chartTooltip();
  tooltip.hidden = true;
}

function drawLineChart(canvasId, series, labels, activeIndex = null) {
  const canvas = document.querySelector(`#${canvasId}`);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const points = [];
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#d9e0ec";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i += 1) {
    const y = 24 + i * ((height - 56) / 4);
    ctx.beginPath();
    ctx.moveTo(42, y);
    ctx.lineTo(width - 22, y);
    ctx.stroke();
  }
  series.forEach((line, seriesIndex) => {
    const max = 100;
    const min = 0;
    const linePoints = [];
    ctx.beginPath();
    line.values.forEach((value, index) => {
      const x = 42 + index * ((width - 74) / (line.values.length - 1));
      const y = 24 + (1 - (value - min) / (max - min)) * (height - 62);
      linePoints.push({ x, y, value, index, label: labels[index], seriesIndex, seriesLabel: line.label, color: line.color });
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 4;
    ctx.stroke();
    points.push(...linePoints);
    linePoints.forEach((point) => {
      const selected = activeIndex === point.index;
      ctx.beginPath();
      ctx.arc(point.x, point.y, selected ? 7 : 4, 0, Math.PI * 2);
      ctx.fillStyle = selected ? "#ffffff" : line.color;
      ctx.fill();
      ctx.lineWidth = selected ? 4 : 2;
      ctx.strokeStyle = line.color;
      ctx.stroke();
    });
  });
  if (activeIndex !== null) {
    const x = 42 + activeIndex * ((width - 74) / (labels.length - 1));
    ctx.beginPath();
    ctx.moveTo(x, 20);
    ctx.lineTo(x, height - 34);
    ctx.strokeStyle = "#93a4bd";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  ctx.fillStyle = "#657085";
  ctx.font = "12px Arial";
  labels.forEach((label, index) => {
    const x = 42 + index * ((width - 74) / (labels.length - 1));
    ctx.fillText(label, x - 12, height - 14);
  });

  if (!canvas.dataset.interactiveBound) {
    canvas.dataset.interactiveBound = "true";
    canvas.addEventListener("mousemove", (event) => {
      const point = canvasPoint(event, canvas);
      const nearestIndex = Math.max(0, Math.min(labels.length - 1, Math.round((point.x - 42) / ((width - 74) / (labels.length - 1)))));
      const nearestX = 42 + nearestIndex * ((width - 74) / (labels.length - 1));
      if (Math.abs(point.x - nearestX) > 45 || point.y < 16 || point.y > height - 28) {
        drawLineChart(canvasId, series, labels, null);
        hideTooltip();
        return;
      }
      drawLineChart(canvasId, series, labels, nearestIndex);
      const detail = series.map((line) => `${line.label}: ${line.values[nearestIndex]}%`).join("<br>");
      moveTooltip(event, `<strong>${labels[nearestIndex]}</strong><br>${detail}<br><span>Click to pin details</span>`);
    });
    canvas.addEventListener("mouseleave", () => {
      drawLineChart(canvasId, series, labels, null);
      hideTooltip();
    });
    canvas.addEventListener("click", (event) => {
      const point = canvasPoint(event, canvas);
      const selectedIndex = Math.max(0, Math.min(labels.length - 1, Math.round((point.x - 42) / ((width - 74) / (labels.length - 1)))));
      const detail = document.querySelector(`#${canvasId}Detail`);
      if (detail) {
        detail.innerHTML = `<strong>${labels[selectedIndex]}</strong>: ${series.map((line) => `${line.label} ${line.values[selectedIndex]}%`).join(" | ")}`;
      }
      showNotice(`Chart selection pinned for ${labels[selectedIndex]}.`);
    });
  }
}

function drawPie(canvasId, activeIndex = null) {
  const canvas = document.querySelector(`#${canvasId}`);
  const ctx = canvas.getContext("2d");
  const counts = [
    { label: "Critical", color: "#c73535", value: students.filter((s) => s.riskLevel === "Critical").length },
    { label: "High", color: "#b46a00", value: students.filter((s) => s.riskLevel === "High").length },
    { label: "Medium", color: "#3a63d8", value: students.filter((s) => s.riskLevel === "Medium").length },
    { label: "Low", color: "#008a7a", value: students.filter((s) => ["Low", "Data Review"].includes(s.riskLevel)).length }
  ];
  let start = -Math.PI / 2;
  const total = counts.reduce((sum, item) => sum + item.value, 0) || 1;
  const slices = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  counts.forEach((item, index) => {
    const angle = (item.value / total) * Math.PI * 2;
    const offset = activeIndex === index ? 8 : 0;
    const mid = start + angle / 2;
    const centerX = 130 + Math.cos(mid) * offset;
    const centerY = 128 + Math.sin(mid) * offset;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, activeIndex === index ? 84 : 78, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    if (activeIndex === index) {
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
    }
    slices.push({ ...item, start, end: start + angle, index });
    start += angle;
  });
  ctx.font = "13px Arial";
  counts.forEach((item, index) => {
    ctx.fillStyle = item.color;
    ctx.fillRect(250, 76 + index * 28, 12, 12);
    ctx.fillStyle = "#172033";
    ctx.fillText(`${item.label}: ${item.value}`, 270, 87 + index * 28);
  });

  if (!canvas.dataset.interactiveBound) {
    canvas.dataset.interactiveBound = "true";
    canvas.addEventListener("mousemove", (event) => {
      const point = canvasPoint(event, canvas);
      const dx = point.x - 130;
      const dy = point.y - 128;
      const distance = Math.sqrt(dx * dx + dy * dy);
      let angle = Math.atan2(dy, dx);
      if (angle < -Math.PI / 2) angle += Math.PI * 2;
      const hit = distance <= 92 && slices.find((slice) => angle >= slice.start && angle <= slice.end);
      if (!hit) {
        drawPie(canvasId, null);
        hideTooltip();
        return;
      }
      drawPie(canvasId, hit.index);
      const pct = Math.round((hit.value / total) * 100);
      moveTooltip(event, `<strong>${hit.label}</strong><br>${hit.value.toLocaleString()} students<br>${pct}% of roster<br><span>Click to pin details</span>`);
    });
    canvas.addEventListener("mouseleave", () => {
      drawPie(canvasId, null);
      hideTooltip();
    });
    canvas.addEventListener("click", (event) => {
      const point = canvasPoint(event, canvas);
      const dx = point.x - 130;
      const dy = point.y - 128;
      const distance = Math.sqrt(dx * dx + dy * dy);
      let angle = Math.atan2(dy, dx);
      if (angle < -Math.PI / 2) angle += Math.PI * 2;
      const hit = distance <= 92 && slices.find((slice) => angle >= slice.start && angle <= slice.end);
      if (!hit) return;
      const detail = document.querySelector(`#${canvasId}Detail`);
      const pct = Math.round((hit.value / total) * 100);
      if (detail) {
        detail.innerHTML = `<strong>${hit.label}</strong>: ${hit.value.toLocaleString()} students, ${pct}% of the active roster.`;
      }
      showNotice(`${hit.label} risk segment selected.`);
    });
  }
}

document.querySelector("#roleSelect").addEventListener("change", (event) => {
  state.role = event.target.value;
  render();
});

document.querySelector("#searchInput").addEventListener("input", () => setActiveView(state.activeView));

document.querySelector("#syncButton").addEventListener("click", () => {
  logAudit(state.role, "Imported data", "SIS, LMS, attendance, and support-history sync completed");
  showNotice("Data sync completed. Dashboards, profiles, and risk explanations were refreshed.");
  render();
});

window.openStudent = openStudent;
window.openAdvisorCaseload = openAdvisorCaseload;
window.clearAdvisorFilter = clearAdvisorFilter;
window.openDocument = openDocument;
window.downloadDocument = downloadDocument;
window.generateCohortReport = generateCohortReport;

render();
