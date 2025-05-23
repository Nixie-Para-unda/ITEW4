// JavaScript for the website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize any necessary components
    
    // Dropdown hover functionality for desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth > 992) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseover', function() {
                this.querySelector('.dropdown-menu').classList.add('show');
            });
            
            dropdown.addEventListener('mouseout', function() {
                this.querySelector('.dropdown-menu').classList.remove('show');
            });
        });
    }
    
    // Search button functionality
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            // You can replace this with actual search functionality
            alert('Search functionality will be implemented here');
            
            // Alternative: Toggle a search form
            // const searchForm = document.querySelector('.search-form');
            // if (searchForm) {
            //     searchForm.classList.toggle('active');
            // }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current navigation item based on URL
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentLocation || (currentLocation === '/' && linkPath === '#')) {
            link.classList.add('active');
        }
    });
});

// Responsive nav menu enhancement
window.addEventListener('resize', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth > 992) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseover', function() {
                this.querySelector('.dropdown-menu').classList.add('show');
            });
            
            dropdown.addEventListener('mouseout', function() {
                this.querySelector('.dropdown-menu').classList.remove('show');
            });
        });
    } else {
        dropdowns.forEach(dropdown => {
            dropdown.removeEventListener('mouseover', function() {});
            dropdown.removeEventListener('mouseout', function() {});
        });
    }
});

const cards = document.querySelectorAll('.event-card');
cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // Animate stat numbers when they come into view
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.1});
    
    statNumbers.forEach(number => {
      observer.observe(number);
    });
    
    function animateCounter(element) {
      const target = parseInt(element.getAttribute('data-count'));
      const duration = 2000; // ms
      const step = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          element.textContent = target;
          clearInterval(timer);
        } else {
          element.textContent = Math.round(current);
        }
      }, 16);
    }
  });
