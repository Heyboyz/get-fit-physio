/**
 * GET FIT PHYSIO — Landing Page Module
 * Scroll animations, sticky nav, workflow interactions
 */

const Landing = (() => {

  // ─── Sticky Nav ───────────────────────────────────────────────────────────
  function initStickyNav() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ─── Scroll Reveal ────────────────────────────────────────────────────────
  function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
  }

  // ─── Hero counter animation ───────────────────────────────────────────────
  function animateCounters() {
    document.querySelectorAll('[data-count-to]').forEach(el => {
      const target = parseInt(el.dataset.countTo);
      const suffix = el.dataset.countSuffix || '';
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // ─── Workflow step hover ──────────────────────────────────────────────────
  function initWorkflowHover() {
    document.querySelectorAll('.workflow-step').forEach((step, i) => {
      step.addEventListener('mouseenter', () => {
        step.querySelector('.workflow-step-num')?.classList.add('teal');
        step.querySelector('.workflow-step-num')?.classList.remove('outlined');
      });
      step.addEventListener('mouseleave', () => {
        if (i % 2 !== 0) {
          step.querySelector('.workflow-step-num')?.classList.remove('teal');
          step.querySelector('.workflow-step-num')?.classList.add('outlined');
        }
      });
    });
  }

  // ─── Smooth scroll for nav links ──────────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('[data-scroll-to]').forEach(el => {
      el.addEventListener('click', () => {
        const targetId = el.dataset.scrollTo;
        const target = document.getElementById(targetId);
        if (target) {
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  // ─── Active nav highlighting ──────────────────────────────────────────────
  function initActiveNav() {
    const sections = document.querySelectorAll('[data-section]');
    const navLinks = document.querySelectorAll('.nav-link[data-scroll-to]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.scrollTo === id);
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(s => observer.observe(s));
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  function init() {
    initStickyNav();
    initScrollReveal();
    initWorkflowHover();
    initSmoothScroll();
    initActiveNav();

    // Delay counter animation until hero is visible
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
      const ob = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          animateCounters();
          ob.disconnect();
        }
      });
      ob.observe(heroStats);
    }
  }

  return { init };
})();

window.GFP_Landing = Landing;
