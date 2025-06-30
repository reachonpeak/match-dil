'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');

    if (mobileMenuButton && nav) {
        mobileMenuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                nav.style.maxHeight = nav.scrollHeight + 'px';
            } else {
                nav.style.maxHeight = null;
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                nav.classList.remove('active');
                nav.style.maxHeight = null;
            }
        });
    }

    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        observer.observe(card);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Create account button handlers
    const createAccountButtons = document.querySelectorAll('#create-account-btn, #signup-btn');
    createAccountButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    });

    // Login button handler
    const loginButton = document.querySelector('#login-btn');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // Add animation classes on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate-fadeIn');
            }
        });
    };

    // Listen for scroll events
    window.addEventListener('scroll', () => {
        animateOnScroll();
    });

    // Initial check for elements in view
    animateOnScroll();

    // Handle form submissions
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Simple validation
        let isValid = true;
        formData.forEach((value, key) => {
            if (!value) {
                isValid = false;
                const input = form.querySelector(`[name="${key}"]`);
                input.classList.add('border-red-500');
            }
        });

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
        }
    };

    // Add form submit handlers
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Remove error styling on input
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('border-red-500');
        });
    });
});
