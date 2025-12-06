// Common logic for all pages

document.addEventListener('DOMContentLoaded', () => {
    // ========== FOOTER DATE INFORMATION ==========
    const currentYearSpan = document.getElementById('current-year') || document.getElementById('copyright-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedPara = document.getElementById('last-modified');
    if (lastModifiedPara) {
        lastModifiedPara.textContent = `Last Modified: ${document.lastModified}`;
    }

    // ========== MOBILE MENU TOGGLE ==========
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.textContent = isOpen ? '❌' : '☰';
        });
    }
});
