// Elements for Signup and Login
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const signupPage = document.getElementById("signup-page");
const loginPage = document.getElementById("login-page");

// Signup Logic
if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const country = document.getElementById("country").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Check if all fields are filled
    if (!firstName || !lastName || !country || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check if password meets requirements
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      alert("Password must have at least 8 characters, including uppercase, lowercase, a number, and a symbol.");
      return;
    }

    // Simulate saving user data (use backend or localStorage for real apps)
    localStorage.setItem("user", JSON.stringify({ firstName, lastName, country }));

    alert("Signup successful! Redirecting to the main page.");

    // Redirect to main page after successful signup
    window.location.href = "index.html"; // Redirect to main page
  });
}

// Login Logic
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Check if the user exists (for demo, we use localStorage, in real cases, use an API)
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser || savedUser.firstName !== username || savedUser.password !== password) {
      alert("Incorrect username or password.");
      return;
    }

    alert("Login successful! Redirecting to the main page.");

    // Redirect to main page after successful login
    window.location.href = "index.html"; // Redirect to main page
  });
}
