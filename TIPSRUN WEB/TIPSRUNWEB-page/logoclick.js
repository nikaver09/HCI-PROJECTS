// Show loading spinner if it exists
const loadingSpinner = document.getElementById("loading");
if (loadingSpinner) {
  loadingSpinner.style.display = "flex";
}

// Handle logo spin and redirection
const logo = document.getElementById("logo");
if (logo) {
  // Trigger spin animation on page load
  logo.classList.remove('spin-once');
  void logo.offsetWidth;
  logo.classList.add('spin-once');

  // Re-trigger spin and navigate to dashboard on click
  logo.addEventListener('click', () => {
    logo.classList.remove('spin-once');
    void logo.offsetWidth;
    logo.classList.add('spin-once');

    window.location.href = 'Dashboard.html';
  });
}
document.getElementById("logo").addEventListener("click", function () {
  window.location.href = "Dashboard.html";
});

// Logo click handler
document.getElementById('logo').addEventListener('click', function() {
  this.classList.add('spin-once');
  setTimeout(() => {
    window.location.href = 'Dashboard.html';
  }, 1000);
});

// Remove spin class after animation completes
document.getElementById('logo').addEventListener('animationend', function() {
  this.classList.remove('spin-once');
});
