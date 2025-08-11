import { setupNavToggle } from './modules/nav.mjs';
import { loadResources, setupModal } from './modules/about.mjs';
import { setupContactForm } from './modules/form.mjs';

// JavaScript for the responsive navigation toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

window.addEventListener('DOMContentLoaded', () => {
    // Shared functionality for all pages
    setupNavToggle();

    // Page-specific functionality
    if (document.querySelector('.about-content')) {
        loadResources();
        setupModal();
        setupContactForm();
    }
});

// A simple example of using local storage for a user preference
function saveUserPreference() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

function loadUserPreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

loadUserPreference();