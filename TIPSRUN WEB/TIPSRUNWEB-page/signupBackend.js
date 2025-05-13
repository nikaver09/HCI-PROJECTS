document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Simple form validation
    if (!username || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    // Passwords match check
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Simulate backend signup process
    const userData = {
        username,
        email,
        password
    };

    // You can replace the alert with an actual API request
    console.log("User signed up:", userData);

    // Simulate successful signup by redirecting to login page
    alert("Signup successful! Please log in.");
    window.location.href = "Loginform.html"; // Redirect to login page
});
