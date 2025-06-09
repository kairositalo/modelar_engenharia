// Animations JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Typing Effect for Hero Title
  function initTypeEffect() {
    const element = document.querySelector('.typing-effect');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.display = 'inline-block';
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
  }
  
  // Delayed execution to ensure DOM is fully loaded
  setTimeout(initTypeEffect, 1000);
  
  // Parallax Effect
  function parallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(window.scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
  
  window.addEventListener('scroll', parallaxEffect);
  
  // Scroll Reveal Animation
  function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
  
  // Counter Animation
  function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = parseInt(counter.getAttribute('data-duration') || 2000);
      const increment = target / (duration / 16); // 60fps
      
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      // Start animation when element is in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(counter);
    });
  }
  
  // Initialize counter animation
  animateCounter();
  
  // Floating Elements Animation
  function initFloatingElements() {
    const elements = document.querySelectorAll('.floating');
    
    elements.forEach((element, index) => {
      // Create random delay and duration for each element
      const delay = Math.random() * 2;
      const duration = 3 + Math.random() * 2;
      
      element.style.animationDelay = `${delay}s`;
      element.style.animationDuration = `${duration}s`;
    });
  }
  
  initFloatingElements();
  
  // Glow Effect on Hover
  function initGlowEffect() {
    const glowElements = document.querySelectorAll('.glow-on-hover');
    
    glowElements.forEach(element => {
      element.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--x', `${x}px`);
        this.style.setProperty('--y', `${y}px`);
      });
    });
  }
  
  initGlowEffect();
  
  // Tilt Effect
  function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
      element.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (y - centerY) / 10;
        const tiltY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });
      
      element.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }
  
  initTiltEffect();
  
  // Cursor Trail Effect
  function initCursorTrail() {
    const cursor = document.querySelector('.cursor-trail');
    if (!cursor) return;
    
    window.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }
  
  initCursorTrail();
  
  // Staggered Animation for Lists
  function initStaggeredAnimation() {
    const staggerContainers = document.querySelectorAll('.stagger-container');
    
    staggerContainers.forEach(container => {
      const items = container.querySelectorAll('.stagger-item');
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate');
            }, 100 * index);
          });
          observer.unobserve(container);
        }
      }, { threshold: 0.2 });
      
      observer.observe(container);
    });
  }
  
  initStaggeredAnimation();
  
  // Grid Animation
  function initGridAnimation() {
    const gridBg = document.querySelector('.grid-background');
    if (!gridBg) return;
    
    window.addEventListener('mousemove', function(e) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      gridBg.style.backgroundPosition = `${x * 50}px ${y * 50}px`;
    });
  }
  
  initGridAnimation();
});

