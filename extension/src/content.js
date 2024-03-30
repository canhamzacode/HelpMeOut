console.log("Contemt.js 1");
var globalData = {};

// media icons
var playIcon = `
<svg width="128" height="128" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" class="icon">
    <path fill="" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128Z"/>
</svg>
`;
var cameraOffIcon = `
<svg width="512" height="512" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path d="m3 3l18 18m-6-10v-1l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-.675.946"/>
        <path d="M10 6h3a2 2 0 0 1 2 2v3m0 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1"/>
    </g>
</svg>
`;
var audioOffIcon = `
<svg width="128" height="128" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon">
    <path fill="" d="M10.8 4.9c0-.66.54-1.2 1.2-1.2s1.2.54 1.2 1.2l-.01 3.91L15 10.6V5c0-1.66-1.34-3-3-3c-1.54 0-2.79 1.16-2.96 2.65l1.76 1.76V4.9zM19 11h-1.7c0 .58-.1 1.13-.27 1.64l1.27 1.27c.44-.88.7-1.87.7-2.91zM4.41 2.86L3 4.27l6 6V11c0 1.66 1.34 3 3 3c.23 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52c-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28a7.13 7.13 0 0 0 2.55-.9l4.2 4.2l1.41-1.41L4.41 2.86z"/>
</svg>
`;
var audioOnIcon = `
<svg
    width="128"
    height="128"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    >
    <path
        fill="none"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M192 448h128m64-240v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32m128 160v80"
    />
    <path
        fill="none"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M256 64a63.68 63.68 0 0 0-64 64v111c0 35.2 29 65 64 65s64-29 64-65V128c0-36-28-64-64-64Z"
    />
    </svg>
`;
var cameraOnIcon = `
  <svg
    width="128"
    height="128"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    >
    <path
        fill=""
        d="M21.53 7.15a1 1 0 0 0-1 0L17 8.89A3 3 0 0 0 14 6H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h9a3 3 0 0 0 3-2.89l3.56 1.78A1 1 0 0 0 21 17a1 1 0 0 0 .53-.15A1 1 0 0 0 22 16V8a1 1 0 0 0-.47-.85ZM15 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1Zm5-.62l-3-1.5v-1.76l3-1.5Z"
    />
    </svg>
`;

function updateUsercam(cam) {
  if (cam) {
    userCam.style.display = "flex";
  } else {
    userCam.style.display = "none";
  }
}

function updateAudioIcon(audio) {
  if (audio) {
    microphoneBtn.innerHTML = audioOffIcon;
  } else {
    microphoneBtn.innerHTML = audioOffIcon;
  }
}

chrome.storage.local.get("permissions", (data) => {
  if (data && data.permissions) {
    globalData = data.permissions;

    // Check the stored webcam value and update display accordingly
    updateUsercam(globalData.webcam);
    updateAudioIcon(globalData.audio);
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

    updateUsercam(globalData.webcam);
    updateAudioIcon(globalData.audio);
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
    <div id="resume">
      <div class="control">
        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="14" viewBox="0 0 2 14" fill="none">
          <path d="M1 1.5L1 12.5" stroke="black" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="14" viewBox="0 0 2 14" fill="none">
          <path d="M1 1.5L1 12.5" stroke="black" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <span> Resume</span>
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
var resumeRecordingBtn = document.getElementById("resume");
var pauseRecordingBtn = document.getElementById("pause");
var cameraBtn = document.getElementById("camera");
var microphoneBtn = document.getElementById("micropone");

// recording stream handler
var recorder = null;
var isRecording = false;
function onAcessApproved(stream) {
  console.log(stream);
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  console.log(recorder.stream);
  isRecording = true;

  recorder.onstop = function () {
    console.log(stream);
    stream.getTracks().forEach((track) => {
      if (track.readyState === "live") {
        track.stop();
      }
    });
  };

  // recorder.onpause = function () {
  //   console.log("Recording paused");
  //   if (recorder.state === "recording") {
  //     recorder.pause();
  //     console.log("Recording paused");
  //     isRecording = false;
  //   } else if (recorder.state === "paused") {
  //     recorder.resume();
  //     console.log("Recording resumed");
  //     isRecording = true;
  //   }
  //   console.log(recorder.stream, "After pause");
  // };

  recorder.ondataavailable = function (event) {
    console.log(stream);
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

  recorder.start();
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

    console.log(message, sender);

    console.log(globalData.audio);
    navigator.mediaDevices
      .getDisplayMedia({
        video: {
          displaySurface: "window",
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
          suppressLocalAudioPlayback: true,
        },
        surfaceSwitching: "include",
        selfBrowserSurface: "exclude",
        systemAudio: "exclude",
      })
      .then((stream) => {
        onAcessApproved(stream);
      });

    startCam(globalData.audio);
  } else if (message.action === "camera-toggle") {
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
  } else if (message.action === "audio-toggle") {
    console.log("Content Script - audio toggled");

    var microphoneBtn = document.querySelector("#microphone .control");
    if (globalData.audio) {
      microphoneBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.5M8.25 22.5H15.75M6 8.25L18 8.25" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `;
    } else {
      microphoneBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.5M8.25 22.5H15.75M12 15.75C10.3431 15.75 9 14.4069 9 12.75V4.5C9 2.84315 10.3431 1.5 12 1.5C13.6569 1.5 15 2.84315 15 4.5V12.75C15 14.4069 13.6569 15.75 12 15.75Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    }
  }
});

pauseRecordingBtn.style.display = "flex !important"; // Initially hide pause button
resumeRecordingBtn.style.display = "none !important"; // Initially hide resume button

// Listeners for stop and pause buttons:

stopRecordingBtn.addEventListener("click", () => {
  console.log("Popup - Requesting recording button Clicked");
  if (!recorder) return console.error("Recorder not found");
  stopCam();
  recorder.stop();

  // Show only pause button after stop
  pauseRecordingBtn.style.display = "flex !important";
  resumeRecordingBtn.style.display = "none !important";
});

pauseRecordingBtn.addEventListener("click", () => {
  console.log("recording paused");
  if (!recorder) return console.error("Recorder not found");
  recorder.pause();

  // Toggle button visibility based on recording state
  pauseRecordingBtn.style.display =
    recorder.state === "paused" ? "none" : "flex";
  resumeRecordingBtn.style.display =
    recorder.state === "paused" ? "flex" : "none";
});

resumeRecordingBtn.addEventListener("click", () => {
  console.log("recording resumed");
  if (!recorder) return console.error("Recorder not found");
  recorder.resume();

  // Toggle button visibility based on recording state
  pauseRecordingBtn.style.display =
    recorder.state === "paused" ? "none" : "flex";
  resumeRecordingBtn.style.display =
    recorder.state === "paused" ? "flex" : "none";
});
