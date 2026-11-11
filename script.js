// Mobile navigation toggle
function setupNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", () => {
    setOpen(!nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

// Light / dark theme toggle (remembers the choice when storage is available)
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
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      // storage can be blocked; the toggle still works for this visit
    }
    syncLabel();
  });
}

// Highlight the nav link of the section currently in view
function setupActiveNav() {
  const links = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  if (!links.length || !("IntersectionObserver" in window)) return;

  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const sections = Array.from(byId.keys())
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove("active"));
        const link = byId.get(entry.target.id);
        if (link) link.classList.add("active");
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

document.getElementById("year").textContent = new Date().getFullYear();

setupNavToggle();
setupThemeToggle();
setupActiveNav();