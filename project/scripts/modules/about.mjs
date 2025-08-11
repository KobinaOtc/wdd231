export async function loadResources() {
    const resourcesGrid = document.getElementById('resources-grid');
    if (!resourcesGrid) return;

    try {
        const response = await fetch('http://127.0.0.1:5500/project/data/resources.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Dynamically generate content using forEach and template literals
        data.resources.forEach(resource => {
            const card = document.createElement('div');
            card.className = 'resource-card';
            
            // Store data in a dataset for easy access with the modal
            card.dataset.title = resource.title;
            card.dataset.description = resource.description;
            card.dataset.link = resource.link;

            card.innerHTML = `
                <h3>${resource.title}</h3>
                <p>${resource.short_description}</p>
                <div class="resource-tags">
                    ${resource.tags.map(tag => `<span>#${tag}</span>`).join(' ')}
                </div>
            `;
            resourcesGrid.appendChild(card);
        });

        // Add event listeners for the modal
        document.querySelectorAll('.resource-card').forEach(card => {
            card.addEventListener('click', () => {
                const modal = document.getElementById('resource-modal');
                document.getElementById('modal-title').textContent = card.dataset.title;
                document.getElementById('modal-description').textContent = card.dataset.description;
                document.getElementById('modal-link').href = card.dataset.link;
                modal.style.display = 'block';
            });
        });

    } catch (error) {
        console.error('Could not fetch resources:', error);
        resourcesGrid.innerHTML = '<p>Failed to load resources. Please try again later.</p>';
    }
}

export function setupModal() {
    const modal = document.getElementById('resource-modal');
    const closeButton = document.querySelector('.close-button');

    // Close the modal when the close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close the modal when the user clicks anywhere outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
