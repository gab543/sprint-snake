const toggleBtn = document.getElementById("darkModeBtn");

// Mode par défaut
toggleBtn.classList.add("light");

toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("dark");
  toggleBtn.classList.toggle("light");
  document.body.classList.toggle("dark-mode");
});
