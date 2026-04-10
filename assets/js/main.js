// ─── Project Data (used by modal) ────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Inventory Management System",
    desc: "Enterprise-level inventory management system built for mid-to-large organisations. Handles multi-warehouse stock, transaction history, low-stock alerts, and real-time reporting dashboards.",
    tech: ["ASP.NET Core", "C#", "SQL Server", "EF Core", "REST API", "Swagger"],
    features: [
      "Multi-warehouse stock tracking with transfer workflows",
      "Transaction ledger with full audit trail",
      "Low-stock threshold alerts via email notifications",
      "Role-based access control (Admin, Manager, Viewer)",
      "Paginated, filterable reports with CSV export"
    ],
    github: "https://github.com/Mehedi53423/inventory-management"
  },
  {
    title: "Microservice API Gateway",
    desc: "Secure, scalable API gateway built on Ocelot that acts as the single entry-point for a suite of microservices. Handles authentication, routing, load balancing, and rate limiting.",
    tech: ["Ocelot", "ASP.NET Core", "JWT", "Microservices", "Docker", "Redis"],
    features: [
      "JWT authentication and token refresh flow",
      "Dynamic route configuration via JSON",
      "Per-client rate limiting with Redis backing",
      "Request/response logging middleware",
      "Downstream service health-check dashboard"
    ],
    github: "https://github.com/Mehedi53423/api-gateway"
  },
  {
    title: "E-Commerce Backend",
    desc: "High-performance e-commerce backend with full order lifecycle management, payment gateway integration, Redis-based caching, and event-driven inventory synchronisation.",
    tech: ["ASP.NET Core", "Redis", "Docker", "RabbitMQ", "SQL Server", "Stripe API"],
    features: [
      "Product catalogue with full-text search",
      "Shopping cart backed by Redis session store",
      "Stripe payment integration with webhook handling",
      "Order processing pipeline with status tracking",
      "Inventory sync via RabbitMQ message queue"
    ],
    github: "https://github.com/Mehedi53423/ecommerce-backend"
  },
  {
    title: "FMSS Financial Module",
    desc: "Core financial backend module for the Financial Management Software System at SoftifyBD. Manages payroll, budgeting, vouchers, and financial reporting for enterprise clients.",
    tech: ["ASP.NET Core", "C#", "SQL Server", "EF Core", "LINQ", "MediatR"],
    features: [
      "Payroll processing engine with configurable pay grades",
      "Budget allocation and expenditure tracking",
      "Double-entry voucher system with reconciliation",
      "Multi-currency transaction support",
      "CQRS pattern via MediatR for clean separation"
    ],
    github: "https://github.com/Mehedi53423"
  },
  {
    title: "Real-time Notification Service",
    desc: "Scalable real-time notification and messaging service using SignalR hubs, backed by RabbitMQ for reliable delivery and Redis Pub/Sub for horizontal scaling across multiple server instances.",
    tech: ["ASP.NET Core", "SignalR", "RabbitMQ", "Redis", "Docker", "C#"],
    features: [
      "WebSocket-based real-time push notifications",
      "Redis Pub/Sub for multi-instance SignalR backplane",
      "RabbitMQ consumer for durable message delivery",
      "Notification preference management per user",
      "Dead-letter queue handling for failed deliveries"
    ],
    github: "https://github.com/Mehedi53423"
  },
  {
    title: "Task Management API",
    desc: "Clean-architecture REST API for collaborative task management. Implements CQRS with MediatR, domain events, and full xUnit test coverage. Designed as a reference architecture project.",
    tech: ["ASP.NET Core", "MediatR", "xUnit", "EF Core", "Docker", "Swagger"],
    features: [
      "CQRS pattern with Commands and Queries via MediatR",
      "Domain events for decoupled side-effects",
      "Soft-delete with full audit timestamps",
      "Comprehensive xUnit test suite (unit + integration)",
      "OpenAPI docs with Swagger UI"
    ],
    github: "https://github.com/Mehedi53423"
  }
];

// ─── Typing Effect ────────────────────────────────────────────────────────────
const texts = [
  "I build scalable backend systems.",
  "I design clean and secure APIs.",
  "I architect enterprise-grade software."
];
let typingIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const el = document.getElementById("typingText");
  if (!el) return;
  const current = texts[typingIndex];
  el.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);
  let speed = isDeleting ? 40 : 80;
  if (!isDeleting && charIndex === current.length + 1) { speed = 1600; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; typingIndex = (typingIndex + 1) % texts.length; speed = 400; }
  setTimeout(typeEffect, speed);
}
document.addEventListener("DOMContentLoaded", typeEffect);

