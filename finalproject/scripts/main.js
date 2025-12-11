// Main JavaScript Module

const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('nav ul');

// --- HAMBURGER MENU ---
if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        menuButton.classList.toggle('open');
    });
}

// --- DATA FETCHING ---
async function getTrades() {
    try {
        const response = await fetch('data/trades.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch trades:", error);
        return [];
    }
}

// --- TRADE LOG PAGE LOGIC ---
const tradeGrid = document.querySelector('#trade-grid');
const filterAllBtn = document.querySelector('#filter-all');
const filterRecentBtn = document.querySelector('#filter-recent');

if (tradeGrid) {
    initTradeLog();
}

async function initTradeLog() {
    const trades = await getTrades();
    if (trades.length === 0) {
        tradeGrid.innerHTML = '<p>No trades found or error loading data.</p>';
        return;
    }

    // Load filter preference from Local Storage
    const savedFilter = localStorage.getItem('tradeFilter') || 'all';

    // Initial Render
    if (savedFilter === 'recent') {
        renderTrades(getRecentTrades(trades));
    } else {
        renderTrades(trades);
    }

    // Event Listeners for Filters
    if (filterAllBtn && filterRecentBtn) {
        filterAllBtn.addEventListener('click', () => {
            renderTrades(trades);
            localStorage.setItem('tradeFilter', 'all');
        });

        filterRecentBtn.addEventListener('click', () => {
            renderTrades(getRecentTrades(trades));
            localStorage.setItem('tradeFilter', 'recent');
        });
    }
}

function getRecentTrades(trades) {
    // Return last 5 trades
    return trades.slice(-5);
}

function renderTrades(tradeList) {
    tradeGrid.innerHTML = ''; // Clear current

    // Array Method: map to create HTML strings, then join
    const html = tradeList.map(trade => `
        <div class="trade-card" data-id="${trade.id}">
            <h3>${trade.name}</h3>
            <img src="${trade.image}" alt="${trade.name}" loading="lazy">
            <p><strong>Date:</strong> ${trade.date}</p>
            <p><strong>Value:</strong> ${trade.value}</p>
            <button class="btn view-details-btn">View Details</button>
        </div>
    `).join('');

    tradeGrid.innerHTML = html;

    // Add event listeners to new buttons for Modal
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.trade-card');
            const id = parseInt(card.dataset.id);
            const trade = tradeList.find(t => t.id === id);
            openModal(trade);
        });
    });
}

// --- MODAL DIALOG ---
const modal = document.querySelector('#item-modal');
const closeModalBtn = document.querySelector('#close-modal');

if (modal && closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });
}

function openModal(trade) {
    if (!modal) return;

    document.querySelector('#modal-title').textContent = trade.name;
    document.querySelector('#modal-image').src = trade.image;
    document.querySelector('#modal-image').alt = trade.name;
    document.querySelector('#modal-desc').textContent = trade.description;
    document.querySelector('#modal-value').textContent = trade.value;
    document.querySelector('#modal-traded').textContent = trade.traded_for;
    document.querySelector('#modal-date').textContent = trade.date;

    modal.showModal();
}

// --- HOME PAGE LOGIC ---
const currentItemDisplay = document.querySelector('#current-item-display');

if (currentItemDisplay) {
    initHomePage();
}

async function initHomePage() {
    const trades = await getTrades();
    if (trades.length > 0) {
        // Find the item that hasn't been traded yet (Current Holding)
        const currentRef = trades.find(t => t.traded_for === 'Nothing') || trades[trades.length - 1];

        // Template Literal
        const html = `
            <div class="trade-card featured">
                <h4>Currently Holding:</h4>
                <h3>${currentRef.name}</h3>
                <img src="${currentRef.image}" alt="${currentRef.name}" style="max-width:300px; width:100%">
                <p><strong>Value:</strong> ${currentRef.value}</p>
                <p>${currentRef.description}</p>
                <a href="participate.html" class="btn">Offer a Trade for this Item</a>
            </div>
        `;
        currentItemDisplay.innerHTML = html;
    }
}

// --- FORM ACTION PAGE logic ---
const receptionDisplay = document.querySelector('#reception-display');

if (receptionDisplay) {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const email = params.get('email');
    const offer = params.get('offer');

    if (name) {
        receptionDisplay.innerHTML = `
            <h3>Thank You, ${name}!</h3>
            <p>We have received your details:</p>
            <ul>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Offer:</strong> ${offer}</li>
            </ul>
            <p>I will review your trade offer and get back to you soon!</p>
        `;
    } else {
        receptionDisplay.innerHTML = `<p>No data received. Please submit the form on the <a href="participate.html">Participate page</a>.</p>`;
    }
}
