// ===== DOM Elements =====
const body = document.body;
const darkToggle = document.getElementById('darkToggle');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const reveals = document.querySelectorAll('.reveal');
const navLinksItems = document.querySelectorAll('.nav-links a');
const navbar = document.getElementById('navbar');

// ===== Dark Mode Toggle =====
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
  body.classList.add('light');
  darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  darkToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ===== Mobile Menu Toggle =====
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const isClickInside = navbar.contains(e.target);
  if (!isClickInside && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// ===== Typing Animation =====
const typingText = document.querySelector('.typing-text');
const phrases = ['Web Developer', 'UI/UX Designer', 'Student', 'Creative Learner'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
  setTimeout(typeEffect, 1000);
});

// ===== Scroll Reveal Animation =====
function reveal() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (top < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// ===== Active Navigation Link =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Skill Bars Animation =====
const skillItems = document.querySelectorAll('.skill-item');

function animateSkillBars() {
  skillItems.forEach(item => {
    const skillPercent = item.getAttribute('data-skill');
    const progressBar = item.querySelector('.skill-progress');
    const top = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (top < windowHeight - 100) {
      setTimeout(() => {
        progressBar.style.width = skillPercent + '%';
      }, 200);
    }
  });
}

window.addEventListener('scroll', animateSkillBars);
animateSkillBars(); // Initial check

// ===== Back to Top Button =====
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Smooth Scroll =====
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Make scrollToSection available globally
window.scrollToSection = scrollToSection;

// ===== Form Validation & Submission =====
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Reset status
  formStatus.className = 'form-status';
  formStatus.textContent = '';
  
  // Validation
  if (name.length < 2) {
    showStatus('Nama minimal 2 karakter', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showStatus('Email tidak valid', 'error');
    return;
  }
  
  if (subject.length < 3) {
    showStatus('Subjek minimal 3 karakter', 'error');
    return;
  }
  
  if (message.length < 10) {
    showStatus('Pesan minimal 10 karakter', 'error');
    return;
  }
  
  // Simulate form submission
  const submitBtn = contactForm.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span>Mengirim...</span><i class="fas fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    showStatus('Pesan terkirim! Saya akan segera merespon.', 'success');
    contactForm.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showStatus(message, type) {
  formStatus.textContent = message;
  formStatus.classList.add(type);
  
  if (type === 'success') {
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }, 5000);
  }
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 50) {
    navbar.style.background = 'rgba(15, 23, 42, 0.9)';
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'var(--glass)';
    navbar.style.boxShadow = 'none';
  }
});

// Add light mode support for navbar
const style = document.createElement('style');
style.textContent = `
  body.light nav {
    background: rgba(248, 250, 252, 0.9);
  }
`;
document.head.appendChild(style);

// ===== Add hover effect to project cards =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});
