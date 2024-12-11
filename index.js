document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");

  if (!username) {
    alert("You must log in first!");
    window.location.href = "login.html";
  } else {
    document.getElementById("welcome-message").textContent = `Welcome, ${username}!`;
  }

  // Clock and Date
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

  // Task Scheduler
  const timeSelect = document.getElementById("time-select");
  const taskForm = document.getElementById("task-form");
  const taskTableBody = document.querySelector("#task-table tbody");

  // Generate time intervals
  const intervals = [];
  for (let hour = 7; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      intervals.push(
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
      );
    }
  }

  // Populate the time select dropdown
  intervals.forEach((time) => {
    const option = document.createElement("option");
    option.value = time;
    option.textContent = time;
    timeSelect.appendChild(option);
  });

  // Add task
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedTime = timeSelect.value;
    const taskText = document.getElementById("task-input").value.trim();

    if (taskText) {
      const row = document.createElement("tr");
      const timeCell = document.createElement("td");
      const taskCell = document.createElement("td");

      timeCell.textContent = selectedTime;
      taskCell.textContent = taskText;

      row.appendChild(timeCell);
      row.appendChild(taskCell);
      taskTableBody.appendChild(row);

      taskForm.reset();
    }
  });
});

// Logout
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
