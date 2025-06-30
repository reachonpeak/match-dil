'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // DOM Elements
    const editAboutBtn = document.getElementById('editAboutBtn');
    const editAboutModal = document.getElementById('editAboutModal');
    const closeAboutModal = document.getElementById('closeAboutModal');
    const aboutText = document.getElementById('aboutText');
    const aboutInput = document.getElementById('aboutInput');
    const saveAboutBtn = document.getElementById('saveAboutBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const editInterestsBtn = document.getElementById('editInterestsBtn');

    // Profile Data (in real app, this would come from an API)
    let profileData = {
        name: 'Jessica',
        age: 25,
        location: 'New York City',
        about: 'Adventure seeker & coffee enthusiast. Love exploring new places and meeting new people. Always up for a good conversation over coffee! ☕️✨',
        photos: [
            'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
            'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
        ],
        interests: ['Travel', 'Coffee', 'Photography', 'Music', 'Fitness']
    };

    // Initialize profile data
    function initializeProfile() {
        // Load profile data from localStorage if available
        const savedProfile = localStorage.getItem('profileData');
        if (savedProfile) {
            profileData = JSON.parse(savedProfile);
            updateProfileUI();
        }
    }

    // Update UI with profile data
    function updateProfileUI() {
        aboutText.textContent = profileData.about;
        // Update other UI elements with profile data
    }

    // Handle About section editing
    editAboutBtn.addEventListener('click', () => {
        aboutInput.value = profileData.about;
        editAboutModal.classList.remove('hidden');
    });

    closeAboutModal.addEventListener('click', () => {
        editAboutModal.classList.add('hidden');
    });

    saveAboutBtn.addEventListener('click', () => {
        const newAbout = aboutInput.value.trim();
        if (newAbout) {
            profileData.about = newAbout;
            aboutText.textContent = newAbout;
            localStorage.setItem('profileData', JSON.stringify(profileData));
            editAboutModal.classList.add('hidden');
        }
    });

    // Handle photo upload
    const photoUploadBtns = document.querySelectorAll('.aspect-square');
    photoUploadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.querySelector('img')) {
                // In a real app, this would open a file picker
                alert('Photo upload functionality would be implemented here!');
            }
        });
    });

    // Handle interests editing
    editInterestsBtn.addEventListener('click', () => {
        // In a real app, this would open an interests selection modal
        alert('Interests editing functionality would be implemented here!');
    });

    // Handle settings
    settingsBtn.addEventListener('click', () => {
        // In a real app, this would navigate to settings page
        alert('Settings functionality would be implemented here!');
    });

    // Handle logout
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            // Clear auth token and other stored data
            localStorage.removeItem('authToken');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('profileData');
            
            // Redirect to login page
            window.location.href = 'login.html';
        }
    });

    // Handle profile picture update
    const profilePicBtn = document.querySelector('.fa-camera').parentElement;
    profilePicBtn.addEventListener('click', () => {
        // In a real app, this would open a file picker
        alert('Profile picture update functionality would be implemented here!');
    });

    // Close modal when clicking outside
    editAboutModal.addEventListener('click', (e) => {
        if (e.target === editAboutModal) {
            editAboutModal.classList.add('hidden');
        }
    });

    // Handle account settings navigation
    const settingsButtons = document.querySelectorAll('.space-y-4 button:not(#logoutBtn)');
    settingsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const setting = button.querySelector('span').textContent;
            alert(`${setting} page would open here!`);
        });
    });

    // Initialize profile
    initializeProfile();

    // Simulate profile verification
    function simulateVerification() {
        // In a real app, this would be handled by the backend
        setTimeout(() => {
            const verifiedBadge = document.createElement('span');
            verifiedBadge.className = 'ml-2 text-blue-500';
            verifiedBadge.innerHTML = '<i class="fas fa-check-circle"></i>';
            document.querySelector('h2').appendChild(verifiedBadge);
        }, 1000);
    }

    // Run verification
    simulateVerification();

    // Handle realtime status updates
    let isOnline = true;
    function updateOnlineStatus() {
        const statusDot = document.createElement('span');
        statusDot.className = `inline-block w-2 h-2 rounded-full ml-2 ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`;
        const location = document.querySelector('.text-pink-100');
        location.appendChild(statusDot);
    }

    // Update online status
    updateOnlineStatus();

    // Simulate occasional status changes
    setInterval(() => {
        isOnline = Math.random() > 0.3; // 70% chance to be online
        updateOnlineStatus();
    }, 60000); // Check every minute
});
