// Configuration - Update these with your actual answers
const CORRECT_ANSWERS = {
    q1: 'Coffee Project', // Format: MM/DD/YYYY
    q2: 'New Year Party', // Song title (case-insensitive)
    q3: '3' // Location (case-insensitive)
};

// DOM Elements
const form = document.getElementById('loveQuiz');
const inputs = form.querySelectorAll('input[type="text"]');
const progressDots = document.querySelectorAll('.dot');
const submitButton = form.querySelector('.btn-submit');

// Track filled inputs for progress indication
let filledCount = 0;

// Add floating hearts periodically (simple emoji hearts)
function createFloatingHeart() {
    const heartsContainer = document.querySelector('.hearts-background');
    const heart = document.createElement('div');
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💞'];
    
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    heart.style.opacity = '0';
    heart.style.animation = `floatingHearts ${Math.random() * 5 + 10}s linear`;
    heart.style.animationDelay = Math.random() * 5 + 's';
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 15000);
}

// Create floating hearts at intervals
setInterval(createFloatingHeart, 3000);

// Add face sparkles periodically (her face image)
function createSparkle() {
    const sparklesContainer = document.querySelector('.sparkles');
    const sparkle = document.createElement('img');
    
    sparkle.src = 'face-float.jpg'; // Using her face image
    sparkle.className = 'face-sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.width = (Math.random() * 20 + 30) + 'px'; // Random size 30-50px
    sparkle.style.height = sparkle.style.width;
    sparkle.style.opacity = '0';
    sparkle.style.animation = 'sparkle 3s ease-in-out';
    
    sparklesContainer.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

setInterval(createSparkle, 2000);

// Update progress dots
function updateProgress() {
    const filled = Array.from(inputs).filter(input => input.value.trim() !== '').length;
    
    progressDots.forEach((dot, index) => {
        if (index < filled) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Input event listeners
inputs.forEach((input, index) => {
    // Clear error on input
    input.addEventListener('input', function() {
        this.classList.remove('error');
        const errorMsg = this.parentElement.querySelector('.error-message');
        errorMsg.classList.remove('show');
        errorMsg.textContent = '';
        updateProgress();
    });

    // Add focus effects
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });

    // Animate on first interaction
    input.addEventListener('focus', function handleFirstFocus() {
        createSparkle();
        this.removeEventListener('focus', handleFirstFocus);
    }, { once: true });
});

// Normalize text for comparison (trim and lowercase)
function normalizeText(text) {
    return text.trim().toLowerCase();
}

// Validate date format
function isValidDate(dateString) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return regex.test(dateString);
}

// Check answers
function checkAnswers(formData) {
    let allCorrect = true;
    const errors = {};

    // Check question 1 (date)
    const q1Answer = formData.get('q1').trim();
if (normalizeText(q1Answer) !== normalizeText(CORRECT_ANSWERS.q1)) {
            errors.q1 = 'Please use MM/DD/YYYY format';
        allCorrect = false;
    
    }

    // Check question 2 (song)
    const q2Answer = formData.get('q2');
    if (normalizeText(q2Answer) !== normalizeText(CORRECT_ANSWERS.q2)) {
        errors.q2 = 'Hmm, that\'s not it... think harder! 🎵';
        allCorrect = false;
    }

    // Check question 3 (location)
    const q3Answer = formData.get('q3');
    if (normalizeText(q3Answer) !== normalizeText(CORRECT_ANSWERS.q3)) {
        errors.q3 = 'Not the right place... remember! 💭';
        allCorrect = false;
    }

    return { allCorrect, errors };
}

// Display errors
function displayErrors(errors) {
    Object.keys(errors).forEach(key => {
        const input = form.querySelector(`input[name="${key}"]`);
        const errorMsg = input.parentElement.querySelector('.error-message');
        
        input.classList.add('error');
        errorMsg.textContent = errors[key];
        errorMsg.classList.add('show');
    });
}

// Show success message
function showSuccess() {
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFloatingHeart();
            createSparkle();
        }, i * 50);
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    
    const content = document.createElement('div');
    content.className = 'success-content';
    content.innerHTML = `
        <h2>🎉 Perfect! 🎉</h2>
        <p style="font-size: 2rem; margin: 30px 0;">💍</p>
        <p style="font-size: 1.8rem; margin: 20px 0;">Congratulations 151!</p>
        <p style="font-size: 1.2rem; margin-top: 30px; color: rgba(255,255,255,0.7);">
            You know me better than anyone 💕
        </p>
        <button id="continueBtn" style="
            margin-top: 40px;
            padding: 15px 40px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border: none;
            border-radius: 15px;
            color: white;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            box-shadow: 0 10px 30px rgba(245, 87, 108, 0.3);
            transition: all 0.3s ease;
        ">Continue →</button>
    `;
    
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Add continuous heart rain
    const heartInterval = setInterval(() => {
        createFloatingHeart();
    }, 200);

    // Continue button handler
    document.getElementById('continueBtn').addEventListener('click', () => {
        clearInterval(heartInterval);
        overlay.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            overlay.remove();
            showMenu();
        }, 500);
    });

    // Clear saved form data
    clearSavedData();
}

// ==================== MENU FUNCTIONALITY ====================
function showMenu() {
    const menuModal = document.getElementById('menuModal');
    menuModal.classList.remove('hidden');
    
    // Add click handlers for menu options
    const menuOptions = document.querySelectorAll('.menu-option');
    menuOptions.forEach(option => {
        option.addEventListener('click', function() {
            const optionType = this.getAttribute('data-option');
            menuModal.classList.add('hidden');
            
            setTimeout(() => {
                showSection(optionType);
            }, 300);
        });
    });
}

