console.log("Contemt.js 1");
var globalData = {};

chrome.storage.local.get("permissions", (data) => {
  if (data && data.permissions) {
    globalData = data.permissions;

    // Check the stored webcam value and update display accordingly
    if (globalData.webcam) {
      userCam.style.display = "flex";
    } else {
      userCam.style.display = "none";
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

chrome.storage.onChanged.addListener((changes, namespace) => {
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "local" && changes.permissions) {
      console.log(changes.permissions);
      globalData = changes.permissions.newValue;

      if (globalData.webcam) {
        userCam.style.display = "flex";
      } else {
        userCam.style.display = "none";
      }
    }
  });
});

// Get all style elements in the document
var styles = document.getElementsByName("style");

// Check if there are existing style elements
if (styles.length > 0) {
  // Access the last style element in the NodeList
  var lastStyle = styles[styles.length - 1];

  // Update the innerHTML of the last style element
  lastStyle.textContent += `
  #overlay {
    cursor: grab;
    position: fixed;
    bottom: 20px;
    left: 200px;
    /* padding: 5px 10px; */
    background-color: #141414;
    color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    /* cursor: pointer; */
    padding: 12px 40px 12px 16px;
    border-radius: 60px;
    min-height: 70px;
    max-height: 95px;
    display: flex;
    gap: 10px;
    align-items: center;
    min-width: 250px;
    z-index: 10000;
    transition: left 0.2s, bottom 0.2s;
    justify-content: center;
  }
  #userCam {
    cursor: grab;
    position: fixed;
    bottom: 20px;
    left: 50px;
    /* padding: 5px 10px; */
    background-color: #141414;
    color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    height: 150px;
    display: flex;
    gap: 10px;
    align-items: center;
    width: 150px;
    z-index: 10000;
    transition: left 0.2s, bottom 0.2s;
    justify-content: center;
  }
  #userCam video {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  #overlay::selection {
    background-color: transparent;
  }
  .glow {
    background: #c00404;
    height: 10px;
    width: 10px;
    border-radius: 50%;
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .time {
    height: 100%;
    padding-right: 10px;
    border-right: 2px solid #fff;
    align-items: center;
  }
  .control {
    width: 44px;
    height: 44px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
  }
  .controls {
    padding-left: 5px;
  }
  .control i {
    color: #141414;
    font-size: 18px;
  }
`;
}

// Create a new style element
var myStyle = document.createElement("style");
myStyle.textContent = `
  #overlay {
    cursor: grab;
    position: fixed;
    bottom: 20px;
    left: 200px;
    /* padding: 5px 10px; */
    background-color: #141414;
    color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    /* cursor: pointer; */
    padding: 12px 40px 12px 16px;
    border-radius: 60px;
    height: 70px;
    display: flex;
    gap: 10px;
    align-items: center;
    min-width: 250px;
    z-index: 10000;
    transition: left 0.2s, bottom 0.2s;
    justify-content: center;
  }
  #userCam {
    cursor: grab;
    position: fixed;
    bottom: 20px;
    left: 50px;
    /* padding: 5px 10px; */
    background-color: #141414;
    color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    height: 100px;
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100px;
    z-index: 10000;
    transition: left 0.2s, bottom 0.2s;
    justify-content: center;
  }
  #userCam video {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  #overlay::selection {
    background-color: transparent;
  }
  .glow {
    background: #c00404;
    height: 10px;
    width: 10px;
    border-radius: 50%;
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .time {
    height: 100%;
    padding-right: 10px;
    border-right: 2px solid #fff;
    align-items: center;
  }
  .control {
    width: 44px;
    height: 44px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
  }
  .controls {
    padding-left: 5px;
  }
  .control i {
    color: #141414;
    font-size: 18px;
  }
`;

// Append the new style element to the document head
document.head.appendChild(myStyle);

var overlay = document.createElement("div");
var userCam = document.createElement("div");
userCam.id = "userCam";
overlay.id = "overlay";

// icon location
var playIcon = chrome.runtime.getURL("img/pause-icon.png");
var stopIcon = chrome.runtime.getURL("img/stop.png");
var cameraIcon = chrome.runtime.getURL("img/video.png");
var cameraCrossIcon = chrome.runtime.getURL("img/video-slash.png");
var micIcon = chrome.runtime.getURL("img/mic-icon.png");

// Inject overlay HTML
overlay.innerHTML = `
  <div class="flex time">
    <span>00:00:00</span>
    <div class="glow"></div>
  </div>
  <div class="flex controls">
    <div id="pause">
      <div class="control">
      <img src="${chrome.runtime.getURL(
        "./img/pause-icon.png"
      )}" alt="pause icon" />
      </div>
      <span> Pause</span>
    </div>
    <div id="stop">
      <div class="control">
      <img src="${stopIcon}" alt="stop icon" />
      </div>
      <span>Stop</span>
    </div>
    <div id="camera">
      <div class="control">
      <img src="${cameraIcon}" alt="video" />
      </div>
      <span>Camera</span>
    </div>
    <div id="microphone">
      <div class="control">
      <img src="${micIcon}" alt="mic-icon" />
      </div>
      <span>Mic</span>
    </div>
  </div>
`;

// insert usercam into the browser
userCam.innerHTML = `
<video id="videoElement" autoplay="true"></video>
`;

document.body.appendChild(overlay);
document.body.appendChild(userCam);

// Set the default data for the overlay(s)
const defaultData = {
  audio: false,
  video: true,
  showControl: false,
};

// Make the overlay draggable
function makeDraggable(element) {
  let isDragging = false;
  let initialX, initialY, startLeft, startTop;

  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    initialX = e.clientX;
    initialY = e.clientY;
    startLeft = element.offsetLeft;
    startTop = element.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const deltaX = e.clientX - initialX;
      const deltaY = e.clientY - initialY;

      element.style.left = startLeft + deltaX + "px";
      element.style.top = startTop + deltaY + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

makeDraggable(overlay);
makeDraggable(userCam);

// Add event listeners to the controls
var stopRecordingBtn = document.getElementById("stop");
var pauseRecordingBtn = document.getElementById("pause");
var cameraBtn = document.getElementById("camera");
var microphoneBtn = document.getElementById("micropone");

// recording stream handler
var recorder = null;
function onAcessApproved(stream) {
  recorder = new MediaRecorder(stream);

  recorder.start();

  recorder.onstop = function () {
    stream.getTracks().forEach((track) => {
      if (track.readyState === "live") {
        track.stop();
      }
    });
  };

  recorder.pause = function () {
    console.log("Recording Paused");
  };

  // recorder.onpause = function () {
  //   console.log("Recording paused");
  //   stream.getTracks().forEach((track) => {
  //     track.pause();
  //   });
  // };

  recorder.onresume = function () {
    console.log("Recording resumed");
    stream.getTracks().forEach((track) => {
      track.onresume();
    });
  };

  recorder.ondataavailable = function (event) {
    var blob = new Blob([event.data], { type: "video/webm" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "test.webm";
    a.click();

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    if (url) {
      url.revokeObjectURL(url);
    }
  };
}

// check if the recorder is available
if (!recorder) {
  pauseRecordingBtn.disabled = true;
  stopRecordingBtn.disabled = true;
} else {
  pauseRecordingBtn.disabled = false;
  stopRecordingBtn.disabled = false;
}

var webcamStream = null;

// webcam function
function startCam(audioState) {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: audioState })
      .then((vidStream) => {
        console.log(vidStream);
      })
      .catch(function (error) {
        console.log("Something went wrong!", error);
      });
  }
}

// Function to stop the webcam stream
function stopCam() {
  if (webcamStream) {
    // Get all tracks and stop them
    webcamStream.getTracks().forEach((track) => track.stop());

    // Reset the webcamStream variable
    webcamStream = null;
  }
}

// listen to the request-recording from index.html popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "request-recording") {
    console.log("Content Script - Requesting recording");

    sendResponse(`Processed ${message.action}`);

    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        width: 9999999,
        height: 99999999,
      })
      .then((stream) => {
        onAcessApproved(stream);
      });

    startCam(defaultData.audio);
  }
  if (message.action === "camera-toggle") {
    console.log("Content Script - webcam toggled");

    sendResponse(`Processed ${message.action}`);
    userCam.style.display = globalData.webcam ? "flex" : "none";
  }
});

// listen to the stop recording button
stopRecordingBtn.addEventListener("click", () => {
  console.log("Popup - Requesting recording button Clicked");
  if (!recorder) return console.error("Recorder not found");
  stopCam();
  recorder.stop();
});

// listen to the pause recording button
pauseRecordingBtn.addEventListener("click", () => {
  console.log("recording paused");
  if (!recorder) return console.error("Recorder not found");
  recorder.pause();
});
