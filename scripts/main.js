// Ensure the DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    // --- Responsive Navigation Toggle ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active'); // Toggles the 'active' class on the nav
            hamburgerBtn.classList.toggle('open'); // Optional: for animating hamburger to 'X'
        });

        // Optional: Close nav when a nav link is clicked (good for UX on mobile)
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
    const lastModifiedParagraph = document.getElementById('lastModified'); // ID is on the p tag
    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
    }

    // --- Placeholder for Course Data and Dynamic Display ---
    // This array will be used to dynamically display courses and filter them.
    // Copy this array content from the PDF instructions (WDD 231, Week 01, Step 4, #4)
    // For now, I'll use a placeholder structure. You'll replace this with the exact array from your assignment.
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Web Dev',
            credits: 2,
            certificate: 'Web & Computer Programming',
            technology: ['HTML', 'CSS'],
            description: 'The web and computer programming certificate builds into a bachelor’s degree in software development from BYU-Idaho and will help you gain entry-level marketable skills.',
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web & Computer Programming',
            technology: ['HTML', 'CSS', 'JS'],
            description: 'The web and computer programming certificate builds into a bachelor’s degree in software development from BYU-Idaho and will help you gain entry-level marketable skills.',
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Forms',
            credits: 2,
            certificate: 'Web & Computer Programming',
            technology: ['HTML', 'CSS', 'JS'],
            description: 'The web and computer programming certificate builds into a bachelor’s degree in software development from BYU-Idaho and will help you gain entry-level marketable skills.',
            completed: false
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 3,
            certificate: 'Web & Computer Programming',
            technology: ['Python', 'JSON'],
            description: 'The web and computer programming certificate builds into a bachelor’s degree in software development from BYU-Idaho and will help you gain entry-level marketable skills.',
            completed: false
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Advanced Web Dev',
            credits: 3,
            certificate: 'Web & Computer Programming',
            technology: ['HTML', 'CSS', 'JS', 'JSON'],
            description: 'The web and computer programming certificate builds into a bachelor’s degree in software development from BYU-Idaho and will help you gain entry-level marketable skills.',
            completed: false
        }
    ];

    const courseCardsContainer = document.querySelector('.course-cards-container');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const totalCreditsSpan = document.getElementById('total-credits');

    // Function to render course cards
    function renderCourseCards(filteredCourses) {
        courseCardsContainer.innerHTML = ''; // Clear previous cards

        if (filteredCourses.length === 0) {
            courseCardsContainer.innerHTML = '<p>No courses found for this filter.</p>';
            totalCreditsSpan.textContent = '0';
            return;
        }

        filteredCourses.forEach(course => {
            const card = document.createElement('div');
            card.classList.add('course-card');
            if (course.completed) {
                card.classList.add('completed');
            }

            card.innerHTML = `
                <span>${course.subject} ${course.number}</span>
                <span>${course.title}</span>
                <span>Credits: ${course.credits}</span>
            `;
            card.addEventListener('click', () => {
                displayCourseDetails(course);
            })
            courseCardsContainer.appendChild(card);
        });

        updateTotalCredits(filteredCourses);
    }

    // Function to update total credits
    function updateTotalCredits(coursesToSum) {
        const totalCredits = coursesToSum.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsSpan.textContent = totalCredits;
    }

    // Function to filter courses
    function filterCourses(subject) {
        let filtered = courses;
        if (subject !== 'all') {
            filtered = courses.filter(course => course.subject.toLowerCase() === subject);
        }
        renderCourseCards(filtered);

        // Update active class on filter buttons
        filterBtns.forEach(btn => {
            if (btn.dataset.filter === subject) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Event listeners for filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterCourses(btn.dataset.filter);
        });
    });

    // Initial render of all courses when page loads
    renderCourseCards(courses);

    // --- Lazy Loading (if you add images to main sections later) ---
    const lazyLoadImages = document.querySelectorAll('img[loading="lazy"]'); // Select images with loading="lazy"

    const imgObserverOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the image is visible, load it
    };

    const imgObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // For native lazy loading, browser handles it.
                // For data-src, you'd do: img.src = img.dataset.src;
                // and then img.removeAttribute('data-src');
                img.classList.add('loaded'); // Add a class for potential CSS fade-in
                observer.unobserve(img); // Stop observing once loaded
            }
        });
    };

    const imgObserver = new IntersectionObserver(imgObserverCallback, imgObserverOptions);

    lazyLoadImages.forEach(img => {
        imgObserver.observe(img);
    });

    const courseDetails = document.getElementById('course-details');
    function displayCourseDetails(course) {
        courseDetails.innerHTML = '';
        courseDetails.innerHTML = `
            <button id="closeModal">✖️</button>
            <h2>${course.subject} ${course.number}</h2>
            <h3>${course.title}</h3>
            <p><strong>Credits</strong>: ${course.credits}</p>
            <p><strong>Certificate</strong>: ${course.certificate}</p>
            <p>${course.description}</p>
            <p><strong>Technolgies</strong>: ${course.technology.join(', ')}</p>
        `;
        courseDetails.showModal();

        closeModal.addEventListener('click', () => {
            courseDetails.close();
        });
    }

});