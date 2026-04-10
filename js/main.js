/**
 * SCA STUDIO — Main JavaScript
 * Handles: mobile menu, scroll navbar, size selection, smooth scroll
 */

(function () {
  'use strict';

  /* ── Navbar scroll effect ─────────────────────────────── */
  const navbar = document.querySelector('.navbar');

  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Run once on load to set correct state
  handleScroll();

  /* ── Mobile hamburger menu ────────────────────────────── */
  const hamburger   = document.querySelector('.hamburger');
  const mobileMenu  = document.querySelector('.mobile-menu');
  const menuClose   = document.querySelector('.mobile-menu-close');
  const menuLinks   = document.querySelectorAll('.mobile-menu a');

  function openMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.add('active');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (menuClose)  menuClose.addEventListener('click', closeMenu);

  menuLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── Size selection ───────────────────────────────────── */
  document.querySelectorAll('.size-selector').forEach(function (selector) {
    selector.querySelectorAll('.size-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Deselect siblings
        selector.querySelectorAll('.size-btn').forEach(function (b) {
          b.classList.remove('selected');
        });
        btn.classList.add('selected');
      });
    });
  });

  /* ── Smooth scroll for anchor links ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── Active nav link highlight ────────────────────────── */
  (function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }());

})();
