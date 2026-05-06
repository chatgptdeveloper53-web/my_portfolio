// ===== NAV: scrolled class + active link =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const navList = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navList.classList.toggle('open');
});

navList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navList.classList.remove('open');
  });
});

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    // stagger siblings in the same parent
    const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => {
      entry.target.classList.add('visible');
    }, idx * 80);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== LANGUAGE BAR ANIMATION =====
const langFills = document.querySelectorAll('.lang-fill');

const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

langFills.forEach(el => langObserver.observe(el));

// ===== SMOOTH SCROLL for anchor links (extra safety) =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
