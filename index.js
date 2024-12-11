// Ensure user is logged in before accessing the main page
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");

  if (!username) {
    alert("You must log in first!");
    window.location.href = "login.html";
  } else {
    document.getElementById("welcome-message").textContent = `Welcome, ${username}!`;
  }
});

// Example of main page functionality
const tasks = []; // Array to store tasks

// Add a task
document.getElementById("add-task-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const taskInput = document.getElementById("task-input");
  const task = taskInput.value.trim();

  if (!task) {
    alert("Task cannot be empty!");
    return;
  }

  tasks.push(task);
  renderTasks();
  taskInput.value = "";
});

// Render tasks
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
