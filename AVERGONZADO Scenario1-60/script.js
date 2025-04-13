document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("revealBtn");
  const dynamicImage = document.querySelector(".dynamicpicture");

  const images = [
    "techsol/techsolution.png",   
    "techsol/reveal.png"          
  ];

  let currentIndex = 1;

  button.addEventListener("click", function () {
    dynamicImage.src = images[currentIndex];
    dynamicImage.style.display = "block";
    currentIndex = (currentIndex + 1) % images.length;
  });
});
