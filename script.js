// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav: shadow on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const toggle = document.getElementById('navToggle');
const links = document.querySelector('.nav__links');
toggle.addEventListener('click', () => links.classList.toggle('is-open'));
links.addEventListener('click', e => { if (e.target.tagName === 'A') links.classList.remove('is-open'); });

// Reveal on scroll
const revealEls = document.querySelectorAll('.section, .tl, .gcard, .skillcard');
revealEls.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty('--rd', (i % 5) * 60 + 'ms');
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-in'));
}

// Pause the animated circuit background if the user prefers reduced motion
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const svg = document.querySelector('.hero__circuit svg');
  if (svg && typeof svg.pauseAnimations === 'function') svg.pauseAnimations();
}

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');
document.querySelectorAll('.gcard').forEach(card => {
  card.addEventListener('click', () => {
    const full = card.getAttribute('data-full');
    const cap = card.querySelector('.gcard__title')?.textContent || '';
    lbImg.src = full; lbImg.alt = cap;
    lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});
const closeLb = () => {
  lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; lbImg.src = '';
};
lbClose.addEventListener('click', closeLb);
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
