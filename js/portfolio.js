// Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Portfolio Filters
  const initPortfolioFilters = () => {
    const filters = document.querySelectorAll('.portfolio-filter');
    const items = document.querySelectorAll('.portfolio-item');
    
    if (!filters.length || !items.length) return;
    
    filters.forEach(filter => {
      filter.addEventListener('click', function() {
        // Remove active class from all filters
        filters.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked filter
        this.classList.add('active');
        
        const category = this.getAttribute('data-filter');
        
        // Filter items
        items.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (category === 'all' || category === itemCategory) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // Set initial active filter
    if (filters.length > 0) {
      filters[0].click();
    }
  };
  
  // Portfolio Modal
  const initPortfolioModal = () => {
    const modal = document.querySelector('.portfolio-modal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    const modalClose = modal ? modal.querySelector('.modal-close') : null;
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    
    if (!modal || !modalContent || !portfolioLinks.length) return;
    
    // Open modal function
    const openModal = (title, category, description, imageSrc, details) => {
      // Populate modal content
      let modalHTML = `
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <span class="modal-category">${category}</span>
        </div>
        <div class="modal-body">
          <div class="modal-image">
            <img src="${imageSrc}" alt="${title}">
          </div>
          <div class="modal-description">
            <p>${description}</p>
          </div>
      `;
      
      // Add project details if available
      if (details && details.length > 0) {
        modalHTML += `
          <div class="modal-details">
            <h4>Detalhes do Projeto</h4>
            <ul>
        `;
        
        details.forEach(detail => {
          modalHTML += `<li><strong>${detail.label}:</strong> ${detail.value}</li>`;
        });
        
        modalHTML += `
            </ul>
          </div>
        `;
      }
      
      modalHTML += `</div>`;
      
      // Set modal content
      modalContent.innerHTML = modalHTML;
      
      // Show modal
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    };
    
    // Close modal function
    const closeModal = () => {
      modal.classList.remove('show');
      document.body.style.overflow = '';
      
      // Clear modal content after animation
      setTimeout(() => {
        modalContent.innerHTML = '';
      }, 300);
    };
    
    // Add click event to portfolio items
    portfolioLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const portfolioItem = this.closest('.portfolio-item');
        
        // Get project data
        const title = portfolioItem.querySelector('.portfolio-title').textContent;
        const category = portfolioItem.querySelector('.portfolio-category').textContent;
        const description = portfolioItem.querySelector('.portfolio-description').textContent;
        const imageSrc = portfolioItem.querySelector('.portfolio-image').src;
        
        // Get additional details if available
        const detailsElement = portfolioItem.querySelector('.portfolio-details');
        let details = [];
        
        if (detailsElement) {
          const detailItems = detailsElement.querySelectorAll('li');
          detailItems.forEach(item => {
            const label = item.getAttribute('data-label');
            const value = item.getAttribute('data-value');
            details.push({ label, value });
          });
        }
        
        openModal(title, category, description, imageSrc, details);
      });
    });
    
    // Close modal when clicking the close button
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });
  };
  
  // Portfolio Masonry Layout (if needed)
  const initPortfolioMasonry = () => {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (!portfolioGrid || typeof Masonry === 'undefined') return;
    
    // Initialize Masonry
    const masonry = new Masonry(portfolioGrid, {
      itemSelector: '.portfolio-item',
      columnWidth: '.portfolio-item',
      percentPosition: true,
      transitionDuration: '0.3s'
    });
    
    // Update layout after images are loaded
    const images = portfolioGrid.querySelectorAll('img');
    let loadedImages = 0;
    
    images.forEach(img => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === images.length) {
            masonry.layout();
          }
        });
      }
    });
    
    // If all images are already loaded
    if (loadedImages === images.length) {
      masonry.layout();
    }
  };
  
  // Portfolio Hover Effect
  const initPortfolioHover = () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
      const overlay = item.querySelector('.portfolio-overlay');
      
      if (!overlay) return;
      
      item.addEventListener('mouseenter', function() {
        overlay.style.opacity = '1';
      });
      
      item.addEventListener('mouseleave', function() {
        overlay.style.opacity = '0';
      });
    });
  };
  
  // Initialize all portfolio functions
  initPortfolioFilters();
  initPortfolioModal();
  initPortfolioMasonry();
  initPortfolioHover();
});

