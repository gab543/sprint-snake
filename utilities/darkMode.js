const toggleBtn = document.getElementById("darkModeBtn");

// Mode par défaut
toggleBtn.classList.add("light");

toggleBtn.addEventListener("click", () => {
  setTimeout(() => {
    toggleBtn.classList.toggle("dark");
    toggleBtn.classList.toggle("light");
  }, 200);
  document.body.classList.toggle("dark-mode");
});
