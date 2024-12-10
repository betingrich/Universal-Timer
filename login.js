const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Basic Validation
  if (!email || !password) {
    alert('All fields are required!');
    return;
  }

  // Mock Login Success
  localStorage.setItem('userLoggedIn', true);
  window.location.href = 'index.html'; // Redirect to main app
});
