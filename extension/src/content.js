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
  #pause div.control{
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
  }
`;

// Append the new style element to the document head
document.head.appendChild(myStyle);

var overlay = document.createElement("div");
var userCam = document.createElement("div");
userCam.id = "userCam";
overlay.id = "overlay";

// Inject overlay HTML
overlay.innerHTML = `
  <div class="flex time">
    <span>00:00:00</span>
    <div class="glow"></div>
  </div>
  <div class="flex controls">
    <div id="pause">
      <div class="control">
        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="14" viewBox="0 0 2 14" fill="none">
          <path d="M1 1.5L1 12.5" stroke="black" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="14" viewBox="0 0 2 14" fill="none">
          <path d="M1 1.5L1 12.5" stroke="black" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <span> Pause</span>
    </div>
    <div id="stop">
      <div class="control">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5.25 7.5C5.25 6.25736 6.25736 5.25 7.5 5.25H16.5C17.7426 5.25 18.75 6.25736 18.75 7.5V16.5C18.75 17.7426 17.7426 18.75 16.5 18.75H7.5C6.25736 18.75 5.25 17.7426 5.25 16.5V7.5Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span>Stop</span>
    </div>
    <div id="camera">
      <div class="control">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15.75 10.5L20.4697 5.78033C20.9421 5.30786 21.75 5.64248 21.75 6.31066V17.6893C21.75 18.3575 20.9421 18.6921 20.4697 18.2197L15.75 13.5M4.5 18.75H13.5C14.7426 18.75 15.75 17.7426 15.75 16.5V7.5C15.75 6.25736 14.7426 5.25 13.5 5.25H4.5C3.25736 5.25 2.25 6.25736 2.25 7.5V16.5C2.25 17.7426 3.25736 18.75 4.5 18.75Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span>Camera</span>
    </div>
    <div id="microphone">
      <div class="control">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.5M8.25 22.5H15.75M12 15.75C10.3431 15.75 9 14.4069 9 12.75V4.5C9 2.84315 10.3431 1.5 12 1.5C13.6569 1.5 15 2.84315 15 4.5V12.75C15 14.4069 13.6569 15.75 12 15.75Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span>Mic</span>
    </div>
  </div>
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

// Function to stop the webcam stream
function stopCam() {
  if (webcamStream) {
    // Get all tracks and stop them
    webcamStream.getTracks().forEach((track) => track.stop());

    // Clear the srcObject property of the video element
    if (userCam.firstChild) {
      userCam.firstChild.srcObject = null;
    }

    // Reset the webcamStream variable
    webcamStream = null;
  }
}

// webcam function
function startCam(audioState) {
  // stop any running instances of the webcam
  stopCam();

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: audioState })
      .then((vidStream) => {
        webcamStream = vidStream;
        var videoElement = document.createElement("video");
        videoElement.autoplay = true;
        videoElement.srcObject = vidStream;
        userCam.innerHTML = "";
        userCam.appendChild(videoElement);
        console.log(vidStream);
      })
      .catch(function (error) {
        console.log("Something went wrong!", error);
      });
  }
}

chrome.storage.local.get("permissions", (data) => {
  if (data && data.permissions) {
    globalData = data.permissions;

    // Check the stored webcam value and update display accordingly
    if (globalData.webcam) {
      startCam(globalData.audio);
    } else {
      stopCam();
    }
  }
});

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
    globalData.webcam ? startCam(globalData.audio) : stopCam();

    // Start or stop webcam stream based on toggle state
    if (globalData.webcam) {
      startCam(globalData.audio);
    } else {
      // Stop webcam stream if it's running
      stopCam();
      if (userCam.srcObject) {
        userCam.srcObject.getTracks().forEach((track) => track.stop());
        userCam.srcObject = null;
      }
    }
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
