// Page References
const homepage = document.getElementById('homepage');
const todoPage = document.getElementById('todo-page');
const bigTime = document.getElementById('big-time');
const taskTable = document.querySelector('#task-table tbody');
const locationEl = document.getElementById('location');
const weatherEl = document.getElementById('weather');

// Buttons
const gotoTasksBtn = document.getElementById('goto-tasks');
const gotoHomeBtn = document.getElementById('goto-home');
const logoutBtn = document.getElementById('logout');

// Redirect if not logged in
function checkAuth() {
  if (!localStorage.getItem('userLoggedIn')) {
    window.location.href = 'login.html';
  }
}

// Show Current Time
function updateTime() {
  const now = new Date();
  bigTime.textContent = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
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

// Get User Location and Weather
function fetchLocationAndWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=YOUR_API_KEY`
          );
          const weatherData = await weatherResponse.json();
          locationEl.textContent = weatherData.name;
          weatherEl.textContent = `${Math.round(weatherData.main.temp)}°C`;
        } catch (error) {
          locationEl.textContent = 'Unable to detect';
          console.error('Weather API error:', error);
        }
      },
      (error) => {
        locationEl.textContent = 'Unable to detect';
        console.error('Geolocation error:', error);
      }
    );
  } else {
    locationEl.textContent = 'Not supported';
  }
}

// Navigation between pages
gotoTasksBtn.addEventListener('click', () => {
  homepage.classList.add('hidden');
  todoPage.classList.remove('hidden');
});

gotoHomeBtn.addEventListener('click', () => {
  todoPage.classList.add('hidden');
  homepage.classList.remove('hidden');
});

// Logout Functionality
logoutBtn.addEventListener('click', () => {
  alert('You have been logged out!');
  localStorage.removeItem('userLoggedIn'); // Clear login state
  window.location.href = 'login.html'; // Redirect to login page
});

// Initialize App
checkAuth(); // Ensure the user is authenticated
setInterval(updateTime, 1000); // Update the clock every second
generateTaskRows();
fetchLocationAndWeather();
