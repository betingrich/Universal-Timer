document.addEventListener("DOMContentLoaded", () => {
  // Time and Date Display
  const timeElement = document.getElementById("current-time");
  const dateElement = document.getElementById("current-date");

  function updateTimeAndDate() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    timeElement.textContent = time;
    dateElement.textContent = date;
  }
  setInterval(updateTimeAndDate, 1000);

  // Weather API
  const locationElement = document.getElementById("location");
  const temperatureElement = document.getElementById("temperature");

  async function fetchWeather() {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const { city } = await response.json();

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
      );
      const weatherData = await weatherResponse.json();

      locationElement.textContent = city;
      temperatureElement.textContent = `${weatherData.main.temp}°C, ${weatherData.weather[0].description}`;
    } catch (error) {
      locationElement.textContent = "Unable to fetch location";
      temperatureElement.textContent = "Unable to fetch weather";
    }
  }
  fetchWeather();

  // Task Manager
  const taskContainer = document.getElementById("taskContainer");
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }

  function renderTasks() {
    taskContainer.innerHTML = "";
    savedTasks.forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.className = "task";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.className = "task-checkbox";
      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      const taskText = document.createElement("div");
      taskText.className = `task-text ${task.completed ? "completed" : ""}`;
      taskText.textContent = task.text;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✖";
      deleteBtn.className = "delete-task";
      deleteBtn.addEventListener("click", () => {
        savedTasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      taskElement.appendChild(checkbox);
      taskElement.appendChild(taskText);
      taskElement.appendChild(deleteBtn);
      taskContainer.appendChild(taskElement);
    });
  }

  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      savedTasks.push({ text: taskText, completed: false });
      saveTasks();
      renderTasks();
      taskInput.value = "";
    }
  });

  renderTasks();
});
