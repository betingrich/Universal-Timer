const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Password Validation
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/;
  if (!passwordRegex.test(password)) {
    alert('Password must have 8 characters, a number, a capital letter, a lowercase letter, and a special character.');
    return;
  }

  // Mock Signup Success
  alert('Account created successfully! Please log in.');
  window.location.href = 'login.html'; // Redirect to login page
});
