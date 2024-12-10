document.addEventListener('DOMContentLoaded', function () {
    // Detect if we're on signup or login page
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    // Handle Signup
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const firstName = document.getElementById('first-name').value.trim();
            const lastName = document.getElementById('last-name').value.trim();
            const country = document.getElementById('country').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value.trim();

            if (!firstName || !lastName || !country || !password || !confirmPassword) {
                alert("All fields are required!");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
                alert("Password must have at least 8 characters, including uppercase, lowercase, number, and a symbol.");
                return;
            }

            // Save user to localStorage
            localStorage.setItem('user', JSON.stringify({ firstName, lastName, country, password }));

            alert("Signup successful!");
            window.location.href = 'index.html'; // Redirect to main page
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value.trim();

            if (!username || !password) {
                alert("Both fields are required!");
                return;
            }

            const userData = JSON.parse(localStorage.getItem('user'));
            if (!userData || username !== userData.firstName || password !== userData.password) {
                alert("Invalid username or password!");
                return;
            }

            alert("Login successful!");
            window.location.href = 'index.html'; // Redirect to main page
        });
    }
});
