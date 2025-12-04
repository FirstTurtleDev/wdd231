// View Toggle
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const membersContainer = document.getElementById('members-container');

gridViewBtn.addEventListener('click', () => {
    membersContainer.classList.remove('list-view');
    membersContainer.classList.add('grid-view');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
});

listViewBtn.addEventListener('click', () => {
    membersContainer.classList.remove('grid-view');
    membersContainer.classList.add('list-view');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
});

// Fetch and Display Members
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        membersContainer.innerHTML = '<p>Error loading members. Please try again later.</p>';
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');

        // Determine membership level text
        let membershipLevel = 'Member';
        let membershipClass = 'member';

        if (member.membershipLevel === 2) {
            membershipLevel = 'Silver Member';
            membershipClass = 'silver';
        } else if (member.membershipLevel === 3) {
            membershipLevel = 'Gold Member';
            membershipClass = 'gold';
        }

        card.innerHTML = `
            <div class="image-placeholder">
                <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            </div>
            <h3>${member.name}</h3>
            <p class="tagline">${member.tagline || 'Business Tag Line'}</p>
            <div class="info-item">
                <span class="info-label">EMAIL:</span> ${member.email}
            </div>
            <div class="info-item">
                <span class="info-label">PHONE:</span> ${member.phone}
            </div>
            <div class="info-item">
                <span class="info-label">URL:</span> <a href="${member.website}" target="_blank" rel="noopener" class="website">${member.website.replace('https://', '')}</a>
            </div>
            <span class="membership-badge ${membershipClass}">${membershipLevel}</span>
        `;

        membersContainer.appendChild(card);
    });
}

// Initialize
getMembers();