// ─── Typing Effect ───────────────────────────────────────────────────────────
const texts = [
  "I build scalable backend systems.",
  "I design clean and secure APIs.",
  "I architect enterprise-grade software."
];
let index = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const el = document.getElementById("typingText");
  if (!el) return;
  const current = texts[index];
  el.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);
  let speed = isDeleting ? 40 : 80;
  if (!isDeleting && charIndex === current.length + 1) { speed = 1600; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; index = (index + 1) % texts.length; speed = 400; }
  setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", typeEffect);

// ─── Navbar Scroll + Mobile Menu ─────────────────────────────────────────────
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle("bg-gray-950/80", scrolled);
  navbar.classList.toggle("backdrop-blur-xl", scrolled);
  navbar.classList.toggle("border-b", scrolled);
  navbar.classList.toggle("border-white/5", scrolled);
});

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
mobileMenu.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => mobileMenu.classList.add("hidden"))
);

// ─── Footer Year ─────────────────────────────────────────────────────────────
document.getElementById("currentYear").textContent = new Date().getFullYear();

// ─── Hero Particle Network Canvas ────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const PARTICLE_COUNT = 70;
  const MAX_DIST = 130;
  const COLORS = ['rgba(99,102,241,', 'rgba(168,85,247,', 'rgba(236,72,153,'];
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function randBetween(a, b) { return a + Math.random() * (b - a); }

  function makeParticle() {
    return {
      x: randBetween(0, W),
      y: randBetween(0, H),
      vx: randBetween(-0.25, 0.25),
      vy: randBetween(-0.25, 0.25),
      r: randBetween(1, 2.2),
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.strokeStyle = 'rgba(99,102,241,' + alpha + ')';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    particles.forEach(function(p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.55)';
      ctx.fill();
    });
  }

  function update() {
    particles.forEach(function(p) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
  }

  function loop() { update(); draw(); requestAnimationFrame(loop); }

  window.addEventListener('resize', resize);
  resize();
  particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);
  loop();
})();

// ─── 3D Tilt on Cards ────────────────────────────────────────────────────────
function initTilt(selector, intensity) {
  intensity = intensity || 12;
  document.querySelectorAll(selector).forEach(function(card) {
    card.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease';
    card.style.transformStyle = 'preserve-3d';
    card.style.willChange = 'transform';

    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform =
        'perspective(800px) rotateX(' + (-dy * intensity) + 'deg) rotateY(' + (dx * intensity) + 'deg) translateZ(6px)';
      card.style.boxShadow =
        (-dx * 8) + 'px ' + (dy * 8) + 'px 24px rgba(99,102,241,0.12)';
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      card.style.boxShadow = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initTilt('#services .group');
  initTilt('#projects .group', 8);
  initTilt('#contact .group', 8);
});

// ─── Stats Count-Up ───────────────────────────────────────────────────────────
function animateCount(el) {
  const target   = parseInt(el.dataset.count, 10);
  const suffix   = el.dataset.suffix || '';
  const duration = 1600;
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const countObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(function(el) {
  countObserver.observe(el);
});
