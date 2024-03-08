// Inject styles
const style = document.createElement("style");
style.textContent = `
  #overlay {
    cursor: grab;
    position: fixed;
    bottom: 20px;
    left: 50px;
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
const iconCdnLink = `<link
rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
crossorigin="anonymous"
referrerpolicy="no-referrer"
/>`;

document.head.appendChild(style, iconCdnLink);

// Inject HTML
const overlay = document.createElement("div");
overlay.id = "overlay";
overlay.innerHTML = `
  <div class="flex time">
    <p>00:03:45</p>
    <div class="glow"></div>
  </div>
  <div class="flex controls">
    <div id="pause">
      <div class="control">
        <i class="fa-solid fa-pause"></i>
      </div>
      <span> Pause</span>
    </div>
    <div id="stop">
      <div class="control">
        <i class="fa-solid fa-stop"></i>
      </div>
      <span>Stop</span>
    </div>
    <div>
      <div class="control">
        <i class="fa-solid fa-video"></i>
      </div>
      <span>Camera</span>
    </div>
    <div>
      <div class="control">
        <i class="fa-solid fa-microphone"></i>
      </div>
      <span>Mic</span>
    </div>
  </div>
`;
document.body.appendChild(overlay);

let isDragging = false;
let initialX, initialY, startLeft, startTop;

overlay.addEventListener("mousedown", (e) => {
  isDragging = true;
  initialX = e.clientX;
  initialY = e.clientY;
  startLeft = overlay.offsetLeft;
  startTop = overlay.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const deltaX = e.clientX - initialX;
    const deltaY = e.clientY - initialY;

    overlay.style.left = startLeft + deltaX + "px";
    overlay.style.top = startTop + deltaY + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

const stopRecording = document.getElementById("stop");
const pauseRecording = document.getElementById("pause");

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

  recorder.onpause = function () {
    console.log("Recording paused");
    stream.getTracks().forEach((track) => {
      track.onpause();
    });
  };

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
  }
});

stopRecording.addEventListener("click", () => {
  console.log("Popup - Requesting recording button Clicked");
  if (!recorder) return console.error("Recorder not found");
  recorder.stop();
});
