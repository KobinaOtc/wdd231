const joinPath = new URLSearchParams(window.location.search);
console.log(joinPath);

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

`