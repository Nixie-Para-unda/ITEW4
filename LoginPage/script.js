    // Tab switching functionality with smooth animation
    const tabBtns = document.querySelectorAll('.auth-tab-btn');
    const forms = document.querySelectorAll('.auth-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // If already active, do nothing
            if (btn.classList.contains('active')) return;
            
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to selected tab
            btn.classList.add('active');
            
            // Animate out current form
            forms.forEach(form => {
                if (form.classList.contains('active')) {
                    form.style.opacity = '0';
                    form.style.transform = 'translateX(-50px)';
                    
                    setTimeout(() => {
                        form.classList.remove('active');
                        
                        // Animate in new form
                        const newForm = document.getElementById(`${tabId}-form`);
                        newForm.classList.add('active');
                        
                        // Trigger reflow for animation
                        void newForm.offsetWidth;
                        
                        newForm.style.opacity = '1';
                        newForm.style.transform = 'translateX(0)';
                    }, 300);
                }
            });
        });
    });
    
    // Password visibility toggle
    function togglePassword(inputId) {
        const passwordInput = document.getElementById(inputId);
        const icon = passwordInput.nextElementSibling.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    // Form validation
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your login logic here
        alert('Login form submitted!');
        window.location.href = '../LandingPage/Home.html';
    });
    
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (password.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
        }
        
        // Add your registration logic here
        alert('Registration form submitted successfully!');
    });