// Landing Page Interactive Scripts
document.addEventListener('DOMContentLoaded', () => {
    // Add basic interactive features, for example clicking on navigation links
    const navLinks = document.querySelectorAll('.nav-links div');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove active class from all
            navLinks.forEach(n => n.classList.remove('active-link'));
            // Add active class to clicked
            this.classList.add('active-link');
        });
    });

    // Guestbook form handling
    const gbForm = document.getElementById('gb-form');
    if (gbForm) {
        gbForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('gb-name').value;
            const msg = document.getElementById('gb-msg').value;

            const list = document.getElementById('gb-entries-list');
            const entry = document.createElement('div');
            entry.className = 'gb-entry';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'gb-entry-name';
            nameSpan.textContent = name;

            const msgSpan = document.createElement('span');
            msgSpan.className = 'gb-entry-msg';
            msgSpan.textContent = msg;

            entry.appendChild(nameSpan);
            entry.appendChild(msgSpan);

            list.insertBefore(entry, list.firstChild);

            gbForm.reset();
        });
    }

    console.log("Scripts loaded successfully!");
});
