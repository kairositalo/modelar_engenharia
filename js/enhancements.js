// Enhanced Features JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Scroll Progress Indicator
  function initScrollIndicator() {
    // Create scroll indicator element
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    // Update scroll indicator
    function updateScrollIndicator() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      scrollIndicator.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollIndicator);
    updateScrollIndicator(); // Initial call
  }
  
  // Custom Cursor Trail
  function initCustomCursor() {
    // Create cursor trail element
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);
    
    // Update cursor position
    window.addEventListener('mousemove', function(e) {
      cursorTrail.style.left = e.clientX + 'px';
      cursorTrail.style.top = e.clientY + 'px';
    });
    
    // Hide cursor on mouse leave
    document.addEventListener('mouseleave', function() {
      cursorTrail.style.opacity = '0';
    });
    
    // Show cursor on mouse enter
    document.addEventListener('mouseenter', function() {
      cursorTrail.style.opacity = '0.7';
    });
  }
  
  // Lazy Loading for Images
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Performance Monitoring
  function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log('Page load time:', loadTime + 'ms');
      
      // Send analytics if needed
      if (typeof gtag !== 'undefined') {
        gtag('event', 'timing_complete', {
          'name': 'load',
          'value': loadTime
        });
      }
    });
  }
  
  // Accessibility Enhancements
  function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--azul-escuro);
      color: var(--branco);
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
      this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
      this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const heroSection = document.querySelector('#home');
    if (heroSection) {
      heroSection.setAttribute('role', 'main');
      heroSection.id = 'main';
    }
    
    // Improve focus management
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    // Add focus indicators
    focusableElements.forEach(element => {
      element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--ciano-brilhante)';
        this.style.outlineOffset = '2px';
      });
      
      element.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
      });
    });
  }
  
  // Error Handling
  function initErrorHandling() {
    window.addEventListener('error', function(e) {
      console.error('JavaScript Error:', e.error);
      
      // Show user-friendly error message
      const errorMessage = document.createElement('div');
      errorMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 71, 87, 0.9);
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 10000;
        max-width: 300px;
        font-size: 14px;
      `;
      errorMessage.textContent = 'Ocorreu um erro inesperado. Por favor, recarregue a página.';
      
      document.body.appendChild(errorMessage);
      
      // Remove error message after 5 seconds
      setTimeout(() => {
        if (errorMessage.parentNode) {
          errorMessage.parentNode.removeChild(errorMessage);
        }
      }, 5000);
    });
  }
  
  // Service Worker Registration (for PWA capabilities)
  function initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
          .then(function(registration) {
            console.log('ServiceWorker registration successful');
          })
          .catch(function(err) {
            console.log('ServiceWorker registration failed');
          });
      });
    }
  }
  
  // Initialize all enhanced features
  initScrollIndicator();
  initCustomCursor();
  initLazyLoading();
  initPerformanceMonitoring();
  initAccessibility();
  initErrorHandling();
  // initServiceWorker(); // Uncomment if you want PWA capabilities
  
  // Console welcome message
  console.log('%c🚀 Modelar Engenharia Digital', 'color: #00E5FF; font-size: 20px; font-weight: bold;');
  console.log('%cSite desenvolvido com tecnologia de ponta!', 'color: #3A7BD5; font-size: 14px;');
});

