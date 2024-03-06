document.addEventListener("DOMContentLoaded", function () {
  const fullscreen = document.getElementById("full-screen");
  const currentTab = document.getElementById("current-tab");

  fullscreen.addEventListener("click", () => {
    fullscreen.classList.add("active");
    currentTab.classList.remove("active");
  });

  currentTab.addEventListener("click", () => {
    currentTab.classList.add("active");
    fullscreen.classList.remove("active");
  });
});
