document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Navbar & Active Link Observer ---
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    // Header shrinking
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll to Top Button Visibility
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  // Smooth scroll scroll-to-top
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Active Link Observer
  const sectionObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, sectionObserverOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // --- Mobile Hamburger Menu ---
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    const isOpen = hamburger.classList.contains('open');
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', !isOpen);
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close Mobile Menu on Resize if screen becomes large
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // --- Announcement Close ---
  const announcement = document.getElementById('announcement');
  const announceCloseBtn = document.querySelector('.announcement-close');
  if (announceCloseBtn && announcement) {
    announceCloseBtn.addEventListener('click', () => {
      announcement.style.display = 'none';
      // Adjust main element's margin if needed
      const main = document.querySelector('main');
      if (main) {
        main.style.marginTop = 'var(--nav-height)';
      }
    });
  }

  // --- Scroll entrance animations (Intersection Observer) ---
  const animElements = document.querySelectorAll('.animate-on-scroll');
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animObserver.unobserve(entry.target); // Trigger once
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animElements.forEach(el => animObserver.observe(el));

  // --- Stat Counter Animation ---
  const statNumbers = document.querySelectorAll('.stat-number');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetVal = parseInt(target.getAttribute('data-target'), 10);
        let currentVal = 0;
        const duration = 1200; // ms
        const steps = 60;
        const stepTime = duration / steps;
        const increment = targetVal / steps;
        
        const counter = setInterval(() => {
          currentVal += increment;
          if (currentVal >= targetVal) {
            target.textContent = targetVal;
            clearInterval(counter);
          } else {
            target.textContent = Math.floor(currentVal);
          }
        }, stepTime);
        
        countObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => countObserver.observe(stat));

  // --- Courses Slider/Scroll ---
  const coursesGrid = document.querySelector('.courses-grid');
  const prevBtn = document.getElementById('course-prev');
  const nextBtn = document.getElementById('course-next');

  if (coursesGrid && prevBtn && nextBtn) {
    const getScrollAmount = () => {
      const card = coursesGrid.querySelector('.course-card');
      return card ? card.offsetWidth + 24 : 300;
    };

    prevBtn.addEventListener('click', () => {
      coursesGrid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      coursesGrid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    // Control button visibility / states based on screen size
    const checkScrollButtons = () => {
      if (window.innerWidth >= 1024) {
        // Desktop is 4 columns, no scroll container
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'inline-flex';
        nextBtn.style.display = 'inline-flex';
      }
    };

    window.addEventListener('resize', checkScrollButtons);
    checkScrollButtons(); // Initial check
  }

  // --- Form Submissions ---
  const enrollmentForm = document.getElementById('enrollment-form');
  if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = enrollmentForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      // Simulate network request
      setTimeout(() => {
        alert('Thank you for your interest! We have received your inquiry and will call you within 24 hours to schedule your free demo class.');
        enrollmentForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      
      submitBtn.disabled = true;
      setTimeout(() => {
        alert(`Successfully subscribed! Exam alerts will be sent to: ${emailInput.value}`);
        newsletterForm.reset();
        submitBtn.disabled = false;
      }, 800);
    });
  }
});
