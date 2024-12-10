// Elements
const authPage = document.getElementById('auth-page');
const homepage = document.getElementById('homepage');
const todoPage = document.getElementById('todo-page');
const toggleAuthBtn = document.getElementById('toggle-auth-btn');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const gotoTasksBtn = document.getElementById('goto-tasks');
const gotoHomeBtn = document.getElementById('goto-home');
const bigTime = document.getElementById('big-time');
const taskTable = document.querySelector('#task-table tbody');

// State
let users = {};

// Password Validation Function
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Sign-Up Validation
signupBtn.addEventListener('click', () => {
  const firstName = document.getElementById('signup-first-name').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  // Check for empty fields
  if (!firstName || !password || !confirmPassword) {
    alert('All fields are required!');
    return;
  }

  // Check password requirements
  if (!isValidPassword(password)) {
    alert('Password must be at least 8 characters, include a number, an uppercase letter, a lowercase letter, and a symbol.');
    return;
  }

  // Check password match
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  // Store user and redirect to homepage
  users[firstName] = password;
  alert(`Welcome, ${firstName}!`);
  authPage.classList.add('hidden');
  homepage.classList.remove('hidden');
});

// Log-In Validation
loginBtn.addEventListener('click', () => {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  // Check for empty fields
  if (!username || !password) {
    alert('All fields are required!');
    return;
  }

  // Verify credentials
  if (users[username] === password) {
    alert(`Welcome back, ${username}!`);
    authPage.classList.add('hidden');
    homepage.classList.remove('hidden');
  } else {
    alert('Invalid username or password!');
  }
});

// Toggle Between Login and Signup
toggleAuthBtn.addEventListener('click', () => {
  signupForm.classList.toggle('hidden');
  loginForm.classList.toggle('hidden');
  toggleAuthBtn.textContent = signupForm.classList.contains('hidden')
    ? 'Switch to Sign Up'
    : 'Switch to Login';
});

// Navigate to Tasks Page
gotoTasksBtn.addEventListener('click', () => {
  homepage.classList.add('hidden');
  todoPage.classList.remove('hidden');
});

// Navigate Back to Home
gotoHomeBtn.addEventListener('click', () => {
  todoPage.classList.add('hidden');
  homepage.classList.remove('hidden');
});

// Update Clock
function updateClock() {
  const now = new Date();
  bigTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(updateClock, 1000);

// Generate Task Rows
function generateTaskRows() {
  for (let hour = 7; hour <= 22; hour++) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${hour}:00</td>
      <td><input type="text" class="task-input" placeholder="Enter your task"></td>
      <td><input type="checkbox" class="checkmark"></td>
    `;
    taskTable.appendChild(row);
  }
}
generateTaskRows();
