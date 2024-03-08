document.addEventListener("DOMContentLoaded", function () {
  const startRecording = document.getElementById("start");
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

  startRecording.addEventListener("click", () => {
    console.log("Popup - Requesting recording button Clicked");

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "request-recording" },
        function (response) {
          if (!chrome.runtime.lastError) {
            console.log("Popup - Requesting recording", response);
          } else {
            console.log(chrome.runtime.lastError, "line 27");
          }
        }
      );
    });
  });
});
