// Get the active tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];

  // Capture the screen of the active tab
  chrome.desktopCapture.chooseDesktopMedia(
    ["screen", "window"],
    activeTab,
    (streamId) => {
      if (chrome.runtime.lastError || !streamId) {
        console.error(
          "Error selecting media source:",
          chrome.runtime.lastError
        );
        return;
      }

      // Get the stream from the selected media source
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: { mandatory: { chromeMediaSourceId: streamId } },
        })
        .then((stream) => {
          // Create a MediaRecorder
          const mediaRecorder = new MediaRecorder(stream);
          const chunks = [];

          // Event listeners for recording
          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunks.push(event.data);
            }
          };

          mediaRecorder.onstop = () => {
            // Combine recorded chunks into a Blob
            const blob = new Blob(chunks, { type: "video/webm" });

            // Save or process the recorded video as needed
            console.log("Recording stopped. Blob:", blob);
          };

          // Start recording
          mediaRecorder.start();

          // Stop recording after a certain duration (adjust as needed)
          setTimeout(() => {
            mediaRecorder.stop();
          }, 10000); // 10 seconds in this example
        })
        .catch((error) => {
          console.error("Error accessing media devices:", error);
        });
    }
  );
});

// used to work

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "start-recording-request") {
    console.log("Background script - Recording requested from content script");
    try {
      const streamId = await chrome.desktopCapture.chooseDesktopMedia(
        ["screen", "window", "tab"],
        sender.tab,
        (streamId) => {
          if (streamId) {
            chrome.runtime.sendMessage({
              action: "recording-started",
              streamId: streamId,
            });
            // You can also send the streamId to the content script if needed
          } else {
            console.log("User cancelled recording selection");
          }
        }
      );
    } catch (error) {
      console.error("Error choosing desktop media:", error);
    }
  } else if (message.action === "recording-started") {
    console.log(
      "Recording started with streamId (received from background script):",
      message.streamId
    );
    // Handle recording logic here (optional)
  }
});
