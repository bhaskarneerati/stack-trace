// Add new projects here — each one renders as a card automatically.
const projects = [
  {
    title: "Prism — API Gateway & Analytics Platform",
    description:
      "Full-stack API gateway and developer platform: register, generate API keys, and proxy routes to any external API. Validates requests, enforces Redis sliding-window rate limits and Postgres-backed monthly quotas, forwards via async httpx, and logs every transaction to a real-time analytics dashboard. A mini Kong (gateway) plus a mini Datadog (analytics), built from scratch.",
    tags: ["FastAPI", "PostgreSQL", "Redis", "Next.js", "Docker", "JWT"],
    links: [
      { label: "Live Demo", url: "https://project-prism-eight.vercel.app" },
      { label: "API Docs", url: "https://project-prism-n8d4.onrender.com/docs" },
    ],
  },
  {
    title: "Scalable API Deployment",
    description:
      "Production-ready REST API built with FastAPI, containerized with Docker, and served behind Nginx with SSL termination. Async endpoints for high-throughput concurrent traffic, with CloudWatch logging and threshold-based alerting.",
    tags: ["FastAPI", "AWS EC2", "Docker", "Nginx", "CloudWatch"],
    links: [
      // { label: "Code", url: "https://github.com/bhaskarneerati/your-repo" },
      // { label: "Live", url: "https://example.com" },
    ],
  },
];

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (p) => `
      <article class="project-card">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tags">
          ${p.tags.map((t) => `<span>${t}</span>`).join("")}
        </div>
        ${
          p.links.length
            ? `<div class="project-links">
                ${p.links
                  .map(
                    (l) =>
                      `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`
                  )
                  .join("")}
              </div>`
            : ""
        }
      </article>`
    )
    .join("");
}

function setupNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a, button").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

const resumeData = {
  name: "Bhaskar Neerati",
  title: "Software Engineer | Python · Node.js · Docker | Scalable APIs & Production Systems",
  contact: "bhaskarneerati3.14@gmail.com | linkedin.com/in/bhaskar-neerati | github.com/bhaskarneerati | Hyderabad, India",
  summary:
    "Software Engineer with 3.8+ years of experience building scalable, production-grade backend systems and APIs across banking and healthcare domains. Experienced in Node.js, Python, Docker, and CI/CD pipelines, with a strong foundation in DevOps principles, live service monitoring, and incident root-cause analysis. Delivered and maintained systems serving 30,000+ users daily.",
  skills: [
    ["Languages & Frameworks", "Node.js, TypeScript, Python, FastAPI, JavaScript"],
    ["DevOps & Infrastructure", "Docker, CI/CD (Jenkins), Kubernetes (learning), Git, Linux, Nginx"],
    ["Cloud & Monitoring", "AWS Lambda, EC2, SQS, SNS, CloudWatch"],
    ["Databases", "MySQL, PostgreSQL, SQL, ChromaDB"],
    ["Architecture", "REST APIs, Event-Driven Architecture, Microservices, Async Processing"],
  ],
  experience: [
    {
      role: "Senior Software Engineer — Phoebus AI Solutions",
      period: "Oct 2024 — Present",
      meta: "Backend Engineer, Chatbot Systems & API Integration · Healthcare · Remote",
      bullets: [
        "Designed and deployed a scalable chatbot backend on Yellow.ai serving 30,000+ users daily, reducing manual support queries by ~40%",
        "Integrated 15+ REST APIs connecting healthcare backend services with conversational workflows, cutting average response latency by ~30%",
        "Developed JavaScript and Node.js automation workflows, eliminating ~15 hrs/week of manual triage",
        "Led incident root-cause analysis for critical production API failures, resolving issues within a 2-hour SLA and maintaining 99.5%+ uptime",
      ],
    },
    {
      role: "Associate Software Engineer — Accenture",
      period: "Sep 2022 — Oct 2024",
      meta: "Python Backend Engineer · Banking · Hyderabad (Hybrid)",
      bullets: [
        "Built Python automation pipelines for a banking client's data processing workflows, reducing manual processing time by ~60% across 5 operational teams",
        "Designed and implemented 10+ REST APIs using FastAPI for enterprise banking applications",
        "Architected event-driven microservices using AWS Lambda, SQS, and SNS, processing 50,000+ async events/day",
        "Deployed and maintained Dockerized backend services on AWS EC2 with zero-downtime deployments",
        "Implemented AWS CloudWatch dashboards and alerting, reducing mean time to detect production issues by ~45%",
        "Improved API throughput by ~35% through async queue-based refactoring using AWS SQS",
      ],
    },
  ],
  education: [
    { degree: "Master of Science — Physics", period: "2020 — 2022", meta: "University of Hyderabad · GPA: 8.54 / 10.0" },
    { degree: "Bachelor of Science (Hons.) — Physics", period: "2017 — 2020", meta: "Sri Sathya Sai Institute of Higher Learning · GPA: 7.7 / 10.0" },
  ],
};

