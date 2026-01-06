document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('authModal');
    const closeBtn = document.getElementById('closeModalBtn');

    // Config
    const COOLDOWN_HOURS = 24;
    const SHOW_DELAY_MS = 5000;
    const STORAGE_KEY = 'authModalClosedTime';

    // Helper: Hide Modal
    const hideModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        // Wait for animation to finish before shielding
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);

        // Save current time to localStorage
        localStorage.setItem(STORAGE_KEY, Date.now());
    };

    // Helper: Show Modal
    const showModal = () => {
        if (!modal) return;

        // Check cooldown
        const lastClosed = localStorage.getItem(STORAGE_KEY);
        if (lastClosed) {
            const timeSinceClosed = Date.now() - parseInt(lastClosed, 10);
            const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000;
            if (timeSinceClosed < cooldownMs) {
                console.log('Popup handled: Cooldown active.');
                return;
            }
        }

        modal.style.display = 'flex';
        // Small delay to allow display:flex to apply before adding opacity class
        requestAnimationFrame(() => {
            modal.classList.add('active');
            // Accessibility focus
            const input = modal.querySelector('input');
            if (input) input.focus();
        });
    };

    // Event Listeners
    if (closeBtn) {
        closeBtn.addEventListener('click', hideModal);
    }

    // Click outside to close
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            hideModal();
        }
    });

    // Init Timer
    if (modal) {
        setTimeout(showModal, SHOW_DELAY_MS);
    }
});
