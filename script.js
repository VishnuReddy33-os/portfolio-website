// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Theme Toggle - FIXED
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');
  
  function setTheme(theme) {
    if (theme === 'light') {
      body.classList.remove('dark');
      body.classList.add('light');
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    } else {
      body.classList.remove('light');
      body.classList.add('dark');
      if (icon) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
    localStorage.setItem('theme', theme);
  }
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
  
  // Add click event to theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      if (body.classList.contains('dark')) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    });
  }
  
  // Animate progress bars on view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.progress-fill');
        fills.forEach(fill => { 
          fill.style.transition = 'width 1.2s ease-out'; 
        });
      }
    });
  }, { threshold: 0.2 });
  
  document.querySelectorAll('.skills-grid').forEach(el => observer.observe(el));
  
  // Download Resume Function - PDF Version
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Fetch the PDF file from the same folder
      fetch('resume (1).pdf')
        .then(response => {
          if (!response.ok) {
            throw new Error('PDF not found');
          }
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Gundam_Vishnu_Vardhan_Reddy_Resume.pdf';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        })
        .catch(error => {
          alert('Resume PDF not found. Please ensure "resume (1).pdf" is in the same folder.');
        });
    });
  }
  
  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const message = document.getElementById('contactMessage').value;
      
      if (name && email && message) {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      } else {
        alert('Please fill in all fields');
      }
    });
  }
  
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // Hamburger menu functionality
  const navToggle = document.getElementById('nav-toggle');
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  if (navToggle && hamburgerIcon) {
    hamburgerIcon.addEventListener('click', () => {
      navToggle.checked = !navToggle.checked;
    });
  }
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navToggle) navToggle.checked = false;
    });
  });
  
  console.log('Portfolio website loaded successfully!');
});