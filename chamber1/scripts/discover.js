// Import attractions data
import attractions from '../data/attractions.mjs';

// ========== VISITOR TRACKING ==========
function displayVisitorMessage() {
    const visitorMessageEl = document.getElementById('visitor-message');
    if (!visitorMessageEl) return;

    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    let message = '';

    if (!lastVisit) {
        // First visit
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastVisitTime = parseInt(lastVisit);
        const timeDiff = now - lastVisitTime;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff < 1) {
            // Less than a day
            message = 'Back so soon! Awesome!';
        } else {
            // Show number of days
            const dayText = daysDiff === 1 ? 'day' : 'days';
            message = `You last visited ${daysDiff} ${dayText} ago.`;
        }
    }

    visitorMessageEl.textContent = message;

    // Update localStorage with current visit
    localStorage.setItem('lastVisit', now.toString());
}

// ========== GENERATE ATTRACTION CARDS ==========
function generateAttractionCards() {
    const container = document.getElementById('attractions-grid');
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';

    attractions.forEach((attraction, index) => {
        const card = document.createElement('article');
        card.className = 'attraction-card';

        card.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img 
                    src="images/${attraction.image}" 
                    alt="${attraction.name}"
                    loading="lazy"
                    width="300"
                    height="200"
                >
            </figure>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button class="learn-more-btn" data-index="${index}">Learn More</button>
        `;

        container.appendChild(card);
    });

    // Add event listeners to "Learn More" buttons
    attachLearnMoreListeners();
}

// ========== LEARN MORE BUTTON HANDLERS ==========
function attachLearnMoreListeners() {
    const buttons = document.querySelectorAll('.learn-more-btn');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            const attraction = attractions[index];

            // For now, just log to console - you can enhance this later
            console.log('Learn more about:', attraction.name);
            alert(`More information about ${attraction.name} coming soon!`);
        });
    });
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    displayVisitorMessage();
    generateAttractionCards();
});
