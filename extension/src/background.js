console.log("Background Injected");

// to make sure that the page is fully loaded before displaying the content script
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
