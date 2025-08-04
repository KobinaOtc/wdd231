document.addEventListener('DOMContentLoaded', () => {
    const discoverGrid = document.getElementById('discover-grid');
    const visitMessage = document.getElementById('visit-message');
    const discoverJsonPath = 'http://127.0.0.1:5500/chamber/scripts/data/discover.json';

    async function getAttractionsData() {
        try {
            const response = await fetch(discoverJsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const attractions = await response.json();
            displayAttractions(attractions);
        } catch (error) {
            console.error('Could not fetch attractions data:', error);
            discoverGrid.innerHTML = '<p>Failed to load attractions. Please try again later.</p>';
        }
    }

    function displayAttractions(attractions) {
        discoverGrid.innerHTML = ''; // Clear loading message
        attractions.forEach(attraction => {
            const card = document.createElement('div');
            card.classList.add('discover-card');
            card.innerHTML = `
                <h3>${attraction.name}</h3>
                <figure>
                    <img src="images/${attraction.image_filename}" alt="${attraction.name}" loading="lazy">
                </figure>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <div>
                    <a href="#" class="cta-button">Learn More</a>
                </div>
            `;
            discoverGrid.appendChild(card);
        });
    }

    // Last visit logic
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    if (lastVisit) {
        const lastVisitDate = parseInt(lastVisit);
        const oneDay = 1000 * 60 * 60 * 24;
        const daysBetween = Math.floor((now - lastVisitDate) / oneDay);

        if (daysBetween < 1) {
            visitMessage.textContent = 'Back so soon! Awesome!';
        } else if (daysBetween === 1) {
            visitMessage.textContent = 'You last visited 1 day ago.';
        } else {
            visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
        }
    } else {
        visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
    }

    localStorage.setItem('lastVisit', now);

    getAttractionsData();
});