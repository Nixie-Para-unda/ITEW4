// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    const volunteerForm = document.getElementById('volunteerForm');
    const formConfirmation = document.getElementById('formConfirmation');
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server here
            // For this example, we'll just show the confirmation message
            
            // Simulate form processing delay
            setTimeout(function() {
                // Hide the form
                volunteerForm.style.display = 'none';
                
                // Show the confirmation message
                formConfirmation.classList.remove('d-none');
                
                // Scroll to the confirmation message
                formConfirmation.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        });
    }
    
    // Counter animation for impact section
    function animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const duration = 2000; // Animation duration in milliseconds
        const frameRate = 60; // Frames per second
        const totalFrames = duration * frameRate / 1000;
        let frame = 0;
        
        const startValue = 0;
        const valueIncrement = (targetValue - startValue) / totalFrames;
        
        const counter = setInterval(() => {
            frame++;
            const currentValue = Math.round(startValue + valueIncrement * frame);
            element.textContent = currentValue.toLocaleString();
            
            if (frame >= totalFrames) {
                clearInterval(counter);
                element.textContent = targetValue.toLocaleString();
            }
        }, 1000 / frameRate);
    }
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Start counter animation when scrolled into view
    const impactSection = document.querySelector('.impact-section');
    let animationTriggered = false;
    
    function checkScroll() {
        if (!animationTriggered && impactSection && isInViewport(impactSection)) {
            animateCounter('adoptions-counter', 425);
            animateCounter('volunteers-counter', 87);
            animateCounter('hours-counter', 1240);
            animationTriggered = true;
        }
    }
    
    // Check if element is in viewport on page load
    checkScroll();
    
    // Check if element is in viewport on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Add animation to elements when they come into view
    const animatedElements = document.querySelectorAll('.card, .role-card, .testimonial-card, .impact-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Form validation - add custom validation messages
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            // Prevent the browser from showing default error message
            e.preventDefault();
            
            // Add custom validation class
            this.classList.add('is-invalid');
            
            // Get the input's parent element
            const formGroup = this.closest('.col-md-6, .col-12');
            
            // Remove any existing validation message
            const existingMessage = formGroup.querySelector('.invalid-feedback');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Create and add custom validation message
            const validationMessage = document.createElement('div');
            validationMessage.className = 'invalid-feedback';
            validationMessage.textContent = 'This field is required';
            
            // Append after the input
            this.after(validationMessage);
        });
        
        // Remove invalid class when input changes
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });
});