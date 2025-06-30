'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // DOM Elements
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messageContainer = document.getElementById('messageContainer');
    const sendButton = document.getElementById('sendButton');
    const chatMenu = document.getElementById('chatMenu');
    const chatMenuBtn = document.getElementById('chatMenuBtn');
    const closeChatMenu = document.getElementById('closeChatMenu');
    const typingIndicator = document.getElementById('typingIndicator');

    // Auto-resize textarea
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
        
        // Enable/disable send button based on input
        sendButton.disabled = messageInput.value.trim().length === 0;
    });

    // Handle message submission
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        
        if (message) {
            // Add message to chat
            addMessage(message, 'sent');
            
            // Clear input
            messageInput.value = '';
            messageInput.style.height = 'auto';
            sendButton.disabled = true;
            
            // Simulate reply after random delay
            simulateReply();
        }
    });

    // Add a message to the chat
    function addMessage(text, type = 'sent', includeImage = false) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex items-end space-x-2 ${type === 'sent' ? 'justify-end' : ''}`;
        
        let messageContent = '';
        
        if (type === 'received') {
            messageContent += `
                <div class="flex-shrink-0 w-6 h-6 rounded-full overflow-hidden">
                    <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" alt="Sarah" class="w-full h-full object-cover">
                </div>
            `;
        }
        
        messageContent += `
            <div class="max-w-[75%] ${type === 'sent' ? 'bg-pink-500 text-white' : 'bg-white'} rounded-2xl ${type === 'sent' ? 'rounded-br-none' : 'rounded-bl-none'} px-4 py-2 shadow-sm">
                ${includeImage ? `<img src="${includeImage}" alt="Shared image" class="w-full h-48 object-cover rounded-lg mb-2">` : ''}
                <p>${text}</p>
                <span class="text-xs ${type === 'sent' ? 'text-pink-100' : 'text-gray-500'} mt-1">${time}</span>
            </div>
        `;
        
        messageDiv.innerHTML = messageContent;
        messageContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        scrollToBottom();
    }

    // Simulate typing indicator
    function showTypingIndicator() {
        typingIndicator.style.display = 'flex';
        scrollToBottom();
    }

    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    // Simulate reply
    function simulateReply() {
        const replies = [
            "That sounds great! 😊",
            "I'd love to know more about that!",
            "What do you like to do for fun?",
            "Have any exciting plans for the weekend?",
            "That's interesting! Tell me more!",
            "I enjoy that too! We have so much in common!",
            "Would you like to meet up sometime?",
            "What's your favorite type of food?",
            "Do you enjoy traveling?",
            "What do you do for work?"
        ];

        const imageReplies = [
            {
                text: "Check out this amazing place I visited recently!",
                image: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg"
            },
            {
                text: "This is my favorite coffee shop ☕",
                image: "https://images.pexels.com/photos/1850595/pexels-photo-1850595.jpeg"
            }
        ];

        // Show typing indicator after random delay
        setTimeout(() => {
            showTypingIndicator();
            
            // Hide typing and show message after random delay
            setTimeout(() => {
                hideTypingIndicator();
                
                // Randomly decide whether to send image
                if (Math.random() < 0.2) { // 20% chance to send image
                    const imageReply = imageReplies[Math.floor(Math.random() * imageReplies.length)];
                    addMessage(imageReply.text, 'received', imageReply.image);
                } else {
                    const reply = replies[Math.floor(Math.random() * replies.length)];
                    addMessage(reply, 'received');
                }
            }, Math.random() * 2000 + 1000); // Random delay between 1-3 seconds
        }, Math.random() * 1000 + 500); // Random delay between 0.5-1.5 seconds
    }

    // Scroll chat to bottom
    function scrollToBottom() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }

    // Chat menu handlers
    chatMenuBtn.addEventListener('click', () => {
        chatMenu.classList.remove('hidden');
    });

    closeChatMenu.addEventListener('click', () => {
        chatMenu.classList.add('hidden');
    });

    // Close menu when clicking outside
    chatMenu.addEventListener('click', (e) => {
        if (e.target === chatMenu) {
            chatMenu.classList.add('hidden');
        }
    });

    // Handle image upload button
    const imageButton = document.querySelector('button[type="button"]');
    imageButton.addEventListener('click', () => {
        // In a real app, this would open a file picker
        alert('Image upload functionality would be implemented here!');
    });

    // Initialize
    scrollToBottom();
});