// ─── Page Loader ──────────────────────────────────────────────────────────────
window.addEventListener("load", function () {
  const loader = document.getElementById("pageLoader");
  if (!loader) return;
  loader.classList.add("loader-hidden");
  setTimeout(() => loader.remove(), 600);
});

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────
(function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;
  window.addEventListener("scroll", function () {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + "%";
  }, { passive: true });
})();

// ─── Navbar Scroll + Mobile Menu ──────────────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle("bg-gray-950/80", scrolled);
  navbar.classList.toggle("backdrop-blur-xl", scrolled);
  navbar.classList.toggle("border-b",        scrolled);
  navbar.classList.toggle("border-white/5",  scrolled);
  navbar.classList.toggle("scrolled-nav",    scrolled);
}, { passive: true });

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu    = document.getElementById("mobileMenu");
mobileMenuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
mobileMenu.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => mobileMenu.classList.add("hidden"))
);

// ─── Footer Year ──────────────────────────────────────────────────────────────
const yearEl = document.getElementById("currentYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── Custom Cursor ────────────────────────────────────────────────────────────
(function initCursor() {
  const dot  = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  // Only on pointer-fine devices (desktops)
  if (!window.matchMedia("(pointer: fine)").matches) {
    dot.style.display = ring.style.display = "none";
    return;
  }

  let mouseX = -100, mouseY = -100;
  let ringX  = -100, ringY  = -100;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top  = mouseY + "px";
  });

  (function tickRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top  = ringY + "px";
    requestAnimationFrame(tickRing);
  })();

  document.querySelectorAll("a, button, [data-modal-target]").forEach(el => {
    el.addEventListener("mouseenter", () => { dot.classList.add("cursor-hover");  ring.classList.add("cursor-hover");  });
    el.addEventListener("mouseleave", () => { dot.classList.remove("cursor-hover"); ring.classList.remove("cursor-hover"); });
  });
})();

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
(function initTheme() {
  const html      = document.getElementById("htmlRoot");
  const btn       = document.getElementById("themeToggle");
  const iconMoon  = document.getElementById("themeIconMoon");
  const iconSun   = document.getElementById("themeIconSun");
  const metaTheme = document.getElementById("themeColorMeta");

  function applyLight() {
    html.classList.add("light-mode");
    iconMoon && iconMoon.classList.add("hidden");
    iconSun  && iconSun.classList.remove("hidden");
    if (metaTheme) metaTheme.content = "#f1f5f9";
  }
  function applyDark() {
    html.classList.remove("light-mode");
    iconMoon && iconMoon.classList.remove("hidden");
    iconSun  && iconSun.classList.add("hidden");
    if (metaTheme) metaTheme.content = "#030712";
  }

  // Restore saved preference
  if (localStorage.getItem("theme") === "light") applyLight();

  btn && btn.addEventListener("click", function () {
    if (html.classList.contains("light-mode")) {
      applyDark();  localStorage.setItem("theme", "dark");
    } else {
      applyLight(); localStorage.setItem("theme", "light");
    }
  });
})();

// ─── Hero Particle Network Canvas ────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const PARTICLE_COUNT = 70, MAX_DIST = 130;
  const COLORS = ["rgba(99,102,241,", "rgba(168,85,247,", "rgba(236,72,153,"];
  let W, H, particles = [];

  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function mkParticle() {
    return { x: rand(0, W), y: rand(0, H), vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25),
             r: rand(1, 2.2), color: COLORS[Math.floor(Math.random() * COLORS.length)] };
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.strokeStyle = "rgba(99,102,241," + (1 - dist / MAX_DIST) * 0.18 + ")";
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
        }
      }
    }
    particles.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.color + "0.55)"; ctx.fill(); });
  }
  function update() { particles.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }); }
  function loop() { update(); draw(); requestAnimationFrame(loop); }

  window.addEventListener("resize", resize);
  resize();
  particles = Array.from({ length: PARTICLE_COUNT }, mkParticle);
  loop();
})();

// ─── 3D Tilt on Cards ────────────────────────────────────────────────────────
function initTilt(selector, intensity) {
  intensity = intensity || 12;
  document.querySelectorAll(selector).forEach(function (card) {
    card.style.transition = "transform 0.15s ease, box-shadow 0.15s ease";
    card.style.transformStyle = "preserve-3d";
    card.style.willChange = "transform";
    card.addEventListener("mousemove", function (e) {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2))  / (r.width  / 2);
      const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
      card.style.transform   = `perspective(800px) rotateX(${-dy * intensity}deg) rotateY(${dx * intensity}deg) translateZ(6px)`;
      card.style.boxShadow   = `${-dx * 8}px ${dy * 8}px 24px rgba(99,102,241,0.12)`;
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)";
      card.style.boxShadow = "";
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initTilt("#services .group");
  initTilt("#projects .group", 8);
  initTilt(".contact-card", 8);
  initTilt("#testimonials .group", 6);
  initTilt("#certifications .group", 8);
});

