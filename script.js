{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 ArialMT;}
{\colortbl;\red255\green255\blue255;\red26\green26\blue26;\red255\green255\blue255;}
{\*\expandedcolortbl;;\cssrgb\c13333\c13333\c13333;\cssrgb\c100000\c100000\c100000;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs20 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 // Generate Registration Number
\fs24 \

\fs20 function generateRegNumber() \{
\fs24 \

\fs20 const timestamp = Date.now().toString().slice(-6);
\fs24 \

\fs20 const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
\fs24 \

\fs20 return `REG-$\{timestamp\}-$\{random\}`;
\fs24 \

\fs20 \}
\fs24 \
\

\fs20 // Modal Functionality
\fs24 \

\fs20 const modal = document.getElementById('registrationModal');
\fs24 \

\fs20 const openBtn = document.getElementById('openRegistration');
\fs24 \

\fs20 const closeBtn = document.querySelector('.close');
\fs24 \

\fs20 const form = document.getElementById('registrationForm');
\fs24 \
\

\fs20 openBtn.addEventListener('click', () => \{
\fs24 \

\fs20 modal.style.display = 'flex';
\fs24 \

\fs20 document.body.style.overflow = 'hidden';
\fs24 \
\

\fs20 // Set current date
\fs24 \

\fs20 document.getElementById('regDate').value = new Date().toISOString().split('T')[0];
\fs24 \

\fs20 \});
\fs24 \
\

\fs20 closeBtn.addEventListener('click', () => \{
\fs24 \

\fs20 modal.style.display = 'none';
\fs24 \

\fs20 document.body.style.overflow = 'auto';
\fs24 \

\fs20 \});
\fs24 \
\

\fs20 window.addEventListener('click', (e) => \{
\fs24 \

\fs20 if (e.target === modal) \{
\fs24 \

\fs20 modal.style.display = 'none';
\fs24 \

\fs20 document.body.style.overflow = 'auto';
\fs24 \

\fs20 \}
\fs24 \

\fs20 \});
\fs24 \
\

\fs20 // Form Submission
\fs24 \

\fs20 form.addEventListener('submit', function(e) \{
\fs24 \

\fs20 e.preventDefault();
\fs24 \
\

\fs20 const regNumber = generateRegNumber();
\fs24 \

\fs20 const formData = new FormData(this);
\fs24 \
\

\fs20 // Add registration number to form data
\fs24 \

\fs20 formData.append('registration_number', regNumber);
\fs24 \
\

\fs20 // Create a hidden input for registration number
\fs24 \

\fs20 const hiddenInput = document.createElement('input');
\fs24 \

\fs20 hiddenInput.type = 'hidden';
\fs24 \

\fs20 hiddenInput.name = 'registration_number';
\fs24 \

\fs20 hiddenInput.value = regNumber;
\fs24 \

\fs20 this.appendChild(hiddenInput);
\fs24 \
\

\fs20 // For demo purposes - store in localStorage
\fs24 \

\fs20 const registration = \{
\fs24 \

\fs20 regNumber: regNumber,
\fs24 \

\fs20 fullName: document.getElementById('fullName').value,
\fs24 \

\fs20 email: document.getElementById('email').value,
\fs24 \

\fs20 attendees: document.getElementById('attendees').value,
\fs24 \

\fs20 foodPreference: document.getElementById('foodPreference').value,
\fs24 \

\fs20 donation: document.getElementById('donation').value,
\fs24 \

\fs20 date: document.getElementById('regDate').value
\fs24 \

\fs20 \};
\fs24 \
\

\fs20 // Store in localStorage
\fs24 \

\fs20 let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
\fs24 \

\fs20 registrations.push(registration);
\fs24 \

\fs20 localStorage.setItem('registrations', JSON.stringify(registrations));
\fs24 \
\

\fs20 // Display success message
\fs24 \

\fs20 alert(`Registration Successful!\\nYour Registration Number: $\{regNumber\}\\nPlease save this number for future reference.`);
\fs24 \
\

\fs20 // Close modal and reset form
\fs24 \

\fs20 modal.style.display = 'none';
\fs24 \

\fs20 document.body.style.overflow = 'auto';
\fs24 \

\fs20 form.reset();
\fs24 \
\

\fs20 // Update registrations display
\fs24 \

\fs20 displayRegistrations();
\fs24 \
\

\fs20 // Submit to Formspark (real submission)
\fs24 \

\fs20 this.submit();
\fs24 \

\fs20 \});
\fs24 \
\

\fs20 // Registration Lookup
\fs24 \

\fs20 document.getElementById('lookupBtn').addEventListener('click', function() \{
\fs24 \

\fs20 const regNumber = document.getElementById('regNumberInput').value.trim();
\fs24 \

\fs20 const resultDiv = document.getElementById('lookupResult');
\fs24 \
\

\fs20 if (!regNumber) \{
\fs24 \

\fs20 resultDiv.innerHTML = '<p style="color: red;">Please enter a registration number</p>';
\fs24 \

\fs20 return;
\fs24 \

\fs20 \}
\fs24 \
\

\fs20 const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
\fs24 \

\fs20 const registration = registments.find(r => r.regNumber === regNumber);
\fs24 \
\

\fs20 if (registration) \{
\fs24 \

\fs20 resultDiv.innerHTML = `
\fs24 \

\fs20 <div class="registration-details">
\fs24 \

\fs20 <h3>Registration Details</h3>
\fs24 \

\fs20 <p><strong>Registration Number:</strong> $\{registration.regNumber\}</p>
\fs24 \

\fs20 <p><strong>Name:</strong> $\{registration.fullName\}</p>
\fs24 \

\fs20 <p><strong>Email:</strong> $\{registration.email\}</p>
\fs24 \

\fs20 <p><strong>Number of Attendees:</strong> $\{registration.attendees\}</p>
\fs24 \

\fs20 <p><strong>Food Preference:</strong> $\{registration.foodPreference\}</p>
\fs24 \

\fs20 <p><strong>Donation Amount:</strong> $$\{registration.donation\}</p>
\fs24 \

\fs20 <p><strong>Registration Date:</strong> $\{registration.date\}</p>
\fs24 \

\fs20 </div>
\fs24 \

\fs20 `;
\fs24 \

\fs20 \} else \{
\fs24 \

\fs20 resultDiv.innerHTML = '<p style="color: red;">Registration not found. Please check the number.</p>';
\fs24 \

\fs20 \}
\fs24 \

\fs20 \});
\fs24 \
\

\fs20 // Display Recent Registrations
\fs24 \

\fs20 function displayRegistrations() \{
\fs24 \

\fs20 const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
\fs24 \

\fs20 const registrationsDiv = document.getElementById('registrations');
\fs24 \
\

\fs20 if (registrations.length === 0) \{
\fs24 \

\fs20 registrationsDiv.innerHTML = '<p>No registrations yet.</p>';
\fs24 \

\fs20 return;
\fs24 \

\fs20 \}
\fs24 \
\

\fs20 // Show last 5 registrations
\fs24 \

\fs20 const recentRegistrations = registrations.slice(-5).reverse();
\fs24 \
\

\fs20 registrationsDiv.innerHTML = recentRegistrations.map(reg => `
\fs24 \

\fs20 <div class="registration-item">
\fs24 \

\fs20 <p><strong>$\{reg.regNumber\}</strong> - $\{reg.fullName\}</p>
\fs24 \

\fs20 <p>Attendees: $\{reg.attendees\} | Food: $\{reg.foodPreference\} | Donation: $$\{reg.donation\}</p>
\fs24 \

\fs20 <small>Registered: $\{reg.date\}</small>
\fs24 \

\fs20 </div>
\fs24 \

\fs20 `).join('');
\fs24 \

\fs20 \}
\fs24 \
\

\fs20 // Initialize display
\fs24 \

\fs20 displayRegistrations();
\fs24 \
\

\fs20 // Allow Enter key in lookup field
\fs24 \

\fs20 document.getElementById('regNumberInput').addEventListener('keypress', function(e) \{
\fs24 \

\fs20 if (e.key === 'Enter') \{
\fs24 \

\fs20 document.getElementById('lookupBtn').click();
\fs24 \

\fs20 \}
\fs24 \

\fs20 \});}