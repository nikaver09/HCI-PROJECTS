document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form from submitting normally

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  // Get the logo element
  const logo = document.getElementById("logo");

  // Remove any existing animation classes
  logo.classList.remove('spin-twice');

  // Trigger reflow to restart animation
  void logo.offsetWidth;

  // Add the spin-twice animation class
  logo.classList.add('spin-twice');

  // Simulate a delay for login (e.g., API call or processing time)
  setTimeout(function() {
    if (username === "admin" && password === "admin") {
      window.location.href = "Dashboard.html";
    } else {
      alert("Incorrect username or password.");
    }
  }, 2000); // Delay matches animation duration
});

 const logo = document.getElementById("logo");