// ─── Stats Count-Up ───────────────────────────────────────────────────────────
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || "";
  const start  = performance.now();
  (function step(now) {
    const p = Math.min((now - start) / 1600, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(start);
}
new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { animateCount(e.target); this.unobserve(e.target); }
  }.bind(new IntersectionObserver(() => {})));
}, { threshold: 0.5 }).observe || document.querySelectorAll("[data-count]").forEach(function (el) {
  new IntersectionObserver(function (entries, obs) {
    if (entries[0].isIntersecting) { animateCount(el); obs.disconnect(); }
  }, { threshold: 0.5 }).observe(el);
});

// Correct count-up wiring
document.querySelectorAll("[data-count]").forEach(function (el) {
  new IntersectionObserver(function (entries, obs) {
    if (entries[0].isIntersecting) { animateCount(el); obs.disconnect(); }
  }, { threshold: 0.5 }).observe(el);
});

// ─── Skill Bars — Animate on Scroll ──────────────────────────────────────────
(function initSkillBars() {
  document.querySelectorAll(".skill-bar[data-width]").forEach(function (bar) {
    bar.style.width = "0%";
    new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting) {
        bar.style.width = bar.dataset.width;
        obs.disconnect();
      }
    }, { threshold: 0.3 }).observe(bar);
  });
})();

// ─── Skills Category Filter ───────────────────────────────────────────────────
(function initSkillFilter() {
  const btns = document.querySelectorAll(".filter-btn");
  if (!btns.length) return;
  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const cat = btn.dataset.filter;
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".skill-item").forEach(function (item) {
        const cats = (item.dataset.category || "").split(" ");
        const show = cat === "all" || cats.includes(cat);
        item.classList.toggle("hidden-item", !show);
      });
    });
  });
})();

// ─── GitHub Live Stats ────────────────────────────────────────────────────────
(function fetchGitHubStats() {
  const reposEl     = document.getElementById("gh-repos");
  const followersEl = document.getElementById("gh-followers");
  if (!reposEl && !followersEl) return;
  fetch("https://api.github.com/users/Mehedi53423")
    .then(r => r.json())
    .then(data => {
      if (reposEl     && data.public_repos !== undefined) reposEl.textContent     = data.public_repos;
      if (followersEl && data.followers    !== undefined) followersEl.textContent = data.followers;
    })
    .catch(() => {}); // silently fall back to static values
})();

// ─── Project Modal ────────────────────────────────────────────────────────────
(function initModal() {
  const modal      = document.getElementById("projectModal");
  if (!modal) return;
  const mTitle    = document.getElementById("modalTitle");
  const mDesc     = document.getElementById("modalDesc");
  const mTech     = document.getElementById("modalTech");
  const mFeatures = document.getElementById("modalFeatures");
  const mLink     = document.getElementById("modalLink");
  const mClose    = document.getElementById("modalClose");

  function openModal(id) {
    const d = PROJECTS[id];
    if (!d) return;
    if (mTitle)    mTitle.textContent = d.title;
    if (mDesc)     mDesc.textContent  = d.desc;
    if (mTech)     mTech.innerHTML    = d.tech.map(t =>
      `<span class="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-lg border border-indigo-500/20">${t}</span>`
    ).join("");
    if (mFeatures) mFeatures.innerHTML = d.features.map(f =>
      `<li class="flex items-start gap-2.5 text-sm text-gray-400">
        <span class="text-indigo-400 mt-0.5 shrink-0">→</span><span>${f}</span>
       </li>`
    ).join("");
    if (mLink) { mLink.href = d.github; }
    modal.classList.add("modal-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("modal-open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-project-id]").forEach(trigger => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(parseInt(trigger.dataset.projectId, 10));
    });
  });

  mClose && mClose.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
})();

// ─── Contact Form (Formspree AJAX) ────────────────────────────────────────────
(function initContactForm() {
  const form    = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const btn = form.querySelector("[type=submit]");
    const origText = btn ? btn.textContent : "";
    if (btn) { btn.textContent = "Sending…"; btn.disabled = true; }

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (res.ok) {
        form.reset();
        form.classList.add("hidden");
        if (success) success.classList.remove("hidden");
      } else {
        throw new Error("server error");
      }
    } catch (_) {
      if (btn) { btn.textContent = origText; btn.disabled = false; }
      alert("Something went wrong. Please email me directly at mehedi53423@gmail.com");
    }
  });
})();
