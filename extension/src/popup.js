document.addEventListener("DOMContentLoaded", function () {
  var startRecording = document.getElementById("start");
  var fullscreen = document.getElementById("full-screen");
  var currentTab = document.getElementById("current-tab");
  var exitBtn = document.getElementById("close-extension");
  var cameraToggleBtn = document.getElementById("camera-toggle-btn");
  var audioToggleBtn = document.getElementById("audio-toggle-btn");
  console.log(cameraToggleBtn);

  var globalData = {};

  chrome.storage.local.get("permissions", (data) => {
    if (data && data.permissions) {
      globalData = data.permissions;

      if (globalData.webcam) {
        cameraToggleBtn.checked = true;
      } else {
        cameraToggleBtn.checked = false;
      }
      if (globalData.audio) {
        audioToggleBtn.checked = true;
      } else {
        audioToggleBtn.checked = false;
      }
    } else {
      globalData = {
        audio: false,
        video: true,
        webcam: false,
        displayOverlay: false,
      };
    }
  });

  cameraToggleBtn.checked = globalData.webcam;
  audioToggleBtn.checked = globalData.audio;

  function saveData() {
    chrome.storage.local.set({ permissions: globalData }, () => {
      console.log("Data Saved");
    });
  }

  function updateData(param) {
    var currentData = globalData;
    globalData = { ...currentData, ...param };
    saveData();
  }

  cameraToggleBtn.addEventListener("change", (event) => {
    console.log("Toggle Camera");

    updateData({ webcam: event.target.checked });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "camera-toggle" },
        function (response) {
          if (!chrome.runtime.lastError) {
            console.log("Popup - Requesting webcam", response);
          } else {
            console.log(chrome.runtime.lastError, "line 28");
          }
        }
      );
    });

    updateData({ webcam: event.target.checked });
    chrome.runtime.sendMessage({ action: "camera-toggle", data: globalData });
  });

  audioToggleBtn.addEventListener("change", (event) => {
    console.log("Toggle audio");

    updateData({ audio: event.target.checked });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "audio-toggle" },
        function (response) {
          if (!chrome.runtime.lastError) {
            console.log("Popup - Requesting webcam", response);
          } else {
            console.log(chrome.runtime.lastError, "line 85");
          }
        }
      );
    });
  });

  function createSvg(iconName, color) {
    const icons = {
      tab: `<svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.3332 17.2001V22.8001C21.3332 27.4667 19.4665 29.3334 14.7998 29.3334H9.19984C4.53317 29.3334 2.6665 27.4667 2.6665 22.8001V17.2001C2.6665 12.5334 4.53317 10.6667 9.19984 10.6667H14.7998C19.4665 10.6667 21.3332 12.5334 21.3332 17.2001Z"
        stroke="${color}"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M29.3332 9.20008V14.8001C29.3332 19.4667 27.4665 21.3334 22.7998 21.3334H21.3332V17.2001C21.3332 12.5334 19.4665 10.6667 14.7998 10.6667H10.6665V9.20008C10.6665 4.53341 12.5332 2.66675 17.1998 2.66675H22.7998C27.4665 2.66675 29.3332 4.53341 29.3332 9.20008Z"
        stroke="${color}"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />  `,
      fullscreen: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5865 2.66675H23.3998C28.1465 2.66675 29.3332 3.85341 29.3332 8.58675V17.0267C29.3332 21.7734 28.1465 22.9467 23.4132 22.9467H8.5865C3.85317 22.9601 2.6665 21.7734 2.6665 17.0401V8.58675C2.6665 3.85341 3.85317 2.66675 8.5865 2.66675Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 22.96V29.3333" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.6665 17.3333H29.3332" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 29.3333H22" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    };
    return icons[iconName];
  }
  currentTab.innerHTML = `${createSvg("tab", "#120b48")} <p>Full Screen</p>`;
  fullscreen.innerHTML = `${createSvg(
    "fullscreen",
    "#928FAB"
  )} <p>Full Screen</p>`;

  fullscreen.addEventListener("click", () => {
    fullscreen.classList.add("active");
    currentTab.classList.remove("active");

    fullscreen.innerHTML = `${createSvg(
      "fullscreen",
      "#120b48"
    )} <p>Full Screen</p>`;
    currentTab.innerHTML = `${createSvg("tab", "#928fab")} <p>Current Tab</p>`;
  });

  currentTab.addEventListener("click", () => {
    currentTab.classList.add("active");
    fullscreen.classList.remove("active");

    currentTab.innerHTML = `${createSvg("tab", "#120b48")} <p>Current Tab</p>`;
    fullscreen.innerHTML = `${createSvg(
      "fullscreen",
      "#928fab"
    )} <p>Full Screen</p>`;
  });

  exitBtn.addEventListener("click", () => {
    window.close();
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
