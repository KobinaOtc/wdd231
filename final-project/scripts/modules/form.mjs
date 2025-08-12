export function setupContactForm() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            formMessage.textContent = 'Thank you for your message! We will get back to you shortly.';
            form.reset();
        });
    }
}