document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqHeaders = document.querySelectorAll('.faq-header');
    
    faqHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const body = document.querySelector(targetId);
            const icon = this.querySelector('.faq-icon');
            
            // Close all other FAQs
            const allBodies = document.querySelectorAll('.faq-body');
            const allIcons = document.querySelectorAll('.faq-icon');
            
            allBodies.forEach(item => {
                if (item !== body) {
                    item.style.maxHeight = null;
                    const otherIcon = item.previousElementSibling.querySelector('.faq-icon');
                    if (otherIcon) {
                        otherIcon.classList.remove('rotate-icon');
                    }
                }
            });

            
            if (body.style.maxHeight) {
                body.style.maxHeight = null;
                icon.classList.remove('rotate-icon');
            } else {
                body.style.maxHeight = body.scrollHeight + 'px';
                icon.classList.add('rotate-icon');
            }
        });
    });
    
    // Category filter functionality
    const categoryPills = document.querySelectorAll('.category-pill');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all pills and add to the clicked pill
            categoryPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide FAQ categories based on selected category
            faqCategories.forEach(cat => {
                if (category === 'all' || cat.getAttribute('data-category') === category) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('faqSearch');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.toLowerCase();
        
        faqHeaders.forEach(header => {
            const question = header.querySelector('h2').textContent.toLowerCase();
            const body = header.nextElementSibling;
            const content = body.querySelector('.faq-content').textContent.toLowerCase();
            
            if (question.includes(query) || content.includes(query)) {
                header.parentElement.style.display = 'block';
            } else {
                header.parentElement.style.display = 'none';
            }
        });
        
        // Show all categories if search input is empty
        if (query === '') {
            faqCategories.forEach(cat => cat.style.display = 'block');
            categoryPills.forEach(p => {
                if (p.getAttribute('data-category') === 'all') {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
});