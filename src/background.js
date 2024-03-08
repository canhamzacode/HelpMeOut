console.log("Background Injected");

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
