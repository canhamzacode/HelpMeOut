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
    height: 55px;
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
    <div>
      <div class="control">
        <i class="fa-solid fa-pause"></i>
      </div>
      <span> Pause</span>
    </div>
    <div>
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
