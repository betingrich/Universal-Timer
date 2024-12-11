document.getElementById("signup-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (!username || !password || !confirmPassword) {
    alert("All fields are required!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*]/.test(password)
  ) {
    alert(
      "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
    );
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  alert("Signup successful!");
  window.location.href = "index.html"; // Redirect to the main page
});
