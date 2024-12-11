document.getElementById("signup-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (!username || !password || !confirmPassword) {
    alert("All fields are required!");
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert("Password must have at least 8 characters, including uppercase, lowercase, a number, and a symbol.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("userPassword", password);

  alert("Account created successfully!");
  window.location.href = "login.html";
});
