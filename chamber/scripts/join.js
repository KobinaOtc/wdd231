const joinPath = new URLSearchParams(window.location.search);
console.log(joinPath);

const mLevels = [
    {
        mName: 'Non Profit',
        color: 'purple', // This color is set in your array. You might want to define a CSS variable for it.
        description: 'Tailored for charitable organizations and community groups, focusing on support and collaboration within the local network.',
        perks: [
            'Basic listing in the Chamber\'s community directory',
            'Subscription to the Chamber\'s monthly newsletter',
            'Invitation to all general networking events',
            'Access to non-profit specific workshops and webinars',
            'Opportunities to participate in community initiatives',
            'Visibility in Chamber social media spotlights for community impact'
        ],
    },
    {
        mName: 'Bronze',
        color: 'bronze', // This color is set in your array. You might want to define a CSS variable for it.
        description: 'An introductory membership, ideal for small businesses and startups looking to establish a presence and begin networking within the Chamber.',
        perks: [
            'Standard business listing in the Chamber\'s online directory',
            'Subscription to the Chamber\'s monthly newsletter',
            'Invitation to all general networking events',
            'Access to exclusive member-only content and resources',
            'Opportunity to host a "Business After Hours" event (subject to availability)',
            'Discounted rates on Chamber event tickets'
        ],
    },
    {
        mName: 'Silver',
        color: 'silver', // This color is set in your array. You might want to define a CSS variable for it.
        description: 'Designed for growing businesses seeking enhanced visibility and deeper engagement, offering more promotional opportunities and access to exclusive resources.',
        perks: [
            'All Bronze benefits',
            'Enhanced directory listing with logo and expanded description',
            'Priority registration for popular Chamber events and workshops',
            'Discounted rates on Chamber advertising and sponsorship opportunities',
            'Use of Chamber meeting rooms (limited hours per month)',
            'Opportunity to be featured in the Chamber\'s weekly e-newsletter spotlight',
            'Access to exclusive business development seminars'
        ],
    },
    {
        mName: 'Gold',
        color: 'gold', // This color is set in your array. You might want to define a CSS variable for it.
        description: 'The premier membership tier, offering maximum exposure, leadership opportunities, and exclusive benefits for established businesses committed to significant community impact.',
        perks: [
            'All Silver benefits',
            'Premium placement in the Chamber\'s online directory (top tier)',
            'Complimentary access to all Chamber events and workshops',
            'Opportunity for speaking engagements at Chamber functions',
            'Dedicated liaison from the Chamber staff for personalized support',
            'Prominent logo placement on the Chamber website homepage and select marketing materials',
            'Invitation to exclusive leadership forums and Chamber board meetings',
            'Annual featured article in the Chamber\'s online publication'
        ]
    }
];

// TODO: Add this to 'if' statement when uploaded to pages => window.location.pathname != '/chamber/join.html'
if (window.location.pathname != '/wdd231/chamber/join.html') {
    // firstName=Kobina&lastName=Otchere&email=email%40email.com&phoneNumber=0245677898&organizationalTitle=Product+Manager&organizationName=Kukuwa+Fitness&membershipLevel=Bronze&description=Health+and+Fitness&signup_submit=Sign+me+up
    const firstName = joinPath.get('firstName');
    const lastName = joinPath.get('lastName');
    const email = joinPath.get('email');
    const phoneNumber = joinPath.get('phoneNumber');
    const organizationalTitle = joinPath.get('organizationalTitle');
    const organizationName = joinPath.get('organizationName');
    const membershipLevel = joinPath.get('membershipLevel');
    const description = joinPath.get('description');

    const thankYouPage = document.getElementById('thank-you');
    const date = new Date();
    const now = date.toString();
    thankYouPage.innerHTML = `
        <h1 class="form-header">Thank You! Your submission is under review.</h1>
        <div class="left">
            <p><strong>Full name</strong>: ${firstName} ${lastName} </p>
            <p><strong>Email</strong>: ${email} </p>
            <p><strong>Phone number</strong>: ${phoneNumber} </p>
            <p><strong>Job Title</strong>: ${organizationalTitle} </p>
            <p><strong>Orgainzation</strong>: ${organizationName} </p>
            <p><strong>M-Level</strong>: ${membershipLevel} </p>
            <p><strong>Description</strong>: ${description} </p>
            <p><strong>Time Stamp</strong>: ${now} </p>
        </div>
    `;
};
const bizLevel = document.getElementById('business-level')
bizLevel.innerHTML = '';
mLevels.forEach(level => {
    const bizLevelCard = document.createElement('div');
    bizLevelCard.classList.add('business-card', 'm-list', `${level.color}`);
    bizLevelCard.innerHTML = `
        <strong>${level.mName}</strong>
        <p>Learn more</p>
    `;
    bizLevelCard.addEventListener('click', () => {
        displayLevelDetails(level);
    });
    bizLevel.appendChild(bizLevelCard);
});

const levelDetails =  document.getElementById('level-details');
function displayLevelDetails(level) {
    const perks = document.createElement('ul');
    level.perks.forEach(perk => {
        const perkItem = document.createElement('li');
        perkItem.textContent = perk;
        perks.appendChild(perkItem);
    })
    levelDetails.classList.add(level.color, 'maxWdth')
    levelDetails.innerHTML = `
        <button id="closeModal">✖️</button>
        <h4> ${level.mName} Membership Level</h4>
        <p><strong>About Offer:</strong> ${level.description} </p>
        <p><strong>Perks</strong>: ${perks.innerHTML} </p>
    `;
    levelDetails.showModal();
    closeModal.addEventListener('click', () => {
        levelDetails.classList.remove(level.color);
        levelDetails.close();
    });
};