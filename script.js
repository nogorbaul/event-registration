// Generate Registration Number
function generateRegNumber() {
const timestamp = Date.now().toString().slice(-6);
const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
return `REG-${timestamp}-${random}`;
}

// Modal Functionality
const modal = document.getElementById('registrationModal');
const openBtn = document.getElementById('openRegistration');
const closeBtn = document.querySelector('.close');
const form = document.getElementById('registrationForm');

openBtn.addEventListener('click', () => {
modal.style.display = 'flex';
document.body.style.overflow = 'hidden';

// Set current date
document.getElementById('regDate').value = new Date().toISOString().split('T')[0];
});

closeBtn.addEventListener('click', () => {
modal.style.display = 'none';
document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
if (e.target === modal) {
modal.style.display = 'none';
document.body.style.overflow = 'auto';
}
});

// Form Submission
form.addEventListener('submit', function(e) {
e.preventDefault();

const regNumber = generateRegNumber();
const formData = new FormData(this);

// Add registration number to form data
formData.append('registration_number', regNumber);

// Create a hidden input for registration number
const hiddenInput = document.createElement('input');
hiddenInput.type = 'hidden';
hiddenInput.name = 'registration_number';
hiddenInput.value = regNumber;
this.appendChild(hiddenInput);

// Debugiing
alert(`Your Name: ${document.getElementById('fullName').value}\n`);
  

// For demo purposes - store in localStorage
const registration = {
regNumber: regNumber,
fullName: document.getElementById('fullName').value,
email: document.getElementById('email').value,
attendees: document.getElementById('attendees').value,
foodPreference: document.getElementById('foodPreference').value,
donation: document.getElementById('donation').value,
date: document.getElementById('regDate').value
};

// Store in localStorage
let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
registrations.push(registration);
localStorage.setItem('registrations', JSON.stringify(registrations));

// Display success message
alert(`Your Registration Number: ${regNumber}\nPlease Zelle the amount to 609-937-2008 and mention the Reg Number to complete registration\nWe will email your tickets within 30 minutes`);

// Close modal and reset form
modal.style.display = 'none';
document.body.style.overflow = 'auto';
form.reset();

// Update registrations display
displayRegistrations();

// Submit to Formspark (real submission)
this.submit();
});

// Registration Lookup
document.getElementById('lookupBtn').addEventListener('click', function() {
const regNumber = document.getElementById('regNumberInput').value.trim();
const resultDiv = document.getElementById('lookupResult');

if (!regNumber) {
resultDiv.innerHTML = '<p style="color: red;">Please enter a registration number</p>';
return;
}

const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
const registration = registments.find(r => r.regNumber === regNumber);

if (registration) {
resultDiv.innerHTML = `
<div class="registration-details">
<h3>Registration Details</h3>
<p><strong>Registration Number:</strong> ${registration.regNumber}</p>
<p><strong>Name:</strong> ${registration.fullName}</p>
<p><strong>Email:</strong> ${registration.email}</p>
<p><strong>Number of Attendees:</strong> ${registration.attendees}</p>
<p><strong>Food Preference:</strong> ${registration.foodPreference}</p>
<p><strong>Donation Amount:</strong> $${registration.donation}</p>
<p><strong>Registration Date:</strong> ${registration.date}</p>
</div>
`;
} else {
resultDiv.innerHTML = '<p style="color: red;">Registration not found. Please check the number.</p>';
}
});

// Display Recent Registrations
function displayRegistrations() {
const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
const registrationsDiv = document.getElementById('registrations');

if (registrations.length === 0) {
registrationsDiv.innerHTML = '<p>No registrations yet.</p>';
return;
}

// Show last 5 registrations
const recentRegistrations = registrations.slice(-5).reverse();

registrationsDiv.innerHTML = recentRegistrations.map(reg => `
<div class="registration-item">
<p><strong>${reg.regNumber}</strong> - ${reg.fullName}</p>
<p>Attendees: ${reg.attendees} | Food: ${reg.foodPreference} | Donation: $${reg.donation}</p>
<small>Registered: ${reg.date}</small>
</div>
`).join('');
}

// Initialize display
displayRegistrations();

// Allow Enter key in lookup field
document.getElementById('regNumberInput').addEventListener('keypress', function(e) {
if (e.key === 'Enter') {
document.getElementById('lookupBtn').click();
}
});
