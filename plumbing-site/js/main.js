// ===== FAQ ACCORDION =====
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnim() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (ham && menu) {
    ham.addEventListener('click', () => menu.classList.toggle('open'));
  }
}

// ===== ACTIVE NAV =====
function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ===== CONTACT FORM =====
function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const urgency = form.querySelector('[name="urgency"]').value;
    let redirect = 'thankyou.html';
    window.location.href = redirect + '?urgency=' + encodeURIComponent(urgency)
      + '&name=' + encodeURIComponent(form.querySelector('[name="name"]').value);
  });
}

// ===== THANK YOU PAGE =====
function initThankYou() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || 'there';
  const urgency = params.get('urgency') || 'quote';
  const nameEl = document.getElementById('ty-name');
  if (nameEl) nameEl.textContent = name.split(' ')[0];
  const sections = document.querySelectorAll('.ty-section');
  sections.forEach(s => s.style.display = 'none');
  let show = 'ty-quote';
  if (urgency === 'emergency') show = 'ty-emergency';
  else if (urgency === 'same-day') show = 'ty-sameday';
  const target = document.getElementById(show);
  if (target) target.style.display = 'block';
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  initScrollAnim();
  initMobileMenu();
  initActiveNav();
  initForm();
  initThankYou();
});
