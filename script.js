// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved user preference
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    body.setAttribute('data-theme', 'dark');
    darkModeToggle.setAttribute('aria-pressed', 'true');
}

darkModeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('darkMode', null);
        darkModeToggle.setAttribute('aria-pressed', 'false');
        announceChange('Light mode enabled');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.setAttribute('aria-pressed', 'true');
        announceChange('Dark mode enabled');
    }
});

// Font size controls
const decreaseFont = document.getElementById('decreaseFont');
const resetFont = document.getElementById('resetFont');
const increaseFont = document.getElementById('increaseFont');
let currentFontSize = 16; // Default font size in pixels

function updateFontSize(action) {
    const root = document.documentElement;
    
    switch(action) {
        case 'increase':
            currentFontSize = Math.min(currentFontSize + 2, 24);
            break;
        case 'decrease':
            currentFontSize = Math.max(currentFontSize - 2, 12);
            break;
        case 'reset':
            currentFontSize = 16;
            break;
    }
    
    root.style.fontSize = `${currentFontSize}px`;
    localStorage.setItem('fontSize', currentFontSize);
    announceChange(`Font size ${action}d to ${currentFontSize} pixels`);
}

// Load saved font size
const savedFontSize = localStorage.getItem('fontSize');
if (savedFontSize) {
    currentFontSize = parseInt(savedFontSize);
    document.documentElement.style.fontSize = `${currentFontSize}px`;
}

decreaseFont.addEventListener('click', () => updateFontSize('decrease'));
resetFont.addEventListener('click', () => updateFontSize('reset'));
increaseFont.addEventListener('click', () => updateFontSize('increase'));

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainMenu.classList.toggle('show');
    announceChange(isExpanded ? 'Menu closed' : 'Menu opened');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainMenu.classList.contains('show')) {
        mainMenu.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
    }
});

// Function to announce changes to screen readers
function announceChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Add skip to main content link for keyboard users
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
document.body.insertBefore(skipLink, document.body.firstChild);
