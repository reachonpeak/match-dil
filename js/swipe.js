'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // DOM Elements
    const cardStack = document.getElementById('cardStack');
    const loadingState = document.getElementById('loadingState');
    const matchPopup = document.getElementById('matchPopup');
    const filterModal = document.getElementById('filterModal');
    const filterBtn = document.getElementById('filterBtn');
    const closeFilterBtn = document.getElementById('closeFilterBtn');
    const nopeBtn = document.getElementById('nopeBtn');
    const likeBtn = document.getElementById('likeBtn');
    const superLikeBtn = document.getElementById('superLikeBtn');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const keepSwipingBtn = document.getElementById('keepSwipingBtn');

    // State
    let currentCard = null;
    let initialX = 0;
    let initialY = 0;
    let isDragging = false;

    // Sample profiles data (in real app, this would come from an API)
    const profiles = [
        {
            id: 1,
            name: 'Sarah, 25',
            bio: 'Adventure seeker & coffee lover ☕',
            images: ['https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'],
            distance: '3 kilometers away'
        },
        {
            id: 2,
            name: 'Emily, 28',
            bio: 'Artist, dreamer, and dog mom 🎨🐕',
            images: ['https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg'],
            distance: '5 kilometers away'
        },
        // Add more sample profiles here
    ];

    // Initialize the card stack
    function initializeCards() {
        loadingState.style.display = 'none';
        profiles.forEach((profile, index) => {
            createCard(profile, index === profiles.length - 1);
        });
    }

    // Create a new card element
    function createCard(profile, isActive = false) {
        const card = document.createElement('div');
        card.className = 'absolute inset-0 bg-white rounded-2xl shadow-lg transition-transform duration-300 ease-out';
        card.style.transform = isActive ? 'scale(1)' : 'scale(0.95) translateY(20px)';
        card.style.zIndex = isActive ? '10' : '0';
        card.dataset.profileId = profile.id;

        card.innerHTML = `
            <div class="relative h-full">
                <img src="${profile.images[0]}" alt="${profile.name}" class="w-full h-full object-cover rounded-2xl">
                <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white rounded-b-2xl">
                    <h3 class="text-2xl font-bold mb-2">${profile.name}</h3>
                    <p class="mb-2">${profile.bio}</p>
                    <p class="text-sm opacity-75">${profile.distance}</p>
                </div>
                <div class="absolute top-4 right-4 space-y-2">
                    <button class="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                        <i class="fas fa-info text-pink-500"></i>
                    </button>
                </div>
            </div>
        `;

        if (isActive) {
            setupCardInteractions(card);
            currentCard = card;
        }

        cardStack.appendChild(card);
    }

    // Set up touch/mouse interactions for a card
    function setupCardInteractions(card) {
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let isDragging = false;

        function startDragging(e) {
            isDragging = true;
            startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
            card.style.transition = 'none';
        }

        function drag(e) {
            if (!isDragging) return;

            e.preventDefault();
            currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

            const deltaX = currentX - startX;
            const deltaY = currentY - startY;
            const rotation = deltaX * 0.1; // Rotate card while dragging

            card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;

            // Show like/nope indicators based on drag direction
            updateLikeNope(deltaX);
        }

        function stopDragging() {
            if (!isDragging) return;
            isDragging = false;
            card.style.transition = 'transform 0.3s ease-out';

            const deltaX = currentX - startX;
            const threshold = window.innerWidth * 0.4;

            if (Math.abs(deltaX) > threshold) {
                // Swipe was strong enough
                const direction = deltaX > 0 ? 'right' : 'left';
                completeSwipe(direction);
            } else {
                // Reset card position
                card.style.transform = 'translate(0, 0) rotate(0deg)';
            }
        }

        card.addEventListener('mousedown', startDragging);
        card.addEventListener('touchstart', startDragging);
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchend', stopDragging);
    }

    // Update like/nope indicators while dragging
    function updateLikeNope(deltaX) {
        if (deltaX > 50) {
            // Show LIKE indicator
            likeBtn.classList.add('scale-125');
            nopeBtn.classList.remove('scale-125');
        } else if (deltaX < -50) {
            // Show NOPE indicator
            nopeBtn.classList.add('scale-125');
            likeBtn.classList.remove('scale-125');
        } else {
            // Reset indicators
            likeBtn.classList.remove('scale-125');
            nopeBtn.classList.remove('scale-125');
        }
    }

    // Complete the swipe animation and handle the result
    function completeSwipe(direction) {
        const rotation = direction === 'right' ? 30 : -30;
        const translateX = direction === 'right' ? window.innerWidth * 1.5 : -window.innerWidth * 1.5;

        currentCard.style.transform = `translate(${translateX}px, 0) rotate(${rotation}deg)`;

        // Handle the swipe result
        setTimeout(() => {
            cardStack.removeChild(currentCard);
            if (direction === 'right') {
                // Simulate 30% chance of a match when swiping right
                if (Math.random() < 0.3) {
                    showMatchPopup();
                }
            }
            // Show next card
            showNextCard();
        }, 300);
    }

    // Show the next card in the stack
    function showNextCard() {
        const cards = cardStack.querySelectorAll('.card');
        if (cards.length > 0) {
            const nextCard = cards[cards.length - 1];
            nextCard.style.transform = 'scale(1)';
            setupCardInteractions(nextCard);
            currentCard = nextCard;
        } else {
            // No more cards, show empty state
            showEmptyState();
        }
    }

    // Show match popup
    function showMatchPopup() {
        matchPopup.classList.remove('hidden');
    }

    // Show empty state when no more profiles
    function showEmptyState() {
        cardStack.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center p-4">
                <i class="fas fa-search text-6xl text-pink-500 mb-4"></i>
                <h3 class="text-xl font-bold mb-2">No more profiles</h3>
                <p class="text-gray-600">Check back later for new matches</p>
            </div>
        `;
    }

    // Event Listeners
    filterBtn.addEventListener('click', () => {
        filterModal.classList.remove('hidden');
    });

    closeFilterBtn.addEventListener('click', () => {
        filterModal.classList.add('hidden');
    });

    nopeBtn.addEventListener('click', () => {
        if (currentCard) completeSwipe('left');
    });

    likeBtn.addEventListener('click', () => {
        if (currentCard) completeSwipe('right');
    });

    superLikeBtn.addEventListener('click', () => {
        if (currentCard) {
            // Handle super like
            showMatchPopup(); // Always show match for super likes
            completeSwipe('right');
        }
    });

    sendMessageBtn.addEventListener('click', () => {
        window.location.href = 'messages.html';
    });

    keepSwipingBtn.addEventListener('click', () => {
        matchPopup.classList.add('hidden');
    });

    // Initialize the card stack
    initializeCards();
});
