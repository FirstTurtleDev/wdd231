// Set timestamp
document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Modal logic
    const modals = document.querySelectorAll('dialog');
    const openButtons = document.querySelectorAll('.learn-more');
    const closeButtons = document.querySelectorAll('.close-modal');

    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });

    // Close on click outside
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    });
});
