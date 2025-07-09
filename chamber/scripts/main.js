document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active'); // Toggles the 'active' class on the nav
            // Optional: Animate hamburger icon to X
            hamburgerBtn.classList.toggle('open');
        });

        // Close nav when a link is clicked (optional, but good for UX)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                hamburgerBtn.classList.remove('open');
            });
        });
    }

    // --- Dynamic Footer Content ---
    // Get current year
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Get last modified date
    const lastModifiedParagraph = document.getElementById('lastModified');
    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
    }

    // --- Placeholder for any other main content JS (e.g., Course Filtering) ---
    // The course filtering logic from the WDD 231 Week 01 assignment would go here.
    // For this specific turn, we are focusing on the wireframe for Timbuktu Chamber of Commerce,
    // so I'm not including the full course filtering JS here, but reminding you where it belongs
    // if you combine projects.

    // --- Lazy Loading Images ---
    // Select all images that have a 'loading="lazy"' attribute (or data-src if you prefer)
    const lazyLoadImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imgObserverOptions = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.1 // When 10% of the image is visible, load it
        };

        const imgObserverCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // If using data-src, uncomment: img.src = img.dataset.src;
                    // img.removeAttribute('data-src');
                    img.classList.add('loaded'); // Add a class for potential CSS fade-in
                    observer.unobserve(img); // Stop observing once loaded
                }
            });
        };

        const imgObserver = new IntersectionObserver(imgObserverCallback, imgObserverOptions);

        lazyLoadImages.forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer (not common now)
        lazyLoadImages.forEach(img => {
            // If using data-src, uncomment: img.src = img.dataset.src;
            // img.removeAttribute('data-src');
            img.classList.add('loaded');
        });
    }
});