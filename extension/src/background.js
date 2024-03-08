console.log("Background Injected");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    chrome.scripting
      .executeScript({
        target: { tabId },
        files: ["./content.js"],
      })
      .then(() => {
        console.log("Sucessfully injected Content script");
      })
      .catch((err) => console.log(err, "error in bg"));
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start-recording-request") {
    // Perform any necessary logic in the background script
    // For example, initiate the screen recording
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      chrome.desktopCapture.chooseDesktopMedia(
        ["screen", "window", "tab"],
        activeTab,
        (streamId) => {
          if (streamId) {
            chrome.runtime.sendMessage({
              action: "recording-started",
              streamId: streamId,
            });
          } else {
            console.log("User cancelled recording selection");
          }
        }
      );
    });
  }
});
