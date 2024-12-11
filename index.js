document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");

  // Redirect to login if no user is found
  if (!username) {
    alert("You must log in first!");
    window.location.href = "login.html";
  } else {
    document.getElementById("welcome-message").textContent = `Welcome, ${username}!`;
  }

  // Clock and Date Functionality
  const currentTime = document.getElementById("current-time");
  const currentDate = document.getElementById("current-date");

  function updateClock() {
    const now = new Date();
    currentTime.textContent = now.toLocaleTimeString();
    currentDate.textContent = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  setInterval(updateClock, 1000);
  updateClock();

  // Page Navigation
  const clockPage = document.getElementById("clock-page");
  const taskPage = document.getElementById("task-page");
  const gotoTasksButton = document.getElementById("goto-tasks");
  const gotoClockButton = document.getElementById("goto-clock");

  gotoTasksButton.addEventListener("click", () => {
    clockPage.classList.add("hidden");
    taskPage.classList.remove("hidden");
  });

  gotoClockButton.addEventListener("click", () => {
    taskPage.classList.add("hidden");
    clockPage.classList.remove("hidden");
  });

  // Task Functionality
  const taskForm = document.getElementById("add-task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
      const taskItem = document.createElement("li");
      taskItem.textContent = taskText;
      taskList.appendChild(taskItem);
      taskInput.value = "";
    }
  });
});

// Logout Functionality
function logout() {
  localStorage.clear(); // Clear user data
  window.location.href = "login.html"; // Redirect to login
}
