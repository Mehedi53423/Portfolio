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
