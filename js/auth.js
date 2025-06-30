'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            try {
                // Simulate API call
                await simulateLogin(email, password);
                
                // Store auth token (in real app, this would come from the server)
                localStorage.setItem('authToken', 'dummy-token');
                localStorage.setItem('userEmail', email);
                
                // Redirect to main app
                window.location.href = 'swipe.html';
            } catch (error) {
                showError(error.message);
            }
        });
    }

    // Signup form handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        const passwordInput = document.getElementById('password');
        const birthdateInput = document.getElementById('birthdate');

        // Password strength validation
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const requirements = {
                length: { test: password.length >= 8, element: document.getElementById('length-check') },
                uppercase: { test: /[A-Z]/.test(password), element: document.getElementById('uppercase-check') },
                lowercase: { test: /[a-z]/.test(password), element: document.getElementById('lowercase-check') },
                number: { test: /\d/.test(password), element: document.getElementById('number-check') }
            };

            // Update each requirement's visual state with animations
            Object.values(requirements).forEach(({ test, element }) => {
                const icon = element.querySelector('i');
                
                // Prepare for animation
                element.style.transform = 'translateX(0)';
                
                if (test) {
                    // Success state
                    element.classList.remove('text-gray-500');
                    element.classList.add('text-green-500');
                    icon.classList.remove('fa-circle');
                    icon.classList.add('fa-check-circle');
                    
                    // Add subtle animation
                    element.style.transform = 'translateX(5px)';
                    setTimeout(() => {
                        element.style.transform = 'translateX(0)';
                    }, 150);
                } else {
                    // Default state
                    element.classList.remove('text-green-500');
                    element.classList.add('text-gray-500');
                    icon.classList.remove('fa-check-circle');
                    icon.classList.add('fa-circle');
                }
            });

            // Update submit button state with animation
            const submitButton = document.getElementById('submitButton');
            const allRequirementsMet = Object.values(requirements).every(req => req.test);
            
            if (allRequirementsMet) {
                submitButton.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-gray-300');
                submitButton.classList.add('bg-gradient-to-r', 'from-pink-500', 'to-pink-600', 'transform', 'hover:scale-105');
                submitButton.removeAttribute('disabled');
                
                // Add pulse animation
                submitButton.classList.add('animate-pulse');
                setTimeout(() => {
                    submitButton.classList.remove('animate-pulse');
                }, 1000);
            } else {
                submitButton.classList.add('opacity-50', 'cursor-not-allowed', 'bg-gray-300');
                submitButton.classList.remove('bg-gradient-to-r', 'from-pink-500', 'to-pink-600', 'transform', 'hover:scale-105', 'animate-pulse');
                submitButton.setAttribute('disabled', 'true');
            }
        });

        // Age verification
        birthdateInput.addEventListener('change', () => {
            const birthDate = new Date(birthdateInput.value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age < 18) {
                birthdateInput.setCustomValidity('You must be at least 18 years old');
                showError('You must be at least 18 years old to register');
            } else {
                birthdateInput.setCustomValidity('');
            }
        });

        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(signupForm);
            const userData = Object.fromEntries(formData.entries());

            const submitButton = document.getElementById('submitButton');
            const loadingSpinner = submitButton.querySelector('.loading-spinner');
            const submitText = submitButton.querySelector('.submit-text');

            try {
                // Show loading state
                submitButton.disabled = true;
                loadingSpinner.classList.remove('hidden');
                submitText.textContent = 'Creating Account...';

                // Validate age
                const birthDate = new Date(userData.birthdate);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                if (age < 18) {
                    throw new Error('You must be at least 18 years old to register');
                }

                // Simulate API call
                await simulateSignup(userData);
                
                // Show success message
                showFormMessage('Account created successfully! Redirecting...', 'success');
                
                // Store auth token (in real app, this would come from the server)
                localStorage.setItem('authToken', 'dummy-token');
                localStorage.setItem('userEmail', userData.email);
                
                // Redirect to profile completion after a short delay
                setTimeout(() => {
                    window.location.href = 'swipe.html';
                }, 1500);
            } catch (error) {
                showFormMessage(error.message, 'error');
                submitButton.disabled = false;
                loadingSpinner.classList.add('hidden');
                submitText.textContent = 'Create Account';
            }
        });
    }

    // Social login handlers
    const socialButtons = document.querySelectorAll('button[type="button"]');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            showError('Social login will be implemented here!');
        });
    });
});

// Simulate login API call
async function simulateLogin(email, password) {
    // Add basic validation
    if (!email || !password) {
        throw new Error('Please fill in all fields');
    }

    if (!isValidEmail(email)) {
        throw new Error('Please enter a valid email address');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate successful login (in real app, this would be an API call)
    if (email === 'test@example.com' && password === 'Password123') {
        return true;
    }

    throw new Error('Invalid email or password');
}

// Simulate signup API call
async function simulateSignup(userData) {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'birthdate', 'gender'];
    for (const field of requiredFields) {
        if (!userData[field]) {
            throw new Error(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        }
    }

    if (!isValidEmail(userData.email)) {
        throw new Error('Please enter a valid email address');
    }

    // Validate password strength
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(userData.password)) {
        throw new Error('Password does not meet requirements');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate successful signup
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Form message helper
function showFormMessage(message, type = 'error') {
    const formMessage = document.getElementById('formMessage');
    const messageText = formMessage.querySelector('p');
    
    messageText.textContent = message;
    messageText.className = `text-sm font-medium ${type === 'success' ? 'text-green-600' : 'text-red-600'}`;
    
    formMessage.classList.remove('hidden');
    
    if (type === 'error') {
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }
}

// Check if user is already logged in
function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (token && (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html'))) {
        window.location.href = 'swipe.html';
    }
}

// Run auth check when script loads
checkAuth();