function showSection(sectionType) {
    // Hide all sections first
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show the selected section
    let sectionId = '';
    switch(sectionType) {
        case 'photos':
            sectionId = 'photosSection';
            break;
        case 'timeline':
            sectionId = 'timelineSection';
            break;
        case 'valentine':
            sectionId = 'valentineSection';
            break;
    }
    
    if (sectionId) {
        document.getElementById(sectionId).classList.remove('hidden');
        
        // Add sparkle effect when section opens
        for (let i = 0; i < 10; i++) {
            setTimeout(createSparkle, i * 100);
        }
    }
}

// Back button handlers
document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', function() {
        // Hide current section
        this.closest('.content-section').classList.add('hidden');
        
        // Show menu again
        setTimeout(() => {
            document.getElementById('menuModal').classList.remove('hidden');
        }, 300);
    });
});

// ==================== VALENTINE'S SECTION HANDLERS ====================
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const responseMessage = document.getElementById('responseMessage');

if (yesBtn) {
    yesBtn.addEventListener('click', function() {
        // Confetti explosion!
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                createFloatingHeart();
                createSparkle();
            }, i * 20);
        }
        
        responseMessage.className = 'response-message success';
        responseMessage.innerHTML = `
            <h3 style="font-size: 1.5rem; margin-bottom: 15px;">🎉 Yes! 🎉</h3>
            <p style="font-size: 1.1rem; margin-bottom: 15px;">
                You've made me the happiest person in the world! 💕
            </p>
            <p style="font-size: 1rem; color: rgba(255,255,255,0.8);">
                I can't wait to spend Valentine's Day with you and create more beautiful memories together!
            </p>
        `;
        responseMessage.classList.remove('hidden');
        
        // Disable buttons
        yesBtn.disabled = true;
        noBtn.disabled = true;
        
        // Make the yes button even more special
        yesBtn.style.transform = 'scale(1.1)';
        yesBtn.style.boxShadow = '0 20px 50px rgba(245, 87, 108, 0.6)';
    });
}

if (noBtn) {
    let noClickCount = 0;
    
    noBtn.addEventListener('click', function() {
        noClickCount++;
        
        if (noClickCount === 1) {
            responseMessage.className = 'response-message thinking';
            responseMessage.innerHTML = `
                <p style="font-size: 1.1rem;">
                    Aww, are you sure? Maybe you need a moment to think about all our amazing memories? 🤔💭
                </p>
            `;
            responseMessage.classList.remove('hidden');
            
            // Make the "Yes" button more enticing
            yesBtn.style.transform = 'scale(1.05)';
            yesBtn.style.animation = 'pulse 1s ease-in-out infinite';
            
        } else if (noClickCount === 2) {
            responseMessage.innerHTML = `
                <p style="font-size: 1.1rem;">
                    I know you'll say yes eventually! 😊 Take your time, I'll be here waiting... 💕
                </p>
            `;
            
            // Make the yes button bigger and harder to resist
            yesBtn.style.transform = 'scale(1.1)';
            
        } else {
            // After third click, make "no" button run away!
            const randomX = (Math.random() - 0.5) * 200;
            const randomY = (Math.random() - 0.5) * 100;
            noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
            
            responseMessage.innerHTML = `
                <p style="font-size: 1.1rem;">
                    The "Maybe" button is playing hard to get! 😄 But the "Yes" button is right there waiting... 💝
                </p>
            `;
        }
    });
    
    // Reset no button position on hover
    noBtn.addEventListener('mouseenter', function() {
        if (noClickCount >= 3) {
            const randomX = (Math.random() - 0.5) * 300;
            const randomY = (Math.random() - 0.5) * 200;
            this.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }
    });
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    
    // Add loading state to button
    submitButton.disabled = true;
    const originalText = submitButton.querySelector('.btn-text').textContent;
    submitButton.querySelector('.btn-text').textContent = 'Checking...';
    
    // Simulate slight delay for better UX
    setTimeout(() => {
        const { allCorrect, errors } = checkAnswers(formData);
        
        if (allCorrect) {
            showSuccess();
        } else {
            displayErrors(errors);
            submitButton.disabled = false;
            submitButton.querySelector('.btn-text').textContent = originalText;
            
            // Shake the form
            document.querySelector('.container').style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                document.querySelector('.container').style.animation = '';
            }, 500);
        }
    }, 800);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
    }
});

// Add initial sparkle on load
window.addEventListener('load', () => {
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(createSparkle, i * 200);
        }
    }, 500);
});

// Auto-save to localStorage (optional feature)
const AUTO_SAVE_KEY = 'loveQuiz_draft';

// Load saved data on page load
window.addEventListener('load', () => {
    const saved = localStorage.getItem(AUTO_SAVE_KEY);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.keys(data).forEach(key => {
                const input = form.querySelector(`input[name="${key}"]`);
                if (input) {
                    input.value = data[key];
                }
            });
            updateProgress();
        } catch (e) {
            console.log('Could not load saved data');
        }
    }
});

// Save data on input
inputs.forEach(input => {
    input.addEventListener('input', () => {
        const data = {};
        inputs.forEach(inp => {
            data[inp.name] = inp.value;
        });
        localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(data));
    });
});

// Clear saved data on successful submission
function clearSavedData() {
    localStorage.removeItem(AUTO_SAVE_KEY);
}

console.log('💕 Love Quiz initialized! Remember to update CORRECT_ANSWERS in script.js');
