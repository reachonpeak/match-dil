'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Sample messages data (in real app, this would come from an API)
    const messages = [
        {
            id: 1,
            user: {
                id: 1,
                name: 'Sarah',
                image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
                online: true
            },
            lastMessage: "Hey! How's your day going? 😊",
            timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
            unread: true
        },
        {
            id: 2,
            user: {
                id: 2,
                name: 'Emily',
                image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
                online: false
            },
            lastMessage: 'Would love to grab coffee sometime!',
            timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
            unread: false
        }
    ];

    // Format timestamp
    function formatTimestamp(date) {
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days}d ago`;
        } else if (hours > 0) {
            return `${hours}h ago`;
        } else if (minutes > 0) {
            return `${minutes}m ago`;
        } else {
            return 'Just now';
        }
    }

    // Update timestamps periodically
    function updateTimestamps() {
        const timestamps = document.querySelectorAll('.message-timestamp');
        timestamps.forEach(element => {
            const timestamp = new Date(element.dataset.timestamp);
            element.textContent = formatTimestamp(timestamp);
        });
    }

    // Update timestamps every minute
    setInterval(updateTimestamps, 60000);

    // Handle message item clicks
    document.querySelectorAll('.message-item').forEach(item => {
        item.addEventListener('click', () => {
            const userId = item.dataset.userId;
            window.location.href = `chat.html?id=${userId}`;
        });
    });

    // Simulate receiving new messages
    function simulateNewMessage() {
        const randomMessages = [
            "Hey there! 👋",
            "How's your day going?",
            "Want to meet up?",
            "Nice to match with you!",
            "What are your plans for the weekend?"
        ];

        const randomIndex = Math.floor(Math.random() * randomMessages.length);
        const message = randomMessages[randomIndex];

        // Show notification
        if (Notification.permission === "granted") {
            new Notification("New Message", {
                body: message,
                icon: "/path/to/icon.png"
            });
        }

        // Update UI (in real app, this would be handled by WebSocket)
        updateUnreadCount();
    }

    // Request notification permission
    if ("Notification" in window) {
        Notification.requestPermission();
    }

    // Update unread message count
    function updateUnreadCount() {
        const unreadCount = messages.filter(m => m.unread).length;
        const badge = document.querySelector('.messages-badge');
        if (badge) {
            badge.textContent = unreadCount;
            badge.classList.toggle('hidden', unreadCount === 0);
        }
    }

    // Initialize
    updateTimestamps();
    updateUnreadCount();

    // Simulate occasional new messages (for demo purposes)
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every 30 seconds
            simulateNewMessage();
        }
    }, 30000);
});
