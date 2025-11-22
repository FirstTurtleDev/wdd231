// ========== navigation.js ==========
// This handles the mobile menu toggle for discover.html and other pages

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav ul');

if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (primaryNav && menuToggle) {
        if (!e.target.closest('.site-header') && primaryNav.classList.contains('open')) {
            primaryNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// Close menu when window is resized to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 640 && primaryNav) {
        primaryNav.classList.remove('open');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
});