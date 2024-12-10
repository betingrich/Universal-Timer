// Elements
const homepage = document.getElementById('homepage');
const todoPage = document.getElementById('todo-page');
const gotoTasksBtn = document.getElementById('goto-tasks');
const gotoHomeBtn = document.getElementById('goto-home');
const bigTime = document.getElementById('big-time');
const reminderAudio = document.getElementById('reminder-audio');
const taskTable = document.querySelector('#task-table tbody');

// Show Current Time
function updateTime() {
  const now = new Date();
  bigTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

// Play Reminder
function playReminder() {
  reminderAudio.play();
}

// Navigation
gotoTasksBtn.addEventListener('click', () => {
  homepage.classList.add('hidden');
  todoPage.classList.remove('hidden');
});

gotoHomeBtn.addEventListener('click', () => {
  todoPage.classList.add('hidden');
  homepage.classList.remove('hidden');
});

// Initialize App
setInterval(updateTime, 1000); // Update the clock every second
generateTaskRows();
