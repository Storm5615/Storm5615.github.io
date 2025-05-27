document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // Typing Animation
  const typingText = document.querySelector('.typing-text');
  const words = ['Designer', 'Developer', 'Video Editor', 'Creative'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;
  
  function type() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    
    typingText.textContent = currentChar;
    
    if (!isDeleting && charIndex < currentWord.length) {
      // Typing
      charIndex++;
      setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      charIndex--;
      setTimeout(type, 50);
    } else {
      // Change word
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(type, 1000);
    }
  }
  
  // Start typing animation
  setTimeout(type, 1000);
  
  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  
  function scrollReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', scrollReveal);
  window.addEventListener('load', scrollReveal);
  
  // Header Scroll Effect
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });
  
  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Portfolio Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Testimonial Slider
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
  }
  
  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  }
  
  // Auto-rotate testimonials every 5 seconds
  setInterval(nextTestimonial, 5000);
  
  // Initialize first testimonial
  showTestimonial(0);
  
  // Skill Progress Bars Animation
  const skillItems = document.querySelectorAll('.skill-item');
  
  function animateSkills() {
    skillItems.forEach(item => {
      const progressBar = item.querySelector('.progress');
      const width = progressBar.style.width;
      progressBar.style.width = '0';
      
      setTimeout(() => {
        progressBar.style.width = width;
      }, 100);
    });
  }
  
  // Animate skills when section is visible
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.skills').forEach(section => {
    skillsObserver.observe(section);
  });
  
  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});