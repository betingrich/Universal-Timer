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
const dateDay = document.getElementById('date-day');
const locationEl = document.getElementById('location');
const weatherEl = document.getElementById('weather');
const taskTable = document.querySelector('#task-table tbody');

// State
let users = {};

// Toggle between login and signup
toggleAuthBtn.addEventListener('click', () => {
  signupForm.classList.toggle('hidden');
  loginForm.classList.toggle('hidden');
  toggleAuthBtn.textContent = signupForm.classList.contains('hidden')
    ? 'Switch to Sign Up'
    : 'Switch to Login';
});

// Sign Up
signupBtn.addEventListener('click', () => {
  const firstName = document.getElementById('signup-first-name').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  if (password === confirmPassword) {
    users[firstName] = password;
    alert(`Welcome, ${firstName}!`);
    authPage.classList.add('hidden');
    homepage.classList.remove('hidden');
  } else {
    alert('Passwords do not match!');
  }
});

// Log In
loginBtn.addEventListener('click', () => {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  if (users[username] === password) {
    alert(`Welcome back, ${username}!`);
    authPage.classList.add('hidden');
    homepage.classList.remove('hidden');
  } else {
    alert('Invalid username or password!');
  }
});

// Show Current Time and Date
function updateTime() {
  const now = new Date();
  bigTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  dateDay.textContent = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Generate Task Rows
function generateTaskRows() {
  for (let hour = 7; hour <= 22; hour++) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${hour}:00</td>
      <td><input type="text" class="task-input" placeholder="Set your task here"></td>
      <td><input type="checkbox" class="checkmark"></td>
    `;
    taskTable.appendChild(row);
  }
}

// Initialize App
setInterval(updateTime, 1000); // Update the clock every second
generateTaskRows();
