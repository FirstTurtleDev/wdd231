document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const container = document.getElementById('submission-details');

    const fields = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Mobile Phone' },
        { key: 'businessName', label: 'Business Name' },
        { key: 'timestamp', label: 'Date/Time' }
    ];

    if (container) {
        let html = '<ul style="list-style: none; padding: 0;">';
        fields.forEach(field => {
            const value = urlParams.get(field.key);
            if (value) {
                // Decode and sanitize basic display
                const displayValue = decodeURIComponent(value).replace(/\+/g, ' ');
                html += `<li style="margin-bottom: 0.5rem;"><strong>${field.label}:</strong> ${displayValue}</li>`;
            }
        });
        html += '</ul>';
        container.innerHTML = html;
    }
});
