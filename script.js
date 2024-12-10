// Real-Time Clock and Date
function startClock() {
  const clockElement = document.getElementById("clock");
  const dateElement = document.getElementById("date");

  setInterval(() => {
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString();
    dateElement.textContent = now.toLocaleDateString();
  }, 1000);
}

// Open and Close Modal
const modal = document.getElementById("task-modal");
const addTaskBtn = document.getElementById("add-task-btn");
const closeModalBtn = document.getElementById("close-modal");
addTaskBtn.addEventListener("click", () => modal.classList.remove("hidden"));
closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));

// Add Task Functionality
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskTime = document.getElementById("task-time").value;
  const taskDesc = document.getElementById("task-desc").value;

  // Add Task to List
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  taskItem.innerHTML = `
    <span>${taskTime} - ${taskDesc}</span>
    <button class="btn danger remove-btn">Remove</button>
  `;

  // Remove Task
  taskItem.querySelector(".remove-btn").addEventListener("click", () => {
    taskItem.remove();
  });

  taskList.appendChild(taskItem);

  // Close Modal
  modal.classList.add("hidden");
  taskForm.reset();
});

// Initialize Clock
startClock();
