document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("userPassword");

  if (username === storedUsername && password === storedPassword) {
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password. Please try again.");
  }
});
