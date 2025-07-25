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

    const membersJsonPath = 'https://kobinaotc.github.io/wdd231/chamber/scripts/data/members.json';
    let chamberMembers = [];
    const memberList = document.getElementById('biz-list');
    const memberSpotLit = document.getElementById('biz-sopt-lit')
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');

    async function getMembersData() {
        try {
            const response = await fetch(membersJsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            chamberMembers = await response.json();
            displayBusinesses(chamberMembers, getPreferredView());
        }
        catch (error) {
            console.error('Could not fetch members data:', error);
            memberList.innerHTML = '<p>Failed to load member data. Please try again later.</p>';
        }
    }

    // Function to get preferred view from localStorage, default to 'grid'
    function getPreferredView() {
        return localStorage.getItem('membersView') || 'grid';
    }

    // Function to set preferred view in localStorage
    function setPreferredView(view) {
        localStorage.setItem('membersView', view);
    }


    function displayBusinesses(members, view) {
        if (window.location.pathname == '/wdd231/chamber/directory.html') {
            memberList.innerHTML = '';
            memberList.classList.remove('business-cards-grid', 'business-cards-list');
            memberList.classList.add(`business-cards-${view}`)
            members.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.classList.add('business-card');
                memberCard.innerHTML = `
                    <img src="images/${member.image_filename}" alt="${member.name}" loading="lazy">
                    <h3>${member.name}</h3>
                    <p class="tagline">${member.other_info.industry}</p>
                    <p>PHONE: ${member.phone_number}</p>
                    <p>URL: <a href="${member.website_url}">${member.name}</a></p>
                `
                memberList.appendChild(memberCard);
            });
        }

        if (window.location.pathname == '/wdd231/chamber/index.html' || window.location.pathname == '/chamber/') {
            let count = 0;
            const inSpotLit = [];
            while (count < 3) {
                let isIn = false;
                let selectedMemb = members[randomIndex(members.length)];
                if (inSpotLit.length == 0 && selectedMemb.membership_level > 1) {
                    inSpotLit.push(selectedMemb);
                    count++;
                } else if (inSpotLit.length != 0 && selectedMemb.membership_level > 1) {
                    inSpotLit.forEach(member => {
                        if (selectedMemb.name == member.name) {
                            isIn = true;
                        }
                    });
                    if (!isIn) {
                        inSpotLit.push(selectedMemb);
                        count++;
                    }
                }
            }
            
            memberSpotLit.innerHTML = '';
            inSpotLit.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.classList.add('business-card');
                memberCard.innerHTML = `
                    <img src="images/${member.image_filename}" alt="${member.name}" loading="lazy">
                    <h3>${member.name}</h3>
                    <p class="tagline">${member.other_info.industry}</p>
                    <p>PHONE: ${member.phone_number}</p>
                    <p>ADDRESS: ${member.address}</p>
                    <p>M-Level: ${genMembership(member.membership_level)}</p>
                    <p>URL: <a href="${member.website_url}">${member.name}</a></p>
                `
                memberSpotLit.appendChild(memberCard);
            })
        }
    }

    function genMembership(level) {
        const membershipLevels = [
            'Copper',
            'Bronze',
            'Silver',
            'Gold'
        ]

        return membershipLevels[level];
    }

    function randomIndex(arrlen) {
        return Math.floor(Math.random() * arrlen);
    }

    getMembersData();

    // --- Event Listeners for View Toggle Buttons ---
    gridViewBtn.addEventListener('click', () => {
        if (!gridViewBtn.classList.contains('active')) {
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            displayBusinesses(chamberMembers, 'grid');
            setPreferredView('grid');
        }
    });

    listViewBtn.addEventListener('click', () => {
        if (!listViewBtn.classList.contains('active')) {
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            displayBusinesses(chamberMembers, 'list');
            setPreferredView('list');
        }
    });

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