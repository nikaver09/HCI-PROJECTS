document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // Show loading spinner
    const loadingSpinner = document.getElementById("loading");
    loadingSpinner.style.display = "flex"; // Show spinner
    
    // Simulate a delay (for example, API call delay)
    setTimeout(function() {
      // Example of backend login logic (this could be an API call)
      if (username === "admin" && password === "admin") {
        // Hide the spinner and redirect after a short delay
        loadingSpinner.style.display = "none"; // Hide spinner
        window.location.href = "Dashboard.html"; // Redirect to home page
      } else {
        alert("Incorrect username or password.");
        loadingSpinner.style.display = "none"; // Hide spinner if login fails
      }
    }, 200); // Simulate 2-second delay (you can adjust the delay)
  });