/* ============================================
   SKARV.NO — Main JavaScript
   ============================================ */

'use strict';

// === NAVBAR SCROLL BEHAVIOR ===
const nav = document.querySelector('.nav');

function updateNav() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
    nav.classList.remove('transparent');
  } else {
    nav.classList.remove('scrolled');
    nav.classList.add('transparent');
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// === MOBILE MENU ===
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.nav-mobile');
const closeBtn = document.querySelector('.nav-mobile-close');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'translateY(6px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
  });

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
  });
}

// === SCROLL REVEAL ANIMATIONS ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// === PARALLAX EXPERIENCE SECTION ===
const experienceSection = document.querySelector('.experience');
const experienceImg = document.querySelector('.experience-image');

if (experienceSection && experienceImg) {
  const parallaxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  parallaxObserver.observe(experienceSection);

  window.addEventListener('scroll', () => {
    const rect = experienceSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const yOffset = (progress - 0.5) * 60;
      experienceImg.style.transform = `scale(1.05) translateY(${yOffset}px)`;
    }
  }, { passive: true });
}

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// === TOUR CARDS HOVER CURSOR ===
document.querySelectorAll('.tour-card, .news-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.zIndex = '10';
  });
  card.addEventListener('mouseleave', function() {
    this.style.zIndex = '';
  });
});

// === CONTACT FORM ===
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = this.querySelector('[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Sender...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    // Simulert submit — bytt ut med faktisk form-handling
    setTimeout(() => {
      btn.textContent = 'Sendt! Vi tar kontakt snart.';
      btn.style.opacity = '1';
      btn.style.background = '#2a5266';
      btn.style.color = 'white';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        contactForm.reset();
      }, 4000);
    }, 1200);
  });
}

// === ACTIVE NAV LINK ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'white'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
