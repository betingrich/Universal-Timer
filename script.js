// Real-time Clock and Date
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const microseconds = now.getMilliseconds();
  const date = now.toLocaleDateString();

  document.getElementById('clock').innerText = `${time}.${microseconds}`;
  document.getElementById('date').innerText = `Date: ${date}`;
}
setInterval(updateClock, 10); // Update every 10ms

// Task Modal
const modal = document.getElementById('task-modal');
const addTaskButton = document.getElementById('add-task-button');
const closeModalButton = document.getElementById('close-modal');
const taskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks-container');

addTaskButton.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeModalButton.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Save Task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskTime = document.getElementById('task-time').value;
  const taskDesc = document.getElementById('task-desc').value;

  // Create task item
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');
  taskItem.innerText = `${taskTime} - ${taskDesc}`;
  tasksContainer.appendChild(taskItem);

  // Set alarm
  const taskDate = document.getElementById('date-picker').value;
  const alarmTime = new Date(`${taskDate}T${taskTime}`);
  const currentTime = new Date();

  if (alarmTime > currentTime) {
    setTimeout(() => {
      alert(`Reminder: ${taskDesc}`);
    }, alarmTime - currentTime);
  } else {
    alert('Selected time is in the past!');
  }

  // Clear and hide modal
  taskForm.reset();
  modal.classList.add('hidden');
});
