// Display Current Time and Date
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const date = now.toDateString();

  document.getElementById('current-time').innerText = `${hours}:${minutes}:${seconds}`;
  document.getElementById('current-date').innerText = date;
}
setInterval(updateTime, 1000);

// Fetch Weather Based on Location
function fetchWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      
      const response = await fetch(weatherUrl);
      const data = await response.json();

      document.getElementById('location').innerText = data.name;
      document.getElementById('temperature').innerText = `${data.main.temp}°C`;
    });
  } else {
    document.getElementById('weather').innerText = 'Location access denied';
  }
}
fetchWeather();

// Task Management with Local Storage
const taskList = []; // Array to store tasks
const taskContainer = document.getElementById('taskContainer');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');

// Load tasks from localStorage on page load
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach((task) => createTaskElement(task.text, task.isCompleted));
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Create a task element
function createTaskElement(taskText, isCompleted = false) {
  const taskEl = document.createElement('div');
  taskEl.classList.add('task');
  taskEl.innerHTML = `
    <input type="checkbox" ${isCompleted ? 'checked' : ''} class="task-checkbox" />
    <span class="task-text ${isCompleted ? 'completed' : ''}">${taskText}</span>
    <button class="delete-task">✖</button>
  `;
  taskContainer.appendChild(taskEl);

  // Add event listeners
  const checkbox = taskEl.querySelector('.task-checkbox');
  const deleteBtn = taskEl.querySelector('.delete-task');

  checkbox.addEventListener('change', () => {
    const index = Array.from(taskContainer.children).indexOf(taskEl);
    taskList[index].isCompleted = checkbox.checked;
    saveTasks();
    updateTaskStyle(checkbox, taskEl);
  });

  deleteBtn.addEventListener('click', () => {
    const index = Array.from(taskContainer.children).indexOf(taskEl);
    taskList.splice(index, 1);
    taskContainer.removeChild(taskEl);
    saveTasks();
  });

  taskList.push({ text: taskText, isCompleted });
  saveTasks();
}

// Update task text style based on completion
function updateTaskStyle(checkbox, taskEl) {
  const taskText = taskEl.querySelector('.task-text');
  if (checkbox.checked) {
    taskText.classList.add('completed');
  } else {
    taskText.classList.remove('completed');
  }
}

// Add new task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    createTaskElement(taskText);
    taskInput.value = '';
  }
});

// Initialize tasks
loadTasks();