function projectsForResume() {
  return projects.map((p) => ({
    title: p.title,
    bullets: [p.description],
    stack: p.tags.join(", "),
  }));
}

function generateResumePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  function ensureSpace(lineHeight) {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function writeWrapped(text, x, fontSize, lineHeight, font = "helvetica", style = "normal") {
    doc.setFont(font, style);
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, contentWidth - (x - margin));
    lines.forEach((line) => {
      ensureSpace(lineHeight);
      doc.text(line, x, y);
      y += lineHeight;
    });
  }

  function sectionTitle(title) {
    y += 8;
    ensureSpace(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(180);
    doc.line(margin, y, pageWidth - margin, y);
    y += 16;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(resumeData.name, margin, y);
  y += 22;

  writeWrapped(resumeData.title, margin, 10.5, 14, "helvetica", "normal");
  writeWrapped(resumeData.contact, margin, 10.5, 14, "helvetica", "normal");

  sectionTitle("Professional Summary");
  writeWrapped(resumeData.summary, margin, 10.5, 14);

  sectionTitle("Technical Skills");
  resumeData.skills.forEach(([label, value]) => {
    ensureSpace(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(`${label}:`, margin, y);
    const labelWidth = doc.getTextWidth(`${label}: `);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(value, contentWidth - labelWidth);
    doc.text(lines[0], margin + labelWidth, y);
    y += 14;
    for (let i = 1; i < lines.length; i++) {
      ensureSpace(14);
      doc.text(lines[i], margin + labelWidth, y);
      y += 14;
    }
  });

  sectionTitle("Professional Experience");
  resumeData.experience.forEach((job) => {
    ensureSpace(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(job.role, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text(job.period, pageWidth - margin - doc.getTextWidth(job.period), y);
    y += 14;
    writeWrapped(job.meta, margin, 9.5, 13, "helvetica", "italic");
    job.bullets.forEach((bullet) => writeWrapped(`•  ${bullet}`, margin, 10, 14));
    y += 6;
  });

  const projectEntries = projectsForResume();
  if (projectEntries.length) {
    sectionTitle("Personal Projects");
    projectEntries.forEach((proj) => {
      ensureSpace(14);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(proj.title, margin, y);
      y += 14;
      proj.bullets.forEach((bullet) => writeWrapped(`•  ${bullet}`, margin, 10, 14));
      writeWrapped(`Stack: ${proj.stack}`, margin, 9.5, 13, "helvetica", "italic");
      y += 6;
    });
  }

  sectionTitle("Education");
  resumeData.education.forEach((edu) => {
    ensureSpace(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(edu.degree, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text(edu.period, pageWidth - margin - doc.getTextWidth(edu.period), y);
    y += 14;
    writeWrapped(edu.meta, margin, 9.5, 13);
    y += 4;
  });

  doc.save("Bhaskar_Neerati_Resume.pdf");
}

function setupResumeDownload() {
  const buttons = [
    document.getElementById("downloadResumeBtn"),
    document.getElementById("navDownloadBtn"),
  ];
  buttons.forEach((btn) => btn && btn.addEventListener("click", generateResumePDF));
}

function setupThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  function syncLabel() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.textContent = isDark ? "Light" : "Dark";
  }

  syncLabel();

  btn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    syncLabel();
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

renderProjects();
setupNavToggle();
setupResumeDownload();
setupThemeToggle();
